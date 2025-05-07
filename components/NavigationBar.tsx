// "use client";

// import Link from "next/link";
// import { betterAuthClient } from "@/lib/integrations/better-auth";
// import { useRouter } from "next/navigation";
// import { useState } from "react";

// interface NavigationBarProps {
//   hideNavItems?: boolean;
// }

// const NavigationBar = ({ hideNavItems = false }: NavigationBarProps) => {
//   const { data } = betterAuthClient.useSession();
//   const router = useRouter();
//   const [isLoading, setIsLoading] = useState(false);

//   const handleLogout = async () => {
//     setIsLoading(true);
//     try {
//       await betterAuthClient.signOut();
//       router.push("/login");
//     } catch (error) {
//       console.error("Logout error:", error);
//       alert("Error while logging out.");
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   if (hideNavItems) {
//     // Completely hide navbar content (no background, no space)
//     return null;
//   }

//   return (
//     <nav className="w-full  text-white flex items-center justify-between px-6 py-3 shadow-md">
//       {/* Left side - Logo and navigation links */}
//       <div className="flex items-center space-x-6">
//         <Link href="/" className="text-xl font-bold hover:text-amber-300">
//           Hacker News
//         </Link>
//         <div className="flex space-x-4 text-sm">
//           <Link href="/new" className="hover:text-amber-300">
//             New
//           </Link>
//           <Link href="/past" className="hover:text-amber-300">
//             Past
//           </Link>
//           <Link href="/comments" className="hover:text-amber-300">
//             Comments
//           </Link>
//           <Link href="/posts/create" className="hover:text-amber-300">
//             Create Post
//           </Link>
//         </div>
//       </div>

//       {/* Right side - Auth buttons */}
//       <div className="flex items-center space-x-4 text-sm">
//         <div className="border-r border-black px-2">
          
//         <Link href="/user" className="hover:text-amber-300">
//       {data?.user.username}
//     </Link>

//         </div>
//         <div>
//           {!data?.user ? (
//             <Link href="/login" className="hover:text-amber-300">
//               Login
//             </Link>
//           ) : (
//             <button
//               onClick={handleLogout}
//               disabled={isLoading}
//               className="hover:text-amber-300 disabled:opacity-50"
//             >
//               {isLoading ? "Logging out..." : "Logout"}
//             </button>
//           )}
//         </div>
//       </div>
//     </nav>
//   );
// };

// export default NavigationBar;


"use client";

import Link from "next/link";
import { betterAuthClient } from "@/lib/integrations/better-auth";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useTheme } from "next-themes";

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import {
  LogOutIcon,
  UserIcon,
  PencilIcon,
  MessageSquare,
  Moon,
  Sun,
} from "lucide-react";

const NavigationBar = () => {
  const { data } = betterAuthClient.useSession();
  const router = useRouter();
  const { setTheme, theme } = useTheme();
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

  const user = data?.user;

  return (
    <nav className="w-full bg-background border-b shadow-sm text-foreground px-6 py-3">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Left - Logo and links */}
        <div className="flex items-center gap-6">
          <Link href="/" className="text-lg font-semibold hover:text-primary">
            Hacker News
          </Link>
          {user && (
            <>
              <Link href="/comments" className="text-sm hover:text-primary">
                Comments
              </Link>
              <Link href="/posts/create" className="text-sm hover:text-primary">
                Create Post
              </Link>
            </>
          )}
        </div>

        {/* Right - User Dropdown or Login */}
        <div className="flex items-center gap-4">
          {!user ? (
            <Link href="/login" className="text-sm hover:text-primary">
              Login
            </Link>
          ) : (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="flex items-center gap-2">
                  <Avatar className="h-6 w-6">
                    {user.image ? (
                      <AvatarImage src={user.image} />
                    ) : (
                      <AvatarFallback>{user.name[0]}</AvatarFallback>
                    )}
                  </Avatar>
                  <span className="text-sm">{user.name}</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel className="font-normal">
                  <div className="flex items-center gap-2">
                    <Avatar className="h-8 w-8">
                      {user.image ? (
                        <AvatarImage src={user.image} />
                      ) : (
                        <AvatarFallback>{user.name[0]}</AvatarFallback>
                      )}
                    </Avatar>
                    <div className="text-sm">
                      <p className="font-medium">{user.name}</p>
                      <p className="text-muted-foreground">{user.email}</p>
                    </div>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => router.push("/user")}>
                  <UserIcon className="mr-2 h-4 w-4" />
                  Profile
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => router.push("/posts/create")}>
                  <PencilIcon className="mr-2 h-4 w-4" />
                  Create Post
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => router.push("/comments")}>
                  <MessageSquare className="mr-2 h-4 w-4" />
                  Comments
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                {/* Theme toggle item */}
                <DropdownMenuItem
                  onClick={() =>
                    setTheme(theme === "light" ? "dark" : "light")
                  }
                >
                  {theme === "light" ? (
                    <>
                      <Moon className="mr-2 h-4 w-4" />
                      Dark Mode
                    </>
                  ) : (
                    <>
                      <Sun className="mr-2 h-4 w-4" />
                      Light Mode
                    </>
                  )}
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout}>
                  <LogOutIcon className="mr-2 h-4 w-4" />
                  {isLoading ? "Logging out..." : "Logout"}
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>
      </div>
    </nav>
  );
};

export default NavigationBar;
