"use client";

import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";

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
      if (!query.trim()) return setResults([]);

      try {
        const res = await fetch(`/posts/search?query=${encodeURIComponent(query)}`);
        const data = await res.json();
        setResults(data.posts);
      } catch {
        console.error("Search failed");
      }
    }, 300);

    return () => clearTimeout(delayDebounce);
  }, [query]);

  const handleSelect = (postId: string) => {
    router.push(`/posts/${postId}`);
    onClose();
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
        {results.map((post) => (
          <div
            key={post.id}
            onClick={() => handleSelect(post.id)}
            className="cursor-pointer hover:bg-muted px-2 py-1 rounded"
          >
            {post.title}
          </div>
        ))}
        {query && results.length === 0 && <p className="text-sm text-muted-foreground">No results found</p>}
      </div>
    </div>
  );
};

export default SearchDropdown;
