/**
 * @generated SignedSource<<089e094e2d1659802c970d229f5ba992>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
export type PostCardDeletePostMutation$variables = {
  connections: ReadonlyArray<string>;
  id: string;
};
export type PostCardDeletePostMutation$data = {
  readonly deletePost: {
    readonly id: string;
  };
};
export type PostCardDeletePostMutation = {
  response: PostCardDeletePostMutation$data;
  variables: PostCardDeletePostMutation$variables;
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
    "name": "PostCardDeletePostMutation",
    "selections": [
      {
        "alias": null,
        "args": (v2/*: any*/),
        "concreteType": "Post",
        "kind": "LinkedField",
        "name": "deletePost",
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
    "name": "PostCardDeletePostMutation",
    "selections": [
      {
        "alias": null,
        "args": (v2/*: any*/),
        "concreteType": "Post",
        "kind": "LinkedField",
        "name": "deletePost",
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
    "cacheID": "9b12227f0995bf40d6762e376836fdbe",
    "id": null,
    "metadata": {},
    "name": "PostCardDeletePostMutation",
    "operationKind": "mutation",
    "text": "mutation PostCardDeletePostMutation(\n  $id: ID!\n) {\n  deletePost(id: $id) {\n    id\n  }\n}\n"
  }
};
})();

(node as any).hash = "4deeec60d8d684305963577edecd19d8";

export default node;
