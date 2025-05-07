
// import React from 'react'
// import PostList from './pages/PostsLists'

// const RootPage = () => {
//   return (
//     <PostList />
//   )
// }

// export default RootPage

"use client";

import React, { useEffect, useState } from "react";
import { betterAuthClient } from "@/lib/integrations/better-auth";
import { serverUrl } from "@/environment";

import { CreatePost } from "./pages/CreatePost";
import PostList from "./pages/PostsLists";

const RootPage = () => {
  const { data: session } = betterAuthClient.useSession();

  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchPosts = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${serverUrl}/posts`);
      const data = await res.json();
      setPosts(data.posts);
    } catch (error) {
      console.error("Failed to fetch posts:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <div className="max-w-5xl mx-auto p-4 space-y-6">
      {session && (
        <div className="flex justify-end md:justify-end">
          <CreatePost onPostCreated={fetchPosts} />
        </div>
      )}

      <PostList posts={posts} loading={loading} />
    </div>
  );
};

export default RootPage;




