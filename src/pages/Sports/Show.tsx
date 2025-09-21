import PostCard from "../../components/PostCard";
import { useLocation } from "react-router-dom";
import { type showPostsByCityAndSportQuery } from "./__generated__/showPostsByCityAndSportQuery.graphql";
import { graphql, useLazyLoadQuery } from "react-relay";

export default function SportPage() {
  const location = useLocation();
  const { cityId, sportId } = location.state || {};

  const data = useLazyLoadQuery<showPostsByCityAndSportQuery>(
    graphql`
      query showPostsByCityAndSportQuery($cityId: ID!, $sportId: ID!) {
        postsByCityAndSport(cityId: $cityId, sportId: $sportId) {
          id
          caption
          insertedAt
          comments {
            content
          }
          media {
            url
          }
        }
      }
    `,
    {
      cityId: cityId,
      sportId: sportId,
    }
  );

  return (
    <>
      {data.postsByCityAndSport.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}
    </>
  );
}
