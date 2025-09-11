/**
 * @generated SignedSource<<32e98465d9c33bd7e1563d49539a3105>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
export type SportSelectionCompleteUserOnboardingMutation$variables = {
  cityId: string;
  defaultSportId: string;
};
export type SportSelectionCompleteUserOnboardingMutation$data = {
  readonly completeUserOnboarding: {
    readonly city: {
      readonly id: string;
      readonly slug: string;
    } | null | undefined;
    readonly defaultSport: {
      readonly id: string;
      readonly slug: string;
    } | null | undefined;
    readonly id: string;
  } | null | undefined;
};
export type SportSelectionCompleteUserOnboardingMutation = {
  response: SportSelectionCompleteUserOnboardingMutation$data;
  variables: SportSelectionCompleteUserOnboardingMutation$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "cityId"
  },
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "defaultSportId"
  }
],
v1 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v2 = [
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
    "args": [
      {
        "kind": "Variable",
        "name": "cityId",
        "variableName": "cityId"
      },
      {
        "kind": "Variable",
        "name": "defaultSportId",
        "variableName": "defaultSportId"
      }
    ],
    "concreteType": "User",
    "kind": "LinkedField",
    "name": "completeUserOnboarding",
    "plural": false,
    "selections": [
      (v1/*: any*/),
      {
        "alias": null,
        "args": null,
        "concreteType": "City",
        "kind": "LinkedField",
        "name": "city",
        "plural": false,
        "selections": (v2/*: any*/),
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "concreteType": "Sport",
        "kind": "LinkedField",
        "name": "defaultSport",
        "plural": false,
        "selections": (v2/*: any*/),
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
    "name": "SportSelectionCompleteUserOnboardingMutation",
    "selections": (v3/*: any*/),
    "type": "RootMutationType",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "SportSelectionCompleteUserOnboardingMutation",
    "selections": (v3/*: any*/)
  },
  "params": {
    "cacheID": "96dc75eef59699bb423d379ddd0956fc",
    "id": null,
    "metadata": {},
    "name": "SportSelectionCompleteUserOnboardingMutation",
    "operationKind": "mutation",
    "text": "mutation SportSelectionCompleteUserOnboardingMutation(\n  $cityId: ID!\n  $defaultSportId: ID!\n) {\n  completeUserOnboarding(cityId: $cityId, defaultSportId: $defaultSportId) {\n    id\n    city {\n      id\n      slug\n    }\n    defaultSport {\n      id\n      slug\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "7afdde9f6a54e46293fe345aba6792f1";

export default node;
