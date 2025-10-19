import PostCard from "../../components/PostCard";
import { useParams, Navigate } from "react-router-dom";
import { type showPostsByCityAndSportQuery } from "./__generated__/showPostsByCityAndSportQuery.graphql";
import { graphql, useLazyLoadQuery } from "react-relay";

export default function SportPage() {
  const params = useParams<{ sport_slug: string; city_slug: string }>();

  if (!params.sport_slug || !params.city_slug) {
    return <Navigate to="/" replace />;
  }

  const data = useLazyLoadQuery<showPostsByCityAndSportQuery>(
    graphql`
      query showPostsByCityAndSportQuery(
        $citySlug: String!
        $sportSlug: String!
      ) {
        postsByCityAndSport(citySlug: $citySlug, sportSlug: $sportSlug) {
          id
          caption
          insertedAt
          likesCount
          likedByCurrentUser
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
      citySlug: params.city_slug,
      sportSlug: params.sport_slug,
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
