import { useState } from "react";
import { graphql, useMutation } from "react-relay";
import { FaTimes, FaSave } from "react-icons/fa";
import { type EditCommentMutation } from "./__generated__/EditCommentMutation.graphql";

const EditCommentMutation = graphql`
  mutation EditCommentMutation($id: ID!, $content: String!) {
    editComment(id: $id, content: $content) {
      id
      content
      wasEdited
    }
  }
`;

interface EditCommentProps {
  commentId: string;
  currentContent: string;
  insertedAt: string;
  onClose: () => void;
}

export const EditComment = ({
  commentId,
  currentContent,
  insertedAt,
  onClose,
}: EditCommentProps) => {
  const [content, setContent] = useState(currentContent);
  const [error, setError] = useState<string | null>(null);

  const [commitEditMutation, isEditInFlight] =
    useMutation<EditCommentMutation>(EditCommentMutation);

  // Check if post is within 15-minute edit window
  const isWithinEditWindow = () => {
    const commentDate = new Date(insertedAt);
    const now = new Date();
    const minutesElapsed = (now.getTime() - commentDate.getTime()) / 1000 / 60;
    return minutesElapsed <= 15;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    // Validate edit window
    if (!isWithinEditWindow()) {
      setError("Comments can only be edited within 15 minutes of creation");
      return;
    }

    // Validate caption changed
    if (content.trim() === currentContent.trim()) {
      setError("New content must be different from the current caption");
      return;
    }

    // Validate caption not empty
    if (!content.trim()) {
      setError("Content cannot be empty");
      return;
    }

    commitEditMutation({
      variables: {
        id: commentId,
        content: content.trim(),
      },
      onCompleted: () => {
        onClose();
      },
      onError: (error) => {
        setError(error.message || "Failed to edit comment");
      },
    });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
      <div className="bg-[#1a1a1a] rounded-xl max-w-2xl w-full shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-700">
          <h2 className="text-xl font-bold text-white">Edit Post</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors"
            disabled={isEditInFlight}
          >
            <FaTimes className="w-6 h-6" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6">
          {/* Error Message */}
          {error && (
            <div className="mb-4 p-3 bg-red-900/30 border border-red-700 rounded-lg">
              <p className="text-red-400 text-sm">{error}</p>
            </div>
          )}

          {/* Caption Input */}
          <div className="mb-6">
            <label
              htmlFor="caption"
              className="block text-gray-300 mb-2 font-medium"
            >
              Content
            </label>
            <textarea
              id="content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="w-full bg-[#222222] text-white rounded-lg p-3 border border-gray-600 focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-500/50 min-h-[120px] resize-y"
              placeholder="Write your message..."
              disabled={isEditInFlight || !isWithinEditWindow()}
              maxLength={500}
            />
            <div className="flex justify-between mt-2">
              <span className="text-gray-500 text-sm">
                {content.length}/500 characters
              </span>
              {content.trim() !== currentContent.trim() && (
                <span className="text-yellow-400 text-sm">
                  • Unsaved changes
                </span>
              )}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 justify-end">
            <button
              type="button"
              onClick={onClose}
              disabled={isEditInFlight}
              className="px-6 py-2.5 rounded-lg bg-gray-700 text-white hover:bg-gray-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed font-medium"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={
                isEditInFlight ||
                !isWithinEditWindow() ||
                content.trim() === currentContent.trim() ||
                !content.trim()
              }
              className="px-6 py-2.5 rounded-lg bg-green-600 text-white hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed font-medium flex items-center gap-2"
            >
              {isEditInFlight ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                  Saving...
                </>
              ) : (
                <>
                  <FaSave />
                  Save Changes
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
