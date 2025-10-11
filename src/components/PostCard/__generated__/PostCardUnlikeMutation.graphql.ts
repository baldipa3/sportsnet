/**
 * @generated SignedSource<<e1ff99c729e913bfbb29cb2d12d5712d>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
export type PostCardUnlikeMutation$variables = {
  postId: string;
};
export type PostCardUnlikeMutation$data = {
  readonly unlikePost: {
    readonly likesCount: number;
    readonly postId: string;
  } | null | undefined;
};
export type PostCardUnlikeMutation = {
  response: PostCardUnlikeMutation$data;
  variables: PostCardUnlikeMutation$variables;
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
    "name": "unlikePost",
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
    "name": "PostCardUnlikeMutation",
    "selections": (v1/*: any*/),
    "type": "RootMutationType",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "PostCardUnlikeMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "1eaed38ba4ca7f3f6e741fc541e1667a",
    "id": null,
    "metadata": {},
    "name": "PostCardUnlikeMutation",
    "operationKind": "mutation",
    "text": "mutation PostCardUnlikeMutation(\n  $postId: ID!\n) {\n  unlikePost(postId: $postId) {\n    postId\n    likesCount\n  }\n}\n"
  }
};
})();

(node as any).hash = "f2efbaa010d2b4449df069d09f59bb4e";

export default node;
