
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
import Likes from "./likes";
import Comments from "./comments";
import { Card, CardContent } from "@/components/ui/card";
import { Spinner } from "@/components/ui/spinner";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationPrevious,
  PaginationNext,
  PaginationEllipsis,
} from "@/components/ui/pagination"; // Importing the pagination components

interface Post {
  id: string;
  title: string;
  content: string;
  userId: string;
  createdAt: string;
  updatedAt: string;
}

const PostList = ({
  posts,
  loading,
}: {
  posts: Post[];
  loading: boolean;
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(10);

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);

  const totalPages = Math.ceil(posts.length / postsPerPage);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center mt-10">
        <Spinner size={40} className="text-muted-foreground" />
      </div>
    );
  }

  if (posts.length === 0) {
    return (
      <div className="text-center text-gray-600 mt-10">
        No posts found. Be the first to post!
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {currentPosts.map((post) => (
        <Card key={post.id}>
          <CardContent className="p-6 space-y-3">
            <Link
              href={`/posts/${post.id}`}
              className="text-xl font-semibold text-primary underline-offset-4 hover:underline"
            >
              {post.title}
            </Link>
            <p className="text-gray-700">{post.content}</p>
            <p className="text-sm text-muted-foreground">
              Posted on{" "}
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
              <Likes postId={post.id} />
              <Comments postId={post.id} />
            </div>
          </CardContent>
        </Card>
      ))}

      {totalPages > 1 && (
        <div className="flex justify-center mt-6">
          <Pagination>
            <PaginationContent>
              <PaginationPrevious
                onClick={() => handlePageChange(currentPage - 1)}
                isActive={currentPage > 1}
              />
              {[...Array(totalPages)].map((_, index) => (
                <PaginationItem key={index}>
                  <PaginationLink
                    onClick={() => handlePageChange(index + 1)}
                    isActive={currentPage === index + 1}
                  >
                    {index + 1}
                  </PaginationLink>
                </PaginationItem>
              ))}
              <PaginationNext
                onClick={() => handlePageChange(currentPage + 1)}
                isActive={currentPage < totalPages}
              />
            </PaginationContent>
          </Pagination>
        </div>
      )}
    </div>
  );
};

export default PostList;
