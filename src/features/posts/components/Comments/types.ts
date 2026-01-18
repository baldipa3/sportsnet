import { type CommentsFragment$key } from "./__generated__/CommentsFragment.graphql";
import { type CommentCardFragment$key } from "./CommentCard/__generated__/CommentCardFragment.graphql";

// Props interfaces for Relay integration
export interface CommentsProps {
  postFragmentKey: CommentsFragment$key;
  onClose: () => void;
}

export interface CommentCardProps {
  commentFragmentKey: CommentCardFragment$key;
  depth: number; // Not used internally but kept for interface consistency
  onReply: (
    parentCommentId: string,
    connectionId: string,
    userName: string
  ) => void;
  currentUserId: string;
  postId: string; // Not used internally but required for child components
  postConnectionId: string;
}

export interface CreateCommentProps {
  postId: string;
  connectionId?: string; // For Relay @appendEdge (top-level comments)
  parentCommentId?: string;
  parentConnectionId?: string; // For Relay @appendEdge (replies)
  replyingToUserName?: string;
  onCancelReply: () => void;
  onSubmitSuccess?: () => void;
}

export interface CommentUser {
  id: string;
  name: string;
  surname: string;
}
