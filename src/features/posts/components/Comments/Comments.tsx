import { useState, useRef } from "react";
import { FaTimes, FaComment } from "react-icons/fa";
import { graphql, usePaginationFragment } from "react-relay";
import { type CommentsProps } from "./types";
import { useCurrentUser } from "@/utils/CurrentUserContext";
import { CommentCard } from "./CommentCard";
import { CreateComment } from "./CreateComment";

const CommentsFragment = graphql`
  fragment CommentsFragment on Post
  @refetchable(queryName: "CommentsPaginationQuery")
  @argumentDefinitions(
    count: { type: "Int", defaultValue: 10 }
    cursor: { type: "String" }
  ) {
    id
    comments(first: $count, after: $cursor)
      @connection(key: "CommentsFragment_comments") {
      __id
      edges {
        node {
          id
          ...CommentCardFragment
          ...CommentCardWithRepliesFragment
        }
      }
      pageInfo {
        hasNextPage
        endCursor
      }
    }
  }
`;

export const Comments = ({ postFragmentKey, onClose }: CommentsProps) => {
  const currentUser = useCurrentUser();
  const listRef = useRef<HTMLDivElement>(null);

  // Pagination fragment for comments
  const { data, loadNext, hasNext, isLoadingNext } = usePaginationFragment(
    CommentsFragment,
    postFragmentKey
  );

  // Reply state: track which comment we're replying to
  const [replyState, setReplyState] = useState<{
    commentId: string;
    connectionId: string;
    userName: string;
  } | null>(null);

  // Calculate total comments from edges
  const totalComments = data.comments?.edges?.length || 0;

  // Get connection ID for appending top-level comments (use __id from fragment)
  const postConnectionId = data.comments?.__id;

  const handleReply = (parentCommentId: string, connectionId: string, userName: string) => {
    // parentCommentId: the comment we're replying to (will be parent of new reply)
    // connectionId: the connection to append the new reply to (from __id)
    setReplyState({ commentId: parentCommentId, connectionId, userName });
  };

  const handleCancelReply = () => {
    setReplyState(null);
  };

  const handleSubmitSuccess = () => {
    // Only scroll to bottom if the user is already near the bottom
    // This prevents jarring jumps when user is reading comments higher up
    setTimeout(() => {
      if (listRef.current) {
        const { scrollTop, scrollHeight, clientHeight } = listRef.current;
        const distanceFromBottom = scrollHeight - scrollTop - clientHeight;

        // Only auto-scroll if user is within 100px of bottom
        if (distanceFromBottom < 100) {
          listRef.current.scrollTop = scrollHeight;
        }
      }
    }, 100);
  };

  const comments = data.comments?.edges || [];

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
      {postConnectionId && (
        <>
          {comments.length === 0 ? (
            <div
              ref={listRef}
              className="flex flex-col items-center justify-center p-12 min-h-[200px]"
            >
              <FaComment className="w-16 h-16 text-gray-600 mb-4" />
              <p className="text-gray-400 text-center">
                No comments yet. Be the first to comment!
              </p>
            </div>
          ) : (
            <div
              ref={listRef}
              className="overflow-y-auto px-4 py-6 space-y-4 max-h-[500px]"
              style={{ scrollbarWidth: "thin" }}
            >
              {comments.map((edge) => (
                edge?.node && (
                  <CommentCard
                    key={edge.node.id}
                    commentFragmentKey={edge.node}
                    depth={0}
                    onReply={handleReply}
                    currentUserId={currentUser?.id || ""}
                    postId={data.id}
                    postConnectionId={postConnectionId}
                  />
                )
              ))}

              {/* Load More Button */}
              {hasNext && (
                <div className="flex justify-center mt-6">
                  <button
                    onClick={() => loadNext(10)}
                    disabled={isLoadingNext}
                    className="px-6 py-2 bg-gray-700 hover:bg-gray-600 disabled:bg-gray-800 disabled:cursor-not-allowed rounded-lg text-white transition-colors"
                  >
                    {isLoadingNext ? (
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        Loading...
                      </div>
                    ) : (
                      "Load More Comments"
                    )}
                  </button>
                </div>
              )}
            </div>
          )}
        </>
      )}

      {/* Comment Input */}
      <CreateComment
        postId={data.id}
        connectionId={postConnectionId}
        parentCommentId={replyState?.commentId}
        parentConnectionId={replyState?.connectionId}
        replyingToUserName={replyState?.userName}
        onCancelReply={handleCancelReply}
        onSubmitSuccess={handleSubmitSuccess}
      />
    </div>
  );
};
