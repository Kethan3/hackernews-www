"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { serverUrl } from "@/environment";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

interface UserDetails {
  user: {
    id: string;
    username: string;
    name: string;
    about: string;
    createdAt: string;
    updatedAt: string;
    postsCount: number;
    commentsCount: number;
    posts: {
      id: string;
      title: string;
      content: string;
      createdAt: string;
      updatedAt: string;
      userId: string;
    }[];
    comments: {
      id: string;
      content: string;
      postId: string;
      createdAt: string;
      updatedAt: string;
      userId: string;
    }[];
  };
}

const UserProfilePage = () => {
  const { id } = useParams();
  const [user, setUser] = useState<UserDetails["user"] | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch(`${serverUrl}/users/${id}`, {
          credentials: "include",
        });
        if (!res.ok) throw new Error("Failed to fetch user.");
        const data = await res.json();
        setUser(data.user);
      } catch (err) {
        setError((err as Error).message || "Something went wrong");
      } finally {
        setIsLoading(false);
      }
    };

    fetchUser();
  }, [id]);

  if (isLoading) return <div className="p-6 text-muted-foreground">Loading...</div>;
  if (error) return <div className="p-6 text-destructive">Error: {error}</div>;
  if (!user) return <div className="p-6 text-destructive">User not found.</div>;

  return (
    <Card className="max-w-2xl mx-auto mt-8">
      <CardHeader>
        <h1 className="text-2xl font-bold text-primary">@{user.username}</h1>
        <p className="text-muted-foreground text-sm">{user.name}</p>
        <p className="text-muted-foreground text-sm mt-2">
          Joined on{" "}
          {new Date(user.createdAt).toLocaleDateString("en-IN", {
            year: "numeric",
            month: "short",
            day: "numeric",
          })}
        </p>
      </CardHeader>
      <Separator />
      <CardContent className="space-y-4 mt-4">
        {user.about && (
          <div>
            <h3 className="font-semibold text-lg">About</h3>
            <p className="text-muted-foreground">{user.about}</p>
          </div>
        )}

        <div className="grid grid-cols-2 gap-4 mt-4">
          <div className="bg-muted rounded p-4">
            <p className="text-sm text-muted-foreground">Posts</p>
            <p className="text-xl font-semibold">{user.postsCount}</p>
          </div>
          <div className="bg-muted rounded p-4">
            <p className="text-sm text-muted-foreground">Comments</p>
            <p className="text-xl font-semibold">{user.commentsCount}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default UserProfilePage;
