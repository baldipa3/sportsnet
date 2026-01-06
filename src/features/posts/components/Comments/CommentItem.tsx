import { useState } from "react";
import { FaHeart, FaReply, FaTrash, FaFlag } from "react-icons/fa";
import { type CommentItemProps } from "./types";
import { type MenuOption, KebabMenu } from "@/components/layout";
import { formatRelativeTime, highlightMentions, getUserDisplayName } from "./utils";

export const CommentItem = ({
  comment,
  depth,
  onReply,
  onLike,
  onDelete,
  currentUserId,
}: CommentItemProps) => {
  const [isAnimating, setIsAnimating] = useState(false);
  const isOwner = currentUserId === comment.user.id;
  const canReply = true; // Allow replies at all depths, but they'll be added at the same level

  const handleLikeClick = () => {
    setIsAnimating(true);
    onLike(comment.id);
    setTimeout(() => setIsAnimating(false), 300);
  };

  const menuOptions: MenuOption[] = isOwner
    ? [
        {
          label: "Delete",
          onClick: () => onDelete(comment.id),
          variant: "danger",
          icon: <FaTrash className="w-4 h-4" />,
        },
      ]
    : [
        {
          label: "Report",
          onClick: () => {
            // Future: Implement report functionality
            console.log("Report comment:", comment.id);
          },
          icon: <FaFlag className="w-4 h-4" />,
        },
      ];

  return (
    <div className={depth > 0 ? "ml-12 border-l-2 border-gray-700 pl-4" : ""}>
      <div className="flex gap-3 p-2 hover:bg-[#222222] rounded-lg transition-colors">
        {/* Avatar */}
        <div className="flex-shrink-0">
          <img
            src={comment.user.avatarUrl || "/assets/avatar.svg"}
            alt={`${getUserDisplayName(comment.user)} avatar`}
            className={`${
              depth === 0 ? "w-10 h-10" : "w-8 h-8"
            } rounded-full object-cover`}
          />
        </div>

        {/* Comment Content */}
        <div className="flex-1 min-w-0">
          {/* Header: Username + Timestamp */}
          <div className="flex items-center gap-2 mb-1">
            <span className="text-gray-200 font-semibold text-sm">
              {getUserDisplayName(comment.user)}
            </span>
            <span className="text-gray-500 text-xs">
              {formatRelativeTime(comment.createdAt)}
            </span>
          </div>

          {/* Comment Text */}
          <p className="text-gray-300 text-sm mb-2 break-words">
            {highlightMentions(comment.content)}
          </p>

          {/* Actions Row */}
          <div className="flex items-center gap-4">
            {/* Like Button */}
            <button
              onClick={handleLikeClick}
              className="flex items-center gap-1 group"
              aria-label={comment.isLikedByCurrentUser ? "Unlike comment" : "Like comment"}
            >
              <FaHeart
                className={`w-4 h-4 transition-all duration-200 ${
                  comment.isLikedByCurrentUser
                    ? "text-green-500"
                    : "text-gray-400 group-hover:text-green-500"
                } ${isAnimating ? "scale-125" : "scale-100"}`}
              />
              {comment.likesCount > 0 && (
                <span className="text-xs text-gray-400 group-hover:text-white">
                  {comment.likesCount}
                </span>
              )}
            </button>

            {/* Reply Button (only for depth < 1) */}
            {canReply && (
              <button
                onClick={() => onReply(comment)}
                className="flex items-center gap-1 text-gray-400 hover:text-white transition-colors group"
                aria-label="Reply to comment"
              >
                <FaReply className="w-4 h-4" />
                <span className="text-xs">Reply</span>
              </button>
            )}
          </div>
        </div>

        {/* Kebab Menu */}
        <div className="flex-shrink-0">
          <KebabMenu options={menuOptions} />
        </div>
      </div>

      {/* Replies (Recursive) */}
      {comment.replies.length > 0 && depth < 1 && (
        <div className="mt-2 space-y-2">
          {comment.replies.map((reply) => (
            <CommentItem
              key={reply.id}
              comment={reply}
              depth={depth + 1}
              onReply={onReply}
              onLike={onLike}
              onDelete={onDelete}
              currentUserId={currentUserId}
            />
          ))}
        </div>
      )}
    </div>
  );
};
