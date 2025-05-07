

// "use client";

// import React, { useEffect, useState } from "react";
// import Link from "next/link";
// import Likes from "./likes";
// import Comments from "./comments";
// import { serverUrl } from "@/environment";
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

// const PostList = () => {
//   const [posts, setPosts] = useState<Post[]>([]);
//   const [isLoading, setIsLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);

//   useEffect(() => {
//     const fetchPosts = async () => {
//       try {
//         const response = await fetch(`${serverUrl}/posts`);
//         if (!response.ok) throw new Error("Failed to fetch posts.");
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

//   if (isLoading) {
//     return (
//       <div className="flex justify-center items-center mt-10">
//         <Spinner size={40} className="text-muted-foreground" />
//       </div>
//     );
//   }

//   if (error) {
//     return <div className="text-center text-red-500 mt-10">Error: {error}</div>;
//   }

//   if (posts.length === 0) {
//     return (
//       <div className="text-center text-gray-600 mt-10">
//         No posts found. Be the first to post!
//       </div>
//     );
//   }

//   return (
//     <div className="max-w-3xl mx-auto mt-6 space-y-6">
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

import { useEffect, useState } from "react";
import CreatePost from "../pages/CreatePost";
import { serverUrl } from "@/environment";

type Post = {
  id: string;
  title: string;
  content: string;
  author: {
    name: string;
  };
  createdAt: string;
};

type PostCardProps = {
  post: Post;
};

const PostCard = ({ post }: PostCardProps) => (
  <div className="border rounded p-4 shadow-sm">
    <h2 className="text-xl font-bold">{post.title}</h2>
    <p className="text-gray-700 mt-2">{post.content}</p>
    <p className="text-sm text-gray-500 mt-2">
      Posted by {post.author?.name ?? "Anonymous"} on{" "}
      {new Date(post.createdAt).toLocaleString()}
    </p>
  </div>
);

const PostList = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const fetchPosts = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const res = await fetch(`${serverUrl}/posts`, {
        credentials: "include",
      });
      if (!res.ok) throw new Error("Failed to fetch posts");
      const data = await res.json();
      setPosts(data.posts);
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Unknown error");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const checkAuth = async () => {
    try {
      const res = await fetch(`${serverUrl}/auth/session`, {
        credentials: "include",
      });
      setIsLoggedIn(res.ok);
    } catch {
      setIsLoggedIn(false);
    }
  };

  useEffect(() => {
    fetchPosts();
    checkAuth();
  }, []);

  return (
    <div className="max-w-4xl mx-auto px-4 py-6 grid grid-cols-1 md:grid-cols-3 gap-6">
      <div className="md:col-span-2 space-y-4">
        {isLoading && <p>Loading...</p>}
        {error && <p className="text-red-500">{error}</p>}
        {!isLoading &&
          !error &&
          posts.map((post) => <PostCard key={post.id} post={post} />)}
      </div>

      <div className="md:col-span-1">
        <CreatePost onPostCreated={fetchPosts} isLoggedIn={isLoggedIn} />
      </div>
    </div>
  );
};

export default PostList;
