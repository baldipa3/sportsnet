import PostCard from "../../components/posts/PostCard";
import CreatePost from "../../components/posts/CreatePost";
import { useParams, Navigate } from "react-router-dom";
import { type SportsPostsByCityAndSportQuery } from "./__generated__/SportsPostsByCityAndSportQuery.graphql";
import { type SportsPostsFragment$key } from "./__generated__/SportsPostsFragment.graphql";
import { graphql, useLazyLoadQuery, usePaginationFragment } from "react-relay";
import { useState, useEffect, useRef } from "react";
import { FaCamera, FaTrophy } from "react-icons/fa";
import { GiWhistle } from "react-icons/gi";

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
  const [isCreatePostOpen, setIsCreatePostOpen] = useState(false);
  const params = useParams<{ sport_slug: string; city_slug: string }>();

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

  return (
    <div className="relative">
      <div className="w-full max-w-screen-lg px-4 mt-4 mb-6">
        <div className="bg-[#1a1a1a] border-2 border-green-600 rounded-xl p-6 shadow-md relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-green-600 to-green-500 opacity-5"></div>

          <div className="relative">
            <h3 className="text-white text-lg font-bold mb-4 flex items-center gap-2">
              <span className="text-2xl">🔥</span>
              <span>
                Share Your Game in{" "}
                <span className="text-green-500 capitalize">
                  {params.city_slug.replace(/_/g, " ")}
                </span>
              </span>
            </h3>
            <div className="grid grid-cols-3 gap-3">
              <button
                onClick={() => setIsCreatePostOpen(true)}
                className="bg-[#222222] hover:bg-green-600 border border-gray-700 hover:border-green-500 text-white rounded-lg p-4 flex flex-col items-center gap-2 transition-all duration-200 hover:scale-105 group cursor-pointer"
              >
                <FaCamera className="w-6 h-6 text-gray-400 group-hover:text-white transition-colors" />
                <span className="text-sm font-medium">Post Moment</span>
              </button>
              <button
                onClick={() => setIsCreatePostOpen(true)}
                className="bg-[#222222] hover:bg-green-600 border border-gray-700 hover:border-green-500 text-white rounded-lg p-4 flex flex-col items-center gap-2 transition-all duration-200 hover:scale-105 group cursor-pointer"
              >
                <FaTrophy className="w-6 h-6 text-gray-400 group-hover:text-white transition-colors" />
                <span className="text-sm font-medium">Share Win</span>
              </button>
              <button
                onClick={() => setIsCreatePostOpen(true)}
                className="bg-[#222222] hover:bg-green-600 border border-gray-700 hover:border-green-500 text-white rounded-lg p-4 flex flex-col items-center gap-2 transition-all duration-200 hover:scale-105 group cursor-pointer"
              >
                <GiWhistle className="w-6 h-6 text-gray-400 group-hover:text-white transition-colors" />
                <span className="text-sm font-medium">Game Recap</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {data.posts?.edges?.map(
        (edge) => edge?.node && <PostCard key={edge.node.id} data={edge.node} />
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
