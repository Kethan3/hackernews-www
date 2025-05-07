

// "use client";

// import React, { useEffect, useState } from "react";
// import Link from "next/link";
// import { useRouter } from "next/navigation";
// import { betterAuthClient } from "@/lib/integrations/better-auth";
// import { serverUrl } from "@/environment";

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
//   const [sessionLoading, setSessionLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);

//   const router = useRouter();
//   const { data: session } = betterAuthClient.useSession();

//   useEffect(() => {
//     if (session !== undefined) {
//       setSessionLoading(false);
//     }
//   }, [session]);

//   useEffect(() => {
//     const fetchComments = async () => {
//       try {
//         const response = await fetch(
//           `${serverUrl}/comments/me`,
//           {
//             method: "GET",
//             credentials: "include",
//           }
//         );
//         if (!response.ok) {
//           if (response.status === 404) {
//             setComments([]);
//             return;
//           }
//           throw new Error("Failed to fetch comments.");
//         }
//         const data = await response.json();
//         setComments(data.comments);
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

//     if (session?.user) {
//       fetchComments();
//     }
//   }, [session]);

//   const formatDate = (dateString: string) => {
//     const date = new Date(dateString);
//     return date.toLocaleString([], {
//       year: "numeric",
//       month: "long",
//       day: "numeric",
//       hour: "2-digit",
//       minute: "2-digit",
//     });
//   };

//   if (sessionLoading) {
//     return (
//       <div className="text-center text-gray-600 mt-10">Loading comments...</div>
//     );
//   }

//   if (!session?.user) {
//     return (
//       <div className="flex items-center justify-center min-h-screen bg-[#F1F1DB]">
//         <div className="text-center p-8 bg-white rounded-2xl shadow-md">
//           <h2 className="text-2xl font-bold mb-4 text-red-600">
//             You must be logged in to view your comments!
//           </h2>
//           <button
//             onClick={() => router.push("/login")}
//             className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors"
//           >
//             Go to Login
//           </button>
//         </div>
//       </div>
//     );
//   }

//   if (isLoading) {
//     return (
//       <div className="text-center text-gray-600 mt-10">Loading comments...</div>
//     );
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

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { serverUrl } from "@/environment";

const CreatePostPage = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    title: "",
    content: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async () => {
    if (!formData.title.trim()) {
      alert("Title is required!");
      return;
    }
    setIsSubmitting(true);
    try {
      const res = await fetch(`${serverUrl}/posts`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: formData.title,
          content: formData.content,
        }),
        credentials: "include",
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || "Failed to create post");
      }

      const data = await res.json();
      console.log("Post created:", data);
      alert("Post created successfully!");
      router.push("/");
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error("Create post error:", error);
        alert(error.message || "An error occurred while creating post.");
      } else {
        console.error("Unknown error:", error);
        alert("An unknown error occurred while creating post.");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#F1F1DB]">
      <div className="w-full max-w-lg p-8 bg-white rounded-2xl shadow-lg">
        <h1 className="text-2xl font-bold mb-6 text-amber-900 text-center">Create a New Post</h1>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Content</label>
            <textarea
              name="content"
              value={formData.content}
              onChange={handleChange}
              rows={5}
              className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>
          <button
            onClick={handleSubmit}
            disabled={isSubmitting}
            className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 transition-colors disabled:opacity-50"
          >
            {isSubmitting ? "Creating post..." : "Create Post"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreatePostPage;
