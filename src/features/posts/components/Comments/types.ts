import { type CommentsFragment$key } from "./__generated__/CommentsFragment.graphql";
import { type CommentCardFragment$key } from "./CommentCard/__generated__/CommentCardFragment.graphql";

// Props interfaces for Relay integration
export interface CommentsProps {
  postFragmentKey: CommentsFragment$key;
  onClose: () => void;
}

export interface CommentCardProps {
  commentFragmentKey: CommentCardFragment$key;
  onReply: (
    parentCommentId: string,
    connectionId: string,
    userName: string
  ) => void;
  currentUserId: string;
  postId: string;
  postConnectionId: string;
  forceExpand?: boolean; // Force expand replies section (for newly created replies)
  onExpandHandled?: () => void; // Callback when forceExpand has been processed
}

export interface CreateCommentProps {
  postId: string;
  connectionId?: string; // For Relay @prependEdge (top-level comments)
  parentCommentId?: string;
  parentConnectionId?: string; // For Relay @prependEdge (replies)
  replyingToUserName?: string;
  onCancelReply: () => void;
  onSubmitSuccess?: (newCommentId: string) => void;
}

export interface CommentUser {
  id: string;
  name: string;
  surname: string;
}
