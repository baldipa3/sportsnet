import { useState, useRef } from "react";
import { FaTimes } from "react-icons/fa";
import { type CommentsProps, type Comment } from "./types";
import { getMockComments, generateCommentId } from "./mockData";
import { validateComment } from "./utils";
import { useCurrentUser } from "@/utils/CurrentUserContext";
import { CommentList } from "./CommentList";
import { CommentInput } from "./CommentInput";

export const Comments = ({ onClose }: CommentsProps) => {
  const currentUser = useCurrentUser();
  const [comments, setComments] = useState<Comment[]>(() =>
    getMockComments(currentUser?.id || "current-user-id")
  );
  const [replyingTo, setReplyingTo] = useState<Comment | undefined>();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const listRef = useRef<HTMLDivElement>(null);

  // Calculate total comments (including replies)
  const totalComments = comments.reduce(
    (acc, comment) => acc + 1 + comment.replies.length,
    0
  );

  // Handle new comment submission
  const handleSubmit = (content: string) => {
    const error = validateComment(content);
    if (error) {
      // For now, just log the error. In production, show toast notification
      console.error(error);
      return;
    }

    if (!currentUser) {
      console.error("No current user found");
      return;
    }

    setIsSubmitting(true);

    // Simulate async operation
    setTimeout(() => {
      const newComment: Comment = {
        id: generateCommentId(),
        content,
        createdAt: new Date().toISOString(),
        user: {
          id: currentUser.id,
          name: currentUser.name,
          surname: currentUser.surname,
        },
        likesCount: 0,
        isLikedByCurrentUser: false,
        replies: [],
      };

      if (replyingTo) {
        // Add as reply
        newComment.replyToCommentId = replyingTo.id;
        newComment.replyToUserId = replyingTo.user.id;

        setComments((prev) => {
          // If replying to a depth-1 comment (a reply), add it as a sibling to that reply
          // by finding the parent comment and adding to its replies array
          if (replyingTo.replyToCommentId) {
            // This is a reply to a reply - add it at the same level
            return prev.map((c) =>
              c.id === replyingTo.replyToCommentId
                ? { ...c, replies: [...c.replies, newComment] }
                : c
            );
          } else {
            // This is a reply to a top-level comment
            return prev.map((c) =>
              c.id === replyingTo.id
                ? { ...c, replies: [...c.replies, newComment] }
                : c
            );
          }
        });
        setReplyingTo(undefined);
      } else {
        // Add as top-level comment
        setComments((prev) => [...prev, newComment]);
      }

      setIsSubmitting(false);

      // Scroll to bottom after adding comment
      setTimeout(() => {
        if (listRef.current) {
          listRef.current.scrollTop = listRef.current.scrollHeight;
        }
      }, 100);
    }, 300);
  };

  // Handle like toggle
  const handleLike = (commentId: string) => {
    setComments((prev) => {
      const updateComment = (comments: Comment[]): Comment[] => {
        return comments.map((comment) => {
          if (comment.id === commentId) {
            return {
              ...comment,
              isLikedByCurrentUser: !comment.isLikedByCurrentUser,
              likesCount: comment.isLikedByCurrentUser
                ? comment.likesCount - 1
                : comment.likesCount + 1,
            };
          }

          // Check replies recursively
          if (comment.replies.length > 0) {
            return {
              ...comment,
              replies: updateComment(comment.replies),
            };
          }

          return comment;
        });
      };

      return updateComment(prev);
    });

    // Future: Call GraphQL mutation
    // commitLikeMutation({ variables: { commentId, doesLike: !comment.isLikedByCurrentUser } })
  };

  // Handle comment deletion
  const handleDelete = (commentId: string) => {
    setComments((prev) => {
      const deleteComment = (comments: Comment[]): Comment[] => {
        return comments
          .filter((c) => c.id !== commentId)
          .map((c) => ({
            ...c,
            replies: deleteComment(c.replies),
          }));
      };

      return deleteComment(prev);
    });

    // Future: Call GraphQL mutation with optimistic delete
    // commitDeleteMutation({ variables: { commentId, connections: [connectionID] } })
  };

  // Handle reply button click
  const handleReply = (comment: Comment) => {
    setReplyingTo(comment);
  };

  // Handle cancel reply
  const handleCancelReply = () => {
    setReplyingTo(undefined);
  };

  return (
    <div className="border-t border-gray-700 bg-[#1a1a1a]">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-gray-700">
        <h3 className="text-lg font-bold text-white">
          Comments {totalComments > 0 && `• ${totalComments}`}
        </h3>
        <button
          onClick={onClose}
          className="text-gray-400 hover:text-white transition-colors"
          aria-label="Close comments"
        >
          <FaTimes className="w-5 h-5" />
        </button>
      </div>

      {/* Comment List */}
      <CommentList
        ref={listRef}
        comments={comments}
        onReply={handleReply}
        onLike={handleLike}
        onDelete={handleDelete}
        currentUserId={currentUser?.id || ""}
      />

      {/* Comment Input */}
      <CommentInput
        onSubmit={handleSubmit}
        replyingTo={replyingTo}
        onCancelReply={handleCancelReply}
        isSubmitting={isSubmitting}
      />
    </div>
  );
};
