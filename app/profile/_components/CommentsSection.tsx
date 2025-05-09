// "use client";

// import { useRouter } from "next/navigation";
// import { useState } from "react";
// import { Card, CardContent } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
// import { Trash2 } from "lucide-react";
// import { Spinner } from "@/components/ui/spinner";
// import { serverUrl } from "@/environment";

// interface Post {
//   id: string;
//   title: string;
// }
// interface Comment {
//   id: string;
//   content: string;
//   postId: string;
//   createdAt: string;
//   post?: Post;
// }
// interface Props {
//   comments: Comment[];
// }

// export default function CommentsSection({ comments: initialComments }: Props) {
//   const [comments, setComments] = useState(initialComments);
//   const [deletingId, setDeletingId] = useState<string | null>(null);
//   const router = useRouter();

//   const deleteComment = async (commentId: string) => {
//     setDeletingId(commentId);
//     try {
//       const res = await fetch(`${serverUrl}/comments/${commentId}`, {
//         method: "DELETE",
//         credentials: "include",
//       });
//       if (res.ok) {
//         setComments((prev) => prev.filter((comment) => comment.id !== commentId));
//       }
//     } catch (err) {
//       console.error("Error deleting comment:", err);
//     } finally {
//       setDeletingId(null);
//     }
//   };

//   if (!comments.length) return <p className="text-muted-foreground">No comments yet.</p>;

//   return (
//     <div className="space-y-3">
//       {comments.map((comment) => (
//         <Card
//           key={comment.id}
//           onClick={() => router.push(`/posts/${comment.postId}`)}
//           className="cursor-pointer hover:bg-accent transition-colors"
//         >
//           <CardContent className="p-4 flex justify-between items-start gap-4">
//             <div className="space-y-1 max-w-[90%]">
//               <p className="text-sm text-foreground break-words">{comment.content}</p>
//               <p className="text-xs text-muted-foreground">
//                 Commented on: {new Date(comment.createdAt).toLocaleDateString()}
//               </p>
//               <p className="text-xs text-muted-foreground">
//                 Post:{" "}
//                 <span className="text-blue-600 dark:text-blue-400 font-medium">
//                   {comment.post?.title || "Untitled Post"}
//                 </span>
//               </p>
//             </div>
//             <Button
//               variant="ghost"
//               size="icon"
//               onClick={(e) => {
//                 e.stopPropagation();
//                 deleteComment(comment.id);
//               }}
//               disabled={deletingId === comment.id}
//             >
//               {deletingId === comment.id ? (
//                 <Spinner size={18} className="text-destructive" />
//               ) : (
//                 <Trash2 className="w-5 h-5 text-destructive" />
//               )}
//             </Button>
//           </CardContent>
//         </Card>
//       ))}
//     </div>
//   );
// }


"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import { Spinner } from "@/components/ui/spinner";
import { serverUrl } from "@/environment";

interface Comment {
  id: string;
  content: string;
  createdAt: string;
  postId: string;
  post: {
    id: string;
    title: string;
  };
}

interface Props {
  comments: Comment[];
}

export default function CommentsSection({ comments: initialComments }: Props) {
  const [comments, setComments] = useState(initialComments);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const router = useRouter();

  const deleteComment = async (id: string) => {
    setDeletingId(id);
    try {
      const res = await fetch(`${serverUrl}/comments/${id}`, {
        method: "DELETE",
        credentials: "include",
      });
      if (res.ok) {
        setComments((prev) => prev.filter((c) => c.id !== id));
      }
    } catch (err) {
      console.error("Delete failed", err);
    } finally {
      setDeletingId(null);
    }
  };

  if (!comments.length) return <p className="text-muted-foreground">No comments yet.</p>;

  return (
    <div className="space-y-3">
      {comments.map((comment) => (
        <Card
          key={comment.id}
          onClick={() => router.push(`/posts/${comment.postId}`)}
          className="cursor-pointer hover:bg-accent transition-colors"
        >
          <CardContent className="p-4 flex justify-between items-start gap-4">
            <div className="space-y-1 max-w-[90%]">
              <p className="text-sm text-foreground break-words">{comment.content}</p>
              <p className="text-xs text-muted-foreground">Commented on: {new Date(comment.createdAt).toLocaleDateString()}</p>
              <p className="text-xs text-muted-foreground">
                {/* Displaying the title of the post the comment was made on */}
                Post: <span className="text-blue-600 dark:text-blue-400 font-medium">{comment.post?.title || "Untitled Post"}</span>
              </p>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={(e) => {
                e.stopPropagation();
                deleteComment(comment.id);
              }}
              disabled={deletingId === comment.id}
            >
              {deletingId === comment.id ? (
                <Spinner size={18} className="text-destructive" />
              ) : (
                <Trash2 className="w-5 h-5 text-destructive" />
              )}
            </Button>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
