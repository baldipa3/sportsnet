import { type showPostsByCityAndSportQuery } from "../pages/Sports/__generated__/showPostsByCityAndSportQuery.graphql";

type PostFromQuery =
  showPostsByCityAndSportQuery["response"]["postsByCityAndSport"][0];

export interface PostProp {
  post: PostFromQuery;
}
