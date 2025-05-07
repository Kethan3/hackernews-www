

// "use client";

// import React, { useEffect, useState } from "react";
// import Link from "next/link";
// import Likes from "./likes";
// import Comments from "./comments";
// import { serverUrl } from "@/environment";

// interface Post {
//   id: string;
//   title: string;
//   content: string;
//   userId: string;
//   createdAt: string;
//   updatedAt: string;
// }

// const PostList = () => {
//   const [posts, setPosts] = useState<Post[]>([]);
//   const [isLoading, setIsLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);
//   const [formattedPosts, setFormattedPosts] = useState<Post[]>([]);

//   useEffect(() => {
//     const fetchPosts = async () => {
//       try {
//         const response = await fetch(`${serverUrl}/posts`);
//         if (!response.ok) {
//           throw new Error("Failed to fetch posts.");
//         }
//         const data: { posts: Post[] } = await response.json();
//         setPosts(data.posts);
//       } catch (err: unknown) {
//         if (err instanceof Error) {
//           setError(err.message);
//         } else {
//           setError("Something went wrong.");
//         }
//       } finally {
//         setIsLoading(false);
//       }
//     };

//     fetchPosts();
//   }, []);

//   useEffect(() => {
//     if (posts.length > 0) {
//       setFormattedPosts(
//         posts.map((post) => ({
//           ...post,
//           createdAt: new Date(post.createdAt).toLocaleString("en-IN", {
//             day: "2-digit",
//             month: "2-digit",
//             year: "numeric",
//             hour: "2-digit",
//             minute: "2-digit",
//             hour12: true,
//             timeZone: "Asia/Kolkata",
//           }),
//         }))
//       );
//     }
//   }, [posts]);

//   if (isLoading) {
//     return <div className="text-center text-gray-600 mt-10">Loading posts...</div>;
//   }

//   if (error) {
//     return <div className="text-center text-red-500 mt-10">Error: {error}</div>;
//   }

//   if (posts.length === 0) {
//     return <div className="text-center text-gray-600 mt-10">No posts found. Be the first to post!</div>;
//   }

//   return (
//     <div className="max-w-3xl mx-auto mt-6 space-y-8">
//       {formattedPosts.map((post) => (
//         <div key={post.id} className="border rounded-lg p-6 shadow hover:shadow-md transition">
//           <Link href={`/posts/${post.id}`} className="text-xl font-bold text-blue-700 hover:underline">
//             {post.title}
//           </Link>
//           <p className="mt-2 text-gray-700">{post.content}</p>
//           <div className="text-sm text-gray-500 mt-2">
//             Posted on {post.createdAt}
//           </div>

//           <div className="mt-4 flex gap-4 items-center">
//             <Likes postId={post.id} />
//             <Comments postId={post.id} />
//           </div>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default PostList;



"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import Likes from "./likes";
import Comments from "./comments";
import { serverUrl } from "@/environment";
import { Card, CardContent } from "@/components/ui/card";
import { Spinner } from "@/components/ui/spinner";

interface Post {
  id: string;
  title: string;
  content: string;
  userId: string;
  createdAt: string;
  updatedAt: string;
}

const PostList = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch(`${serverUrl}/posts`);
        if (!response.ok) throw new Error("Failed to fetch posts.");
        const data: { posts: Post[] } = await response.json();
        setPosts(data.posts);
      } catch (err: any) {
        setError(err.message || "Something went wrong.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchPosts();
  }, []);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center mt-10">
        <Spinner size={40} className="text-muted-foreground" />
      </div>
    );
  }

  if (error) {
    return <div className="text-center text-red-500 mt-10">Error: {error}</div>;
  }

  if (posts.length === 0) {
    return (
      <div className="text-center text-gray-600 mt-10">
        No posts found. Be the first to post!
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto mt-6 space-y-6">
      {posts.map((post) => (
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
    </div>
  );
};

export default PostList;
