
// "use client";

// import React, { useState, useEffect, useCallback } from "react";
// import { useRouter } from "next/navigation";
// import { serverUrl } from "@/environment";

// interface CommentsProps {
//   postId: string;
// }

// interface Comment {
//   id: string;
//   content: string;
//   userId: string;
//   createdAt: string; // use string since JSON dates come as strings
//   updatedAt: string;
//   postId: string | null;
// }

// const Comments = ({ postId }: CommentsProps) => {
//   const [comments, setComments] = useState<Comment[]>([]);
//   const [content, setContent] = useState("");
//   const [showComments, setShowComments] = useState(false);
//   const router = useRouter();

//   const fetchComments = useCallback(async () => {
//     try {
//       const response = await fetch(`${serverUrl}/comments/on/${postId}` ,{
//         credentials: "include",
//       });
//       if (response.ok) {
//         const data = await response.json();
//         setComments(data.comments);
//       }
//     } catch (error) {
//       if (error instanceof Error) {
//         console.error("Failed to fetch comments", error.message);
//       } else {
//         console.error("Failed to fetch comments");
//       }
//     }
//   }, [postId]);

//   const handleAddComment = async () => {
//     try {
//       const response = await fetch(`${serverUrl}/comments/on/${postId}`, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         credentials: "include",
//         body: JSON.stringify({ content }),
//       });

//       if (response.status === 401) {
//         router.push("/login");
//         return;
//       }

//       if (response.ok) {
//         setContent("");
//         fetchComments(); // Refresh comments after adding
//       }
//     } catch (error) {
//       if (error instanceof Error) {
//         console.error("Failed to add comment", error.message);
//       } else {
//         console.error("Failed to add comment");
//       }
//     }
//   };

//   const handleDeleteComment = async (commentId: string) => {
//     try {
//       const response = await fetch(`${serverUrl}/comments/${commentId}`, {
//         method: "DELETE",
//         credentials: "include",
//       });

//       if (response.status === 401) {
//         router.push("/login");
//         return;
//       }

//       if (response.ok) {
//         setComments((prevComments) =>
//           prevComments.filter((comment) => comment.id !== commentId)
//         );
//       }
//     } catch (error) {
//       if (error instanceof Error) {
//         console.error("Failed to delete comment", error.message);
//       } else {
//         console.error("Failed to delete comment");
//       }
//     }
//   };

//   const toggleComments = () => {
//     setShowComments((prev) => !prev);
//   };

//   useEffect(() => {
//     fetchComments(); // Safe to use here due to useCallback
//   }, [fetchComments]);

//   return (
//     <div className="w-full">
//       <button
//         onClick={toggleComments}
//         className="text-sm text-green-600 hover:underline"
//       >
//         {showComments ? "Hide Comments" : "Show Comments"} ({comments.length})
//       </button>

//       {showComments && (
//         <div className="mt-4 space-y-4">
//           <div className="flex gap-2">
//             <input
//               type="text"
//               value={content}
//               onChange={(e) => setContent(e.target.value)}
//               placeholder="Write a comment..."
//               className="flex-1 border rounded px-3 py-1 text-sm"
//             />
//             <button
//               onClick={handleAddComment}
//               className="px-4 py-1 text-white bg-green-600 rounded text-sm"
//             >
//               Comment
//             </button>
//           </div>

//           <div className="space-y-2">
//             {comments.map((comment) => (
//               <div
//                 key={comment.id}
//                 className="flex justify-between items-center border p-2 rounded"
//               >
//                 <div>
//                   <p className="text-gray-800 text-sm">{comment.content}</p>
//                   <p className="text-gray-400 text-xs">
//                     {new Date(comment.createdAt).toLocaleDateString()}
//                   </p>
//                 </div>
//                 <button
//                   onClick={() => handleDeleteComment(comment.id)}
//                   className="text-red-500 text-xs hover:underline"
//                 >
//                   Delete
//                 </button>
//               </div>
//             ))}
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Comments;



"use client";

import React, { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { serverUrl } from "@/environment";

interface LikesProps {
  postId: string;
}

interface Like {
  id: string;
  userId: string;
}

const Likes = ({ postId }: LikesProps) => {
  const [likes, setLikes] = useState<Like[]>([]);
  const [liked, setLiked] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const fetchLikes = useCallback(async () => {
    try {
      const response = await fetch(`${serverUrl}/likes/on/${postId}`, {
        method: "GET",
        credentials: "include",
      });

      if (response.ok) {
        const data = await response.json();
        setLikes(data.likes || []);
        const userId = data.currentUserId || null; // Optional: if backend includes it
        if (userId) {
          setLiked(data.likes.some((like: Like) => like.userId === userId));
        }
      } else if (response.status === 401) {
        setLiked(false);
        setLikes([]);
      }
    } catch (error) {
      console.error("Failed to fetch likes:", error);
    }
  }, [postId]);

  const handleLike = async () => {
    if (loading) return;
    setLoading(true);

    const method = liked ? "DELETE" : "POST";
    const optimisticLikes = liked
      ? likes.filter((like) => like.userId !== "current") // replace with actual user ID if available
      : [...likes, { id: "temp", userId: "current" }];

    setLiked(!liked);
    setLikes(optimisticLikes);

    try {
      const response = await fetch(`${serverUrl}/likes/on/${postId}`, {
        method,
        credentials: "include",
      });

      if (response.status === 401) {
        setLiked(false);
        fetchLikes();
        router.push("/login");
        return;
      }

      if (!response.ok) {
        fetchLikes(); // fallback to actual server state
      } else {
        fetchLikes(); // sync with server
      }
    } catch (error) {
      console.error("Error toggling like:", error);
      fetchLikes(); // fallback
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLikes();
  }, [fetchLikes]);

  return (
    <button
      onClick={handleLike}
      className="flex items-center gap-2 text-sm text-blue-600 hover:underline disabled:opacity-50"
      disabled={loading}
    >
      {liked ? "Unlike" : "Like"} ({likes.length})
    </button>
  );
};

export default Likes;
