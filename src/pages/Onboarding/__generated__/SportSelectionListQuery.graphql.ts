/**
 * @generated SignedSource<<b4e9be90b96ecf2830cd5d11c21c275c>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
export type SportSelectionListQuery$variables = Record<PropertyKey, never>;
export type SportSelectionListQuery$data = {
  readonly allSports: ReadonlyArray<{
    readonly id: string | null | undefined;
    readonly name: string | null | undefined;
    readonly slug: string | null | undefined;
  }>;
};
export type SportSelectionListQuery = {
  response: SportSelectionListQuery$data;
  variables: SportSelectionListQuery$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "alias": null,
    "args": null,
    "concreteType": "Sport",
    "kind": "LinkedField",
    "name": "allSports",
    "plural": true,
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
        "name": "name",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "slug",
        "storageKey": null
      }
    ],
    "storageKey": null
  }
];
return {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "SportSelectionListQuery",
    "selections": (v0/*: any*/),
    "type": "RootQueryType",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "SportSelectionListQuery",
    "selections": (v0/*: any*/)
  },
  "params": {
    "cacheID": "5c3b1cfdec8b12bd193dddf50c46073a",
    "id": null,
    "metadata": {},
    "name": "SportSelectionListQuery",
    "operationKind": "query",
    "text": "query SportSelectionListQuery {\n  allSports {\n    id\n    name\n    slug\n  }\n}\n"
  }
};
})();

(node as any).hash = "3f1168705fbfee67831de32768b06ea6";

export default node;
