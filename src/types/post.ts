import { type PostCardFragment$key } from "../components/PostCard/__generated__/PostCardFragment.graphql";

type PostLocationContext = {
  sportId: string;
  cityId: string;
};

export interface PostProp {
  data: PostCardFragment$key;
}

export interface CreatePostProp {
  isOpen: boolean;
  onClose: () => void;
  postLocationContext: PostLocationContext;
}
