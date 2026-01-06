import { type Comment, type CommentUser } from "./types";

// Mock users
export const MOCK_USERS: CommentUser[] = [
  {
    id: "user-1",
    name: "Alex",
    surname: "Johnson",
    avatarUrl: "https://bit.ly/dan-abramov",
  },
  {
    id: "user-2",
    name: "Maria",
    surname: "Garcia",
    avatarUrl: "https://bit.ly/kent-c-dodds",
  },
  {
    id: "user-3",
    name: "James",
    surname: "Smith",
    avatarUrl: "https://bit.ly/ryan-florence",
  },
  {
    id: "user-4",
    name: "Sarah",
    surname: "Lee",
    avatarUrl: "https://bit.ly/prosper-baba",
  },
];

// Helper to generate random past timestamp
const getRandomPastTime = (hoursAgo: number): string => {
  const now = new Date();
  const past = new Date(now.getTime() - hoursAgo * 60 * 60 * 1000);
  return past.toISOString();
};

// Mock comments with replies
export const getMockComments = (currentUserId: string): Comment[] => [
  {
    id: "comment-1",
    content: "Amazing goal! That technique was perfect!",
    createdAt: getRandomPastTime(2),
    user: MOCK_USERS[0],
    likesCount: 24,
    isLikedByCurrentUser: true,
    replies: [
      {
        id: "comment-1-reply-1",
        content: "@Alex Johnson Thanks! Been practicing that move for weeks",
        createdAt: getRandomPastTime(1.5),
        user: {
          id: currentUserId,
          name: "Current",
          surname: "User",
        },
        likesCount: 5,
        isLikedByCurrentUser: false,
        replyToCommentId: "comment-1",
        replyToUserId: "user-1",
        replies: [],
      },
      {
        id: "comment-1-reply-2",
        content: "@Alex Johnson Agreed! Best goal I've seen this week",
        createdAt: getRandomPastTime(1),
        user: MOCK_USERS[1],
        likesCount: 12,
        isLikedByCurrentUser: true,
        replyToCommentId: "comment-1",
        replyToUserId: "user-1",
        replies: [],
      },
    ],
  },
  {
    id: "comment-2",
    content: "What cleats are you wearing? They look great",
    createdAt: getRandomPastTime(5),
    user: MOCK_USERS[2],
    likesCount: 7,
    isLikedByCurrentUser: false,
    replies: [],
  },
  {
    id: "comment-3",
    content: "The footwork here is incredible. Teaching this at my next practice session!",
    createdAt: getRandomPastTime(8),
    user: MOCK_USERS[3],
    likesCount: 45,
    isLikedByCurrentUser: true,
    replies: [
      {
        id: "comment-3-reply-1",
        content: "@Sarah Lee Let me know how it goes!",
        createdAt: getRandomPastTime(7.5),
        user: {
          id: currentUserId,
          name: "Current",
          surname: "User",
        },
        likesCount: 8,
        isLikedByCurrentUser: false,
        replyToCommentId: "comment-3",
        replyToUserId: "user-4",
        replies: [],
      },
    ],
  },
  {
    id: "comment-4",
    content: "Anyone know what formation they're running here?",
    createdAt: getRandomPastTime(12),
    user: MOCK_USERS[1],
    likesCount: 3,
    isLikedByCurrentUser: false,
    replies: [],
  },
  {
    id: "comment-5",
    content: "This is absolutely insane! How many hours of practice did it take?",
    createdAt: getRandomPastTime(15),
    user: MOCK_USERS[0],
    likesCount: 18,
    isLikedByCurrentUser: false,
    replies: [],
  },
];

// Helper to generate new comment ID
let commentIdCounter = 100;
export const generateCommentId = (): string => {
  return `comment-${commentIdCounter++}`;
};
