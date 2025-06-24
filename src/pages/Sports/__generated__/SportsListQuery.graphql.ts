/**
 * @generated SignedSource<<524a29dea5d9f1274ac3ea9b7c59b6ce>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
export type SportsListQuery$variables = Record<PropertyKey, never>;
export type SportsListQuery$data = {
  readonly allSports: ReadonlyArray<{
    readonly code: string | null | undefined;
    readonly id: string | null | undefined;
    readonly name: string | null | undefined;
  }>;
};
export type SportsListQuery = {
  response: SportsListQuery$data;
  variables: SportsListQuery$variables;
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
        "name": "code",
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
    "name": "SportsListQuery",
    "selections": (v0/*: any*/),
    "type": "RootQueryType",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "SportsListQuery",
    "selections": (v0/*: any*/)
  },
  "params": {
    "cacheID": "af3674c28324f8e6689e62301d2689e9",
    "id": null,
    "metadata": {},
    "name": "SportsListQuery",
    "operationKind": "query",
    "text": "query SportsListQuery {\n  allSports {\n    id\n    name\n    code\n  }\n}\n"
  }
};
})();

(node as any).hash = "fba26b52c2862c558d50449b5ef4f12d";

export default node;
