// "use client";

// import Link from "next/link";
// import { useRouter } from "next/navigation";
// import { useState } from "react";
// import { useTheme } from "next-themes";
// import { betterAuthClient } from "@/lib/integrations/better-auth";

// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
// import {
//   DropdownMenu,
//   DropdownMenuTrigger,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuLabel,
//   DropdownMenuSeparator,
// } from "@/components/ui/dropdown-menu";
// import { Button } from "@/components/ui/button";
// import {
//   LogOutIcon,
//   UserIcon,
//   Moon,
//   Sun,
//   Home,
//   Search,
// } from "lucide-react";
// import SearchDropdown from "./Search";



// const NavigationBar = () => {
//   const { data } = betterAuthClient.useSession();
//   const router = useRouter();
//   const { setTheme, theme } = useTheme();
//   const [isLoading, setIsLoading] = useState(false);
//   const [showSearch, setShowSearch] = useState(false);

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

//   const user = data?.user;

//   return (
//     <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-sm bg-background/70 border-b shadow-sm px-6 py-3">
//       <div className="max-w-7xl mx-auto flex items-center justify-between">
//         {/* Left: Logo + Home Icon */}
//         <div className="flex items-center gap-4">
//           <Button variant="ghost" size="icon" onClick={() => router.push("/")}>
//             <Home className="w-5 h-5" />
//           </Button>
//           <Link href="/" className="text-lg font-semibold hover:text-primary">
//             Hacker News
//           </Link>
//         </div>

//         {/* Right: Theme + Search + User */}
//         <div className="flex items-center gap-4 relative">
//           <Button
//             variant="ghost"
//             onClick={() => setTheme(theme === "light" ? "dark" : "light")}
//             className="p-2"
//           >
//             {theme === "light" ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
//           </Button>

//           <Button variant="ghost" size="icon" onClick={() => setShowSearch(!showSearch)}>
//             <Search className="w-5 h-5" />
//           </Button>

//           {showSearch && (
//             <SearchDropdown onClose={() => setShowSearch(false)} />
//           )}

//           {!user ? (
//             <Link href="/login">
//               <Button>Login</Button>
//             </Link>
//           ) : (
//             <DropdownMenu>
//               <DropdownMenuTrigger asChild>
//                 <Button variant="ghost" className="flex items-center gap-2 px-2">
//                   <Avatar className="h-6 w-6">
//                     {user.image ? (
//                       <AvatarImage src={user.image} />
//                     ) : (
//                       <AvatarFallback>{user.name[0]}</AvatarFallback>
//                     )}
//                   </Avatar>
//                   <span className="text-sm hidden sm:inline">{user.name}</span>
//                 </Button>
//               </DropdownMenuTrigger>
//               <DropdownMenuContent align="end" className="w-64">
//                 <DropdownMenuLabel className="font-normal">
//                   <div className="flex items-center gap-2">
//                     <Avatar className="h-8 w-8">
//                       {user.image ? (
//                         <AvatarImage src={user.image} />
//                       ) : (
//                         <AvatarFallback>{user.name[0]}</AvatarFallback>
//                       )}
//                     </Avatar>
//                     <div className="text-sm max-w-[200px] truncate">
//                       <p className="font-medium">{user.name}</p>
//                       <p className="text-muted-foreground text-xs break-words">{user.email}</p>
//                     </div>
//                   </div>
//                 </DropdownMenuLabel>
//                 <DropdownMenuSeparator />
//                 <DropdownMenuItem onClick={() => router.push("/profile")}>
//                   <UserIcon className="mr-2 h-4 w-4" />
//                   Profile
//                 </DropdownMenuItem>
//                 <DropdownMenuSeparator />
//                 <DropdownMenuItem onClick={handleLogout}>
//                   <LogOutIcon className="mr-2 h-4 w-4" />
//                   {isLoading ? "Logging out..." : "Logout"}
//                 </DropdownMenuItem>
//               </DropdownMenuContent>
//             </DropdownMenu>
//           )}
//         </div>
//       </div>
//     </nav>
//   );
// };

// export default NavigationBar;



"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useTheme } from "next-themes";
import { betterAuthClient } from "@/lib/integrations/better-auth";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
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
  Moon,
  Sun,
  Home,
  // Search,
} from "lucide-react";
// import SearchDropdown from "./Search"; // ⬅️ Commented out search import

const NavigationBar = () => {
  const { data } = betterAuthClient.useSession();
  const router = useRouter();
  const { setTheme, theme } = useTheme();
  const [isLoading, setIsLoading] = useState(false);
  // const [showSearch, setShowSearch] = useState(false); 

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
    <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-sm bg-background/70 border-b shadow-sm px-6 py-3">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Left: Logo + Home Icon */}
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={() => router.push("/")}>
            <Home className="w-5 h-5" />
          </Button>
          <Link href="/" className="text-lg font-semibold hover:text-primary">
            Hacker News
          </Link>
        </div>

        {/* Right: Theme + Search + User */}
        <div className="flex items-center gap-4 relative">
          <Button
            variant="ghost"
            onClick={() => setTheme(theme === "light" ? "dark" : "light")}
            className="p-2"
          >
            {theme === "light" ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
          </Button>

          {/* Search button - commented out */}
          {/*
          <Button variant="ghost" size="icon" onClick={() => setShowSearch(!showSearch)}>
            <Search className="w-5 h-5" />
          </Button>

          {showSearch && (
            <SearchDropdown onClose={() => setShowSearch(false)} />
          )}
          */}

          {!user ? (
            <Link href="/login">
              <Button>Login</Button>
            </Link>
          ) : (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="flex items-center gap-2 px-2">
                  <Avatar className="h-6 w-6">
                    {user.image ? (
                      <AvatarImage src={user.image} />
                    ) : (
                      <AvatarFallback>{user.name[0]}</AvatarFallback>
                    )}
                  </Avatar>
                  <span className="text-sm hidden sm:inline">{user.name}</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-64">
                <DropdownMenuLabel className="font-normal">
                  <div className="flex items-center gap-2">
                    <Avatar className="h-8 w-8">
                      {user.image ? (
                        <AvatarImage src={user.image} />
                      ) : (
                        <AvatarFallback>{user.name[0]}</AvatarFallback>
                      )}
                    </Avatar>
                    <div className="text-sm max-w-[200px] truncate">
                      <p className="font-medium">{user.name}</p>
                      <p className="text-muted-foreground text-xs break-words">{user.email}</p>
                    </div>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => router.push("/profile")}>
                  <UserIcon className="mr-2 h-4 w-4" />
                  Profile
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
