import React from "react";
import { FaHeart, FaComment } from "react-icons/fa";
import { GiSoccerKick } from "react-icons/gi";

export interface Post {
  id: number;
  created_at: Date;
  likes?: number;
  title: string;
  description: string;
  picture?: string;
}

const posts: Post[] = [
  {
    id: 1,
    created_at: new Date("2024-12-25T14:30:00"),
    likes: 3,
    title: "Picture 1",
    description:
      "This is the card body. Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    picture:
      "https://images.unsplash.com/photo-1486286701208-1d58e9338013?w=800&auto=format&fit=crop&q=60",
  },
  {
    id: 2,
    created_at: new Date("2024-12-25T12:30:00"),
    likes: 6,
    title: "Picture 2",
    description:
      "This is the card body. Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    picture:
      "https://plus.unsplash.com/premium_photo-1661868926397-0083f0503c07?w=800&auto=format&fit=crop&q=60",
  },
];

const PostCard = () => {
  return (
    <div className="w-full max-w-screen-lg px-4">
      {posts.map((post: Post) => (
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
              <h2 className="text-white font-bold">{post.title}</h2>
              <span className="text-gray-400 text-sm">
                {post.created_at.toDateString()}
              </span>
            </div>
          </div>

          {/* Card Image */}
          {post.picture && (
            <div className="relative w-full h-72 overflow-hidden">
              <img
                src={post.picture}
                alt={post.title}
                className="w-full h-full object-cover rounded-t-xl"
              />
            </div>
          )}

          {/* Card Body */}
          <div className="p-4">
            <p className="text-gray-300 mb-4">{post.description}</p>

            {/* Card Footer */}
            <div className="flex items-center gap-4">
              {/* Likes */}
              <div className="flex items-center gap-1 text-gray-400 hover:text-white transition-all">
                <FaHeart className="w-5 h-5" />
                <span className="text-sm font-bold">{post.likes}</span>
              </div>

              {/* Comments */}
              <div className="flex items-center gap-1 text-gray-400 hover:text-white transition-all">
                <FaComment className="w-5 h-5" />
                <span className="text-sm font-bold">{post.likes}</span>
              </div>

              {/* Sports Icon */}
              <div className="flex items-center gap-1 text-gray-400 hover:text-white transition-all">
                <GiSoccerKick className="w-5 h-5" />
                <span className="text-sm font-bold">{post.likes}</span>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default PostCard;
