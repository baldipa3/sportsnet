/**
 * @generated SignedSource<<31b50beafbd90d9ea422cf893b0cdc4a>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
export type CommentCardDeleteCommentMutation$variables = {
  connections: ReadonlyArray<string>;
  id: string;
};
export type CommentCardDeleteCommentMutation$data = {
  readonly deleteComment: {
    readonly id: string;
  };
};
export type CommentCardDeleteCommentMutation = {
  response: CommentCardDeleteCommentMutation$data;
  variables: CommentCardDeleteCommentMutation$variables;
};

const node: ConcreteRequest = (function(){
var v0 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "connections"
},
v1 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "id"
},
v2 = [
  {
    "kind": "Variable",
    "name": "id",
    "variableName": "id"
  }
],
v3 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": [
      (v0/*: any*/),
      (v1/*: any*/)
    ],
    "kind": "Fragment",
    "metadata": null,
    "name": "CommentCardDeleteCommentMutation",
    "selections": [
      {
        "alias": null,
        "args": (v2/*: any*/),
        "concreteType": "Comment",
        "kind": "LinkedField",
        "name": "deleteComment",
        "plural": false,
        "selections": [
          (v3/*: any*/)
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
      (v1/*: any*/),
      (v0/*: any*/)
    ],
    "kind": "Operation",
    "name": "CommentCardDeleteCommentMutation",
    "selections": [
      {
        "alias": null,
        "args": (v2/*: any*/),
        "concreteType": "Comment",
        "kind": "LinkedField",
        "name": "deleteComment",
        "plural": false,
        "selections": [
          (v3/*: any*/),
          {
            "alias": null,
            "args": null,
            "filters": null,
            "handle": "deleteEdge",
            "key": "",
            "kind": "ScalarHandle",
            "name": "id",
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
    "cacheID": "1f15e7f983eacdfa75ba3ab4e935b407",
    "id": null,
    "metadata": {},
    "name": "CommentCardDeleteCommentMutation",
    "operationKind": "mutation",
    "text": "mutation CommentCardDeleteCommentMutation(\n  $id: ID!\n) {\n  deleteComment(id: $id) {\n    id\n  }\n}\n"
  }
};
})();

(node as any).hash = "24353fd9688f61ae016540c24a3740bc";

export default node;
