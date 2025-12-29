import { FaHeart, FaComment, FaTrash, FaEdit, FaFlag } from "react-icons/fa";
import { GiSoccerKick } from "react-icons/gi";
import { type PostProp } from "../types";
import MediaCarousel from "./MediaCarousel";
import { graphql, useMutation, useFragment } from "react-relay";
import { type PostCardLikeMutation } from "./__generated__/PostCardLikeMutation.graphql";
import { type PostCardDeletePostMutation } from "./__generated__/PostCardDeletePostMutation.graphql";
import KebabMenu, { type MenuOption } from "../../layout/KebabMenu";
import { useCurrentUser } from "../../../utils/CurrentUserContext";

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
    user {
      id
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

const PostCardDeletePostMutation = graphql`
  mutation PostCardDeletePostMutation($id: ID!, $connections: [ID!]!) {
    deletePost(id: $id) {
      id @deleteEdge(connections: $connections)
    }
  }
`;

const PostCard = ({
  data,
  connectionId,
}: PostProp & { connectionId: string }) => {
  const post = useFragment(PostCardFragment, data);
  const currentUser = useCurrentUser();
  const isOwner = currentUser?.id == post.user.id;

  const [commitLikeMutation, isLikeMutationInFlight] =
    useMutation<PostCardLikeMutation>(PostCardLikeMutation);

  const [commitDeleteMutation] = useMutation<PostCardDeletePostMutation>(
    PostCardDeletePostMutation
  );

  function onLikeButtonClicked() {
    commitLikeMutation({
      variables: {
        id: post.id,
        doesLike: !post.likedByCurrentUser,
      },
    });
  }

  function handleDelete() {
    commitDeleteMutation({
      variables: {
        id: post.id,
        connections: [connectionId],
      },
      optimisticUpdater: (store) => {
        store.delete(post.id);
      },
    });
  }

  const menuOptions: MenuOption[] = isOwner
    ? [
        {
          label: "Delete Post",
          onClick: handleDelete,
          variant: "danger",
          icon: <FaTrash className="w-4 h-4" />,
        },
        {
          label: "Edit Post",
          onClick: () => {},
          icon: <FaEdit className="w-4 h-4" />,
        },
      ]
    : [
        {
          label: "Report",
          onClick: () => {},
          icon: <FaFlag className="w-4 h-4" />,
        },
      ];

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
          <div className="ml-auto">
            <KebabMenu options={menuOptions} />
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
                disabled={isLikeMutationInFlight}
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
