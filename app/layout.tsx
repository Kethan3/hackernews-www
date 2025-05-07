import { Inter } from "next/font/google";

import "./globals.css";

import { PropsWithChildren } from "react";
import { ThemeProvider } from "@/components/theme-provider";



const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata = {
  title: "Hacker News",
  description: "Built by kethan",
};

const RootLayout = ({ children }: PropsWithChildren) => {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <main>
           
            <div>{children}</div>
          </main>
        </ThemeProvider>
      </body>
    </html>
  );
};

export default RootLayout;
