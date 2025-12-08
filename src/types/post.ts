import { type PostCardFragment$key } from "../components/posts/PostCard/__generated__/PostCardFragment.graphql";
import { type SportsPostsFragment$data } from "../pages/Sports/__generated__/SportsPostsFragment.graphql";

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
  feedData: SportsPostsFragment$data;
}
