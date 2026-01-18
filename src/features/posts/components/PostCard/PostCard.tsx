import { useState } from "react";
import { FaHeart, FaComment, FaTrash, FaEdit, FaFlag } from "react-icons/fa";
import { GiSoccerKick } from "react-icons/gi";
import { type PostProp } from "../../types";
import { MediaCarousel } from "./MediaCarousel";
import { EditPost } from "../EditPost";
import { Comments } from "../Comments";
import { graphql, useMutation, useFragment } from "react-relay";
import { type PostCardLikeMutation } from "./__generated__/PostCardLikeMutation.graphql";
import { type PostCardDeletePostMutation } from "./__generated__/PostCardDeletePostMutation.graphql";
import { KebabMenu, type MenuOption } from "@/components/layout";
import { useCurrentUser } from "@/utils/CurrentUserContext";

const PostCardFragment = graphql`
  fragment PostCardFragment on Post {
    id
    caption
    insertedAt
    postLikesCount
    likedByCurrentUser
    wasEdited
    commentsCount
    ...CommentsFragment
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
        postLikesCount
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

export const PostCard = ({
  data,
  connectionId,
}: PostProp & { connectionId: string }) => {
  const post = useFragment(PostCardFragment, data);
  const currentUser = useCurrentUser();
  const isOwner = currentUser?.id == post.user.id;
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isCommentSectionOpen, setIsCommentSectionOpen] = useState(false);

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

  function handleEdit() {
    setIsEditModalOpen(true);
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
          onClick: handleEdit,
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
    <>
      <div className="w-full max-w-6xl px-6 mt-4">
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
            <div className="flex flex-col">
              <div className="flex items-center gap-2">
                <span className="text-gray-400 text-sm">
                  {post.insertedAt && new Date(post.insertedAt).toDateString()}
                </span>
                {post.wasEdited && (
                  <span className="text-xs text-gray-500 italic">(edited)</span>
                )}
              </div>
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
                      post.likedByCurrentUser
                        ? "text-green-500"
                        : "text-gray-500"
                    }`}
                  />
                </button>
                <span className="text-sm font-bold hover:text-white text-gray-400">
                  {post.postLikesCount}
                </span>
              </div>

              {/* Comments */}
              <button
                onClick={() => setIsCommentSectionOpen(!isCommentSectionOpen)}
                className="flex items-center gap-1 text-gray-400 hover:text-white transition-all cursor-pointer"
              >
                <FaComment
                  className={`w-5 h-5 ${
                    isCommentSectionOpen ? "text-green-500" : ""
                  }`}
                />
                <span className="text-sm font-bold">{post.commentsCount}</span>
              </button>

              {/* Sports Icon */}
              <div className="flex items-center gap-1 text-gray-400 hover:text-white transition-all">
                <GiSoccerKick className="w-5 h-5" />
                {/* <span className="text-sm font-bold">{post.likes}</span> */}
              </div>
            </div>
          </div>

          {/* Comment Section Inline */}
          {isCommentSectionOpen && (
            <Comments
              postFragmentKey={post}
              onClose={() => setIsCommentSectionOpen(false)}
            />
          )}
        </div>
      </div>

      {/* Edit Modal */}
      {isEditModalOpen && (
        <EditPost
          postId={post.id}
          currentCaption={post.caption}
          insertedAt={post.insertedAt}
          onClose={() => setIsEditModalOpen(false)}
        />
      )}
    </>
  );
};
