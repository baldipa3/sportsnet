import { FaHeart, FaComment } from "react-icons/fa";
import { GiSoccerKick } from "react-icons/gi";
import { type PostProp } from "../../types/post";
import MediaCarousel from "../MediaCarousel";

const PostCard = ({ post }: PostProp) => {
  console.log(post);
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
        {/* Card Image */}
        {/* {post.picture && (
          <div className="relative w-full h-72 overflow-hidden">
            <img
              src={post.picture}
              alt={post.caption}
              className="w-full h-full object-cover rounded-t-xl"
            />
          </div>
        )}    */}

        <MediaCarousel post={post} />

        {/* Card Body */}
        <div className="p-4">
          <p className="text-gray-300 mb-4">{post.caption}</p>

          {/* Card Footer */}
          <div className="flex items-center gap-4">
            {/* Likes */}
            <div className="flex items-center gap-1 text-gray-400 hover:text-white transition-all">
              <FaHeart className="w-5 h-5" />
              {/* <span className="text-sm font-bold">{post.likes}</span> */}
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
