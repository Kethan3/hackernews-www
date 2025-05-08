

// "use client";

// import React, { useEffect, useState } from "react";
// import { betterAuthClient } from "@/lib/integrations/better-auth";
// import { serverUrl } from "@/environment";
// import { CreatePost } from "./pages/CreatePost";
// import PostList from "./pages/PostsLists";

// const RootPage = () => {
//   const { data: session } = betterAuthClient.useSession();

//   const [posts, setPosts] = useState([]);
//   const [loading, setLoading] = useState(true);

//   const fetchPosts = async () => {
//     setLoading(true);
//     try {
//       const res = await fetch(`${serverUrl}/posts`);
//       const data = await res.json();
//       setPosts(data.posts);
//     } catch (error) {
//       console.error("Failed to fetch posts:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchPosts();
//   }, []);

//   return (
//     <div className="relative flex max-w-7xl mx-auto p-4 gap-6">
//       <div className="flex-1">
//         <PostList posts={posts} loading={loading} />
//       </div>

//       {session && (
//         <>
//           {/* Floating Button for Small Screens */}
//           <div className="fixed bottom-6 right-6 z-50 md:hidden">
//             <CreatePost floating onPostCreated={fetchPosts} />
//           </div>

//           {/* Sidebar Button for Medium & Large Screens */}
//           <div className="hidden md:block sticky top-20 h-fit">
//             <CreatePost onPostCreated={fetchPosts} />
//           </div>
//         </>
//       )}
//     </div>
//   );
// };

// export default RootPage;



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
    <div className="relative flex max-w-7xl mx-auto p-4 gap-6">
      <div className="flex-1">
        {/* Pass the currentUserId as the session's userId */}
        <PostList
          posts={posts}
          loading={loading}
          currentUserId={session?.user?.id || ""}
        />
      </div>

      {session && (
        <>
          {/* Floating Button for Small Screens */}
          <div className="fixed bottom-6 right-6 z-50 md:hidden">
            <CreatePost floating onPostCreated={fetchPosts} />
          </div>

          {/* Sidebar Button for Medium & Large Screens */}
          <div className="hidden md:block sticky top-20 h-fit">
            <CreatePost onPostCreated={fetchPosts} />
          </div>
        </>
      )}
    </div>
  );
};

export default RootPage;
