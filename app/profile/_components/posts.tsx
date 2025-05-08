// "use client";

// import { useState } from "react";
// import { Card, CardContent } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
// import { TrashIcon } from "lucide-react";
// import { Spinner } from "@/components/ui/spinner";

// interface Post {
//   id: string;
//   title: string;
//   content: string;
//   createdAt: string;
// }

// interface PostsProps {
//   posts: Post[];
//   onDelete?: (id: string) => Promise<void>;
// }

// const Posts: React.FC<PostsProps> = ({ posts, onDelete }) => {
//   const [expandedId, setExpandedId] = useState<string | null>(null);
//   const [deletingId, setDeletingId] = useState<string | null>(null);

//   const toggleExpand = (id: string) => {
//     setExpandedId(prev => (prev === id ? null : id));
//   };

//   const handleDelete = async (id: string) => {
//     setDeletingId(id);
//     try {
//       if (onDelete) {
//         await onDelete(id);
//       }
//     } finally {
//       setDeletingId(null);
//     }
//   };

//   return (
//     <div className="space-y-4">
//       <h2 className="text-xl font-semibold text-green-600">Your Posts</h2>

//       {posts.length > 0 ? (
//         posts.map(post => (
//           <Card
//             key={post.id}
//             onClick={() => toggleExpand(post.id)}
//             className="cursor-pointer hover:bg-muted/40 dark:hover:bg-muted/20 transition"
//           >
//             <CardContent className="p-4 space-y-2">
//               <div className="flex justify-between items-center">
//                 <h3 className="text-lg font-medium">{post.title}</h3>
//                 {onDelete && (
//                   <Button
//                     variant="ghost"
//                     size="icon"
//                     onClick={e => {
//                       e.stopPropagation();
//                       handleDelete(post.id);
//                     }}
//                     disabled={deletingId === post.id}
//                   >
//                     {deletingId === post.id ? (
//                       <Spinner size={18} /> // ✅ size is number
//                     ) : (
//                       <TrashIcon size={18} />
//                     )}
//                   </Button>
//                 )}
//               </div>

//               {expandedId === post.id && (
//                 <div className="text-sm text-gray-600 dark:text-gray-400">
//                   {post.content}
//                 </div>
//               )}
//               <p className="text-xs text-gray-500">
//                 Posted on {new Date(post.createdAt).toLocaleDateString()}
//               </p>
//             </CardContent>
//           </Card>
//         ))
//       ) : (
//         <p className="text-gray-500 dark:text-gray-400">You haven't posted anything yet.</p>
//       )}
//     </div>
//   );
// };

// export default Posts;

// app/profile/_components/posts.tsx

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
          <p className="text-sm text-gray-500">You haven&pos;t posted anything yet.</p>
        ) : (
          posts.map((post) => (
            <div
              key={post.id}
              className="p-3 border rounded-md hover:bg-muted transition-colors"
            >
              <p className="font-semibold">{post.title}</p>
              <p className="text-sm text-muted-foreground mt-1">
                {new Date(post.createdAt).toLocaleString()}
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
