
// "use client"
// import React, { useState } from "react";
// import { betterAuthClient } from "@/lib/integrations/better-auth";
// import { serverUrl } from "@/environment";

// interface CreatePostProps {
//   onPostCreated: () => void;
// }

// const CreatePost = ({ onPostCreated }: CreatePostProps) => {
//   const { data: session } = betterAuthClient.useSession(); // Using betterAuthClient to get session data
//   const [title, setTitle] = useState("");
//   const [content, setContent] = useState("");
//   const [isSubmitting, setIsSubmitting] = useState(false);

//   const handleCreatePost = async () => {
//     if (!title || !content) return;

//     setIsSubmitting(true);
//     try {
//       const res = await fetch(`${serverUrl}/posts`, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//           title,
//           content,
//         }),
//         credentials: "include", // Including cookies for authentication
//       });

//       if (!res.ok) throw new Error("Failed to create post");

//       setTitle("");
//       setContent("");
//       onPostCreated(); // Notify parent component to refresh posts
//     } catch (error) {
//       console.error(error);
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   if (!session) {
//     return null; // If no session, return null (hide Create Post form)
//   }

//   return (
//     <div className="flex flex-col p-4 border rounded shadow-lg">
//       <h2 className="text-xl font-semibold mb-4">Create a New Post</h2>
//       <input
//         type="text"
//         value={title}
//         onChange={(e) => setTitle(e.target.value)}
//         className="p-2 border rounded mb-4"
//         placeholder="Title"
//       />
//       <textarea
//         value={content}
//         onChange={(e) => setContent(e.target.value)}
//         className="p-2 border rounded mb-4"
//         placeholder="Content"
//       />
//       <button
//         onClick={handleCreatePost}
//         className="bg-blue-500 text-white p-2 rounded mt-4"
//         disabled={isSubmitting}
//       >
//         {isSubmitting ? "Submitting..." : "Create Post"}
//       </button>
//     </div>
//   );
// };

// export default CreatePost;

"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

import { Spinner } from "@/components/ui/spinner";
import { Textarea } from "@/components/ui/textarea";

import { useState } from "react";
import { PlusIcon } from "lucide-react";
import { serverUrl } from "@/environment";

export const CreatePost = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [text, setText] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const createPost = async () => {
    if (text.trim() === "") return;

    setIsSubmitting(true);
    setError(null);

    try {
      const response = await fetch(`${serverUrl}/posts`, {
        method: "POST",
        credentials: "include",
        body: JSON.stringify({ text }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Something went wrong!");
      }

      setIsOpen(false); // Close dialog after success
      setText(""); // Reset text after post creation
    } catch (err) {
      setError("Failed to create post. Please try again later.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => setIsOpen(open)}>
      <DialogTrigger asChild>
        <Button>
          <PlusIcon />
          Create Post
        </Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>What's on your mind?</DialogTitle>
          <DialogDescription>Politics, tech, climate, or anything else...</DialogDescription>
        </DialogHeader>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            createPost();
          }}
          className="flex flex-col items-stretch gap-4"
        >
          <Textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Type your post here ..."
            className="resize-none h-32"
          />

          {error && <p className="text-red-500 text-sm">{error}</p>}

          <Button
            type="submit"
            disabled={isSubmitting || !text.trim()}
            className="mt-4"
          >
            {isSubmitting ? <Spinner /> : "Create"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};
