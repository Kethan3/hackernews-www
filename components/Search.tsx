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
//         const res = await fetch(`${serverUrl}/posts/search?q=${encodeURIComponent(query)}`);

//         if (!res.ok) {
//           throw new Error("Search failed with status: " + res.status);
//         }

//         const data = await res.json();

//         // Access the returned data from `data.data`
//         setResults(Array.isArray(data.data) ? data.data : []);
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


"use client";

import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import { serverUrl } from "@/environment";

interface Post {
  id: string;
  title: string;
}

interface Props {
  onClose: () => void;
}

const SearchDropdown = ({ onClose }: Props) => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Post[]>([]);
  const router = useRouter();

  useEffect(() => {
    const delayDebounce = setTimeout(async () => {
      if (!query.trim()) return setResults([]);  // If query is empty, clear results

      try {
        const res = await fetch(`${serverUrl}/posts/search?q=${encodeURIComponent(query)}`);
        if (!res.ok) throw new Error("Search failed with status: " + res.status);

        const data = await res.json();
        setResults(Array.isArray(data.data) ? data.data : []); // Set the results from the response
      } catch (error) {
        console.error("Search failed:", error);
      }
    }, 300); // 300ms debounce for query

    return () => clearTimeout(delayDebounce); // Cleanup debounce timer
  }, [query]);

  const handleSelect = (postId: string) => {
    router.push(`/posts/${postId}`);
    onClose(); // Close the dropdown after selecting
  };

  return (
    <div className="absolute top-16 right-4 w-72 bg-background/80 backdrop-blur-md border rounded-lg shadow-lg z-50 p-4">
      <Input
        placeholder="Search posts..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="mb-2"
      />
      <div className="max-h-60 overflow-y-auto space-y-2">
        {results.length > 0 ? (
          results.map((post) => (
            <div
              key={post.id}
              onClick={() => handleSelect(post.id)}
              className="cursor-pointer hover:bg-muted px-2 py-1 rounded"
            >
              {post.title}
            </div>
          ))
        ) : query && results.length === 0 ? (
          <p className="text-sm text-muted-foreground">No results found</p>
        ) : null}
      </div>
    </div>
  );
};

export default SearchDropdown;
