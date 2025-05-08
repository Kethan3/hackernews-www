// app/profile/_components/likes.tsx

"use client";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Heart } from "lucide-react";

interface Like {
  id: string;
  post: {
    id: string;
    title: string;
  };
  createdAt: string;
}

const Likes = ({ likes }: { likes: Like[] }) => {
  return (
    <Card className="mt-4">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-red-700 dark:text-red-400">
          <Heart className="w-5 h-5" />
          Your Likes
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {likes.length === 0 ? (
          <p className="text-sm text-gray-500">You haven&pos;t liked any posts yet.</p>
        ) : (
          likes.map((like) => (
            <div
              key={like.id}
              className="p-3 border rounded-md hover:bg-muted transition-colors"
            >
              <p className="text-sm">
                You liked: <span className="font-medium">{like.post.title}</span>
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                {new Date(like.createdAt).toLocaleString()}
              </p>
            </div>
          ))
        )}
      </CardContent>
    </Card>
  );
};

export default Likes;
