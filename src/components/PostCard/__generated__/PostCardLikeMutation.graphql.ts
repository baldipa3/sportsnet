/**
 * @generated SignedSource<<649503fb658af56f232e1881fe0ae7b6>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
export type PostCardLikeMutation$variables = {
  postId: string;
};
export type PostCardLikeMutation$data = {
  readonly likePost: {
    readonly likesCount: number;
    readonly postId: string;
  } | null | undefined;
};
export type PostCardLikeMutation = {
  response: PostCardLikeMutation$data;
  variables: PostCardLikeMutation$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "postId"
  }
],
v1 = [
  {
    "alias": null,
    "args": [
      {
        "kind": "Variable",
        "name": "postId",
        "variableName": "postId"
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
        "kind": "ScalarField",
        "name": "postId",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "likesCount",
        "storageKey": null
      }
    ],
    "storageKey": null
  }
];
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "PostCardLikeMutation",
    "selections": (v1/*: any*/),
    "type": "RootMutationType",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "PostCardLikeMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "643f68adfce90e0e5a3e06ab9ed9396c",
    "id": null,
    "metadata": {},
    "name": "PostCardLikeMutation",
    "operationKind": "mutation",
    "text": "mutation PostCardLikeMutation(\n  $postId: ID!\n) {\n  likePost(postId: $postId) {\n    postId\n    likesCount\n  }\n}\n"
  }
};
})();

(node as any).hash = "fb6800edaf64a0603c6662840d7dea73";

export default node;
