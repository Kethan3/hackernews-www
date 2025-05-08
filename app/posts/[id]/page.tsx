

// "use client";

// import { useEffect, useState } from "react";
// import { useParams } from "next/navigation";
// import Likes from "@/app/pages/likes";
// import Comments from "@/app/pages/comments";


// interface Post {
//   id: string;
//   title: string;
//   content: string;
//   userId : string;
//   createdAt: string;
//   user: { id: string; username: string; name: string };
// }

// const PostPage = () => {
//   const { id } = useParams();
//   const [post, setPost] = useState<Post | null>(null);
//   const [error, setError] = useState<string | null>(null);
//   const [isLoading, setIsLoading] = useState(true);

//   useEffect(() => {
//     const fetchPost = async () => {
//       try {
//         const response = await fetch(`http://localhost:3000/posts/${id}`);
//         if (!response.ok) {
//           throw new Error("Failed to fetch post.");
//         }
//         const data = await response.json();
//         setPost(data.post);
//       } catch (err: any) {
//         setError(err.message || "Something went wrong.");
//       } finally {
//         setIsLoading(false);
//       }
//     };

//     fetchPost();
//   }, [id]);

//   if (isLoading) return <div className="p-6 text-gray-500">Loading...</div>;
//   if (error) return <div className="p-6 text-red-500">Error: {error}</div>;
//   if (!post) return <div className="p-6 text-red-500">Post not found.</div>;

//   return (
//     <div className="max-w-3xl mx-auto p-6 bg-white rounded-xl shadow space-y-4">
//       <h1 className="text-3xl font-bold text-blue-700">{post.title}</h1>
//       <p className="text-gray-800">{post.content}</p>

//       <div className="text-sm text-gray-600">
//         Posted by{" "}
//         {/* <Link href={`/user/${post.userId}`}>
         
//         </Link>{" "} */}
//          <span className="font-medium text-blue-500 hover:underline">
//             {post.user.username}
//           </span>
//           {" "} on{" "}
//         {new Date(post.createdAt).toLocaleString("en-IN", {
//           day: "2-digit",
//           month: "2-digit",
//           year: "numeric",
//           hour: "2-digit",
//           minute: "2-digit",
//           hour12: true,
//           timeZone: "Asia/Kolkata",
//         })}
//       </div>

//       <div className="flex items-center gap-4 mt-4">
//         <Likes postId={post.id} />
//       </div>

//       <div className="mt-6">
//         <Comments postId={post.id} />
//       </div>
//     </div>
//   );
// };

// export default PostPage;


"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Likes from "@/app/pages/likes";
import Comments from "@/app/pages/comments";
import { serverUrl } from "@/environment";

interface Post {
  id: string;
  title: string;
  content: string;
  userId: string;
  createdAt: string;
  user: { id: string; username: string; name: string };
}

const PostPage = () => {
  const { id } = useParams();
  const [post, setPost] = useState<Post | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await fetch(`${serverUrl}/posts/${id}`,{
          method : "GET",
          credentials : "include"
        });
        if (!response.ok) {
          throw new Error("Failed to fetch post.");
        }
        const data = await response.json();
        setPost(data.post);
      } catch (err: unknown) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("Something went wrong.");
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchPost();
  }, [id]);

  if (isLoading) return <div className="p-6 text-gray-500">Loading...</div>;
  if (error) return <div className="p-6 text-red-500">Error: {error}</div>;
  if (!post) return <div className="p-6 text-red-500">Post not found.</div>;

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded-xl shadow space-y-4">
      <h1 className="text-3xl font-bold text-blue-700">{post.title}</h1>
      <p className="text-gray-800">{post.content}</p>

      <div className="text-sm text-gray-600">
        Posted by{" "}
        <span className="font-medium text-blue-500 hover:underline">
          {post.user.username}
        </span>{" "}
        on{" "}
        {new Date(post.createdAt).toLocaleString("en-IN", {
          day: "2-digit",
          month: "2-digit",
          year: "numeric",
          hour: "2-digit",
          minute: "2-digit",
          hour12: true,
          timeZone: "Asia/Kolkata",
        })}
      </div>

      <div className="flex items-center gap-4 mt-4">
        <Likes postId={post.id} />
      </div>

      <div className="mt-6">
        <Comments postId={post.id} />
      </div>
    </div>
  );
};

export default PostPage;
