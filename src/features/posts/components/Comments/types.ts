// User interface for comment authors
export interface CommentUser {
  id: string;
  name: string;
  surname: string;
  avatarUrl?: string; // Optional, fallback to /assets/avatar.svg
}

// Main comment interface
export interface Comment {
  id: string;
  content: string;
  createdAt: string; // ISO 8601 timestamp
  user: CommentUser;
  likesCount: number;
  isLikedByCurrentUser: boolean;

  // Reply tracking
  replyToCommentId?: string; // Parent comment ID if this is a reply
  replyToUserId?: string; // User being replied to (for @ mention)
  replies: Comment[]; // Nested replies (max 1 level)

  // For future relay integration
  __typename?: "Comment";
}

// Props interfaces
export interface CommentsProps {
  postId: string;
  onClose: () => void;
}

export interface CommentListProps {
  comments: Comment[];
  onReply: (comment: Comment) => void;
  onLike: (commentId: string) => void;
  onDelete: (commentId: string) => void;
  currentUserId: string;
}

export interface CommentItemProps {
  comment: Comment;
  depth: number;
  onReply: (comment: Comment) => void;
  onLike: (commentId: string) => void;
  onDelete: (commentId: string) => void;
  currentUserId: string;
}

export interface CommentInputProps {
  onSubmit: (content: string) => void;
  replyingTo?: Comment;
  onCancelReply: () => void;
  isSubmitting: boolean;
}

// For future relay pagination
export interface CommentEdge {
  cursor: string;
  node: Comment;
}

export interface CommentConnection {
  edges: CommentEdge[];
  pageInfo: {
    hasNextPage: boolean;
    endCursor: string;
  };
}
