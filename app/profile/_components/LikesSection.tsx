
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import { Spinner } from "@/components/ui/spinner";
import { serverUrl } from "@/environment";

interface Like {
  id: string;
  createdAt: string;
  postId: string;
  post: {
    id: string;
    title: string;
  };
}

interface Props {
  likes: Like[];
}

export default function LikesSection({ likes: initialLikes }: Props) {
  const [likes, setLikes] = useState(initialLikes);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const router = useRouter();

  const deleteLike = async (id: string) => {
    setDeletingId(id);
    try {
      const res = await fetch(`${serverUrl}/likes/${id}`, {
        method: "DELETE",
        credentials: "include",
      });
      if (res.ok) {
        setLikes((prev) => prev.filter((like) => like.id !== id));
      }
    } catch (err) {
      console.error("Delete failed", err);
    } finally {
      setDeletingId(null);
    }
  };

  if (!likes.length) return <p className="text-muted-foreground">No liked posts yet.</p>;

  return (
    <div className="space-y-3">
      {likes.map((like) => (
        <Card
          key={like.id}
          onClick={() => router.push(`/posts/${like.postId}`)}
          className="cursor-pointer hover:bg-accent transition-colors"
        >
          <CardContent className="p-4 flex justify-between items-start">
            <div>
              {/* Display the title of the post that is liked */}
              <p className="text-blue-600 dark:text-blue-400 font-medium">
                {like.post?.title || "Untitled Post"}
              </p>
              <p className="text-sm text-muted-foreground">
                Liked on: {new Date(like.createdAt).toLocaleDateString()}
              </p>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={(e) => {
                e.stopPropagation();
                deleteLike(like.id);
              }}
              disabled={deletingId === like.id}
            >
              {deletingId === like.id ? (
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
