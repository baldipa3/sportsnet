/**
 * @generated SignedSource<<dc596cc7be54c3ef6aa7665d52403e47>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
export type EditCommentMutation$variables = {
  content: string;
  id: string;
};
export type EditCommentMutation$data = {
  readonly editComment: {
    readonly content: string;
    readonly id: string;
    readonly wasEdited: boolean | null | undefined;
  };
};
export type EditCommentMutation = {
  response: EditCommentMutation$data;
  variables: EditCommentMutation$variables;
};

const node: ConcreteRequest = (function(){
var v0 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "content"
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
        "name": "content",
        "variableName": "content"
      },
      {
        "kind": "Variable",
        "name": "id",
        "variableName": "id"
      }
    ],
    "concreteType": "Comment",
    "kind": "LinkedField",
    "name": "editComment",
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
        "name": "content",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "wasEdited",
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
    "name": "EditCommentMutation",
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
    "name": "EditCommentMutation",
    "selections": (v2/*: any*/)
  },
  "params": {
    "cacheID": "7f96809bc8c4a0e32de2899672845e76",
    "id": null,
    "metadata": {},
    "name": "EditCommentMutation",
    "operationKind": "mutation",
    "text": "mutation EditCommentMutation(\n  $id: ID!\n  $content: String!\n) {\n  editComment(id: $id, content: $content) {\n    id\n    content\n    wasEdited\n  }\n}\n"
  }
};
})();

(node as any).hash = "35eeafb68914d86dabe74aa63dcb0f2a";

export default node;
