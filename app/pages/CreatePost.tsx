"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Spinner } from "@/components/ui/spinner";

import { betterAuthClient } from "@/lib/integrations/better-auth";
import { serverUrl } from "@/environment";

interface CreatePostProps {
  onPostCreated: () => void;
}

const CreatePost = ({ onPostCreated }: CreatePostProps) => {
  const { data } = betterAuthClient.useSession();
  const user = data?.user;
  const [isOpen, setIsOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async () => {
    setIsSubmitting(true);
    setError("");

    try {
      const res = await fetch(`${serverUrl}/posts`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title, content }),
      });

      if (!res.ok) throw new Error("Failed to create post");

      setTitle("");
      setContent("");
      setIsOpen(false);
      onPostCreated(); // Refetch posts
    } catch (err: any) {
      setError(err.message || "Something went wrong");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!user) return null;

  return (
    <Dialog open={isOpen} onOpenChange={(open) => setIsOpen(open)}>
      <DialogTrigger asChild>
        <Button className="w-full">Create Post</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create a New Post</DialogTitle>
          <DialogDescription>Write something worth sharing.</DialogDescription>
        </DialogHeader>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit();
          }}
          className="space-y-4"
        >
          <Input
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
          <Textarea
            placeholder="Content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
            className="resize-none h-28"
          />
          {error && <p className="text-sm text-red-500">{error}</p>}
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? <Spinner className="mr-2" /> : null}
            Create
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CreatePost;
