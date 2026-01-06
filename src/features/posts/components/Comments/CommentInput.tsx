import { useState, useRef, useEffect } from "react";
import { FaTimes, FaPaperPlane } from "react-icons/fa";
import { type CommentInputProps } from "./types";
import { buildReplyPrefix, getUserDisplayName } from "./utils";

export const CommentInput = ({
  onSubmit,
  replyingTo,
  onCancelReply,
  isSubmitting,
}: CommentInputProps) => {
  const [content, setContent] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);

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
    if (replyingTo && textareaRef.current) {
      textareaRef.current.focus();
      const prefix = buildReplyPrefix(replyingTo.user);
      setContent(prefix);
    }
  }, [replyingTo]);

  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newContent = e.target.value;
    setContent(newContent);
  };

  const handleSubmit = () => {
    const trimmed = content.trim();
    if (!trimmed || isSubmitting) return;

    onSubmit(content);
    setContent("");
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    // Submit on Enter (without Shift)
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
      {replyingTo && (
        <div className="flex items-center justify-between px-4 pt-3 pb-2">
          <span className="text-gray-400 text-sm">
            Replying to{" "}
            <span className="text-green-400 font-semibold">
              @{getUserDisplayName(replyingTo.user)}
            </span>
          </span>
          <button
            onClick={onCancelReply}
            className="text-gray-500 hover:text-white transition-colors"
            aria-label="Cancel reply"
            disabled={isSubmitting}
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
            disabled={isSubmitting}
            maxLength={500}
            rows={1}
          />

          <button
            onClick={handleSubmit}
            disabled={!isValid || isSubmitting}
            className="bg-green-600 hover:bg-green-700 disabled:bg-gray-700 disabled:cursor-not-allowed rounded-full p-3 transition-colors flex-shrink-0"
            aria-label="Submit comment"
          >
            {isSubmitting ? (
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
