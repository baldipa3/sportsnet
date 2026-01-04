/**
 * @generated SignedSource<<53a28a9eb245b8a69afbdbff3cd8fb16>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
export type EditPostMutation$variables = {
  caption: string;
  id: string;
};
export type EditPostMutation$data = {
  readonly editPost: {
    readonly caption: string;
    readonly id: string;
    readonly wasEdited: boolean | null | undefined;
  };
};
export type EditPostMutation = {
  response: EditPostMutation$data;
  variables: EditPostMutation$variables;
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
  "name": "id"
},
v2 = [
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
        "name": "id",
        "variableName": "id"
      }
    ],
    "concreteType": "Post",
    "kind": "LinkedField",
    "name": "editPost",
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
        "name": "caption",
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
    "name": "EditPostMutation",
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
    "name": "EditPostMutation",
    "selections": (v2/*: any*/)
  },
  "params": {
    "cacheID": "8b79c8f0f34c75a7161f12585a26e063",
    "id": null,
    "metadata": {},
    "name": "EditPostMutation",
    "operationKind": "mutation",
    "text": "mutation EditPostMutation(\n  $id: ID!\n  $caption: String!\n) {\n  editPost(id: $id, caption: $caption) {\n    id\n    caption\n    wasEdited\n  }\n}\n"
  }
};
})();

(node as any).hash = "69b482b71d052b1fc9458c4af0de7bd9";

export default node;
