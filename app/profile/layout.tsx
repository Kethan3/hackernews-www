import { PropsWithChildren } from "react";
import NavigationBar from "@/components/NavigationBar";

const ProfileLayout = ({ children }: PropsWithChildren) => {
  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <NavigationBar />
      <div className="w-5xl mx-auto mt-4">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          {/* Optional: Place any additional sidebar or navigation elements here */}
          <div className="col-span-1">
            {/* You can add profile-specific sidebar content here if needed */}
          </div>
          <div className="col-span-4">
            <main className="flex-1 p-4 pt-[4.5rem]">{children}</main>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileLayout;
