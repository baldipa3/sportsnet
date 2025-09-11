/**
 * @generated SignedSource<<9bddcc86ede5825bcc6da8e0ced5a762>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
export type CitySelectionListQuery$variables = Record<PropertyKey, never>;
export type CitySelectionListQuery$data = {
  readonly countriesWithCities: ReadonlyArray<{
    readonly cities: ReadonlyArray<{
      readonly id: string;
      readonly name: string;
    }>;
    readonly code: string;
    readonly id: string;
    readonly name: string;
  }>;
};
export type CitySelectionListQuery = {
  response: CitySelectionListQuery$data;
  variables: CitySelectionListQuery$variables;
};

const node: ConcreteRequest = (function(){
var v0 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v1 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "name",
  "storageKey": null
},
v2 = [
  {
    "alias": null,
    "args": null,
    "concreteType": "Country",
    "kind": "LinkedField",
    "name": "countriesWithCities",
    "plural": true,
    "selections": [
      (v0/*: any*/),
      (v1/*: any*/),
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "code",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "concreteType": "City",
        "kind": "LinkedField",
        "name": "cities",
        "plural": true,
        "selections": [
          (v0/*: any*/),
          (v1/*: any*/)
        ],
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
    "name": "CitySelectionListQuery",
    "selections": (v2/*: any*/),
    "type": "RootQueryType",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "CitySelectionListQuery",
    "selections": (v2/*: any*/)
  },
  "params": {
    "cacheID": "d25f7ca46cc43905139fa26fc90e43d1",
    "id": null,
    "metadata": {},
    "name": "CitySelectionListQuery",
    "operationKind": "query",
    "text": "query CitySelectionListQuery {\n  countriesWithCities {\n    id\n    name\n    code\n    cities {\n      id\n      name\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "0e2a321ee11070ef3952597f5c4c380d";

export default node;
