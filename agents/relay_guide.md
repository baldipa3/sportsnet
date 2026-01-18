# Relay Mutations & Connection Updates - Quick Reference

> This document is a compact reference for Claude Code agents working with Relay mutations and connection updates. Use this instead of searching the web.

## Table of Contents

1. [Declarative Directives](#declarative-directives)
2. [Getting Connection IDs](#getting-connection-ids)
3. [Mutation Patterns](#mutation-patterns)
4. [Optimistic Updates](#optimistic-updates)
5. [Manual Store Updates](#manual-store-updates)
6. [ConnectionHandler API](#connectionhandler-api)
7. [Common Patterns](#common-patterns)

---

## Declarative Directives

### @appendEdge - Add to END of connection

```graphql
mutation CreateCommentMutation(
  $connections: [ID!]!
  $content: String!
  $postId: ID!
) {
  createComment(content: $content, postId: $postId) {
    commentEdge @appendEdge(connections: $connections) {
      cursor
      node {
        id
        content
        ...CommentItemFragment
      }
    }
  }
}
```

### @prependEdge - Add to BEGINNING of connection

```graphql
mutation CreateCommentMutation(
  $connections: [ID!]!
  $input: CreateCommentInput!
) {
  createComment(input: $input) {
    commentEdge @prependEdge(connections: $connections) {
      cursor
      node {
        id
        content
      }
    }
  }
}
```

### @deleteEdge - Remove from connection

```graphql
mutation DeleteCommentMutation($connections: [ID!]!, $id: ID!) {
  deleteComment(id: $id) {
    id @deleteEdge(connections: $connections)
  }
}
```

### @deleteRecord - Remove record entirely from store

```graphql
mutation DeleteCommentMutation($id: ID!) {
  deleteComment(id: $id) {
    id @deleteRecord
  }
}
```

**Key Points:**

- `$connections` is CLIENT-ONLY - not sent to server
- Always include `cursor` field in edge selections
- Directives work with both real and optimistic responses

---

## Getting Connection IDs

### Method 1: Using \_\_id field (Recommended)

```graphql
fragment PostCommentsFragment on Post
@refetchable(queryName: "PostCommentsPaginationQuery")
@argumentDefinitions(
  count: { type: "Int", defaultValue: 10 }
  cursor: { type: "String" }
) {
  id
  comments(first: $count, after: $cursor)
    @connection(key: "PostCommentsFragment_comments") {
    __id # <-- This gives connection ID
    edges {
      node {
        id
        ...CommentItemFragment
      }
    }
    pageInfo {
      hasNextPage
      endCursor
    }
  }
}
```

In component:

```typescript
const connectionId = data.comments?.__id;
```

### Method 2: Using ConnectionHandler.getConnectionID

```typescript
import { ConnectionHandler } from "relay-runtime";

const connectionId = ConnectionHandler.getConnectionID(
  parentRecordId, // e.g., post.id
  "PostCommentsFragment_comments" // Connection key
);

// With filters (must match exactly):
const connectionId = ConnectionHandler.getConnectionID(
  parentRecordId,
  "ConnectionKey",
  { orderBy: "DATE", status: "ACTIVE" }
);
```

---

## Mutation Patterns

### Pattern 1: Adding item to connection

```typescript
import { useMutation, ConnectionHandler } from "react-relay";

function useCreateComment(postId: string, connectionId: string) {
  const [commit, isInFlight] = useMutation(CreateCommentMutation);

  const createComment = (content: string) => {
    commit({
      variables: {
        content,
        postId,
        connections: [connectionId],
      },
      onCompleted: (response) => {
        console.log("Comment created:", response);
      },
      onError: (error) => {
        console.error("Failed:", error);
      },
    });
  };

  return { createComment, isInFlight };
}
```

### Pattern 2: Deleting item from connection

```typescript
function useDeleteComment(connectionId: string) {
  const [commit] = useMutation(DeleteCommentMutation);

  const deleteComment = (commentId: string) => {
    commit({
      variables: {
        id: commentId,
        connections: [connectionId],
      },
      optimisticUpdater: (store) => {
        store.delete(commentId);
      },
    });
  };

  return { deleteComment };
}
```

### Pattern 3: Updating counts after mutation

```graphql
mutation CreateCommentMutation(
  $connections: [ID!]!
  $content: String!
  $postId: ID!
) {
  createComment(content: $content, postId: $postId) {
    # Return parent with updated count - Relay auto-merges
    post {
      id
      commentsCount
    }
    commentEdge @appendEdge(connections: $connections) {
      cursor
      node {
        id
        content
      }
    }
  }
}
```

---

## Optimistic Updates

### Simple field updates - Use optimisticResponse

```typescript
commit({
  variables: { postId, doesLike: true },
  optimisticResponse: {
    likePost: {
      post: {
        id: postId,
        likedByCurrentUser: true,
        postLikesCount: currentCount + 1,
      },
    },
  },
});
```

### Connection updates - Use optimisticUpdater

```typescript
commit({
  variables: { content, postId, connections: [connectionId] },
  optimisticUpdater: (store) => {
    // 1. Create optimistic record
    const id = `client:newComment:${Date.now()}`;
    const newComment = store.create(id, "Comment");
    newComment.setValue(id, "id");
    newComment.setValue(content, "content");
    newComment.setValue(new Date().toISOString(), "insertedAt");

    // 2. Link related records
    const userRecord = store.getRoot().getLinkedRecord("currentUser");
    if (userRecord) {
      newComment.setLinkedRecord(userRecord, "user");
    }

    // 3. Create edge and add to connection
    const connection = store.get(connectionId);
    if (connection) {
      const newEdge = ConnectionHandler.createEdge(
        store,
        connection,
        newComment,
        "CommentEdge"
      );
      ConnectionHandler.insertEdgeAfter(connection, newEdge);
    }
  },
});
```

### Execution Order

1. `optimisticResponse` applied immediately
2. `optimisticUpdater` runs
3. Declarative directives process optimistic response
4. Server request sent
5. On response: optimistic changes rolled back
6. Server response merged
7. `updater` function runs
8. Declarative directives process server response

---

## Manual Store Updates

### Using updater function

```typescript
commit({
  variables: { content, postId },
  updater: (store) => {
    // Get mutation payload
    const payload = store.getRootField("createComment");
    if (!payload) return;

    const serverEdge = payload.getLinkedRecord("commentEdge");

    // Get parent record and connection
    const postRecord = store.get(postId);
    if (!postRecord) return;

    const connection = ConnectionHandler.getConnection(
      postRecord,
      "PostCommentsFragment_comments"
    );
    if (!connection) return;

    // Build and insert edge
    const newEdge = ConnectionHandler.buildConnectionEdge(
      store,
      connection,
      serverEdge
    );

    // Insert at END
    ConnectionHandler.insertEdgeAfter(connection, newEdge);

    // OR insert at BEGINNING
    // ConnectionHandler.insertEdgeBefore(connection, newEdge);
  },
});
```

### Store API Reference

**RecordSourceSelectorProxy (store):**

```typescript
store.get(id); // Get record by ID
store.getRoot(); // Get root record
store.getRootField(fieldName); // Get field from mutation response
store.create(id, typeName); // Create new record
store.delete(id); // Delete record
store.invalidateStore(); // Mark all data stale
```

**RecordProxy (record):**

```typescript
record.getValue(name); // Get scalar value
record.setValue(value, name); // Set scalar value
record.getLinkedRecord(name); // Get related record
record.setLinkedRecord(record, name); // Set related record
record.getLinkedRecords(name); // Get array of records
record.setLinkedRecords(records, name); // Set array of records
record.invalidateRecord(); // Mark record stale
```

---

## ConnectionHandler API

```typescript
import { ConnectionHandler } from 'relay-runtime';

// Get connection from record
const connection = ConnectionHandler.getConnection(
  parentRecord,
  connectionKey,
  filters?  // Optional: { orderBy: 'DATE' }
);

// Get connection ID (string)
const connectionId = ConnectionHandler.getConnectionID(
  parentRecordId,
  connectionKey,
  filters?
);

// Create new edge
const edge = ConnectionHandler.createEdge(
  store,
  connection,
  nodeRecord,
  'EdgeTypeName'
);

// Insert edge at END
ConnectionHandler.insertEdgeAfter(connection, edge);
ConnectionHandler.insertEdgeAfter(connection, edge, cursorAfter);

// Insert edge at BEGINNING
ConnectionHandler.insertEdgeBefore(connection, edge);
ConnectionHandler.insertEdgeBefore(connection, edge, cursorBefore);

// Delete node from connection
ConnectionHandler.deleteNode(connection, nodeId);

// Build edge from server response
const edge = ConnectionHandler.buildConnectionEdge(
  store,
  connection,
  serverEdgeRecord
);
```

---

## Common Patterns

### Pattern: Nested connections (replies to comments)

```graphql
fragment CommentItemWithRepliesFragment on Comment
@refetchable(queryName: "CommentRepliesPaginationQuery")
@argumentDefinitions(
  count: { type: "Int", defaultValue: 10 }
  cursor: { type: "String" }
) {
  id
  content
  repliesCount
  replies(first: $count, after: $cursor)
    @connection(key: "CommentItemWithRepliesFragment_replies") {
    __id
    edges {
      node {
        id
        content
        ...CommentItemFragment
      }
    }
    pageInfo {
      hasNextPage
      endCursor
    }
  }
}
```

### Pattern: Multiple connections for same mutation

```typescript
// When adding a reply, update BOTH parent comment replies AND post comment count
commit({
  variables: {
    content,
    postId,
    parentCommentId,
    connections: [repliesConnectionId], // For @appendEdge
  },
  updater: (store) => {
    // Update parent comment's repliesCount
    const parentComment = store.get(parentCommentId);
    if (parentComment) {
      const count = (parentComment.getValue("repliesCount") as number) || 0;
      parentComment.setValue(count + 1, "repliesCount");
    }

    // Update post's commentsCount
    const post = store.get(postId);
    if (post) {
      const count = (post.getValue("commentsCount") as number) || 0;
      post.setValue(count + 1, "commentsCount");
    }
  },
});
```

### Pattern: Deletion with count update

```typescript
commit({
  variables: {
    id: commentId,
    connections: [connectionId],
  },
  optimisticUpdater: (store) => {
    // Remove from connection
    const connection = store.get(connectionId);
    if (connection) {
      ConnectionHandler.deleteNode(connection, commentId);
    }

    // Update parent count
    const post = store.get(postId);
    if (post) {
      const count = (post.getValue("commentsCount") as number) || 0;
      post.setValue(Math.max(0, count - 1), "commentsCount");
    }
  },
});
```

---

## Troubleshooting

### Issue: New item doesn't appear

- Check connection ID matches exactly (key + filters)
- Verify `@connection` directive has unique key
- Ensure `$connections` variable is passed correctly
- Check edge type name matches schema

### Issue: Count doesn't update

- Include parent with count field in mutation response
- Or manually update in `updater` function
- Backend must return updated count

### Issue: Optimistic update doesn't work

- Ensure optimistic record has all required fields
- Check record type name matches schema exactly
- Verify connection exists before inserting

### Issue: Deletion doesn't remove item

- Use both `@deleteEdge` for connection AND update count manually
- OR use `optimisticUpdater` with `ConnectionHandler.deleteNode`

---

## Quick Decision Guide

| Scenario                      | Solution                                                  |
| ----------------------------- | --------------------------------------------------------- |
| Add item to END of list       | `@appendEdge(connections: $connections)`                  |
| Add item to BEGINNING of list | `@prependEdge(connections: $connections)`                 |
| Remove item from list         | `@deleteEdge(connections: $connections)`                  |
| Update a count field          | Return parent with count in mutation response             |
| Immediate UI feedback         | Use `optimisticUpdater` or `optimisticResponse`           |
| Complex store updates         | Use `updater` function with ConnectionHandler             |
| Get connection ID             | Use `__id` field or `ConnectionHandler.getConnectionID()` |

---

_Last updated: January 2026_
_Source: Official Relay Documentation (relay.dev)_
