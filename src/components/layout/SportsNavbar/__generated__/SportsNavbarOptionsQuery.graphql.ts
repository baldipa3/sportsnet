/**
 * @generated SignedSource<<3ec6d068b1f3794dd36b68e7d3ad1d1b>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
export type SportsNavbarOptionsQuery$variables = Record<PropertyKey, never>;
export type SportsNavbarOptionsQuery$data = {
  readonly allSports: ReadonlyArray<{
    readonly id: string;
    readonly name: string;
    readonly slug: string;
  }>;
  readonly countriesWithCities: ReadonlyArray<{
    readonly cities: ReadonlyArray<{
      readonly id: string;
      readonly name: string;
      readonly slug: string;
    }>;
    readonly code: string;
    readonly id: string;
    readonly name: string;
  }>;
};
export type SportsNavbarOptionsQuery = {
  response: SportsNavbarOptionsQuery$data;
  variables: SportsNavbarOptionsQuery$variables;
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
  (v0/*: any*/),
  (v1/*: any*/),
  {
    "alias": null,
    "args": null,
    "kind": "ScalarField",
    "name": "slug",
    "storageKey": null
  }
],
v3 = [
  {
    "alias": null,
    "args": null,
    "concreteType": "Sport",
    "kind": "LinkedField",
    "name": "allSports",
    "plural": true,
    "selections": (v2/*: any*/),
    "storageKey": null
  },
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
        "selections": (v2/*: any*/),
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
    "name": "SportsNavbarOptionsQuery",
    "selections": (v3/*: any*/),
    "type": "RootQueryType",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "SportsNavbarOptionsQuery",
    "selections": (v3/*: any*/)
  },
  "params": {
    "cacheID": "f0e66b35c4b26a44ee50f6b4140abcd5",
    "id": null,
    "metadata": {},
    "name": "SportsNavbarOptionsQuery",
    "operationKind": "query",
    "text": "query SportsNavbarOptionsQuery {\n  allSports {\n    id\n    name\n    slug\n  }\n  countriesWithCities {\n    id\n    name\n    code\n    cities {\n      id\n      name\n      slug\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "ad5365fbaa8906943f34d60000639537";

export default node;
