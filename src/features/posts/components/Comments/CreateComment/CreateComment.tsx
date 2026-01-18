import { useState, useRef, useEffect } from "react";
import { FaTimes, FaPaperPlane } from "react-icons/fa";
import { graphql, useMutation } from "react-relay";
import { type CreateCommentProps } from "../types";
import { validateComment } from "../utils";

const CreateCommentMutation = graphql`
  mutation CreateCommentMutation(
    $content: String!
    $postId: ID!
    $parentCommentId: ID
    $connections: [ID!]!
  ) {
    createComment(
      content: $content
      postId: $postId
      parentCommentId: $parentCommentId
    ) {
      commentEdge @appendEdge(connections: $connections) {
        cursor
        node {
          id
          ...CommentCardFragment
          ...CommentCardWithRepliesFragment
        }
      }
      parent {
        ... on Post {
          id
          commentsCount
        }
        ... on Comment {
          id
          repliesCount
        }
      }
    }
  }
`;

export const CreateComment = ({
  postId,
  connectionId,
  parentCommentId,
  parentConnectionId,
  replyingToUserName,
  onCancelReply,
  onSubmitSuccess,
}: CreateCommentProps) => {
  const [content, setContent] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const [commitCreateMutation, isCreating] = useMutation(CreateCommentMutation);

  // Auto-resize textarea based on content
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      const newHeight = Math.min(textareaRef.current.scrollHeight, 120);
      textareaRef.current.style.height = `${newHeight}px`;
    }
  }, [content]);

  // Focus and prefill when replying
  useEffect(() => {
    if (replyingToUserName && textareaRef.current) {
      textareaRef.current.focus();
      setContent(`@${replyingToUserName} `);
    }
  }, [replyingToUserName]);

  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value);
  };

  const handleSubmit = () => {
    const trimmed = content.trim();
    const error = validateComment(trimmed);

    if (error || isCreating) {
      console.error(error);
      return;
    }

    // Determine which connection to use
    // For replies: use parentConnectionId, for top-level comments: use connectionId
    const targetConnectionId = parentCommentId
      ? parentConnectionId
      : connectionId;

    console.log("targetConnectionId:", targetConnectionId);

    if (!targetConnectionId) {
      console.error("No connection ID available");
      return;
    }

    commitCreateMutation({
      variables: {
        content: trimmed,
        postId,
        parentCommentId,
        connections: [targetConnectionId],
      },
      onCompleted: () => {
        setContent("");
        if (parentCommentId) {
          onCancelReply(); // Clear reply state
        }
        onSubmitSuccess?.();
      },
      onError: (error) => {
        console.error("Failed to create comment:", error);
        // TODO: Show toast notification
      },
      updater: (store, data) => {
        // The @appendEdge directive handles adding the comment to the connection
        // But we need to ensure the parent's count is updated
        const response = data as any;
        if (!response?.createComment) return;

        const parent = response.createComment.parent;
        if (parent) {
          // Update commentsCount for Post or repliesCount for Comment
          if ("commentsCount" in parent && parent.id) {
            const post = store.get(parent.id);
            if (post && parent.commentsCount !== undefined) {
              post.setValue(parent.commentsCount, "commentsCount");
            }
          } else if ("repliesCount" in parent && parent.id) {
            const comment = store.get(parent.id);
            if (comment && parent.repliesCount !== undefined) {
              comment.setValue(parent.repliesCount, "repliesCount");
            }
          }
        }
      },
    });
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  const isValid = content.trim().length > 0 && content.length <= 500;
  const showCharCounter = content.length > 0;
  const charCountColor =
    content.length > 490
      ? "text-red-400"
      : content.length > 400
      ? "text-yellow-400"
      : "text-gray-500";

  return (
    <div className="border-t border-gray-700 bg-[#222222]">
      {/* Reply Badge */}
      {replyingToUserName && (
        <div className="flex items-center justify-between px-4 pt-3 pb-2">
          <span className="text-gray-400 text-sm">
            Replying to{" "}
            <span className="text-green-400 font-semibold">
              @{replyingToUserName}
            </span>
          </span>
          <button
            onClick={onCancelReply}
            className="text-gray-500 hover:text-white transition-colors"
            aria-label="Cancel reply"
            disabled={isCreating}
          >
            <FaTimes className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Input Area */}
      <div className="p-4">
        <div className="flex gap-3 items-end">
          <textarea
            ref={textareaRef}
            value={content}
            onChange={handleContentChange}
            onKeyDown={handleKeyDown}
            placeholder="Add a comment..."
            className="flex-1 bg-[#2a2a2a] text-white rounded-lg px-4 py-2 resize-none min-h-[40px] max-h-[120px] focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent border border-gray-600 text-sm"
            disabled={isCreating}
            maxLength={500}
            rows={1}
          />

          <button
            onClick={handleSubmit}
            disabled={!isValid || isCreating}
            className="bg-green-600 hover:bg-green-700 disabled:bg-gray-700 disabled:cursor-not-allowed rounded-full p-3 transition-colors flex-shrink-0"
            aria-label="Submit comment"
          >
            {isCreating ? (
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
            ) : (
              <FaPaperPlane className="w-5 h-5 text-white" />
            )}
          </button>
        </div>

        {/* Character Counter */}
        {showCharCounter && (
          <div className="flex justify-end mt-2">
            <span className={`text-xs ${charCountColor}`}>
              {content.length}/500
            </span>
          </div>
        )}
      </div>
    </div>
  );
};
