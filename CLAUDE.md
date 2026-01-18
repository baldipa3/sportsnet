## Project Overview

**Project Name:** Sportsnet

**Description:** Sports social media for users to posts moments trough pictures, videos or just content. Allow them to make teams, events and connect with other peoples of their city.

**Primary Purpose:** Connect people on the same city trough sports.

## Tech Stack

- **Languages:** TypeScript
- **Frontend Framework:** React (functional components with hooks)
- **Data Layer:** GraphQL with Relay (cursor-based pagination)
- **Build Tools:** Vite
- **Testing:** Vitest + React Testing Library
- **Infrastructure:** Docker
- **Styling:** [TailwindCSS/CSS Modules/Styled Components - check codebase]

## Project Structure

```
project-root/
├── src/                    # Source code
│   ├── components/         # Reusable UI components (shared across features)
│   │   └── layout/         # Layout components (Navbar, Sidebar, etc.)
│   ├── features/           # Feature-based modules
│   │   ├── posts/          # Post-related functionality
│   │   │   └── components/ # Post-specific components
│   │   │       └── PostCard/
│   │   │           ├── PostCard.tsx
│   │   │           ├── PostCard.graphql
│   │   │           ├── __generated__/  # Auto-generated GraphQL types
│   │   │           └── index.ts
│   │   └── contacts/       # Contact/user functionality
│   ├── pages/              # Page-level components (routes)
│   │   ├── Sports/         # Sports feed page
│   │   └── __generated__/  # Page-level query types
│   ├── services/           # Business logic and API setup
│   ├── test/               # Test configuration and utilities
│   ├── utils/              # Shared utilities and helpers
│   └── schema.graphql      # GraphQL schema (reference for available types)
├── Makefile               # Development commands
└── CLAUDE.md              # This file - AI assistant context
```

**Key Patterns:**

- `__generated__/` folders contain auto-generated TypeScript types from GraphQL
- Components define their data needs via co-located `.graphql` files
- Use `index.ts` (not `index.tsx`) for cleaner imports
- Feature folders are self-contained with their own components

## Architecture Patterns

**Design Patterns Used:**

- index.ts to load main component. Do not use index.tsx to avoid index hell
- Feature-based architecture: Features are self-contained modules in `src/features/`
- Component composition: Reusable components in `src/components/`, feature-specific in `src/features/*/components/`

**API Architecture:** GraphQL with Relay

- **GraphQL Server:** Backend exposes a GraphQL API with Relay specifications
- **Relay Cursor Pagination:** All paginated lists use Relay connection pattern
  - Connections return `{ pageInfo, edges }` structure
  - `edges` contain `{ node, cursor }` for each item
  - `pageInfo` includes `hasNextPage`, `hasPreviousPage`, `startCursor`, `endCursor`
  - Pagination arguments: `after`, `first` (forward pagination), `before`, `last` (backward pagination)
  - Example types: `PostConnection`, `CommentConnection`
- **Code Generation:** GraphQL queries/mutations/fragments generate TypeScript types in `__generated__` folders
- **Node Interface:** All main entities implement the `Node` interface with global `id` field
- **Optimistic Updates:** Use Relay patterns for immediate UI feedback on mutations

**Authentication:** Token-based authentication

- JWT tokens for API authentication
- Current user fetched via `currentUser` query

## Coding Standards

### Style Guide

- **Formatting:** [e.g., Prettier with default settings]
- **Linting:** ESLint
- **Naming Conventions:**
  - Files: PascalCase for components (MyComponent.tsx), camelCase for utilities
  - Variables: camelCase
  - Constants: SCREAMING_SNAKE_CASE
  - Components: PascalCase
  - Functions: camelCase, verb-first naming (handleClick, fetchData)

### Best Practices

- Use TypeScript strict mode (`"strict": true` in tsconfig.json)
- Prefer functional components with hooks over class components
- Use `interface` for component props, `type` for unions and complex types
- Implement proper error boundaries for component error handling
- Extract reusable logic into custom hooks (prefix with `use`)
- Keep components focused and single-responsibility (under 200-250 lines)
- Use composition over prop drilling (Context API or state management)
- Prefer named exports over default exports for better refactoring
- Implement lazy loading for routes and heavy components (`React.lazy`)
- Use `const` by default, `let` only when reassignment is needed
- Avoid inline function definitions in JSX that recreate on every render
- Use `useCallback` and `useMemo` judiciously (only for expensive operations)
- Leverage Vite's fast refresh - keep state local when possible
- Type event handlers explicitly (e.g., `React.MouseEvent<HTMLButtonElement>`)
- Use environment variables with `import.meta.env` (Vite convention)
- Validate props with TypeScript, not PropTypes
- Avoid `any` type - use `unknown` and type guards when type is uncertain
- Keep side effects in `useEffect`, not in render logic
- Clean up subscriptions and timers in `useEffect` return functions

## Core Domain Concepts

### Main Entities

- **User:** Registered users with name, email, city, and default sport
- **Post:** User-generated content with caption, optional media, likes, and comments
- **Comment:** Nested comments on posts (supports replies via `parentCommentId`)
- **Sport:** Sports categories (e.g., Basketball, Soccer) identified by name and slug
- **City:** Geographic locations within countries, identified by name and slug
- **Media:** Associated media files (images/videos) for posts
- **SportCityFeed:** Feed aggregating posts for a specific sport/city combination

### Key Features

- **Social Posting:** Users create posts with captions and media for specific sports/cities
- **Engagement:** Like/unlike posts, comment system with nested replies
- **Location-Based:** Content organized by city and sport combinations
- **User Onboarding:** Users select default city and sport during registration

## GraphQL Patterns

### Working with Relay Connections

**Always use cursor-based pagination for lists:**

```typescript
// Query with pagination
query PostsQuery($after: String, $first: Int!) {
  postsByCityAndSport(citySlug: "toronto", sportSlug: "basketball") {
    posts(after: $after, first: $first) {
      pageInfo {
        hasNextPage
        endCursor
      }
      edges {
        node {
          id
          caption
          # ... other fields
        }
        cursor
      }
    }
  }
}
```

**Loading more items:**

- Use `pageInfo.endCursor` as the `after` argument for next page
- Check `pageInfo.hasNextPage` before fetching more
- Default page size: typically 10-20 items per request

### Fragments and Code Generation

- **GraphQL Files:** Create `.graphql` files co-located with components
- **Generated Types:** Automatically generated in `__generated__` folders
- **Fragment Naming:** Use format `ComponentName_fragment` (e.g., `PostCard_post`)
- **Fragment Pattern:** Each component should define its own data requirements

```typescript
// PostCard.graphql
fragment PostCard_post on Post {
  id
  caption
  postLikesCount
  likedByCurrentUser
  insertedAt
  user {
    id
    name
    surname
  }
  media {
    id
    url
    mediaType
  }
}
```

### Mutations

**Mutation Patterns:**

- Mutations return payload types (e.g., `CreatePostPayload`, `LikePostPayload`)
- Use optimistic updates for better UX (likes, follows, etc.)
- Handle media uploads via `Upload` scalar type
- Update cache after mutations to reflect changes immediately

**Common Mutations:**

- `createPost(caption, sportId, cityId, media)` - Create new post
- `likePost(id, doesLike)` - Toggle post like
- `deletePost(id)` - Soft delete post
- `editPost(id, caption)` - Edit post caption
- `createComment(content, postId, parentCommentId)` - Add comment
- `completeUserOnboarding(cityId, defaultSportId)` - Set user preferences

### Node Pattern

- All main entities implement `Node` interface with global `id`
- Use `node(id: ID!)` query to fetch any entity by global ID
- Global IDs are opaque strings (base64 encoded type + internal ID)

## Development Workflow

### Getting Started

Use Makefile commands

## Testing Strategy

**Testing Framework:** Vitest + React Testing Library

**Testing Levels:**

- **Unit Tests:** Vitest for utilities, hooks, and pure functions
- **Component Tests:** React Testing Library for component behavior and user interactions
- **Integration Tests:** Testing Library for multi-component workflows and data flows
- **E2E Tests:** [e.g., Playwright or Cypress for critical user journeys]

**Coverage Requirements:**

- Minimum 80% coverage for utilities and business logic
- Focus on testing behavior, not implementation details
- All custom hooks must have dedicated tests

**Test File Organization:**

- Co-located with source files: `Button.tsx` → `Button.test.tsx`
- Or centralized: `src/__tests__/` directory
- Test utilities and mocks in `src/test/` or `src/__mocks__/`

**Testing Principles:**

- Query by accessibility attributes (getByRole, getByLabelText) over test IDs
- Test user behavior, not internal state or implementation
- Use `userEvent` over `fireEvent` for realistic interactions
- Mock external dependencies (API calls, third-party libraries)
- Avoid snapshot tests for components (prefer explicit assertions)

**Common Patterns:**

```typescript
// Setup render utility with providers
import { render } from "@/test/utils"; // Wraps with Router, Context, etc.

// Test user interactions
import { userEvent } from "@testing-library/user-event";

test("handles button click", async () => {
  const user = userEvent.setup();
  render(<MyComponent />);
  await user.click(screen.getByRole("button", { name: /submit/i }));
  expect(screen.getByText(/success/i)).toBeInTheDocument();
});
```

**Running Tests:**

Use Makefile command

**What to Test:**

- ✅ User interactions and component behavior
- ✅ Conditional rendering logic
- ✅ Form validation and submission
- ✅ Custom hooks with various inputs
- ✅ Error states and edge cases
- ✅ Utility functions with different inputs

**What NOT to Test:**

- ❌ Third-party library internals
- ❌ Styling and CSS (use visual regression if needed)
- ❌ Implementation details (internal state, function names)
- ❌ Trivial components (pure presentational with no logic)

## Environment Variables

| Variable       | Description          | Required | Default |
| -------------- | -------------------- | -------- | ------- |
| `VITE_API_URL` | Backend API endpoint | Yes      | -       |

### Performance Optimization

- Use React.memo for expensive components
- Implement infinite scrolling for long lists
- Lazy load routes and heavy components

## AI Assistant Guidelines

### When Making Changes

- Always maintain TypeScript strict type safety
- Follow existing patterns in the codebase
- Preserve all existing functionality unless explicitly asked to change it
- Add comments for complex logic
- Update tests when changing functionality
- **Always check for `__generated__` folders** to understand existing GraphQL types
- **Use existing fragments** when querying data already defined elsewhere
- **Respect Relay connection patterns** - never try to fetch lists without proper pagination

### Working with GraphQL

**Before creating new queries/mutations:**

1. Check `src/schema.graphql` for available fields and types
2. Look for existing fragments in related components
3. Review `__generated__` files to understand current data requirements
4. Follow the fragment collocation pattern (component + GraphQL file + generated types)

**When adding pagination:**

- ALWAYS use Relay connection pattern with `edges`, `node`, `pageInfo`
- Include `after` and `first` variables for forward pagination
- Track `endCursor` and `hasNextPage` in component state
- Implement "Load More" button or infinite scroll pattern

**When creating mutations:**

- Define optimistic response when possible (likes, follows, simple updates)
- Update Relay store/cache after successful mutation
- Handle error states appropriately
- Return the full updated entity in payload for cache updates

### Common Patterns to Follow

**Component + GraphQL File Pattern:**

```
src/features/posts/components/PostCard/
├── PostCard.tsx           # Component implementation
├── PostCard.graphql       # Fragment/query definitions
├── __generated__/         # Auto-generated TypeScript types
│   ├── PostCardFragment.graphql.ts
│   └── PostCardLikeMutation.graphql.ts
└── index.ts              # Export (not index.tsx!)
```

**Reading Generated Types:**

```typescript
// Import generated types
import type { PostCard_post$key } from "./__generated__/PostCardFragment.graphql";

// Use in component props
interface PostCardProps {
  post: PostCard_post$key;
}
```

**File Organization:**

- Features live in `src/features/[feature-name]/`
- Each feature has its own `components/` folder for feature-specific components
- Shared components go in `src/components/`
- Page components go in `src/pages/`
- NEVER create `index.tsx` files - use `index.ts` to avoid "index hell"

### Things to Avoid

- Don't remove existing error handling
- Don't introduce unnecessary dependencies
- Don't modify configuration files without explicit instruction
- Don't use `any` type in TypeScript
- **Don't create array-based pagination** - always use Relay connections
- **Don't fetch entire lists** - always paginate with `first` argument
- **Don't modify `__generated__` files** - these are auto-generated
- **Don't create fragments that duplicate existing ones** - reuse when possible
- **Don't skip optimistic updates** for user actions (likes, follows, etc.)
- **Don't forget to check schema** before assuming field availability

### Project-Specific Notes

- **Media uploads:** Use the `Upload` scalar type for file uploads in mutations
- **Soft deletes:** Posts and comments use soft delete (marked as deleted, not removed)
- **Global IDs:** All entities use global IDs (Node interface) - these are opaque base64 strings
- **City/Sport slugs:** Use URL-friendly slugs for routing (e.g., `toronto`, `basketball`)
- **Current user:** Available via `currentUser` query from root
- **Nested comments:** Comments can have replies via `parentCommentId` field

**Last Updated:** January 17, 2026
**Maintained By:** Pablo Baldini
