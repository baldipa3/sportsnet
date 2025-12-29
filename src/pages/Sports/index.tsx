import PostCard from "../../components/posts/PostCard";
import CreatePost from "../../components/posts/CreatePost";
import { useParams, Navigate } from "react-router-dom";
import { type SportsPostsByCityAndSportQuery } from "./__generated__/SportsPostsByCityAndSportQuery.graphql";
import { type SportsPostsFragment$key } from "./__generated__/SportsPostsFragment.graphql";
import {
  graphql,
  useLazyLoadQuery,
  usePaginationFragment,
  ConnectionHandler,
} from "react-relay";
import { useEffect, useRef } from "react";
import { useOutletContext } from "react-router-dom";

type ContextType = {
  isCreatePostOpen: boolean;
  setIsCreatePostOpen: (open: boolean) => void;
};

const PostsFragment = graphql`
  fragment SportsPostsFragment on SportCityFeed
  @refetchable(queryName: "SportsPostsPaginationQuery")
  @argumentDefinitions(
    count: { type: "Int", defaultValue: 10 }
    cursor: { type: "String" }
  ) {
    id
    posts(first: $count, after: $cursor)
      @connection(key: "sportsPostsFragment_posts") {
      edges {
        node {
          id
          ...PostCardFragment
        }
      }
      pageInfo {
        hasNextPage
      }
    }
  }
`;

export default function SportPage() {
  const params = useParams<{ sport_slug: string; city_slug: string }>();
  const { isCreatePostOpen, setIsCreatePostOpen } =
    useOutletContext<ContextType>();

  if (!params.sport_slug || !params.city_slug) {
    return <Navigate to="/" replace />;
  }

  const query = useLazyLoadQuery<SportsPostsByCityAndSportQuery>(
    graphql`
      query SportsPostsByCityAndSportQuery(
        $citySlug: String!
        $sportSlug: String!
      ) {
        postsByCityAndSport(citySlug: $citySlug, sportSlug: $sportSlug) {
          city {
            id
          }
          sport {
            id
          }
          ...SportsPostsFragment
        }
      }
    `,
    {
      citySlug: params.city_slug,
      sportSlug: params.sport_slug,
    }
  );

  const { data, loadNext, hasNext, isLoadingNext } = usePaginationFragment<
    SportsPostsByCityAndSportQuery,
    SportsPostsFragment$key
  >(PostsFragment, query.postsByCityAndSport);

  const loadMoreRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const target = entries[0];
        if (target.isIntersecting && hasNext && !isLoadingNext) {
          loadNext(10);
        }
      },
      { threshold: 0.1 }
    );

    if (loadMoreRef.current) {
      observer.observe(loadMoreRef.current);
    }

    return () => {
      if (loadMoreRef.current) {
        observer.unobserve(loadMoreRef.current);
      }
    };
  }, [hasNext, isLoadingNext, loadNext]);

  const postLocationContext = {
    sportId: query.postsByCityAndSport.sport.id,
    cityId: query.postsByCityAndSport.city.id,
  };

  const connectionId = ConnectionHandler.getConnectionID(
    data.id,
    "sportsPostsFragment_posts"
  );

  return (
    <div className="relative">
      {data.posts?.edges?.map(
        (edge) =>
          edge?.node && (
            <PostCard
              key={edge.node.id}
              data={edge.node}
              connectionId={connectionId}
            />
          )
      )}

      {/* Infinite Scroll Trigger & Loading State */}
      <div ref={loadMoreRef} className="w-full py-8 flex justify-center">
        {isLoadingNext && (
          <div className="flex flex-col items-center gap-2">
            <div className="w-8 h-8 border-4 border-green-600 border-t-transparent rounded-full animate-spin"></div>
            <span className="text-gray-400 text-sm">Loading more posts...</span>
          </div>
        )}
        {!hasNext && data.posts?.edges && data.posts.edges.length > 0 && (
          <div className="text-gray-400 text-sm">
            🎉 You've reached the end of the feed
          </div>
        )}
        {!hasNext && (!data.posts?.edges || data.posts.edges.length === 0) && (
          <div className="text-gray-400 text-sm">
            No posts yet. Be the first to share!
          </div>
        )}
      </div>

      {/* Create Post Modal */}
      <CreatePost
        isOpen={isCreatePostOpen}
        onClose={() => setIsCreatePostOpen(false)}
        postLocationContext={postLocationContext}
        feedData={data}
      />
    </div>
  );
}
