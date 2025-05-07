
// "use client";

// import React, { useEffect, useState, useCallback } from "react";
// import { useRouter } from "next/navigation";
// import { serverUrl } from "@/environment";
// import { betterAuthClient } from "@/lib/integrations/better-auth";

// interface LikesProps {
//   postId: string;
// }

// interface Like {
//   id: string;
//   userId: string;
// }

// const Likes = ({ postId }: LikesProps) => {
//   const [likes, setLikes] = useState<Like[]>([]);
//   const [liked, setLiked] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const router = useRouter();
//   const { data: session } = betterAuthClient.useSession();

//   const fetchLikes = useCallback(async () => {
//     try {
//       const response = await fetch(`${serverUrl}/likes/on/${postId}`, {
//         method: "GET",
//         credentials: "include",
//       });

//       if (response.ok) {
//         const data = await response.json();
//         setLikes(data.likes || []);
//         const userId = session?.user?.id;
//         if (userId) {
//           setLiked(data.likes.some((like: Like) => like.userId === userId));
//         }
//       } else if (response.status === 401) {
//         setLiked(false);
//         setLikes([]);
//       }
//     } catch (error) {
//       console.error("Failed to fetch likes:", error);
//     }
//   }, [postId, session?.user?.id]);

//   const handleLike = async () => {
//     if (loading) return;

//     // Redirect if user is not logged in
//     if (!session?.user?.id) {
//       router.push("/login");
//       return;
//     }

//     setLoading(true);
//     const userId = session.user.id;
//     const method = liked ? "DELETE" : "POST";

//     const optimisticLikes = liked
//       ? likes.filter((like) => like.userId !== userId)
//       : [...likes, { id: "temp", userId }];

//     setLiked(!liked);
//     setLikes(optimisticLikes);

//     try {
//       const response = await fetch(`${serverUrl}/likes/on/${postId}`, {
//         method,
//         credentials: "include",
//       });

//       if (!response.ok) {
//         fetchLikes();
//       } else {
//         fetchLikes();
//       }
//     } catch (error) {
//       console.error("Error toggling like:", error);
//       fetchLikes();
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchLikes();
//   }, [fetchLikes]);

//   return (
//     <button
//       onClick={handleLike}
//       className="flex items-center gap-2 text-sm text-blue-600 hover:underline disabled:opacity-50"
//       disabled={loading}
//     >
//       {liked ? "Unlike" : "Like"} ({likes.length})
//     </button>
//   );
// };

// export default Likes;


"use client";

import React, { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { serverUrl } from "@/environment";
import { betterAuthClient } from "@/lib/integrations/better-auth";
import { Button } from "@/components/ui/button";
import { ThumbsUp } from "lucide-react";
import { cn } from "@/lib/utils";
import { Spinner } from "@/components/ui/spinner";

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
  const [loading, setLoading] = useState(true);
  const [mutating, setMutating] = useState(false);
  const router = useRouter();
  const { data: session } = betterAuthClient.useSession();

  const fetchLikes = useCallback(async () => {
    try {
      const response = await fetch(`${serverUrl}/likes/on/${postId}`, {
        method: "GET",
        credentials: "include",
      });
      if (response.ok) {
        const data = await response.json();
        setLikes(data.likes || []);
        setLiked(data.likes.some((like: Like) => like.userId === session?.user?.id));
      }
    } catch (error) {
      console.error("Failed to fetch likes:", error);
    } finally {
      setLoading(false);
    }
  }, [postId, session?.user?.id]);

  const handleLike = async () => {
    if (!session?.user?.id) return router.push("/login");

    setMutating(true);
    const method = liked ? "DELETE" : "POST";
    const optimisticLikes = liked
      ? likes.filter((like) => like.userId !== session.user?.id)
      : [...likes, { id: "temp", userId: session.user?.id }];

    setLiked(!liked);
    setLikes(optimisticLikes);

    try {
      await fetch(`${serverUrl}/likes/on/${postId}`, {
        method,
        credentials: "include",
      });
      fetchLikes();
    } catch (error) {
      console.error("Error toggling like:", error);
      fetchLikes();
    } finally {
      setMutating(false);
    }
  };

  useEffect(() => {
    fetchLikes();
  }, [fetchLikes]);

  if (loading) {
    return <Spinner size={20} className="text-muted-foreground" />;
  }

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={handleLike}
      disabled={mutating}
      className={cn("gap-1", liked && "text-blue-600")}
    >
      {mutating ? (
        <Spinner size={16} className="mr-1" />
      ) : (
        <ThumbsUp className="w-4 h-4" />
      )}
      {likes.length}
    </Button>
  );
};

export default Likes;
