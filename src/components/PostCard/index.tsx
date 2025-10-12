import { useState } from "react";
import { FaHeart, FaComment } from "react-icons/fa";
import { GiSoccerKick } from "react-icons/gi";
import { type PostProp } from "../../types/post";
import MediaCarousel from "./MediaCarousel";
import { graphql, useMutation } from "react-relay";
import { type PostCardLikeMutation } from "./__generated__/PostCardLikeMutation.graphql";
import { type PostCardUnlikeMutation } from "./__generated__/PostCardUnlikeMutation.graphql";

const PostCard = ({ post }: PostProp) => {
  console.log(post);

  const [isLiked, setIsLiked] = useState(post.likedByCurrentUser ?? false);
  const [likesCount, setLikesCount] = useState(post.likesCount);
  const [isLoading, setIsLoading] = useState(false);

  const [commitLikeMutation] = useMutation<PostCardLikeMutation>(graphql`
    mutation PostCardLikeMutation($postId: ID!) {
      likePost(postId: $postId) {
        postId
        likesCount
      }
    }
  `);

  const [commitUnlikeMutation] = useMutation<PostCardUnlikeMutation>(
    graphql`
      mutation PostCardUnlikeMutation($postId: ID!) {
        unlikePost(postId: $postId) {
          postId
          likesCount
        }
      }
    `
  );

  const handleLikeToggle = async () => {
    if (isLoading) return;

    const previousIsLiked = isLiked;
    const previousLikesCount = likesCount;

    setIsLiked(!isLiked);
    setLikesCount(isLiked ? likesCount - 1 : likesCount + 1);
    setIsLoading(true);

    try {
      if (isLiked) {
        await unlikePost(post.id, previousLikesCount);
      } else {
        await likePost(post.id, previousLikesCount);
      }
    } catch (error) {
      console.error("Error toggling like:", error);
      setIsLiked(previousIsLiked);
      setLikesCount(previousLikesCount);
    } finally {
      setIsLoading(false);
    }
  };

  const likePost = async (postId: string, previousLikesCount: number) => {
    commitLikeMutation({
      variables: {
        postId: postId,
      },
      onCompleted: (response) => {
        const likesCount = response?.likePost?.likesCount || previousLikesCount;

        setLikesCount(likesCount);
      },
      onError: () => {
        setIsLiked(false);
        setLikesCount(previousLikesCount);
      },
    });
  };

  const unlikePost = async (postId: string, previousLikesCount: number) => {
    commitUnlikeMutation({
      variables: {
        postId: postId,
      },
      onCompleted: (response) => {
        const likesCount =
          response?.unlikePost?.likesCount || previousLikesCount;

        setLikesCount(likesCount);
      },
      onError: () => {
        setIsLiked(false);
        setLikesCount(previousLikesCount);
      },
    });
  };

  return (
    <div className="w-full max-w-screen-lg px-4 mt-4">
      <div
        key={post.id}
        className="bg-[#222222] rounded-xl overflow-hidden shadow-lg mb-6"
      >
        {/* Card Header */}
        <div className="flex items-center gap-4 p-4">
          <img
            src="https://bit.ly/sage-adebayo"
            alt="Avatar"
            className="w-12 h-12 rounded-full"
          />
          <div>
            <span className="text-gray-400 text-sm">
              {post.insertedAt && new Date(post.insertedAt).toDateString()}
            </span>
          </div>
        </div>

        <MediaCarousel post={post} />

        {/* Card Body */}
        <div className="p-4">
          <p className="text-gray-300 mb-4">{post.caption}</p>

          {/* Card Footer */}
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1">
              <button
                onClick={handleLikeToggle}
                disabled={isLoading}
                className="flex items-center gap-1 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <FaHeart
                  className={`w-5 h-5 transition-colors cursor-pointer ${
                    post.likesCount > 0 ? "text-red-500" : ""
                  }`}
                />
              </button>
              <span className="text-sm font-bold hover:text-white text-gray-400">
                {likesCount}
              </span>
            </div>

            {/* Comments */}
            <div className="flex items-center gap-1 text-gray-400 hover:text-white transition-all">
              <FaComment className="w-5 h-5" />
              {/* <span className="text-sm font-bold">{post.likes}</span> */}
            </div>

            {/* Sports Icon */}
            <div className="flex items-center gap-1 text-gray-400 hover:text-white transition-all">
              <GiSoccerKick className="w-5 h-5" />
              {/* <span className="text-sm font-bold">{post.likes}</span> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostCard;
