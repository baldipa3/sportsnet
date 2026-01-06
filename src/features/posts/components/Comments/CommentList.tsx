import { forwardRef } from "react";
import { FaComment } from "react-icons/fa";
import { type CommentListProps } from "./types";
import { CommentItem } from "./CommentItem";

export const CommentList = forwardRef<HTMLDivElement, CommentListProps>(
  ({ comments, onReply, onLike, onDelete, currentUserId }, ref) => {
    if (comments.length === 0) {
      return (
        <div
          ref={ref}
          className="flex flex-col items-center justify-center p-12 min-h-[200px]"
        >
          <FaComment className="w-16 h-16 text-gray-600 mb-4" />
          <p className="text-gray-400 text-center">
            No comments yet. Be the first to comment!
          </p>
        </div>
      );
    }

    return (
      <div
        ref={ref}
        className="overflow-y-auto px-4 py-6 space-y-4 max-h-[500px]"
        style={{ scrollbarWidth: "thin" }}
      >
        {comments.map((comment) => (
          <CommentItem
            key={comment.id}
            comment={comment}
            depth={0}
            onReply={onReply}
            onLike={onLike}
            onDelete={onDelete}
            currentUserId={currentUserId}
          />
        ))}

        {/* Future: Load More Button for Pagination */}
        {/* <div className="flex justify-center mt-6">
          <button
            onClick={handleLoadMore}
            className="px-6 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg text-white transition-colors"
          >
            Load More Comments
          </button>
        </div> */}
      </div>
    );
  }
);

CommentList.displayName = "CommentList";
