

// "use client";

// import { useEffect, useState } from "react";
// import { useParams } from "next/navigation";
// import { serverUrl } from "@/environment";
// import { Card, CardHeader, CardContent } from "@/components/ui/card";
// import { Separator } from "@/components/ui/separator";
// import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"; // Ensure correct import for Avatar
// import PostsSection from "@/app/profile/_components/PostsSection";
// import CommentsSection from "@/app/profile/_components/CommentsSection";
// import LikesSection from "@/app/profile/_components/LikesSection";


// interface UserDetails {
//   user: {
//     id: string;
//     username: string;
//     name: string;
//     about: string;
//     createdAt: string;
//     updatedAt: string;
//     postsCount: number;
//     commentsCount: number;
//     posts: {
//       id: string;
//       title: string;
//       content: string;
//       createdAt: string;
//       updatedAt: string;
//       userId: string;
//     }[];
//     comments: {
//       id: string;
//       content: string;
//       postId: string;
//       createdAt: string;
//       updatedAt: string;
//       userId: string;
//       post: { // Ensure each comment has the post field
//         id: string;
//         title: string;
//       };
//     }[];
//     likes: {
//       id: string;
//       postId: string;
//       createdAt: string;
//       post: {
//         id: string;
//         title: string;
//       };
//     }[];
//     avatarUrl: string; // Avatar URL from the user
//   };
// }

// const UserProfilePage = () => {
//   const { id } = useParams();
//   const [user, setUser] = useState<UserDetails["user"] | null>(null);
//   const [isLoading, setIsLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);
//   const [view, setView] = useState<"posts" | "comments" | "likes">("posts");

//   useEffect(() => {
//     const fetchUser = async () => {
//       try {
//         const res = await fetch(`${serverUrl}/users/${id}`, {
//           credentials: "include",
//         });
//         if (!res.ok) throw new Error("Failed to fetch user.");
//         const data = await res.json();
//         setUser(data.user);
//       } catch (err) {
//         setError((err as Error).message || "Something went wrong");
//       } finally {
//         setIsLoading(false);
//       }
//     };

//     fetchUser();
//   }, [id]);

//   if (isLoading) return <div className="p-6 text-muted-foreground">Loading...</div>;
//   if (error) return <div className="p-6 text-destructive">Error: {error}</div>;
//   if (!user) return <div className="p-6 text-destructive">User not found.</div>;

//   return (
//     <Card className="max-w-2xl mx-auto mt-8">
//       <CardHeader>
//         <div className="flex items-center gap-4">
//           {/* Avatar Section */}
//           <Avatar className="w-16 h-16">
//             <AvatarImage src={user.avatarUrl} alt={user.username} />
//             <AvatarFallback>{user.username[0]}</AvatarFallback> {/* Fallback text */}
//           </Avatar>
//           <div>
//             <h1 className="text-2xl font-bold text-primary">@{user.username}</h1>
//             <p className="text-muted-foreground text-sm">{user.name}</p>
//             <p className="text-muted-foreground text-sm mt-2">
//               Joined on{" "}
//               {new Date(user.createdAt).toLocaleDateString("en-IN", {
//                 year: "numeric",
//                 month: "short",
//                 day: "numeric",
//               })}
//             </p>
//           </div>
//         </div>
//       </CardHeader>
//       <Separator />
//       <CardContent className="space-y-4 mt-4">
//         {user.about && (
//           <div>
//             <h3 className="font-semibold text-lg">About</h3>
//             <p className="text-muted-foreground">{user.about}</p>
//           </div>
//         )}

//         <div className="grid grid-cols-2 gap-4 mt-4">
//           <div className="bg-muted rounded p-4">
//             <p className="text-sm text-muted-foreground">Posts</p>
//             <p className="text-xl font-semibold">{user.postsCount}</p>
//           </div>
//           <div className="bg-muted rounded p-4">
//             <p className="text-sm text-muted-foreground">Comments</p>
//             <p className="text-xl font-semibold">{user.commentsCount}</p>
//           </div>
//         </div>

//         {/* Toggle to View Posts, Comments, Likes */}
//         <div className="flex justify-center gap-2 mt-4">
//           <button onClick={() => setView("posts")}>Posts</button>
//           <button onClick={() => setView("comments")}>Comments</button>
//           <button onClick={() => setView("likes")}>Likes</button>
//         </div>

//         {/* Render the appropriate section */}
//         {view === "posts" && <PostsSection posts={user.posts} />}
//         {view === "comments" && <CommentsSection comments={user.comments} />}
//         {view === "likes" && <LikesSection likes={user.likes} />}
//       </CardContent>
//     </Card>
//   );
// };

// export default UserProfilePage;


"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { serverUrl } from "@/environment";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button"; // Make sure to import the Button component

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
    likesCount: number;
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
    likedPosts: { // Assuming you have likedPosts in the response
      id: string;
      title: string;
      content: string;
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

  // State to track the selected view (posts, comments, likes)
  const [selectedView, setSelectedView] = useState<'posts' | 'comments' | 'likes'>('posts');

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

  const renderPosts = () => {
    switch (selectedView) {
      case 'posts':
        return user.posts.map(post => (
          <div key={post.id} className="bg-muted rounded p-4 mb-4">
            <h4 className="font-semibold text-lg">{post.title}</h4>
            <p>{post.content}</p>
            <p className="text-sm text-muted-foreground">Posted on {new Date(post.createdAt).toLocaleDateString()}</p>
          </div>
        ));
      case 'comments':
        return user.comments.map(comment => (
          <div key={comment.id} className="bg-muted rounded p-4 mb-4">
            <p>{comment.content}</p>
            <p className="text-sm text-muted-foreground">Commented on post ID {comment.postId} on {new Date(comment.createdAt).toLocaleDateString()}</p>
          </div>
        ));
      case 'likes':
        return user.likedPosts.map(post => (
          <div key={post.id} className="bg-muted rounded p-4 mb-4">
            <h4 className="font-semibold text-lg">{post.title}</h4>
            <p>{post.content}</p>
            <p className="text-sm text-muted-foreground">Liked on {new Date(post.createdAt).toLocaleDateString()}</p>
          </div>
        ));
      default:
        return null;
    }
  };

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

        <div className="grid grid-cols-3 gap-4 mt-4">
          <Button
            variant={selectedView === 'posts' ? 'default' : 'outline'}
            onClick={() => setSelectedView('posts')}
          >
            Posts
          </Button>
          <Button
            variant={selectedView === 'comments' ? 'default' : 'outline'}
            onClick={() => setSelectedView('comments')}
          >
            Comments
          </Button>
          <Button
            variant={selectedView === 'likes' ? 'default' : 'outline'}
            onClick={() => setSelectedView('likes')}
          >
            Likes
          </Button>
        </div>

        <div className="mt-4">
          {renderPosts()}
        </div>
      </CardContent>
    </Card>
  );
};

export default UserProfilePage;
