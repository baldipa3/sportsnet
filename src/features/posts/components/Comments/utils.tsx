import { type CommentUser } from "./types";
import React from "react";

/**
 * Format timestamp to relative time (Instagram-style)
 * Examples: "Just now", "5m", "2h", "1d", "3w", "Dec 24"
 */
export const formatRelativeTime = (isoTimestamp: string): string => {
  const now = new Date();
  const past = new Date(isoTimestamp);
  const secondsAgo = Math.floor((now.getTime() - past.getTime()) / 1000);

  if (secondsAgo < 60) return "Just now";

  const minutesAgo = Math.floor(secondsAgo / 60);
  if (minutesAgo < 60) return `${minutesAgo}m`;

  const hoursAgo = Math.floor(minutesAgo / 60);
  if (hoursAgo < 24) return `${hoursAgo}h`;

  const daysAgo = Math.floor(hoursAgo / 24);
  if (daysAgo < 7) return `${daysAgo}d`;

  const weeksAgo = Math.floor(daysAgo / 7);
  if (weeksAgo < 4) return `${weeksAgo}w`;

  // Older than 4 weeks: show date
  const options: Intl.DateTimeFormatOptions = { month: "short", day: "numeric" };
  return past.toLocaleDateString("en-US", options);
};

/**
 * Parse @ mentions from comment text
 * Returns array of usernames mentioned
 */
export const extractMentions = (text: string): string[] => {
  const mentionRegex = /@([\w]+(?:\s+[\w]+)*)/g;
  const matches = text.matchAll(mentionRegex);
  return Array.from(matches, (match) => match[1]);
};

/**
 * Highlight @ mentions in comment text
 * Returns JSX with styled mentions
 */
export const highlightMentions = (text: string): React.ReactNode => {
  const parts = text.split(/(@[\w]+(?:\s+[\w]+)?)/g);

  return parts.map((part, index) => {
    if (part.startsWith("@")) {
      return (
        <span key={index} className="text-green-400 font-semibold">
          {part}
        </span>
      );
    }
    return part;
  });
};

/**
 * Get user's display name
 */
export const getUserDisplayName = (user: CommentUser): string => {
  return `${user.name} ${user.surname}`;
};

/**
 * Build reply prefix for input
 */
export const buildReplyPrefix = (user: CommentUser): string => {
  return `@${getUserDisplayName(user)} `;
};

/**
 * Validate comment content
 */
export const validateComment = (content: string): string | null => {
  const trimmed = content.trim();

  if (!trimmed) {
    return "Comment cannot be empty";
  }

  if (trimmed.length > 500) {
    return "Comment must be 500 characters or less";
  }

  return null; // Valid
};

/**
 * Scroll to a specific comment by ID with highlight effect
 * Uses data-comment-id attribute for targeting
 */
export const scrollToComment = (
  commentId: string,
  containerRef: React.RefObject<HTMLDivElement | null>
): void => {
  // Wait for DOM update after React render
  requestAnimationFrame(() => {
    const container = containerRef.current;
    if (!container) return;

    const element = container.querySelector(
      `[data-comment-id="${commentId}"]`
    ) as HTMLElement | null;

    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });

      // Add highlight effect
      element.classList.add("comment-highlight-new");
      setTimeout(() => {
        element.classList.remove("comment-highlight-new");
      }, 2000);
    }
  });
};
