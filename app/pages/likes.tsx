"use client";

import React, { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { serverUrl } from "@/environment";

interface LikesProps {
  postId: string;
}

interface LikesResponse {
  likes: Array<{ id: string }>;
  likedByCurrentUser: boolean;
}

const Likes = ({ postId }: LikesProps) => {
  const [likesCount, setLikesCount] = useState(0);
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
        const data: LikesResponse = await response.json();
        setLikesCount(data.likes.length);
        setLiked(data.likedByCurrentUser);
      } else if (response.status === 401) {
        // Not logged in
        setLiked(false);
        setLikesCount(0);
      }
    } catch (error) {
      console.error("Failed to fetch likes:", error);
    }
  }, [postId]);

  const handleLike = async () => {
    if (loading) return;
    setLoading(true);

    const method = liked ? "DELETE" : "POST";
    const optimisticLikes = liked ? likesCount - 1 : likesCount + 1;

    // Optimistic UI update
    setLiked(!liked);
    setLikesCount(optimisticLikes);

    try {
      const response = await fetch(`${serverUrl}/likes/on/${postId}`, {
        method,
        credentials: "include",
      });

      if (response.status === 401) {
        // Revert UI and redirect
        setLiked(false);
        setLikesCount(likesCount); // revert
        router.push("/login");
        return;
      }

      if (!response.ok) {
        // Revert on error
        setLiked(liked);
        setLikesCount(likesCount);
      } else {
        // Sync with actual server data
        fetchLikes();
      }
    } catch (error) {
      console.error("Error toggling like:", error);
      setLiked(liked); // revert on error
      setLikesCount(likesCount);
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
      {liked ? "Unlike" : "Like"} ({likesCount})
    </button>
  );
};

export default Likes;
