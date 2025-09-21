/**
 * @generated SignedSource<<d86c937435c7433e9903a41eb7a7196e>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
export type showPostsByCityAndSportQuery$variables = {
  cityId: string;
  sportId: string;
};
export type showPostsByCityAndSportQuery$data = {
  readonly postsByCityAndSport: ReadonlyArray<{
    readonly caption: string | null | undefined;
    readonly comments: ReadonlyArray<{
      readonly content: string | null | undefined;
    } | null | undefined> | null | undefined;
    readonly id: string;
    readonly insertedAt: any | null | undefined;
    readonly media: ReadonlyArray<{
      readonly url: string | null | undefined;
    } | null | undefined> | null | undefined;
  }>;
};
export type showPostsByCityAndSportQuery = {
  response: showPostsByCityAndSportQuery$data;
  variables: showPostsByCityAndSportQuery$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "cityId"
  },
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "sportId"
  }
],
v1 = [
  {
    "kind": "Variable",
    "name": "cityId",
    "variableName": "cityId"
  },
  {
    "kind": "Variable",
    "name": "sportId",
    "variableName": "sportId"
  }
],
v2 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v3 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "caption",
  "storageKey": null
},
v4 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "insertedAt",
  "storageKey": null
},
v5 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "content",
  "storageKey": null
},
v6 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "url",
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "showPostsByCityAndSportQuery",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "Post",
        "kind": "LinkedField",
        "name": "postsByCityAndSport",
        "plural": true,
        "selections": [
          (v2/*: any*/),
          (v3/*: any*/),
          (v4/*: any*/),
          {
            "alias": null,
            "args": null,
            "concreteType": "Comment",
            "kind": "LinkedField",
            "name": "comments",
            "plural": true,
            "selections": [
              (v5/*: any*/)
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
              (v6/*: any*/)
            ],
            "storageKey": null
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
    "name": "showPostsByCityAndSportQuery",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "Post",
        "kind": "LinkedField",
        "name": "postsByCityAndSport",
        "plural": true,
        "selections": [
          (v2/*: any*/),
          (v3/*: any*/),
          (v4/*: any*/),
          {
            "alias": null,
            "args": null,
            "concreteType": "Comment",
            "kind": "LinkedField",
            "name": "comments",
            "plural": true,
            "selections": [
              (v5/*: any*/),
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
              (v6/*: any*/),
              (v2/*: any*/)
            ],
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "3be62b320f75a7b512027c22fa9ad755",
    "id": null,
    "metadata": {},
    "name": "showPostsByCityAndSportQuery",
    "operationKind": "query",
    "text": "query showPostsByCityAndSportQuery(\n  $cityId: ID!\n  $sportId: ID!\n) {\n  postsByCityAndSport(cityId: $cityId, sportId: $sportId) {\n    id\n    caption\n    insertedAt\n    comments {\n      content\n      id\n    }\n    media {\n      url\n      id\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "51f223d5ecc0b2398ed9be60a9eb20fe";

export default node;
