"use client";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { FileText } from "lucide-react";

interface Post {
  id: string;
  title: string;
  content: string;
  createdAt: string;
}

const Posts = ({ posts }: { posts: Post[] }) => {
  return (
    <Card className="mt-4">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-blue-700 dark:text-blue-400">
          <FileText className="w-5 h-5" />
          Your Posts
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {posts.length === 0 ? (
          <p className="text-sm text-gray-500">You haven&apos;t posted anything yet.</p>
        ) : (
          posts.map((post) => (
            <div
              key={post.id}
              className="p-3 border rounded-md hover:bg-muted transition-colors"
            >
              <p className="font-semibold">{post.title}</p>
              <p className="text-sm text-muted-foreground mt-1">
                {new Date(post.createdAt).toLocaleDateString()} at {new Date(post.createdAt).toLocaleTimeString()}
              </p>
              <p className="text-sm mt-2">{post.content}</p>
            </div>
          ))
        )}
      </CardContent>
    </Card>
  );
};

export default Posts;
