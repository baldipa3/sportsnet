import { FaHeart, FaComment } from "react-icons/fa";
import { GiSoccerKick } from "react-icons/gi";
import { type PostProp } from "../types";
import MediaCarousel from "./MediaCarousel";
import { graphql, useMutation, useFragment } from "react-relay";
import { type PostCardLikeMutation } from "./__generated__/PostCardLikeMutation.graphql";

const PostCardFragment = graphql`
  fragment PostCardFragment on Post {
    id
    caption
    insertedAt
    likesCount
    likedByCurrentUser
    comments {
      id
      content
    }
    media {
      id
      url
    }
  }
`;

const PostCardLikeMutation = graphql`
  mutation PostCardLikeMutation($id: ID!, $doesLike: Boolean!) {
    likePost(id: $id, doesLike: $doesLike) {
      post {
        id
        likesCount
        likedByCurrentUser
      }
    }
  }
`;

const PostCard = ({ data }: PostProp) => {
  const post = useFragment(PostCardFragment, data);
  const [commitMutation, isMutationInFlight] =
    useMutation(PostCardLikeMutation);

  function onLikeButtonClicked() {
    commitMutation({
      variables: {
        id: post.id,
        doesLike: !post.likedByCurrentUser,
      },
    });
  }

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
                onClick={onLikeButtonClicked}
                disabled={isMutationInFlight}
                className="flex items-center gap-1 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <FaHeart
                  className={`w-5 h-5 transition-colors cursor-pointer ${
                    post.likedByCurrentUser ? "text-green-500" : "text-gray-500"
                  }`}
                />
              </button>
              <span className="text-sm font-bold hover:text-white text-gray-400">
                {post.likesCount}
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
