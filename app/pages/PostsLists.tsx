
// "use client";

// import React from "react";
// import Link from "next/link";
// import Likes from "./likes";
// import Comments from "./comments";
// import { Card, CardContent } from "@/components/ui/card";
// import { Spinner } from "@/components/ui/spinner";

// interface Post {
//   id: string;
//   title: string;
//   content: string;
//   userId: string;
//   createdAt: string;
//   updatedAt: string;
// }

// const PostList = ({
//   posts,
//   loading,
// }: {
//   posts: Post[];
//   loading: boolean;
// }) => {
//   if (loading) {
//     return (
//       <div className="flex justify-center items-center mt-10">
//         <Spinner size={40} className="text-muted-foreground" />
//       </div>
//     );
//   }

//   if (posts.length === 0) {
//     return (
//       <div className="text-center text-gray-600 mt-10">
//         No posts found. Be the first to post!
//       </div>
//     );
//   }

//   return (
//     <div className="space-y-6">
//       {posts.map((post) => (
//         <Card key={post.id}>
//           <CardContent className="p-6 space-y-3">
//             <Link
//               href={`/posts/${post.id}`}
//               className="text-xl font-semibold text-primary underline-offset-4 hover:underline"
//             >
//               {post.title}
//             </Link>
//             <p className="text-gray-700">{post.content}</p>
//             <p className="text-sm text-muted-foreground">
//               Posted on{" "}
//               {new Date(post.createdAt).toLocaleString("en-IN", {
//                 day: "2-digit",
//                 month: "2-digit",
//                 year: "numeric",
//                 hour: "2-digit",
//                 minute: "2-digit",
//                 hour12: true,
//                 timeZone: "Asia/Kolkata",
//               })}
//             </p>
//             <div className="flex gap-4 pt-2">
//               <Likes postId={post.id} />
//               <Comments postId={post.id} />
//             </div>
//           </CardContent>
//         </Card>
//       ))}
//     </div>
//   );
// };

// export default PostList;





"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationPrevious,
  PaginationNext,
} from "@/components/ui/pagination";
import { Card, CardContent } from "@/components/ui/card";
import { Spinner } from "@/components/ui/spinner";

// Define types
type User = {
  username: string;
  name: string;
};

type Comment = {
  id: string;
  content: string;
  createdAt: string;
  user: User;
};

type Post = {
  number: number;
  id: string;
  title: string;
  content: string;
  createdAt: string;
  updatedAt: string;
  userId: string;
  user: User;
  likeCount: number;
  likedByUser: boolean;
  comments: Comment[];
};

type PostListProps = {
  posts: Post[];
  loading: boolean;
};

export default function PostList({ posts, loading }: PostListProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const POSTS_PER_PAGE = 10;

  const totalPages = Math.ceil(posts.length / POSTS_PER_PAGE);
  const paginatedPosts = posts.slice(
    (currentPage - 1) * POSTS_PER_PAGE,
    currentPage * POSTS_PER_PAGE
  );

  const handlePrev = () => {
    if (currentPage > 1) setCurrentPage((prev) => prev - 1);
  };

  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage((prev) => prev + 1);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center mt-10">
        <Spinner size={40} className="text-muted-foreground" />
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto py-10">
      <h1 className="text-3xl font-bold mb-6">Posts</h1>

      {paginatedPosts.length === 0 ? (
        <div className="text-center text-gray-600 mt-10">
          No posts available. Be the first to post!
        </div>
      ) : (
        paginatedPosts.map((post) => (
          <Link
            key={post.id}
            href={`/posts/${post.id}`}
            className="block"
          >
            <Card className="mb-6 cursor-pointer hover:shadow-lg transition">
              <CardContent className="p-6 space-y-3">
                <h2 className="text-xl font-semibold text-primary">
                  {post.title}
                </h2>
                <p className="text-gray-700">{post.content}</p>
                <p className="text-sm text-muted-foreground">
                  Posted by {post.user.name} (@{post.user.username}) on{" "}
                  {new Date(post.createdAt).toLocaleString("en-IN", {
                    day: "2-digit",
                    month: "2-digit",
                    year: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                    hour12: true,
                    timeZone: "Asia/Kolkata",
                  })}
                </p>
                <div className="flex gap-4 pt-2">
                  <span className="text-sm text-gray-500">
                    Likes: {post.likeCount}
                  </span>
                  <span className="text-sm text-gray-500">
                    Comments: {post.comments.length}
                  </span>
                </div>
              </CardContent>
            </Card>
          </Link>
        ))
      )}

      {totalPages > 1 && (
        <Pagination className="mt-8">
          <PaginationContent>
            {currentPage > 1 && (
              <PaginationItem>
                <PaginationPrevious onClick={handlePrev} />
              </PaginationItem>
            )}

            {Array.from({ length: totalPages }, (_, i) => (
              <PaginationItem key={i}>
                <PaginationLink
                  onClick={() => setCurrentPage(i + 1)}
                  className="cursor-pointer"
                  isActive={currentPage === i + 1}
                >
                  {i + 1}
                </PaginationLink>
              </PaginationItem>
            ))}

            {currentPage < totalPages && (
              <PaginationItem>
                <PaginationNext onClick={handleNext} />
              </PaginationItem>
            )}
          </PaginationContent>
        </Pagination>
      )}
    </div>
  );
}
