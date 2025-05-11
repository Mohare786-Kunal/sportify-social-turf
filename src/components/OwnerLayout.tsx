
import { Outlet } from "react-router-dom";
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import OwnerSidebar from "./owner/OwnerSidebar";

const OwnerLayout = () => {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <OwnerSidebar />
        <SidebarInset>
          <div className="p-6">
            <Outlet />
          </div>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
};

export default OwnerLayout;
