/**
 * @generated SignedSource<<c83a7c5e207366d2256ee013815fcc92>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type SportsPostsByCityAndSportQuery$variables = {
  citySlug: string;
  sportSlug: string;
};
export type SportsPostsByCityAndSportQuery$data = {
  readonly postsByCityAndSport: {
    readonly city: {
      readonly id: string;
    };
    readonly sport: {
      readonly id: string;
    };
    readonly " $fragmentSpreads": FragmentRefs<"SportsPostsFragment">;
  };
};
export type SportsPostsByCityAndSportQuery = {
  response: SportsPostsByCityAndSportQuery$data;
  variables: SportsPostsByCityAndSportQuery$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "citySlug"
  },
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "sportSlug"
  }
],
v1 = [
  {
    "kind": "Variable",
    "name": "citySlug",
    "variableName": "citySlug"
  },
  {
    "kind": "Variable",
    "name": "sportSlug",
    "variableName": "sportSlug"
  }
],
v2 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v3 = [
  (v2/*: any*/)
],
v4 = {
  "alias": null,
  "args": null,
  "concreteType": "City",
  "kind": "LinkedField",
  "name": "city",
  "plural": false,
  "selections": (v3/*: any*/),
  "storageKey": null
},
v5 = {
  "alias": null,
  "args": null,
  "concreteType": "Sport",
  "kind": "LinkedField",
  "name": "sport",
  "plural": false,
  "selections": (v3/*: any*/),
  "storageKey": null
},
v6 = [
  {
    "kind": "Literal",
    "name": "first",
    "value": 10
  }
],
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
v9 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "content",
  "storageKey": null
},
v10 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "commentLikesCount",
  "storageKey": null
},
v11 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "repliesCount",
  "storageKey": null
},
v12 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "parentCommentId",
  "storageKey": null
},
v13 = {
  "alias": null,
  "args": null,
  "concreteType": "User",
  "kind": "LinkedField",
  "name": "user",
  "plural": false,
  "selections": [
    (v2/*: any*/),
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
v14 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "__typename",
  "storageKey": null
},
v15 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "cursor",
  "storageKey": null
},
v16 = {
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
v17 = {
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
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "SportsPostsByCityAndSportQuery",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "SportCityFeed",
        "kind": "LinkedField",
        "name": "postsByCityAndSport",
        "plural": false,
        "selections": [
          (v4/*: any*/),
          (v5/*: any*/),
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "SportsPostsFragment"
          }
        ],
        "storageKey": null
      }
    ],
    "type": "RootQueryType",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "SportsPostsByCityAndSportQuery",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "SportCityFeed",
        "kind": "LinkedField",
        "name": "postsByCityAndSport",
        "plural": false,
        "selections": [
          (v4/*: any*/),
          (v5/*: any*/),
          (v2/*: any*/),
          {
            "alias": null,
            "args": (v6/*: any*/),
            "concreteType": "PostConnection",
            "kind": "LinkedField",
            "name": "posts",
            "plural": false,
            "selections": [
              {
                "alias": null,
                "args": null,
                "concreteType": "PostEdge",
                "kind": "LinkedField",
                "name": "edges",
                "plural": true,
                "selections": [
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "Post",
                    "kind": "LinkedField",
                    "name": "node",
                    "plural": false,
                    "selections": [
                      (v2/*: any*/),
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
                        "args": (v6/*: any*/),
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
                                  (v2/*: any*/),
                                  (v9/*: any*/),
                                  (v7/*: any*/),
                                  (v8/*: any*/),
                                  (v10/*: any*/),
                                  (v11/*: any*/),
                                  (v12/*: any*/),
                                  (v13/*: any*/),
                                  {
                                    "alias": null,
                                    "args": (v6/*: any*/),
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
                                              (v2/*: any*/),
                                              (v9/*: any*/),
                                              (v7/*: any*/),
                                              (v8/*: any*/),
                                              (v10/*: any*/),
                                              (v11/*: any*/),
                                              (v12/*: any*/),
                                              (v13/*: any*/),
                                              (v14/*: any*/)
                                            ],
                                            "storageKey": null
                                          },
                                          (v15/*: any*/)
                                        ],
                                        "storageKey": null
                                      },
                                      (v16/*: any*/),
                                      (v17/*: any*/)
                                    ],
                                    "storageKey": "replies(first:10)"
                                  },
                                  {
                                    "alias": null,
                                    "args": (v6/*: any*/),
                                    "filters": null,
                                    "handle": "connection",
                                    "key": "CommentCardWithRepliesFragment_replies",
                                    "kind": "LinkedHandle",
                                    "name": "replies"
                                  },
                                  (v14/*: any*/)
                                ],
                                "storageKey": null
                              },
                              (v15/*: any*/)
                            ],
                            "storageKey": null
                          },
                          (v16/*: any*/),
                          (v17/*: any*/)
                        ],
                        "storageKey": "comments(first:10)"
                      },
                      {
                        "alias": null,
                        "args": (v6/*: any*/),
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
                          (v2/*: any*/),
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
                        "selections": (v3/*: any*/),
                        "storageKey": null
                      },
                      (v14/*: any*/)
                    ],
                    "storageKey": null
                  },
                  (v15/*: any*/)
                ],
                "storageKey": null
              },
              (v16/*: any*/)
            ],
            "storageKey": "posts(first:10)"
          },
          {
            "alias": null,
            "args": (v6/*: any*/),
            "filters": null,
            "handle": "connection",
            "key": "sportsPostsFragment_posts",
            "kind": "LinkedHandle",
            "name": "posts"
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "79ef80ac09ee5e8328e5275e589bffef",
    "id": null,
    "metadata": {},
    "name": "SportsPostsByCityAndSportQuery",
    "operationKind": "query",
    "text": "query SportsPostsByCityAndSportQuery(\n  $citySlug: String!\n  $sportSlug: String!\n) {\n  postsByCityAndSport(citySlug: $citySlug, sportSlug: $sportSlug) {\n    city {\n      id\n    }\n    sport {\n      id\n    }\n    ...SportsPostsFragment\n    id\n  }\n}\n\nfragment CommentCardFragment on Comment {\n  id\n  content\n  insertedAt\n  wasEdited\n  commentLikesCount\n  repliesCount\n  parentCommentId\n  user {\n    id\n    name\n    surname\n  }\n}\n\nfragment CommentCardWithRepliesFragment on Comment {\n  ...CommentCardFragment\n  replies(first: 10) {\n    edges {\n      node {\n        id\n        ...CommentCardFragment\n        __typename\n      }\n      cursor\n    }\n    pageInfo {\n      hasNextPage\n      endCursor\n    }\n  }\n  id\n}\n\nfragment CommentsFragment on Post {\n  id\n  comments(first: 10) {\n    edges {\n      node {\n        id\n        ...CommentCardFragment\n        ...CommentCardWithRepliesFragment\n        __typename\n      }\n      cursor\n    }\n    pageInfo {\n      hasNextPage\n      endCursor\n    }\n  }\n}\n\nfragment PostCardFragment on Post {\n  id\n  caption\n  insertedAt\n  postLikesCount\n  likedByCurrentUser\n  wasEdited\n  commentsCount\n  ...CommentsFragment\n  media {\n    id\n    url\n  }\n  user {\n    id\n  }\n}\n\nfragment SportsPostsFragment on SportCityFeed {\n  id\n  posts(first: 10) {\n    edges {\n      node {\n        id\n        ...PostCardFragment\n        __typename\n      }\n      cursor\n    }\n    pageInfo {\n      hasNextPage\n      endCursor\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "3093ad3b7da5d3b9761e34dcd7f952fd";

export default node;
