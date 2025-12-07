/**
 * @generated SignedSource<<fab96d05d2c990d1bcb0bf14d4f58871>>
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
];
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
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "insertedAt",
                        "storageKey": null
                      },
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "likesCount",
                        "storageKey": null
                      },
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "likedByCurrentUser",
                        "storageKey": null
                      },
                      {
                        "alias": null,
                        "args": null,
                        "concreteType": "Comment",
                        "kind": "LinkedField",
                        "name": "comments",
                        "plural": true,
                        "selections": [
                          {
                            "alias": null,
                            "args": null,
                            "kind": "ScalarField",
                            "name": "content",
                            "storageKey": null
                          },
                          (v2/*: any*/)
                        ],
                        "storageKey": null
                      },
                      {
                        "alias": null,
                        "args": null,
                        "concreteType": "Media",
                        "kind": "LinkedField",
                        "name": "media",
                        "plural": true,
                        "selections": [
                          {
                            "alias": null,
                            "args": null,
                            "kind": "ScalarField",
                            "name": "url",
                            "storageKey": null
                          },
                          (v2/*: any*/)
                        ],
                        "storageKey": null
                      },
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "__typename",
                        "storageKey": null
                      }
                    ],
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "cursor",
                    "storageKey": null
                  }
                ],
                "storageKey": null
              },
              {
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
              }
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
          },
          (v2/*: any*/)
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "e091c37d9e8433757612faed4c6aa0fb",
    "id": null,
    "metadata": {},
    "name": "SportsPostsByCityAndSportQuery",
    "operationKind": "query",
    "text": "query SportsPostsByCityAndSportQuery(\n  $citySlug: String!\n  $sportSlug: String!\n) {\n  postsByCityAndSport(citySlug: $citySlug, sportSlug: $sportSlug) {\n    city {\n      id\n    }\n    sport {\n      id\n    }\n    ...SportsPostsFragment\n    id\n  }\n}\n\nfragment PostCardFragment on Post {\n  id\n  caption\n  insertedAt\n  likesCount\n  likedByCurrentUser\n  comments {\n    content\n    id\n  }\n  media {\n    url\n    id\n  }\n}\n\nfragment SportsPostsFragment on SportCityFeed {\n  posts(first: 10) {\n    edges {\n      node {\n        id\n        ...PostCardFragment\n        __typename\n      }\n      cursor\n    }\n    pageInfo {\n      hasNextPage\n      endCursor\n    }\n  }\n  id\n}\n"
  }
};
})();

(node as any).hash = "3093ad3b7da5d3b9761e34dcd7f952fd";

export default node;
