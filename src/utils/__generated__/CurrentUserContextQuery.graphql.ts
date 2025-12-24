/**
 * @generated SignedSource<<fd12f47b6a18e43115b185b9ac02a170>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
export type CurrentUserContextQuery$variables = Record<PropertyKey, never>;
export type CurrentUserContextQuery$data = {
  readonly currentUser: {
    readonly city: {
      readonly country: {
        readonly code: string;
        readonly id: string;
        readonly name: string;
      } | null | undefined;
      readonly id: string;
      readonly name: string;
      readonly slug: string;
    } | null | undefined;
    readonly defaultSport: {
      readonly id: string;
      readonly name: string;
      readonly slug: string;
    } | null | undefined;
    readonly email: string;
    readonly id: string;
    readonly name: string;
    readonly surname: string;
  };
};
export type CurrentUserContextQuery = {
  response: CurrentUserContextQuery$data;
  variables: CurrentUserContextQuery$variables;
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
v2 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "slug",
  "storageKey": null
},
v3 = [
  {
    "alias": null,
    "args": null,
    "concreteType": "User",
    "kind": "LinkedField",
    "name": "currentUser",
    "plural": false,
    "selections": [
      (v0/*: any*/),
      (v1/*: any*/),
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "surname",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "email",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "concreteType": "City",
        "kind": "LinkedField",
        "name": "city",
        "plural": false,
        "selections": [
          (v0/*: any*/),
          (v1/*: any*/),
          (v2/*: any*/),
          {
            "alias": null,
            "args": null,
            "concreteType": "Country",
            "kind": "LinkedField",
            "name": "country",
            "plural": false,
            "selections": [
              (v0/*: any*/),
              (v1/*: any*/),
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
        ],
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "concreteType": "Sport",
        "kind": "LinkedField",
        "name": "defaultSport",
        "plural": false,
        "selections": [
          (v0/*: any*/),
          (v1/*: any*/),
          (v2/*: any*/)
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
    "name": "CurrentUserContextQuery",
    "selections": (v3/*: any*/),
    "type": "RootQueryType",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "CurrentUserContextQuery",
    "selections": (v3/*: any*/)
  },
  "params": {
    "cacheID": "c8d8531183c33cf39a85fa9b34ef99bf",
    "id": null,
    "metadata": {},
    "name": "CurrentUserContextQuery",
    "operationKind": "query",
    "text": "query CurrentUserContextQuery {\n  currentUser {\n    id\n    name\n    surname\n    email\n    city {\n      id\n      name\n      slug\n      country {\n        id\n        name\n        code\n      }\n    }\n    defaultSport {\n      id\n      name\n      slug\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "969c43edd20a6257cb5ea0a23b11154e";

export default node;
