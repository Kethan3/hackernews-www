
// import React from 'react'
// import PostList from './pages/PostsLists'

// const RootPage = () => {
//   return (
//     <PostList />
//   )
// }

// export default RootPage
import React from "react";
import PostList from "./pages/PostsLists";
import CreatePost from "./pages/CreatePost";
import { betterAuthClient } from "@/lib/integrations/better-auth";

const RootPage = () => {
  const { data: session } = betterAuthClient.useSession(); // Using betterAuthClient to get session data

  return (
    <div className="max-w-7xl mx-auto p-4 grid grid-cols-1 md:grid-cols-3 gap-6">
      {/* Posts List Section */}
      <div className="md:col-span-2">
        <PostList />
      </div>

      {/* Create Post Button Section (Visible only if logged in) */}
      {session && (
        <div className="md:col-span-1 flex justify-center items-center">
          <CreatePost onPostCreated={() => {}} />
        </div>
      )}
    </div>
  );
};

export default RootPage;

