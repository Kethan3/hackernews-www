// "use client";
// import { betterAuthClient } from "@/lib/integrations/better-auth";
// import { useRouter } from "next/navigation";
// import React, { useState } from "react";

// import Link from "next/link";


// const SignUpPage = () => {
//   const { data } = betterAuthClient.useSession();
//   const router = useRouter();
//   const [formData, setFormData] = useState({
//     username: "",
//     email: "",
//     name: "",
//     password: "",
//   });
//   const [isLoading, setIsLoading] = useState(false);
//   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setFormData((prev) => ({
//       ...prev,
//       [e.target.name]: e.target.value,
//     }));
//   };
  

//   const handleSignUp = async () => {
//     setIsLoading(true);
//     try {
//       const data = await betterAuthClient.getSession();
//       console.log(data);

//       const { error } = await betterAuthClient.signUp.email(
//         {
//           username: formData.username,
//           email: formData.email,
//           name: formData.name,
//           password: formData.password,
//         },
//         {
//           onRequest: () => {
//             setIsLoading(true);
//           },
//           onSuccess: () => {
//             setIsLoading(false);
//             router.push("/"); // or wherever you want to redirect after signup
//           },
//           onError: (ctx) => {
//             setIsLoading(false);
//             alert(ctx.error.message || "Signup failed. Please try again.");
//           },
//         }
//       );

//       if (error) {
//         alert(error.message || "Signup failed. Please try again.");
//       }
//     } catch {
//       console.error("Signup error:");
//       alert("An unexpected error occurred.");
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//     <>

//       {!data?.user && (
//         <div className="container mx-auto min-h-[calc(100vh-3rem)] flex items-center justify-center bg-[#F1F1DB]">
//           <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">
//             <h2 className="text-2xl font-bold text-center text-amber-900 mb-6">
//               Create Account
//             </h2>
//             <div className="space-y-4">
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">
//                   Username
//                 </label>
//                 <input
//                   type="text"
//                   name="username"
//                   value={formData.username}
//                   onChange={handleChange}
//                   className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
//                 />
//               </div>
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">
//                   Email
//                 </label>
//                 <input
//                   type="email"
//                   name="email"
//                   value={formData.email}
//                   onChange={handleChange}
//                   className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
//                 />
//               </div>
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">
//                   Name
//                 </label>
//                 <input
//                   type="text"
//                   name="name"
//                   value={formData.name}
//                   onChange={handleChange}
//                   className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
//                 />
//               </div>
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">
//                   Password
//                 </label>
//                 <input
//                   type="password"
//                   name="password"
//                   value={formData.password}
//                   onChange={handleChange}
//                   className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
//                 />
//               </div>
//               <button
//                 onClick={handleSignUp}
//                 disabled={isLoading}
//                 className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 transition-colors disabled:opacity-50"
//               >
//                 {isLoading ? "Creating account..." : "Sign Up"}
//               </button>
//               <div className="text-center text-sm mt-4">
//                 Already have an account?{" "}
//                 <Link href="/login" className="text-blue-600 hover:underline">
//                   Log In
//                 </Link>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}
//     </>
//   );
// };
// export default SignUpPage;



"use client";

import { betterAuthClient } from "@/lib/integrations/better-auth";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import Link from "next/link";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const SignUpPage = () => {
  const { data } = betterAuthClient.useSession();
  const router = useRouter();
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    name: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSignUp = async () => {
    setIsLoading(true);
    try {
      const { error } = await betterAuthClient.signUp.email(
        {
          username: formData.username,
          email: formData.email,
          name: formData.name,
          password: formData.password,
        },
        {
          onRequest: () => setIsLoading(true),
          onSuccess: () => {
            setIsLoading(false);
            router.push("/");
          },
          onError: (ctx) => {
            setIsLoading(false);
            alert(ctx.error.message || "Signup failed. Please try again.");
          },
        }
      );

      if (error) {
        alert(error.message || "Signup failed. Please try again.");
      }
    } catch (err) {
      console.error("Signup error:", err);
      alert("An unexpected error occurred.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {!data?.user && (
        <div className="min-h-[calc(100vh-3rem)] flex items-center justify-center px-4 bg-background text-foreground">
          <Card className="w-full max-w-md shadow-md border rounded-2xl">
            <CardHeader>
              <CardTitle className="text-2xl text-center">Create Account</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="username">Username</Label>
                <Input
                  id="username"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  placeholder="Enter your username"
                />
              </div>
              <div>
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter your email"
                />
              </div>
              <div>
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter your name"
                />
              </div>
              <div>
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Enter your password"
                />
              </div>
              <Button
                onClick={handleSignUp}
                disabled={isLoading}
                className="w-full"
              >
                {isLoading ? "Creating account..." : "Sign Up"}
              </Button>
            </CardContent>
            <CardFooter className="flex justify-center text-sm">
              <span>
                Already have an account?{" "}
                <Link
                  href="/login"
                  className="text-primary underline hover:opacity-80"
                >
                  Log In
                </Link>
              </span>
            </CardFooter>
          </Card>
        </div>
      )}
    </>
  );
};

export default SignUpPage;
