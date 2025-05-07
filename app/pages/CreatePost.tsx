
"use client"
import React, { useState } from "react";
import { betterAuthClient } from "@/lib/integrations/better-auth";
import { serverUrl } from "@/environment";

interface CreatePostProps {
  onPostCreated: () => void;
}

const CreatePost = ({ onPostCreated }: CreatePostProps) => {
  const { data: session } = betterAuthClient.useSession(); // Using betterAuthClient to get session data
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleCreatePost = async () => {
    if (!title || !content) return;

    setIsSubmitting(true);
    try {
      const res = await fetch(`${serverUrl}/posts`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
          content,
        }),
        credentials: "include", // Including cookies for authentication
      });

      if (!res.ok) throw new Error("Failed to create post");

      setTitle("");
      setContent("");
      onPostCreated(); // Notify parent component to refresh posts
    } catch (error) {
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!session) {
    return null; // If no session, return null (hide Create Post form)
  }

  return (
    <div className="flex flex-col p-4 border rounded shadow-lg">
      <h2 className="text-xl font-semibold mb-4">Create a New Post</h2>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="p-2 border rounded mb-4"
        placeholder="Title"
      />
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        className="p-2 border rounded mb-4"
        placeholder="Content"
      />
      <button
        onClick={handleCreatePost}
        className="bg-blue-500 text-white p-2 rounded mt-4"
        disabled={isSubmitting}
      >
        {isSubmitting ? "Submitting..." : "Create Post"}
      </button>
    </div>
  );
};

export default CreatePost;
