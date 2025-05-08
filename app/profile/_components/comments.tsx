// app/profile/_components/comments.tsx

"use client";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { MessageSquare } from "lucide-react";

interface Comment {
  id: string;
  content: string;
  post: {
    id: string;
    title: string;
  };
  createdAt: string;
}

const Comments = ({ comments }: { comments: Comment[] }) => {
  return (
    <Card className="mt-4">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-purple-700 dark:text-purple-400">
          <MessageSquare className="w-5 h-5" />
          Your Comments
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {comments.length === 0 ? (
          <p className="text-sm text-gray-500">You haven’t made any comments yet.</p>
        ) : (
          comments.map((comment) => (
            <div
              key={comment.id}
              className="p-3 border rounded-md hover:bg-muted transition-colors"
            >
              <p className="text-sm text-muted-foreground">
                On post: <span className="font-medium">{comment.post.title}</span>
              </p>
              <p className="text-sm mt-1">{comment.content}</p>
              <p className="text-xs text-muted-foreground mt-1">
                {new Date(comment.createdAt).toLocaleString()}
              </p>
            </div>
          ))
        )}
      </CardContent>
    </Card>
  );
};

export default Comments;
