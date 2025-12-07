/**
 * @generated SignedSource<<1839d2eb0b670245ccf550e420ba6810>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type PostCardFragment$data = {
  readonly caption: string | null | undefined;
  readonly comments: ReadonlyArray<{
    readonly content: string | null | undefined;
  } | null | undefined> | null | undefined;
  readonly id: string;
  readonly insertedAt: any | null | undefined;
  readonly likedByCurrentUser: boolean | null | undefined;
  readonly likesCount: number;
  readonly media: ReadonlyArray<{
    readonly url: string | null | undefined;
  } | null | undefined> | null | undefined;
  readonly " $fragmentType": "PostCardFragment";
};
export type PostCardFragment$key = {
  readonly " $data"?: PostCardFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"PostCardFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "PostCardFragment",
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
      "concreteType": "Comment",
      "kind": "LinkedField",
      "name": "comments",
      "plural": true,
      "selections": [
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
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "url",
          "storageKey": null
        }
      ],
      "storageKey": null
    }
  ],
  "type": "Post",
  "abstractKey": null
};

(node as any).hash = "b1a918691a248107a7fb0d2f124c57f0";

export default node;
