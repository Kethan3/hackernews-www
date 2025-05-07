"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { betterAuthClient } from "@/lib/integrations/better-auth";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { LogOutIcon, UserIcon } from "lucide-react";

const NavigationBar = () => {
  const { data } = betterAuthClient.useSession();
  const user = data?.user;
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handleLogout = async () => {
    setIsLoading(true);
    try {
      await betterAuthClient.signOut();
      router.push("/login");
    } catch (error) {
      console.error("Logout error:", error);
      alert("Error while logging out.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <nav className="w-full px-6 py-3 shadow-md bg-white border-b flex items-center justify-between">
      {/* Left side - Logo and nav links */}
      <div className="flex items-center space-x-6">
        <Link href="/" className="text-xl font-bold text-amber-900">
          Hacker News
        </Link>
        <div className="flex space-x-4 text-sm text-gray-700">
          <Link href="/new" className="hover:text-amber-600">
            New
          </Link>
          <Link href="/past" className="hover:text-amber-600">
            Past
          </Link>
          {user && (
            <>
              <Link href="/comments" className="hover:text-amber-600">
                Comments
              </Link>
              <Link href="/posts/create" className="hover:text-amber-600">
                Create Post
              </Link>
            </>
          )}
        </div>
      </div>

      {/* Right side - Auth & Avatar Dropdown */}
      <div className="flex items-center space-x-4">
        {!user ? (
          <Button variant="outline" onClick={() => router.push("/login")}>
            Login
          </Button>
        ) : (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="flex items-center gap-2 px-3">
                <Avatar className="h-6 w-6 rounded-full">
                  {user.image ? (
                    <AvatarImage src={user.image} alt={user.name} />
                  ) : (
                    <AvatarFallback>{user.name?.charAt(0)}</AvatarFallback>
                  )}
                </Avatar>
                <span className="text-sm font-medium">{user.name}</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="min-w-[200px]">
              <DropdownMenuLabel className="p-0 font-normal">
                <div
                  onClick={() => router.push("/profile")}
                  className="flex items-center gap-2 cursor-pointer px-3 py-2"
                >
                  <Avatar className="h-8 w-8">
                    {user.image ? (
                      <AvatarImage src={user.image} alt={user.name} />
                    ) : (
                      <AvatarFallback>{user.name?.charAt(0)}</AvatarFallback>
                    )}
                  </Avatar>
                  <div className="text-left">
                    <p className="text-sm font-medium truncate">{user.name}</p>
                    <p className="text-xs text-muted-foreground truncate">{user.email}</p>
                  </div>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={() => router.push("/profile")}
                className="cursor-pointer"
              >
                <UserIcon className="mr-2 h-4 w-4" />
                Profile
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={handleLogout}
                className="text-red-600 cursor-pointer"
              >
                <LogOutIcon className="mr-2 h-4 w-4" />
                {isLoading ? "Logging out..." : "Log Out"}
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )}
      </div>
    </nav>
  );
};

export default NavigationBar;
