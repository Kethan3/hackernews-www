"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from "@/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";


type Post = {
  id: string;
  title: string;
};

export default function SearchCombobox() {
  const [open, setOpen] = React.useState(false);
  const [searchResults, setSearchResults] = React.useState<Post[]>([]);
  const [query, setQuery] = React.useState("");
  const router = useRouter();

  const handleSearch = async (value: string) => {
    setQuery(value);
    if (value.trim() === "") {
      setSearchResults([]);
      return;
    }

    try {
      const res = await fetch(`/posts/search?q=${encodeURIComponent(value)}`);
      const data = await res.json();
      if (data.success) {
        setSearchResults(data.data);
      }
    } catch (error) {
      console.error("Search error:", error);
    }
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant="ghost" size="icon">
          <Search className="h-5 w-5" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[300px] p-0">
        <Command>
          <CommandInput
            placeholder="Search posts..."
            onValueChange={handleSearch}
            value={query}
          />
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup>
            {searchResults.map((post) => (
              <CommandItem
                key={post.id}
                onSelect={() => {
                  router.push(`/post/${post.id}`);
                  setOpen(false);
                  setQuery("");
                }}
                className="cursor-pointer"
              >
                {post.title}
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
