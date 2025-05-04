// "use client";

// import { betterAuthClient } from "@/lib/integrations/better-auth";
// import { useEffect, useState } from "react";

// interface Post {
//   id: string;
//   title: string;
//   createdAt: string;
// }

// interface Comment {
//   id: string;
//   content: string;
//   postId: string;
//   createdAt: string;
// }

// interface Like {
//   id: string;
//   postId: string;
//   createdAt: string;
// }

// interface UserData {
//   user: {
//     id: string;
//     username: string;
//     name: string;
//     about: string;
//     createdAt: string;
//     updatedAt: string;
//     posts: Post[];
//     comments: Comment[];
//     likes: Like[];
//   };
// }

// const UserProfilePage = () => {
//   const { data } = betterAuthClient.useSession();
//   const [userData, setUserData] = useState<UserData | null>(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchUserInfo = async () => {
//       if (!data?.user?.id) return;

//       try {
//         const res = await fetch(`http://localhost:3000/users/me`,{
//                method : "GET",
//                 credentials: "include",
              
//         });
//         const json = await res.json();
//         if (res.ok) {
//           setUserData(json);
//         } else {
//           console.error(json.error || "Failed to fetch user info");
//         }
//       } catch (err) {
//         console.error("Error fetching user info:", err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchUserInfo();
//   }, [data?.user?.id]);

//   if (loading) {
//     return (
//       <div className="p-6 text-center text-gray-700 text-lg">
//         Loading your profile...
//       </div>
//     );
//   }

//   if (!data?.user || !userData) {
//     return (
//       <div className="p-6 text-center text-red-600">
//         You must be logged in to view this page.
//       </div>
//     );
//   }

//   const { username, name, about, createdAt, posts, comments, likes } = userData.user;

//   return (
//     <div className="max-w-3xl mx-auto p-6 space-y-6">
//       <h1 className="text-3xl font-bold text-green-700">Your Profile</h1>

//       <div className="bg-white rounded-xl shadow p-5 space-y-2">
//         <p><span className="font-semibold text-gray-700">Username:</span> {username}</p>
//         <p><span className="font-semibold text-gray-700">Name:</span> {name || "N/A"}</p>
//         <p><span className="font-semibold text-gray-700">About:</span> {about || "No about section provided."}</p>
//         <p><span className="font-semibold text-gray-700">Joined:</span> {new Date(createdAt).toLocaleDateString()}</p>
//         <div className="flex gap-4 text-sm text-gray-600 mt-2">
//           <span>📝 Posts: {posts.length}</span>
//           <span>💬 Comments: {comments.length}</span>
//           <span>❤️ Likes: {likes.length}</span>
//         </div>
//       </div>

//       <div className="space-y-3">
//         <h2 className="text-xl font-semibold text-green-600">Your Posts</h2>
//         {posts.length > 0 ? (
//           <ul className="list-disc pl-6 space-y-1 text-gray-700">
//             {posts.map((post) => (
//               <li key={post.id}>
//                 <a href={`/posts/${post.id}`} className="text-blue-600 hover:underline">
//                   {post.title}
//                 </a>{" "}
//                 <span className="text-sm text-gray-500">({new Date(post.createdAt).toLocaleDateString()})</span>
//               </li>
//             ))}
//           </ul>
//         ) : (
//           <p className="text-gray-500">You haven't written any posts yet.</p>
//         )}
//       </div>
//     </div>
//   );
// };

// export default UserProfilePage;


"use client";

import { serverUrl } from "@/environment";
import { betterAuthClient } from "@/lib/integrations/better-auth";
import { useEffect, useState } from "react";

interface Post {
  id: string;
  title: string;
  createdAt: string;
}

interface Comment {
  id: string;
  content: string;
  postId: string;
  createdAt: string;
}

interface Like {
  id: string;
  postId: string;
  createdAt: string;
}

interface UserData {
  user: {
    id: string;
    username: string;
    name: string;
    about: string;
    createdAt: string;
    updatedAt: string;
    posts: Post[];
    comments: Comment[];
    likes: Like[];
  };
}

const UserProfilePage = () => {
  const { data } = betterAuthClient.useSession();
  const [userData, setUserData] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserInfo = async () => {
      if (!data?.user?.id) return;

      try {
        const res = await fetch(`${serverUrl}/users/me`, {
          method: "GET",
          credentials: "include",
        });
        const json = await res.json();
        if (res.ok) {
          setUserData(json);
        } else {
          console.error(json.error || "Failed to fetch user info");
        }
      } catch (err) {
        console.error("Error fetching user info:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchUserInfo();
  }, [data?.user?.id]);

  if (loading) {
    return (
      <div className="p-6 text-center text-gray-700 text-lg">
        Loading your profile...
      </div>
    );
  }

  if (!data?.user || !userData) {
    return (
      <div className="p-6 text-center text-red-600">
        You must be logged in to view this page.
      </div>
    );
  }

  const { username, name, about, createdAt, posts, comments, likes } = userData.user;

  return (
    <div className="max-w-3xl mx-auto p-6 space-y-6">
      <h1 className="text-3xl font-bold text-green-700">Your Profile</h1>

      <div className="bg-white rounded-xl shadow p-5 space-y-2">
        <p>
          <span className="font-semibold text-gray-700">Username:</span> {username}
        </p>
        <p>
          <span className="font-semibold text-gray-700">Name:</span> {name || "N/A"}
        </p>
        <p>
          <span className="font-semibold text-gray-700">About:</span> {about || "No about section provided."}
        </p>
        <p>
          <span className="font-semibold text-gray-700">Joined:</span> {new Date(createdAt).toLocaleDateString()}
        </p>
        <div className="flex gap-4 text-sm text-gray-600 mt-2">
          <span>📝 Posts: {posts.length}</span>
          <span>💬 Comments: {comments.length}</span>
          <span>❤️ Likes: {likes.length}</span>
        </div>
      </div>

      <div className="space-y-3">
        <h2 className="text-xl font-semibold text-green-600">Your Posts</h2>
        {posts.length > 0 ? (
          <ul className="list-disc pl-6 space-y-1 text-gray-700">
            {posts.map((post) => (
              <li key={post.id}>
                <a href={`/posts/${post.id}`} className="text-blue-600 hover:underline">
                  {post.title}
                </a>{" "}
                <span className="text-sm text-gray-500">({new Date(post.createdAt).toLocaleDateString()})</span>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500">You haven&apos;t written any posts yet.</p> 
        )}
      </div>
    </div>
  );
};

export default UserProfilePage;
