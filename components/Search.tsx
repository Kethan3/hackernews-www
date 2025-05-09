// "use client";

// import { useEffect, useState } from "react";
// import { Input } from "@/components/ui/input";
// import { useRouter } from "next/navigation";
// import { serverUrl } from "@/environment";

// interface Post {
//   id: string;
//   title: string;
// }

// interface Props {
//   onClose: () => void;
// }

// const SearchDropdown = ({ onClose }: Props) => {
//   const [query, setQuery] = useState("");
//   const [results, setResults] = useState<Post[]>([]);
//   const router = useRouter();

//   useEffect(() => {
//     const delayDebounce = setTimeout(async () => {
//       if (!query.trim()) return setResults([]);

//       try {
//         const res = await fetch(`${serverUrl}/posts/search?query=${encodeURIComponent(query)}`);
        
//         if (!res.ok) {
//           throw new Error("Search failed with status: " + res.status);
//         }

//         const data = await res.json();

//         // Ensure that data.posts is an array
//         setResults(Array.isArray(data.posts) ? data.posts : []);
//       } catch (error) {
//         console.error("Search failed:", error);
//       }
//     }, 300);

//     return () => clearTimeout(delayDebounce);
//   }, [query]);

//   const handleSelect = (postId: string) => {
//     router.push(`/posts/${postId}`);
//     onClose();
//   };

//   return (
//     <div className="absolute top-16 right-4 w-72 bg-background/80 backdrop-blur-md border rounded-lg shadow-lg z-50 p-4">
//       <Input
//         placeholder="Search posts..."
//         value={query}
//         onChange={(e) => setQuery(e.target.value)}
//         className="mb-2"
//       />
//       <div className="max-h-60 overflow-y-auto space-y-2">
//         {results.length > 0 ? (
//           results.map((post) => (
//             <div
//               key={post.id}
//               onClick={() => handleSelect(post.id)}
//               className="cursor-pointer hover:bg-muted px-2 py-1 rounded"
//             >
//               {post.title}
//             </div>
//           ))
//         ) : query && results.length === 0 ? (
//           <p className="text-sm text-muted-foreground">No results found</p>
//         ) : null}
//       </div>
//     </div>
//   );
// };

// export default SearchDropdown;

// components/Search.tsx
"use client";

import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { useDebounce } from "use-debounce";
import { useRouter } from "next/navigation";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";

// ✅ Define Post type
type Post = {
  id: string;
  title: string;
};

type SearchDropdownProps = {
  onClose: () => void;
};

export default function SearchDropdown({ onClose }: SearchDropdownProps) {
  const [query, setQuery] = useState("");
  const [debouncedQuery] = useDebounce(query, 300);
  const [results, setResults] = useState<Post[]>([]);
  const router = useRouter();

  useEffect(() => {
    const fetchResults = async () => {
      if (!debouncedQuery.trim()) {
        setResults([]);
        return;
      }

      try {
        const res = await fetch(`/api/search?query=${encodeURIComponent(debouncedQuery)}`);
        if (res.ok) {
          const data = await res.json();
          setResults(data);
        } else {
          setResults([]);
        }
      } catch (err) {
        console.error("Search error:", err);
        setResults([]);
      }
    };

    fetchResults();
  }, [debouncedQuery]);

  const handleSelect = (id: string) => {
    router.push(`/post/${id}`);
    onClose();
  };

  return (
    <div className="absolute top-16 right-4 bg-background shadow-md border rounded-lg w-80 z-50 p-4 space-y-3">
      <div className="flex items-center justify-between">
        <Input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search posts..."
        />
        <Button variant="ghost" size="icon" onClick={onClose}>
          <X className="w-4 h-4" />
        </Button>
      </div>
      <div className="space-y-1 max-h-64 overflow-y-auto">
        {results.length > 0 ? (
          results.map((post) => (
            <div
              key={post.id}
              className="cursor-pointer p-2 rounded-md hover:bg-muted"
              onClick={() => handleSelect(post.id)}
            >
              {post.title}
            </div>
          ))
        ) : (
          <p className="text-sm text-muted-foreground">No results found</p>
        )}
      </div>
    </div>
  );
}
