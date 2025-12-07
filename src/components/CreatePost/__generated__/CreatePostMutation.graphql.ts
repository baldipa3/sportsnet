/**
 * @generated SignedSource<<8d18e1b0d154f05a2be2662a51e0132e>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
export type CreatePostMutation$variables = {
  caption: string;
  cityId: string;
  media?: ReadonlyArray<any> | null | undefined;
  sportId: string;
};
export type CreatePostMutation$data = {
  readonly createPost: {
    readonly caption: string | null | undefined;
    readonly id: string;
    readonly media: ReadonlyArray<{
      readonly filename: string | null | undefined;
      readonly id: string;
      readonly mediaType: string | null | undefined;
      readonly url: string | null | undefined;
    } | null | undefined> | null | undefined;
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
  "name": "media"
},
v3 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "sportId"
},
v4 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v5 = [
  {
    "alias": null,
    "args": [
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
    "concreteType": "Post",
    "kind": "LinkedField",
    "name": "createPost",
    "plural": false,
    "selections": [
      (v4/*: any*/),
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
        "concreteType": "Media",
        "kind": "LinkedField",
        "name": "media",
        "plural": true,
        "selections": [
          (v4/*: any*/),
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "url",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "mediaType",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "filename",
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ],
    "storageKey": null
  }
];
return {
  "fragment": {
    "argumentDefinitions": [
      (v0/*: any*/),
      (v1/*: any*/),
      (v2/*: any*/),
      (v3/*: any*/)
    ],
    "kind": "Fragment",
    "metadata": null,
    "name": "CreatePostMutation",
    "selections": (v5/*: any*/),
    "type": "RootMutationType",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [
      (v0/*: any*/),
      (v3/*: any*/),
      (v1/*: any*/),
      (v2/*: any*/)
    ],
    "kind": "Operation",
    "name": "CreatePostMutation",
    "selections": (v5/*: any*/)
  },
  "params": {
    "cacheID": "acd051fa779f38637b52d168691ea6fb",
    "id": null,
    "metadata": {},
    "name": "CreatePostMutation",
    "operationKind": "mutation",
    "text": "mutation CreatePostMutation(\n  $caption: String!\n  $sportId: ID!\n  $cityId: ID!\n  $media: [Upload!]\n) {\n  createPost(caption: $caption, sportId: $sportId, cityId: $cityId, media: $media) {\n    id\n    caption\n    media {\n      id\n      url\n      mediaType\n      filename\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "b2f60261c4ce28b37db49b11e0ba7b68";

export default node;
