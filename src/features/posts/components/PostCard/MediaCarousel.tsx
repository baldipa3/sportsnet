import React, { useState, useEffect, useMemo } from "react";
import { FaChevronLeft, FaChevronRight, FaPlay, FaPause } from "react-icons/fa";
import { type PostCardFragment$data } from "./__generated__/PostCardFragment.graphql";

interface MediaCarouselProps {
  post: PostCardFragment$data;
}

type MediaItem = NonNullable<PostCardFragment$data["media"]>[number];

export const MediaCarousel = ({ post }: MediaCarouselProps) => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [isVideoPlaying, setIsVideoPlaying] = useState<boolean>(false);
  const [failedImages, setFailedImages] = useState<Set<string>>(new Set());

  const validMedia = useMemo(() => {
    if (!post.media || post.media.length === 0) {
      return [];
    }

    return post.media.filter(
      (item): item is MediaItem =>
        item !== null &&
        item !== undefined &&
        item.url !== null &&
        item.url !== undefined &&
        typeof item.url === "string" &&
        item.url.trim() !== ""
    );
  }, [post.media]);

  useEffect(() => {
    if (validMedia.length > 0 && currentIndex >= validMedia.length) {
      setCurrentIndex(0);
    }
  }, [validMedia.length, currentIndex]);

  if (validMedia.length === 0) {
    return (
      <div className="relative w-full bg-black">
        <div className="relative w-full h-96 overflow-hidden bg-gray-900 flex items-center justify-center">
          <span className="text-gray-500 text-sm">No media</span>
        </div>
      </div>
    );
  }

  const nextSlide = (): void => {
    setCurrentIndex((prev) => {
      const next = (prev + 1) % validMedia.length;
      return next;
    });
    setIsVideoPlaying(false);
  };

  const prevSlide = (): void => {
    setCurrentIndex((prev) => {
      const next = (prev - 1 + validMedia.length) % validMedia.length;
      return next;
    });
    setIsVideoPlaying(false);
  };

  const goToSlide = (index: number): void => {
    if (index >= 0 && index < validMedia.length) {
      setCurrentIndex(index);
      setIsVideoPlaying(false);
    }
  };

  const handleImageError = (url: string) => {
    setFailedImages((prev) => new Set([...prev, url]));
  };

  const isVideo = (url: string): boolean => {
    const videoExtensions = [".mp4", ".webm", ".mov", ".avi", ".mkv"];
    const urlLower = url.toLowerCase();
    return videoExtensions.some((ext) => urlLower.includes(ext));
  };

  const toggleVideo = (videoElement: HTMLVideoElement): void => {
    if (videoElement.paused) {
      videoElement
        .play()
        .then(() => {
          setIsVideoPlaying(true);
        })
        .catch((err) => {
          console.error("Error playing video:", err);
        });
    } else {
      videoElement.pause();
      setIsVideoPlaying(false);
    }
  };

  const currentMedia = validMedia[currentIndex];

  const currentMediaUrl = currentMedia?.url;
  const isCurrentMediaFailed = currentMediaUrl
    ? failedImages.has(currentMediaUrl)
    : false;

  if (!currentMedia || !currentMediaUrl) {
    return (
      <div className="relative w-full bg-gray-900 h-96 flex items-center justify-center">
        <span className="text-gray-400">Loading media...</span>
      </div>
    );
  }

  return (
    <div className="relative w-full bg-black">
      <div className="relative w-full h-96 overflow-hidden bg-gray-900">
        {isCurrentMediaFailed ? (
          <div className="w-full h-full bg-gray-800 flex items-center justify-center">
            <div className="text-center">
              <span className="text-gray-400 block">Failed to load media</span>
              <span className="text-gray-500 text-sm">
                ({currentIndex + 1} / {validMedia.length})
              </span>
            </div>
          </div>
        ) : isVideo(currentMediaUrl) ? (
          <div className="relative w-full h-full">
            <video
              key={`${currentIndex}-${currentMediaUrl}`}
              className="w-full h-full object-cover"
              controls={false}
              preload="metadata"
              onPlay={() => setIsVideoPlaying(true)}
              onPause={() => setIsVideoPlaying(false)}
              onError={() => {
                console.error("Video failed to load:", currentMediaUrl);
                handleImageError(currentMediaUrl);
              }}
              onClick={(e: React.MouseEvent<HTMLVideoElement>) =>
                toggleVideo(e.currentTarget)
              }
            >
              <source src={currentMediaUrl} type="video/mp4" />
              Your browser does not support the video tag.
            </video>

            <button
              onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
                e.stopPropagation();
                const videoElement = e.currentTarget
                  .previousElementSibling as HTMLVideoElement;
                if (videoElement) {
                  toggleVideo(videoElement);
                }
              }}
              className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-0 hover:bg-opacity-20 transition-all duration-200"
            >
              <div className="bg-black bg-opacity-50 rounded-full p-3 opacity-0 hover:opacity-100 transition-opacity duration-200">
                {isVideoPlaying ? (
                  <FaPause className="w-8 h-8 text-white" />
                ) : (
                  <FaPlay className="w-8 h-8 text-white ml-1" />
                )}
              </div>
            </button>
          </div>
        ) : (
          <img
            key={`${currentIndex}-${currentMediaUrl}`}
            src={currentMediaUrl}
            alt={`Media ${currentIndex + 1}`}
            className="w-full h-full object-cover"
            onError={() => handleImageError(currentMediaUrl)}
          />
        )}

        {validMedia.length > 1 && (
          <>
            <button
              onClick={prevSlide}
              className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 hover:bg-opacity-70 text-white rounded-full p-2 transition-all duration-200 z-10"
              aria-label="Previous media"
            >
              <FaChevronLeft className="w-6 h-6" />
            </button>

            <button
              onClick={nextSlide}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 hover:bg-opacity-70 text-white rounded-full p-2 transition-all duration-200 z-10"
              aria-label="Next media"
            >
              <FaChevronRight className="w-6 h-6" />
            </button>
          </>
        )}

        {validMedia.length > 1 && (
          <div className="absolute top-4 right-4 bg-black bg-opacity-60 text-white px-3 py-1 rounded-full text-sm z-10">
            {currentIndex + 1} / {validMedia.length}
          </div>
        )}

        {/* Debug info - remove this in production */}
        <div className="absolute top-4 left-4 bg-black bg-opacity-60 text-white px-2 py-1 rounded text-xs z-10">
          Index: {currentIndex} | Total: {validMedia.length}
        </div>
      </div>

      {validMedia.length > 1 && (
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
          {validMedia.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-2 h-2 rounded-full transition-all duration-200 ${
                index === currentIndex
                  ? "bg-white scale-110"
                  : "bg-white bg-opacity-50 hover:bg-opacity-80"
              }`}
              aria-label={`Go to media ${index + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
};
