import { useState, useEffect } from "react";
import { FaReply, FaTrash, FaFlag, FaChevronDown } from "react-icons/fa";
import {
  graphql,
  useFragment,
  usePaginationFragment,
  useMutation,
} from "react-relay";
import type { FragmentRefs } from "relay-runtime";
import { type CommentCardProps } from "../types";
import { type MenuOption, KebabMenu } from "@/components/layout";
import {
  formatRelativeTime,
  highlightMentions,
  getUserDisplayName,
} from "../utils";
import type { CommentCardWithRepliesFragment$data } from "./__generated__/CommentCardWithRepliesFragment.graphql";

// Base fragment for comment data (used by both top-level and replies)
const CommentCardFragment = graphql`
  fragment CommentCardFragment on Comment {
    id
    content
    insertedAt
    wasEdited
    commentLikesCount
    repliesCount
    parentCommentId
    user {
      id
      name
      surname
    }
  }
`;

// Fragment for top-level comments with replies capability
// Uses forward pagination (first/after) to show newest replies first (backend returns DESC)
const CommentCardWithRepliesFragment = graphql`
  fragment CommentCardWithRepliesFragment on Comment
  @refetchable(queryName: "CommentCardRepliesPaginationQuery")
  @argumentDefinitions(
    count: { type: "Int", defaultValue: 10 }
    cursor: { type: "String" }
  ) {
    ...CommentCardFragment
    replies(first: $count, after: $cursor)
      @connection(key: "CommentCardWithRepliesFragment_replies") {
      __id
      edges {
        node {
          id
          ...CommentCardFragment
        }
      }
      pageInfo {
        hasNextPage
        endCursor
      }
    }
  }
`;

const DeleteCommentMutation = graphql`
  mutation CommentCardDeleteCommentMutation($id: ID!, $connections: [ID!]!) {
    deleteComment(id: $id) {
      id @deleteEdge(connections: $connections)
    }
  }
`;

// Extended props for ReplyItem that includes parent's connection ID
interface ReplyCardProps extends CommentCardProps {
  parentConnectionId: string;
}

const ReplyCard = ({
  commentFragmentKey,
  onReply,
  currentUserId,
  parentConnectionId,
  postId,
}: ReplyCardProps) => {
  const comment = useFragment(CommentCardFragment, commentFragmentKey);
  const [commitDeleteMutation] = useMutation(DeleteCommentMutation);

  const isOwner = currentUserId === comment.user.id;

  const handleDelete = () => {
    commitDeleteMutation({
      variables: {
        id: comment.id,
        connections: [parentConnectionId],
      },
      updater: (store) => {
        // Update parent comment's repliesCount
        const parentComment = store.get(comment.parentCommentId!);
        if (parentComment) {
          const currentCount =
            (parentComment.getValue("repliesCount") as number) || 0;
          parentComment.setValue(Math.max(0, currentCount - 1), "repliesCount");
        }

        // Update post's commentsCount
        const post = store.get(postId);
        if (post) {
          const currentCount = (post.getValue("commentsCount") as number) || 0;
          post.setValue(Math.max(0, currentCount - 1), "commentsCount");
        }
      },
      optimisticUpdater: (store) => {
        // Optimistically update repliesCount
        const parentComment = store.get(comment.parentCommentId!);
        if (parentComment) {
          const currentCount =
            (parentComment.getValue("repliesCount") as number) || 0;
          parentComment.setValue(Math.max(0, currentCount - 1), "repliesCount");
        }

        // Optimistically update post's commentsCount
        const post = store.get(postId);
        if (post) {
          const currentCount = (post.getValue("commentsCount") as number) || 0;
          post.setValue(Math.max(0, currentCount - 1), "commentsCount");
        }
      },
    });
  };

  const handleReplyClick = () => {
    // When replying to a reply, we add to the same parent's replies list
    // So use the reply's parentCommentId (the original parent) and the same connection ID
    onReply(
      comment.parentCommentId!,
      parentConnectionId,
      getUserDisplayName(comment.user)
    );
  };

  const menuOptions: MenuOption[] = isOwner
    ? [
        {
          label: "Delete",
          onClick: handleDelete,
          variant: "danger",
          icon: <FaTrash className="w-4 h-4" />,
        },
      ]
    : [
        {
          label: "Report",
          onClick: () => console.log("Report comment:", comment.id),
          icon: <FaFlag className="w-4 h-4" />,
        },
      ];

  const contentText = comment.content || "";
  const insertedAtText = comment.insertedAt || new Date().toISOString();

  return (
    <div
      data-comment-id={comment.id}
      className="ml-12 border-l-2 border-gray-700 pl-4"
    >
      <div className="flex gap-3 p-2 hover:bg-[#222222] rounded-lg transition-colors">
        {/* Avatar */}
        <div className="flex-shrink-0">
          <img
            src={"/assets/avatar.svg"}
            alt={`${getUserDisplayName(comment.user)} avatar`}
            className="w-8 h-8 rounded-full object-cover"
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
              {formatRelativeTime(insertedAtText)}
            </span>
            {comment.wasEdited && (
              <span className="text-xs text-gray-500 italic">(edited)</span>
            )}
          </div>

          {/* Comment Text */}
          <p className="text-gray-300 text-sm mb-2 break-words">
            {highlightMentions(contentText)}
          </p>

          {/* Actions Row */}
          <div className="flex items-center gap-4">
            {/* Like count display */}
            {comment.commentLikesCount > 0 && (
              <span className="text-xs text-gray-400">
                {comment.commentLikesCount}{" "}
                {comment.commentLikesCount === 1 ? "like" : "likes"}
              </span>
            )}

            {/* Reply Button */}
            <button
              onClick={handleReplyClick}
              className="flex items-center gap-1 text-gray-400 hover:text-white transition-colors group cursor-pointer"
              aria-label="Reply to comment"
            >
              <FaReply className="w-4 h-4" />
              <span className="text-xs">Reply</span>
            </button>
          </div>
        </div>

        {/* Kebab Menu */}
        <div className="flex-shrink-0">
          <KebabMenu options={menuOptions} />
        </div>
      </div>
    </div>
  );
};

// Extended props for TopLevelCommentCard that includes post's connection ID
interface TopLevelCommentCardProps extends CommentCardProps {
  postConnectionId: string;
  forceExpand?: boolean;
  onExpandHandled?: () => void;
}

// Component for top-level comments (depth === 0) - with replies pagination
const TopLevelCommentCard = ({
  commentFragmentKey,
  onReply,
  currentUserId,
  postId,
  postConnectionId,
  forceExpand,
  onExpandHandled,
}: TopLevelCommentCardProps) => {
  // Read the base comment data
  const comment = useFragment(CommentCardFragment, commentFragmentKey);
  const [isRepliesExpanded, setIsRepliesExpanded] = useState(false);
  const [commitDeleteMutation] = useMutation(DeleteCommentMutation);

  // Auto-expand when forceExpand is triggered (for newly created replies)
  useEffect(() => {
    if (forceExpand && !isRepliesExpanded) {
      setIsRepliesExpanded(true);
      onExpandHandled?.();
    }
  }, [forceExpand, isRepliesExpanded, onExpandHandled]);

  // This hook is only for replies pagination (forward - newest first from backend)
  const {
    data: repliesData,
    loadNext,
    hasNext,
    isLoadingNext,
  } = usePaginationFragment<any, any>(
    CommentCardWithRepliesFragment,
    commentFragmentKey
  );

  // Explicitly type repliesData to ensure TypeScript knows about the replies field
  const typedRepliesData = repliesData as CommentCardWithRepliesFragment$data;

  const isOwner = currentUserId === comment.user.id;
  const hasReplies = comment.repliesCount > 0;

  // Get the replies connection ID from the fragment's __id
  const repliesConnectionId = typedRepliesData.replies?.__id;

  const handleDelete = () => {
    commitDeleteMutation({
      variables: {
        id: comment.id,
        connections: [postConnectionId],
      },
      updater: (store) => {
        // Update post's commentsCount
        const post = store.get(postId);
        if (post) {
          const currentCount = (post.getValue("commentsCount") as number) || 0;
          post.setValue(Math.max(0, currentCount - 1), "commentsCount");
        }
      },
      optimisticUpdater: (store) => {
        // Optimistically update commentsCount
        const post = store.get(postId);
        if (post) {
          const currentCount = (post.getValue("commentsCount") as number) || 0;
          post.setValue(Math.max(0, currentCount - 1), "commentsCount");
        }
      },
    });
  };

  const handleToggleReplies = () => {
    setIsRepliesExpanded(!isRepliesExpanded);
  };

  const handleReplyClick = () => {
    // Pass this comment's ID as the parent and the replies connection ID
    if (repliesConnectionId) {
      onReply(
        comment.id,
        repliesConnectionId,
        getUserDisplayName(comment.user)
      );
    }
  };

  const menuOptions: MenuOption[] = isOwner
    ? [
        {
          label: "Delete",
          onClick: handleDelete,
          variant: "danger",
          icon: <FaTrash className="w-4 h-4" />,
        },
      ]
    : [
        {
          label: "Report",
          onClick: () => console.log("Report comment:", comment.id),
          icon: <FaFlag className="w-4 h-4" />,
        },
      ];

  const contentText = comment.content || "";
  const insertedAtText = comment.insertedAt || new Date().toISOString();

  return (
    <div data-comment-id={comment.id}>
      <div className="flex gap-3 p-2 hover:bg-[#222222] rounded-lg transition-colors">
        {/* Avatar */}
        <div className="flex-shrink-0">
          <img
            src={"/assets/avatar.svg"}
            alt={`${getUserDisplayName(comment.user)} avatar`}
            className="w-10 h-10 rounded-full object-cover"
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
              {formatRelativeTime(insertedAtText)}
            </span>
            {comment.wasEdited && (
              <span className="text-xs text-gray-500 italic">(edited)</span>
            )}
          </div>

          {/* Comment Text */}
          <p className="text-gray-300 text-sm mb-2 break-words">
            {highlightMentions(contentText)}
          </p>

          {/* Actions Row */}
          <div className="flex items-center gap-4">
            {/* Like count display */}
            {comment.commentLikesCount > 0 && (
              <span className="text-xs text-gray-400">
                {comment.commentLikesCount}{" "}
                {comment.commentLikesCount === 1 ? "like" : "likes"}
              </span>
            )}

            {/* Reply Button */}
            <button
              onClick={handleReplyClick}
              className="flex items-center gap-1 text-gray-400 hover:text-white transition-colors group"
              aria-label="Reply to comment"
            >
              <FaReply className="w-4 h-4" />
              <span className="text-xs">Reply</span>
            </button>
          </div>

          {/* View Replies Button */}
          {hasReplies && (
            <button
              onClick={handleToggleReplies}
              className="flex items-center gap-2 mt-2 text-gray-400 hover:text-white transition-colors text-sm"
            >
              <FaChevronDown
                className={`w-3 h-3 transition-transform ${
                  isRepliesExpanded ? "rotate-180" : ""
                }`}
              />
              <span>
                {isRepliesExpanded ? "Hide" : "View"} {comment.repliesCount}{" "}
                {comment.repliesCount === 1 ? "reply" : "replies"}
              </span>
            </button>
          )}
        </div>

        {/* Kebab Menu */}
        <div className="flex-shrink-0">
          <KebabMenu options={menuOptions} />
        </div>
      </div>

      {/* Replies Section */}
      {isRepliesExpanded && repliesConnectionId && (
        <div className="mt-2 space-y-2">
          {typedRepliesData.replies?.edges?.map(
            (
              edge:
                | {
                    readonly node:
                      | {
                          readonly id: string;
                          readonly " $fragmentSpreads": FragmentRefs<"CommentCardFragment">;
                        }
                      | null
                      | undefined;
                  }
                | null
                | undefined
            ) =>
              edge?.node && (
                <ReplyCard
                  key={edge.node.id}
                  commentFragmentKey={edge.node}
                  onReply={onReply}
                  currentUserId={currentUserId}
                  postId={postId}
                  postConnectionId={postConnectionId}
                  parentConnectionId={repliesConnectionId}
                />
              )
          )}

          {/* Load More Replies (older replies) */}
          {hasNext && (
            <button
              onClick={() => loadNext(10)}
              disabled={isLoadingNext}
              className="ml-12 px-4 py-1.5 text-sm bg-gray-700 hover:bg-gray-600 disabled:bg-gray-800 disabled:cursor-not-allowed rounded-lg text-white transition-colors"
            >
              {isLoadingNext ? "Loading..." : "Load More Replies"}
            </button>
          )}
        </div>
      )}
    </div>
  );
};

// Wrapper component for top-level comments only
// Note: postConnectionId is required for top-level comments
export const CommentCard = (props: CommentCardProps) => {
  // CommentCard should only be used for top-level comments (depth === 0)
  // Replies are rendered directly as ReplyCard by TopLevelCommentCard
  return <TopLevelCommentCard {...props} />;
};
