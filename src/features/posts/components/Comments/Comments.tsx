import { useState, useRef, useEffect } from "react";
import { FaTimes, FaComment } from "react-icons/fa";
import { graphql, usePaginationFragment } from "react-relay";
import { type CommentsProps } from "./types";
import { useCurrentUser } from "@/utils/CurrentUserContext";
import { CommentCard } from "./CommentCard";
import { CreateComment } from "./CreateComment";
import { scrollToComment } from "./utils";

const CommentsFragment = graphql`
  fragment CommentsFragment on Post
  @refetchable(queryName: "CommentsPaginationQuery")
  @argumentDefinitions(
    count: { type: "Int", defaultValue: 20 }
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
  const containerRef = useRef<HTMLDivElement>(null);
  const loadMoreTriggerRef = useRef<HTMLDivElement>(null);

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

  // Track which comment should auto-expand (for newly created replies)
  const [expandedCommentId, setExpandedCommentId] = useState<string | null>(
    null
  );

  const comments = data.comments?.edges || [];

  // Scroll container into view when it opens
  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollIntoView({
        behavior: "smooth",
        block: "end",
      });
    }
  }, []);

  // Infinite scroll: Intersection Observer for loading older comments at the bottom
  useEffect(() => {
    if (!loadMoreTriggerRef.current || !hasNext || isLoadingNext) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const firstEntry = entries[0];
        if (firstEntry.isIntersecting && hasNext && !isLoadingNext) {
          loadNext(20);
        }
      },
      {
        root: listRef.current,
        rootMargin: "200px",
        threshold: 0,
      }
    );

    observer.observe(loadMoreTriggerRef.current);

    return () => {
      observer.disconnect();
    };
  }, [hasNext, isLoadingNext, loadNext]);

  // Get connection ID for appending top-level comments
  const postConnectionId = data.comments?.__id;

  const handleReply = (
    parentCommentId: string,
    connectionId: string,
    userName: string
  ) => {
    setReplyState({ commentId: parentCommentId, connectionId, userName });
  };

  const handleCancelReply = () => {
    setReplyState(null);
  };

  const handleSubmitSuccess = (newCommentId: string) => {
    // If this was a reply, expand the parent comment first
    if (replyState?.commentId) {
      setExpandedCommentId(replyState.commentId);
    }

    // Wait for DOM update, then scroll to the new comment
    setTimeout(() => {
      scrollToComment(newCommentId, listRef);
    }, 150);
  };

  return (
    <div
      ref={containerRef}
      className="border-t border-gray-700 bg-[#1a1a1a] flex flex-col h-[600px]"
    >
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-gray-700 flex-shrink-0">
        <button
          onClick={onClose}
          className="text-gray-400 hover:text-white transition-colors"
          aria-label="Close comments"
        >
          <FaTimes className="w-5 h-5" />
        </button>
      </div>

      {/* Comment List - Scrollable area */}
      {postConnectionId && (
        <>
          {comments.length === 0 ? (
            <div
              ref={listRef}
              className="flex flex-col items-center justify-center p-12 flex-1 overflow-y-auto"
            >
              <FaComment className="w-16 h-16 text-gray-600 mb-4" />
              <p className="text-gray-400 text-center">
                No comments yet. Be the first to comment!
              </p>
            </div>
          ) : (
            <div
              ref={listRef}
              className="overflow-y-auto px-4 py-6 space-y-4 flex-1"
              style={{ scrollbarWidth: "thin" }}
            >
              {comments.map(
                (edge) =>
                  edge?.node && (
                    <CommentCard
                      key={edge.node.id}
                      commentFragmentKey={edge.node}
                      onReply={handleReply}
                      currentUserId={currentUser?.id || ""}
                      postId={data.id}
                      postConnectionId={postConnectionId}
                      forceExpand={expandedCommentId === edge.node.id}
                      onExpandHandled={() => setExpandedCommentId(null)}
                    />
                  )
              )}

              {/* Infinite Scroll Trigger at BOTTOM for loading older comments */}
              {hasNext && (
                <div
                  ref={loadMoreTriggerRef}
                  className="flex justify-center py-4"
                >
                  {isLoadingNext && (
                    <div className="flex items-center gap-2 text-gray-400">
                      <div className="w-5 h-5 border-2 border-gray-400 border-t-transparent rounded-full animate-spin"></div>
                      <span>Loading older comments...</span>
                    </div>
                  )}
                </div>
              )}
            </div>
          )}
        </>
      )}

      {/* Comment Input - Sticky at bottom */}
      <div className="flex-shrink-0">
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
    </div>
  );
};
