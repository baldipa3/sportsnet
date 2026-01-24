/**
 * @generated SignedSource<<6074b9c2fcca0543c325770728068451>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type CreatePostMutation$variables = {
  caption: string;
  cityId: string;
  connections: ReadonlyArray<string>;
  media?: ReadonlyArray<any> | null | undefined;
  sportId: string;
};
export type CreatePostMutation$data = {
  readonly createPost: {
    readonly postEdge: {
      readonly node: {
        readonly " $fragmentSpreads": FragmentRefs<"PostCardFragment">;
      } | null | undefined;
    };
  } | null | undefined;
};
export type CreatePostMutation = {
  response: CreatePostMutation$data;
  variables: CreatePostMutation$variables;
};

const node: ConcreteRequest = (function(){
var v0 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "caption"
},
v1 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "cityId"
},
v2 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "connections"
},
v3 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "media"
},
v4 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "sportId"
},
v5 = [
  {
    "kind": "Variable",
    "name": "caption",
    "variableName": "caption"
  },
  {
    "kind": "Variable",
    "name": "cityId",
    "variableName": "cityId"
  },
  {
    "kind": "Variable",
    "name": "media",
    "variableName": "media"
  },
  {
    "kind": "Variable",
    "name": "sportId",
    "variableName": "sportId"
  }
],
v6 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v7 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "insertedAt",
  "storageKey": null
},
v8 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "wasEdited",
  "storageKey": null
},
v9 = [
  {
    "kind": "Literal",
    "name": "first",
    "value": 20
  }
],
v10 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "content",
  "storageKey": null
},
v11 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "commentLikesCount",
  "storageKey": null
},
v12 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "repliesCount",
  "storageKey": null
},
v13 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "parentCommentId",
  "storageKey": null
},
v14 = {
  "alias": null,
  "args": null,
  "concreteType": "User",
  "kind": "LinkedField",
  "name": "user",
  "plural": false,
  "selections": [
    (v6/*: any*/),
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "name",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "surname",
      "storageKey": null
    }
  ],
  "storageKey": null
},
v15 = [
  {
    "kind": "Literal",
    "name": "first",
    "value": 10
  }
],
v16 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "__typename",
  "storageKey": null
},
v17 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "cursor",
  "storageKey": null
},
v18 = {
  "alias": null,
  "args": null,
  "concreteType": "PageInfo",
  "kind": "LinkedField",
  "name": "pageInfo",
  "plural": false,
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "hasNextPage",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "endCursor",
      "storageKey": null
    }
  ],
  "storageKey": null
},
v19 = {
  "kind": "ClientExtension",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "__id",
      "storageKey": null
    }
  ]
};
return {
  "fragment": {
    "argumentDefinitions": [
      (v0/*: any*/),
      (v1/*: any*/),
      (v2/*: any*/),
      (v3/*: any*/),
      (v4/*: any*/)
    ],
    "kind": "Fragment",
    "metadata": null,
    "name": "CreatePostMutation",
    "selections": [
      {
        "alias": null,
        "args": (v5/*: any*/),
        "concreteType": "CreatePostPayload",
        "kind": "LinkedField",
        "name": "createPost",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "concreteType": "PostEdge",
            "kind": "LinkedField",
            "name": "postEdge",
            "plural": false,
            "selections": [
              {
                "alias": null,
                "args": null,
                "concreteType": "Post",
                "kind": "LinkedField",
                "name": "node",
                "plural": false,
                "selections": [
                  {
                    "args": null,
                    "kind": "FragmentSpread",
                    "name": "PostCardFragment"
                  }
                ],
                "storageKey": null
              }
            ],
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ],
    "type": "RootMutationType",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [
      (v0/*: any*/),
      (v4/*: any*/),
      (v1/*: any*/),
      (v3/*: any*/),
      (v2/*: any*/)
    ],
    "kind": "Operation",
    "name": "CreatePostMutation",
    "selections": [
      {
        "alias": null,
        "args": (v5/*: any*/),
        "concreteType": "CreatePostPayload",
        "kind": "LinkedField",
        "name": "createPost",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "concreteType": "PostEdge",
            "kind": "LinkedField",
            "name": "postEdge",
            "plural": false,
            "selections": [
              {
                "alias": null,
                "args": null,
                "concreteType": "Post",
                "kind": "LinkedField",
                "name": "node",
                "plural": false,
                "selections": [
                  (v6/*: any*/),
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "caption",
                    "storageKey": null
                  },
                  (v7/*: any*/),
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "postLikesCount",
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "likedByCurrentUser",
                    "storageKey": null
                  },
                  (v8/*: any*/),
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "commentsCount",
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": (v9/*: any*/),
                    "concreteType": "CommentConnection",
                    "kind": "LinkedField",
                    "name": "comments",
                    "plural": false,
                    "selections": [
                      {
                        "alias": null,
                        "args": null,
                        "concreteType": "CommentEdge",
                        "kind": "LinkedField",
                        "name": "edges",
                        "plural": true,
                        "selections": [
                          {
                            "alias": null,
                            "args": null,
                            "concreteType": "Comment",
                            "kind": "LinkedField",
                            "name": "node",
                            "plural": false,
                            "selections": [
                              (v6/*: any*/),
                              (v10/*: any*/),
                              (v7/*: any*/),
                              (v8/*: any*/),
                              (v11/*: any*/),
                              (v12/*: any*/),
                              (v13/*: any*/),
                              (v14/*: any*/),
                              {
                                "alias": null,
                                "args": (v15/*: any*/),
                                "concreteType": "CommentConnection",
                                "kind": "LinkedField",
                                "name": "replies",
                                "plural": false,
                                "selections": [
                                  {
                                    "alias": null,
                                    "args": null,
                                    "concreteType": "CommentEdge",
                                    "kind": "LinkedField",
                                    "name": "edges",
                                    "plural": true,
                                    "selections": [
                                      {
                                        "alias": null,
                                        "args": null,
                                        "concreteType": "Comment",
                                        "kind": "LinkedField",
                                        "name": "node",
                                        "plural": false,
                                        "selections": [
                                          (v6/*: any*/),
                                          (v10/*: any*/),
                                          (v7/*: any*/),
                                          (v8/*: any*/),
                                          (v11/*: any*/),
                                          (v12/*: any*/),
                                          (v13/*: any*/),
                                          (v14/*: any*/),
                                          (v16/*: any*/)
                                        ],
                                        "storageKey": null
                                      },
                                      (v17/*: any*/)
                                    ],
                                    "storageKey": null
                                  },
                                  (v18/*: any*/),
                                  (v19/*: any*/)
                                ],
                                "storageKey": "replies(first:10)"
                              },
                              {
                                "alias": null,
                                "args": (v15/*: any*/),
                                "filters": null,
                                "handle": "connection",
                                "key": "CommentCardWithRepliesFragment_replies",
                                "kind": "LinkedHandle",
                                "name": "replies"
                              },
                              (v16/*: any*/)
                            ],
                            "storageKey": null
                          },
                          (v17/*: any*/)
                        ],
                        "storageKey": null
                      },
                      (v18/*: any*/),
                      (v19/*: any*/)
                    ],
                    "storageKey": "comments(first:20)"
                  },
                  {
                    "alias": null,
                    "args": (v9/*: any*/),
                    "filters": null,
                    "handle": "connection",
                    "key": "CommentsFragment_comments",
                    "kind": "LinkedHandle",
                    "name": "comments"
                  },
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "Media",
                    "kind": "LinkedField",
                    "name": "media",
                    "plural": true,
                    "selections": [
                      (v6/*: any*/),
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "url",
                        "storageKey": null
                      }
                    ],
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "User",
                    "kind": "LinkedField",
                    "name": "user",
                    "plural": false,
                    "selections": [
                      (v6/*: any*/)
                    ],
                    "storageKey": null
                  }
                ],
                "storageKey": null
              }
            ],
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "filters": null,
            "handle": "prependEdge",
            "key": "",
            "kind": "LinkedHandle",
            "name": "postEdge",
            "handleArgs": [
              {
                "kind": "Variable",
                "name": "connections",
                "variableName": "connections"
              }
            ]
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "e822c1cc6033faa6958278c6ffc0cbf9",
    "id": null,
    "metadata": {},
    "name": "CreatePostMutation",
    "operationKind": "mutation",
    "text": "mutation CreatePostMutation(\n  $caption: String!\n  $sportId: ID!\n  $cityId: ID!\n  $media: [Upload!]\n) {\n  createPost(caption: $caption, sportId: $sportId, cityId: $cityId, media: $media) {\n    postEdge {\n      node {\n        ...PostCardFragment\n        id\n      }\n    }\n  }\n}\n\nfragment CommentCardFragment on Comment {\n  id\n  content\n  insertedAt\n  wasEdited\n  commentLikesCount\n  repliesCount\n  parentCommentId\n  user {\n    id\n    name\n    surname\n  }\n}\n\nfragment CommentCardWithRepliesFragment on Comment {\n  ...CommentCardFragment\n  replies(first: 10) {\n    edges {\n      node {\n        id\n        ...CommentCardFragment\n        __typename\n      }\n      cursor\n    }\n    pageInfo {\n      hasNextPage\n      endCursor\n    }\n  }\n  id\n}\n\nfragment CommentsFragment on Post {\n  id\n  comments(first: 20) {\n    edges {\n      node {\n        id\n        ...CommentCardFragment\n        ...CommentCardWithRepliesFragment\n        __typename\n      }\n      cursor\n    }\n    pageInfo {\n      hasNextPage\n      endCursor\n    }\n  }\n}\n\nfragment PostCardFragment on Post {\n  id\n  caption\n  insertedAt\n  postLikesCount\n  likedByCurrentUser\n  wasEdited\n  commentsCount\n  ...CommentsFragment\n  media {\n    id\n    url\n  }\n  user {\n    id\n  }\n}\n"
  }
};
})();

(node as any).hash = "a2c494d9ec946bd0b86e7f5b009538d9";

export default node;
