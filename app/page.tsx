
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

const RootPage = () => {
  return (
    <div className="max-w-7xl mx-auto p-4 grid grid-cols-1 md:grid-cols-3 gap-6">
      {/* Posts List Section */}
      <div className="md:col-span-2">
        <PostList />
      </div>

      {/* Create Post Button Section (Visible only if logged in) */}
      <div className="md:col-span-1 flex justify-center items-center">
        <PostList />
      </div>
    </div>
  );
};

export default RootPage;
