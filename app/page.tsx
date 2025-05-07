
// import React from 'react'
// import PostList from './pages/PostsLists'

// const RootPage = () => {
//   return (
//     <PostList />
//   )
// }

// export default RootPage
"use client";

import React from "react";
import { betterAuthClient } from "@/lib/integrations/better-auth";
import PostList from "./pages/PostsLists";
import { CreatePost } from "./pages/CreatePost";

const RootPage = () => {
  const { data: session } = betterAuthClient.useSession(); // check user session

  return (
    <div className="max-w-7xl mx-auto p-4 grid grid-cols-1 md:grid-cols-3 gap-6">
      {/* Left side: Post list */}
      <div className="md:col-span-2">
        <PostList />
      </div>

      {/* Right side: Create Post button */}
      {session && (
        <div className="md:col-span-1 flex justify-center items-start pt-4">
          <CreatePost />
        </div>
      )}
    </div>
  );
};

export default RootPage;


