/**
 * @generated SignedSource<<4d2bbb8fae8aef3a5fa85232859ffc95>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type PostCardFragment$data = {
  readonly caption: string;
  readonly comments: ReadonlyArray<{
    readonly content: string | null | undefined;
    readonly id: string;
  } | null | undefined> | null | undefined;
  readonly id: string;
  readonly insertedAt: any | null | undefined;
  readonly likedByCurrentUser: boolean | null | undefined;
  readonly likesCount: number;
  readonly media: ReadonlyArray<{
    readonly id: string;
    readonly url: string | null | undefined;
  } | null | undefined> | null | undefined;
  readonly user: {
    readonly id: string;
  };
  readonly wasEdited: boolean | null | undefined;
  readonly " $fragmentType": "PostCardFragment";
};
export type PostCardFragment$key = {
  readonly " $data"?: PostCardFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"PostCardFragment">;
};

const node: ReaderFragment = (function(){
var v0 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
};
return {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "PostCardFragment",
  "selections": [
    (v0/*: any*/),
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
      "name": "insertedAt",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "likesCount",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "likedByCurrentUser",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "wasEdited",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "concreteType": "Comment",
      "kind": "LinkedField",
      "name": "comments",
      "plural": true,
      "selections": [
        (v0/*: any*/),
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "content",
          "storageKey": null
        }
      ],
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "concreteType": "Media",
      "kind": "LinkedField",
      "name": "media",
      "plural": true,
      "selections": [
        (v0/*: any*/),
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "url",
          "storageKey": null
        }
      ],
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "concreteType": "User",
      "kind": "LinkedField",
      "name": "user",
      "plural": false,
      "selections": [
        (v0/*: any*/)
      ],
      "storageKey": null
    }
  ],
  "type": "Post",
  "abstractKey": null
};
})();

(node as any).hash = "fff9cf5147b4cb57d401279acdaf1dfe";

export default node;
