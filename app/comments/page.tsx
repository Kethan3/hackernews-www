// "use client";

// import React, { useEffect, useState } from "react";
// import Link from "next/link";

// interface Comment {
//   id: string;
//   content: string;
//   userId: string;
//   createdAt: string;
//   updatedAt: string;
//   postId: string | null;
//   post: {
//     id: string;
//     title: string;
//   } | null;
// }

// const UserCommentsPage = () => {
//   const [comments, setComments] = useState<Comment[]>([]);
//   const [isLoading, setIsLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);

//   useEffect(() => {
//     const fetchComments = async () => {
//       try {
//         const response = await fetch("https://hackernews.kindbay-5679c40b.centralindia.azurecontainerapps.io/comments/me", {
//           method: "GET",
//           credentials: "include", // important if you need to send cookies/session
//         });
//         if (!response.ok) {
//           if (response.status === 404) {
//             setComments([]);
//             return;
//           }
//           throw new Error("Failed to fetch comments.");
//         }
//         const data = await response.json();
//         setComments(data.comments); // Assuming API returns { comments: [...] }
//       } catch (err: unknown) {
//         if (err instanceof Error) {
//           setError(err.message || "Something went wrong.");
//         } else {
//           setError("Something went wrong.");
//         }
//       } finally {
//         setIsLoading(false);
//       }
//     };

//     fetchComments();
//   }, []);

//   const formatDate = (dateString: string) => {
//     const date = new Date(dateString);
//     return date.toLocaleString([], { year: "numeric", month: "long", day: "numeric", hour: "2-digit", minute: "2-digit" });
//   };

//   if (isLoading) {
//     return <div className="text-center text-gray-600 mt-10">Loading comments...</div>;
//   }

//   if (error) {
//     return <div className="text-center text-red-500 mt-10">Error: {error}</div>;
//   }

//   if (comments.length === 0) {
//     return (
//       <div className="text-center text-gray-600 mt-10">
//         No comments yet.
//         <div className="mt-4">
//           <Link href="/" className="text-blue-600 hover:underline">
//             Browse Posts
//           </Link>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="max-w-3xl mx-auto mt-6 space-y-4">
//       {comments.map((comment) => (
//         <div
//           key={comment.id}
//           className="border rounded-lg p-4 shadow hover:shadow-md transition"
//         >
//           <div className="text-sm text-gray-500 mb-1">
//             Commented on:
//             {comment.post ? (
//               <Link
//                 href={`/posts/${comment.post.id}`}
//                 className="ml-1 text-blue-700 hover:underline"
//               >
//                 {comment.post.title}
//               </Link>
//             ) : (
//               <span className="ml-1 italic text-gray-400">Unknown Post</span>
//             )}
//           </div>
//           <p className="text-gray-800">{comment.content}</p>
//           <div className="text-xs text-gray-400 mt-2">
//             {formatDate(comment.createdAt)}
//           </div>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default UserCommentsPage;

"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { betterAuthClient } from "@/lib/integrations/better-auth";
import { serverUrl } from "@/environment";

interface Comment {
  id: string;
  content: string;
  userId: string;
  createdAt: string;
  updatedAt: string;
  postId: string | null;
  post: {
    id: string;
    title: string;
  } | null;
}

const UserCommentsPage = () => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [sessionLoading, setSessionLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const router = useRouter();
  const { data: session } = betterAuthClient.useSession();

  useEffect(() => {
    if (session !== undefined) {
      setSessionLoading(false);
    }
  }, [session]);

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await fetch(
          `${serverUrl}/comments/me`,
          {
            method: "GET",
            credentials: "include",
          }
        );
        if (!response.ok) {
          if (response.status === 404) {
            setComments([]);
            return;
          }
          throw new Error("Failed to fetch comments.");
        }
        const data = await response.json();
        setComments(data.comments);
      } catch (err: unknown) {
        if (err instanceof Error) {
          setError(err.message || "Something went wrong.");
        } else {
          setError("Something went wrong.");
        }
      } finally {
        setIsLoading(false);
      }
    };

    if (session?.user) {
      fetchComments();
    }
  }, [session]);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString([], {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  if (sessionLoading) {
    return (
      <div className="text-center text-gray-600 mt-10">Loading comments...</div>
    );
  }

  if (!session?.user) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-[#F1F1DB]">
        <div className="text-center p-8 bg-white rounded-2xl shadow-md">
          <h2 className="text-2xl font-bold mb-4 text-red-600">
            You must be logged in to view your comments!
          </h2>
          <button
            onClick={() => router.push("/login")}
            className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors"
          >
            Go to Login
          </button>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="text-center text-gray-600 mt-10">Loading comments...</div>
    );
  }

  if (error) {
    return <div className="text-center text-red-500 mt-10">Error: {error}</div>;
  }

  if (comments.length === 0) {
    return (
      <div className="text-center text-gray-600 mt-10">
        No comments yet.
        <div className="mt-4">
          <Link href="/" className="text-blue-600 hover:underline">
            Browse Posts
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto mt-6 space-y-4">
      {comments.map((comment) => (
        <div
          key={comment.id}
          className="border rounded-lg p-4 shadow hover:shadow-md transition"
        >
          <div className="text-sm text-gray-500 mb-1">
            Commented on:
            {comment.post ? (
              <Link
                href={`/posts/${comment.post.id}`}
                className="ml-1 text-blue-700 hover:underline"
              >
                {comment.post.title}
              </Link>
            ) : (
              <span className="ml-1 italic text-gray-400">Unknown Post</span>
            )}
          </div>
          <p className="text-gray-800">{comment.content}</p>
          <div className="text-xs text-gray-400 mt-2">
            {formatDate(comment.createdAt)}
          </div>
        </div>
      ))}
    </div>
  );
};

export default UserCommentsPage;
