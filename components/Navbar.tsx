
"use client";

import Link from "next/link";
import { betterAuthClient } from "@/lib/integrations/better-auth";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface NavigationBarProps {
  hideNavItems?: boolean;
}

const NavigationBar = ({ hideNavItems = false }: NavigationBarProps) => {
  const { data } = betterAuthClient.useSession();
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

  if (hideNavItems) {
    // Completely hide navbar content (no background, no space)
    return null;
  }

  return (
    <nav className="w-full  text-white flex items-center justify-between px-6 py-3 shadow-md">
      {/* Left side - Logo and navigation links */}
      <div className="flex items-center space-x-6">
        <Link href="/" className="text-xl font-bold hover:text-amber-300">
          Hacker News
        </Link>
        <div className="flex space-x-4 text-sm">
          <Link href="/new" className="hover:text-amber-300">
            New
          </Link>
          <Link href="/past" className="hover:text-amber-300">
            Past
          </Link>
          <Link href="/comments" className="hover:text-amber-300">
            Comments
          </Link>
          <Link href="/posts/create" className="hover:text-amber-300">
            Create Post
          </Link>
        </div>
      </div>

      {/* Right side - Auth buttons */}
      <div className="flex items-center space-x-4 text-sm">
        <div className="border-r border-black px-2">
          
        <Link href="/user" className="hover:text-amber-300">
      {data?.user.username}
    </Link>

        </div>
        <div>
          {!data?.user ? (
            <Link href="/login" className="hover:text-amber-300">
              Login
            </Link>
          ) : (
            <button
              onClick={handleLogout}
              disabled={isLoading}
              className="hover:text-amber-300 disabled:opacity-50"
            >
              {isLoading ? "Logging out..." : "Logout"}
            </button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default NavigationBar;
