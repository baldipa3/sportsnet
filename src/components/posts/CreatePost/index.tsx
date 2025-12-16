import { useState, useRef, useEffect } from "react";
import { FaTimes, FaImage, FaVideo, FaMapMarkerAlt } from "react-icons/fa";
import { graphql, useMutation, ConnectionHandler } from "react-relay";
import { type CreatePostProp } from "../types";
import { type CreatePostMutation } from "./__generated__/CreatePostMutation.graphql";

interface MediaFile {
  file: File;
  previewUrl: string;
  type: "image" | "video";
}

const CreatePostMutation = graphql`
  mutation CreatePostMutation(
    $caption: String!
    $sportId: ID!
    $cityId: ID!
    $media: [Upload!]
    $connections: [ID!]!
  ) {
    createPost(
      caption: $caption
      sportId: $sportId
      cityId: $cityId
      media: $media
    ) {
      postEdge @prependEdge(connections: $connections) {
        node {
          ...PostCardFragment
        }
      }
    }
  }
`;

const CreatePost = ({
  isOpen,
  onClose,
  postLocationContext,
  feedData,
}: CreatePostProp) => {
  const [caption, setCaption] = useState("");
  const [mediaFiles, setMediaFiles] = useState<MediaFile[]>([]);
  const [currentPreviewIndex, setCurrentPreviewIndex] = useState(0);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [commitMutation, isSubmitting] =
    useMutation<CreatePostMutation>(CreatePostMutation);

  // Cleanup preview URLs on unmount or when files change
  useEffect(() => {
    return () => {
      mediaFiles.forEach((media) => URL.revokeObjectURL(media.previewUrl));
    };
  }, [mediaFiles]);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    const newMediaFiles: MediaFile[] = [];

    Array.from(files).forEach((file) => {
      if (file.type.startsWith("image/")) {
        newMediaFiles.push({
          file,
          previewUrl: URL.createObjectURL(file),
          type: "image",
        });
      } else if (file.type.startsWith("video/")) {
        newMediaFiles.push({
          file,
          previewUrl: URL.createObjectURL(file),
          type: "video",
        });
      }
    });

    if (newMediaFiles.length > 0) {
      setMediaFiles((prev) => [...prev, ...newMediaFiles]);
    }

    // Reset file input
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const removeFile = (index: number) => {
    setMediaFiles((prev) => {
      // Revoke the URL to free memory
      URL.revokeObjectURL(prev[index].previewUrl);
      const newFiles = prev.filter((_, i) => i !== index);

      // Adjust current preview index if needed
      if (currentPreviewIndex >= newFiles.length && newFiles.length > 0) {
        setCurrentPreviewIndex(newFiles.length - 1);
      } else if (newFiles.length === 0) {
        setCurrentPreviewIndex(0);
      }

      return newFiles;
    });
  };

  const handleSubmit = async () => {
    if (!caption.trim()) return;

    const connectionID = ConnectionHandler.getConnectionID(
      feedData.id,
      "sportsPostsFragment_posts"
    );

    commitMutation({
      variables: {
        sportId: postLocationContext.sportId,
        cityId: postLocationContext.cityId,
        caption: caption.trim(),
        media: mediaFiles.map((m) => m.file),
        connections: [connectionID],
      },
      onCompleted: () => {
        handleClose();
      },
      onError: (error) => {
        console.error("Error creating post:", error);
      },
    });
  };

  const handleClose = () => {
    // Cleanup URLs
    mediaFiles.forEach((media) => URL.revokeObjectURL(media.previewUrl));

    // Reset state
    setCaption("");
    setMediaFiles([]);
    setCurrentPreviewIndex(0);

    onClose();
  };

  if (!isOpen) return null;

  const canSubmit = caption.trim().length > 0 && !isSubmitting;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="bg-[#222222] rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-700">
          <h2 className="text-xl font-bold text-white">Create Post</h2>
          <button
            onClick={handleClose}
            disabled={isSubmitting}
            className="text-gray-400 hover:text-white transition-colors p-2 disabled:opacity-50"
            aria-label="Close"
          >
            <FaTimes className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="flex flex-col max-h-[calc(90vh-180px)]">
          <div className="overflow-y-auto p-4 space-y-4">
            {/* Media Preview */}
            {mediaFiles.length > 0 && (
              <div className="relative bg-black rounded-lg overflow-hidden">
                <div className="aspect-video relative">
                  {mediaFiles[currentPreviewIndex].type === "video" ? (
                    <video
                      src={mediaFiles[currentPreviewIndex].previewUrl}
                      className="w-full h-full object-contain"
                      controls
                    />
                  ) : (
                    <img
                      src={mediaFiles[currentPreviewIndex].previewUrl}
                      alt={`Preview ${currentPreviewIndex + 1}`}
                      className="w-full h-full object-contain"
                    />
                  )}

                  {/* Remove button */}
                  <button
                    onClick={() => removeFile(currentPreviewIndex)}
                    className="absolute top-2 right-2 bg-red-500 hover:bg-red-600 text-white rounded-full p-2 transition-colors"
                    aria-label="Remove media"
                  >
                    <FaTimes className="w-4 h-4" />
                  </button>

                  {/* Counter */}
                  {mediaFiles.length > 1 && (
                    <div className="absolute top-2 left-2 bg-black bg-opacity-60 text-white px-3 py-1 rounded-full text-sm font-medium">
                      {currentPreviewIndex + 1} / {mediaFiles.length}
                    </div>
                  )}
                </div>

                {/* Thumbnails */}
                {mediaFiles.length > 1 && (
                  <div className="flex gap-2 p-2 overflow-x-auto">
                    {mediaFiles.map((media, index) => (
                      <button
                        key={index}
                        onClick={() => setCurrentPreviewIndex(index)}
                        className={`flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden border-2 transition-all ${
                          index === currentPreviewIndex
                            ? "border-green-500 ring-2 ring-green-500 ring-opacity-50"
                            : "border-gray-600 opacity-60 hover:opacity-100 hover:border-gray-500"
                        }`}
                        aria-label={`View media ${index + 1}`}
                      >
                        {media.type === "video" ? (
                          <div className="w-full h-full bg-gray-800 flex items-center justify-center">
                            <FaVideo className="text-white w-6 h-6" />
                          </div>
                        ) : (
                          <img
                            src={media.previewUrl}
                            alt={`Thumbnail ${index + 1}`}
                            className="w-full h-full object-cover"
                          />
                        )}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Add Media Button */}
            <div>
              <input
                ref={fileInputRef}
                type="file"
                multiple
                accept="image/*,video/*"
                onChange={handleFileSelect}
                className="hidden"
                disabled={isSubmitting}
              />
              <button
                onClick={() => fileInputRef.current?.click()}
                disabled={isSubmitting}
                className="w-full flex items-center justify-center gap-2 p-4 border-2 border-dashed border-gray-600 hover:border-green-500 rounded-lg transition-colors text-gray-400 hover:text-gray-300 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <FaImage className="w-5 h-5" />
                <span>Add Photos or Videos</span>
              </button>
            </div>

            {/* Caption */}
            <div>
              <textarea
                value={caption}
                onChange={(e) => setCaption(e.target.value)}
                placeholder="Share your game moment..."
                className="w-full bg-[#2a2a2a] text-white rounded-lg p-3 resize-none focus:outline-none focus:ring-2 focus:ring-green-500 placeholder-gray-500"
                rows={4}
                maxLength={500}
                disabled={isSubmitting}
              />
              <div className="text-right text-sm text-gray-500 mt-1">
                {caption.length}/500
              </div>
            </div>

            {/* Location Info */}
            <div className="bg-[#2a2a2a] rounded-lg p-3">
              <div className="flex items-center gap-2 text-gray-300">
                <FaMapMarkerAlt className="w-4 h-4 text-green-500" />
                <span className="text-sm">
                  Posting to{" "}
                  <span className="font-semibold text-white">
                    {postLocationContext.cityId}
                  </span>{" "}
                  •{" "}
                  <span className="font-semibold text-white">
                    {postLocationContext.sportId}
                  </span>
                </span>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="border-t border-gray-700 p-4 bg-[#1a1a1a]">
            <div className="flex gap-3 justify-end">
              <button
                onClick={handleClose}
                disabled={isSubmitting}
                className="px-6 py-2 rounded-lg bg-gray-700 hover:bg-gray-600 text-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Cancel
              </button>
              <button
                onClick={handleSubmit}
                disabled={!canSubmit}
                className="px-6 py-2 rounded-lg bg-green-600 hover:bg-green-700 text-white font-semibold transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? "Posting..." : "Post"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreatePost;
