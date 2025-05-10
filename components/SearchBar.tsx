"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { useState } from "react";
import { SearchIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import clsx from "clsx";

export const SearchBar = () => {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    const trimmedQuery = query.trim();
    if (trimmedQuery) {
      setLoading(true);
      router.push(`{}/posts/search?q=${encodeURIComponent(trimmedQuery)}`);
    } else {
      router.push("/");
    }
    setLoading(false);
  };

  return (
    <form
      onSubmit={handleSearch}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="flex w-full max-w-2xl transition-all duration-300"
    >
      <Input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search posts..."
        className={clsx(
          "transition-all duration-300",
          "w-full sm:w-64",
          isHovered && "sm:w-96"
        )}
      />
      <Button
        type="submit"
        disabled={loading || query.trim().length === 0}
        className="ml-2 px-3 py-1 text-sm dark:bg-white bg-gray-700"
      >
        {loading ? (
          <Spinner className="w-4 h-4" />
        ) : (
          <SearchIcon className="w-4 h-4" />
        )}
      </Button>
    </form>
  );
};
