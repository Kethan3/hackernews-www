// "use client";

// import { useEffect, useState } from "react";
// import { serverUrl } from "@/environment";
// import { betterAuthClient } from "@/lib/integrations/better-auth";

// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
// import { Spinner } from "@/components/ui/spinner";

// import {
//   UserIcon,
//   FileText,
//   MessageSquare,
//   Heart,
//   Trash2,
// } from "lucide-react";

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
//   const [deletingPostId, setDeletingPostId] = useState<string | null>(null);

//   const fetchUserInfo = async () => {
//     if (!data?.user?.id) return;

//     try {
//       const res = await fetch(`${serverUrl}/users/me`, {
//         method: "GET",
//         credentials: "include",
//       });
//       const json = await res.json();
//       if (res.ok) {
//         setUserData(json);
//       } else {
//         console.error(json.error || "Failed to fetch user info");
//       }
//     } catch (err) {
//       console.error("Error fetching user info:", err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchUserInfo();
//   }, [data?.user?.id]);

//   const deletePost = async (postId: string) => {
//     if (!window.confirm("Are you sure you want to delete this post?")) return;

//     try {
//       setDeletingPostId(postId);
//       const res = await fetch(`${serverUrl}/posts/${postId}`, {
//         method: "DELETE",
//         credentials: "include",
//       });
//       if (!res.ok) {
//         const err = await res.json();
//         throw new Error(err.error || "Failed to delete post.");
//       }
//       setUserData((prev) =>
//         prev
//           ? {
//               ...prev,
//               user: {
//                 ...prev.user,
//                 posts: prev.user.posts.filter((p) => p.id !== postId),
//               },
//             }
//           : null
//       );
//     } catch (err) {
//       alert(err instanceof Error ? err.message : "Unknown error");
//     } finally {
//       setDeletingPostId(null);
//     }
//   };

//   if (loading) {
//     return (
//       <div className="flex justify-center items-center h-64">
//         <Spinner size={32} className="text-primary" />
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
//     <div className="max-w-4xl mx-auto p-6 space-y-6">
//       <Card>
//         <CardHeader>
//           <CardTitle className="flex items-center gap-2 text-green-700">
//             <UserIcon className="w-6 h-6" />
//             Your Profile
//           </CardTitle>
//           <CardDescription className="text-gray-500">
//             Welcome back, {username}!
//           </CardDescription>
//         </CardHeader>
//         <CardContent className="space-y-2 text-sm text-gray-700">
//           <p>
//             <span className="font-semibold">Name:</span> {name || "N/A"}
//           </p>
//           <p>
//             <span className="font-semibold">About:</span>{" "}
//             {about || "No about section provided."}
//           </p>
//           <p>
//             <span className="font-semibold">Joined:</span>{" "}
//             {new Date(createdAt).toLocaleDateString()}
//           </p>
//           <div className="flex gap-4 mt-4 text-gray-600">
//             <span className="flex items-center gap-1">
//               <FileText className="w-4 h-4" />
//               Posts: {posts.length}
//             </span>
//             <span className="flex items-center gap-1">
//               <MessageSquare className="w-4 h-4" />
//               Comments: {comments.length}
//             </span>
//             <span className="flex items-center gap-1">
//               <Heart className="w-4 h-4" />
//               Likes: {likes.length}
//             </span>
//           </div>
//         </CardContent>
//       </Card>

//       <div className="space-y-3">
//         <h2 className="text-xl font-semibold text-green-600">Your Posts</h2>
//         {posts.length > 0 ? (
//           <div className="space-y-4">
//             {posts.map((post) => (
//               <Card key={post.id}>
//                 <CardContent className="p-4 flex justify-between items-start">
//                   <div>
//                     <a
//                       href={`/posts/${post.id}`}
//                       className="text-blue-600 hover:underline font-medium"
//                     >
//                       {post.title}
//                     </a>
//                     <p className="text-sm text-gray-500">
//                       {new Date(post.createdAt).toLocaleDateString()}
//                     </p>
//                   </div>
//                   <Button
//                     variant="ghost"
//                     size="icon"
//                     onClick={() => deletePost(post.id)}
//                     disabled={deletingPostId === post.id}
//                   >
//                     {deletingPostId === post.id ? (
//                       <Spinner size={18} className="text-destructive" />
//                     ) : (
//                       <Trash2 className="w-5 h-5 text-destructive" />
//                     )}
//                   </Button>
//                 </CardContent>
//               </Card>
//             ))}
//           </div>
//         ) : (
//           <p className="text-gray-500">You haven&apos;t written any posts yet.</p>
//         )}
//       </div>
//     </div>
//   );
// };

// export default UserProfilePage;


"use client";

import { useEffect, useState } from "react";
import { betterAuthClient } from "@/lib/integrations/better-auth";
import { serverUrl } from "@/environment";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Spinner } from "@/components/ui/spinner";
import { UserIcon, FileText, MessageSquare, Heart } from "lucide-react";
import Posts from "./_components/posts";
import Comments from "./_components/comments";
import Likes from "./_components/likes";

interface Post {
  id: string;
  title: string;
  content: string;
  createdAt: string;
}

interface Comment {
  id: string;
  content: string;
  post: {
    id: string;
    title: string;
  };
  createdAt: string;
}

interface Like {
  id: string;
  post: {
    id: string;
    title: string;
  };
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

    if (data?.user?.id) {
      fetchUserInfo();
    } else {
      setLoading(false);
    }
  }, [data?.user?.id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Spinner size={24} />
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
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-green-700">
            <UserIcon className="w-6 h-6" />
            Your Profile
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
          <p>
            <span className="font-semibold">Username:</span> {username || "N/A"}
          </p>
          <p>
            <span className="font-semibold">Name:</span> {name || "N/A"}
          </p>
          <p>
            <span className="font-semibold">About:</span>{" "}
            {about || "No about section provided."}
          </p>
          <p>
            <span className="font-semibold">Joined:</span>{" "}
            {new Date(createdAt).toLocaleDateString()}
          </p>
          <div className="flex gap-4 mt-4 text-gray-600 dark:text-gray-400">
            <span className="flex items-center gap-1">
              <FileText className="w-4 h-4" />
              Posts: {posts.length}
            </span>
            <span className="flex items-center gap-1">
              <MessageSquare className="w-4 h-4" />
              Comments: {comments.length}
            </span>
            <span className="flex items-center gap-1">
              <Heart className="w-4 h-4" />
              Likes: {likes.length}
            </span>
          </div>
        </CardContent>
      </Card>

      <Posts posts={posts} />
      <Comments comments={comments} />
      <Likes likes={likes} />
    </div>
  );
};

export default UserProfilePage;
