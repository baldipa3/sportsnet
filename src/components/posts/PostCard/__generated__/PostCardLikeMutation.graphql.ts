/**
 * @generated SignedSource<<8c0d30364fc5e8dcff0cc97b207a4168>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
export type PostCardLikeMutation$variables = {
  doesLike: boolean;
  id: string;
};
export type PostCardLikeMutation$data = {
  readonly likePost: {
    readonly post: {
      readonly id: string;
      readonly likedByCurrentUser: boolean | null | undefined;
      readonly likesCount: number;
    };
  } | null | undefined;
};
export type PostCardLikeMutation = {
  response: PostCardLikeMutation$data;
  variables: PostCardLikeMutation$variables;
};

const node: ConcreteRequest = (function(){
var v0 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "doesLike"
},
v1 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "id"
},
v2 = [
  {
    "alias": null,
    "args": [
      {
        "kind": "Variable",
        "name": "doesLike",
        "variableName": "doesLike"
      },
      {
        "kind": "Variable",
        "name": "id",
        "variableName": "id"
      }
    ],
    "concreteType": "LikePostPayload",
    "kind": "LinkedField",
    "name": "likePost",
    "plural": false,
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "Post",
        "kind": "LinkedField",
        "name": "post",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "id",
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
      (v1/*: any*/)
    ],
    "kind": "Fragment",
    "metadata": null,
    "name": "PostCardLikeMutation",
    "selections": (v2/*: any*/),
    "type": "RootMutationType",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [
      (v1/*: any*/),
      (v0/*: any*/)
    ],
    "kind": "Operation",
    "name": "PostCardLikeMutation",
    "selections": (v2/*: any*/)
  },
  "params": {
    "cacheID": "787abb88fed3625f29c0a81688e02000",
    "id": null,
    "metadata": {},
    "name": "PostCardLikeMutation",
    "operationKind": "mutation",
    "text": "mutation PostCardLikeMutation(\n  $id: ID!\n  $doesLike: Boolean!\n) {\n  likePost(id: $id, doesLike: $doesLike) {\n    post {\n      id\n      likesCount\n      likedByCurrentUser\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "99d0d6d63efae1c6d8246c23864d0453";

export default node;
