
import { useLocation } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import OwnerSidebar from "./owner/OwnerSidebar";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const location = useLocation();
  const isHomePage = location.pathname === "/";
  const isOwnerPage = location.pathname.startsWith("/owner");
  const isTurfDetailPage = location.pathname.startsWith("/turfs/");

  if (isOwnerPage) {
    return (
      <SidebarProvider>
        <div className="min-h-screen flex w-full">
          <OwnerSidebar />
          <SidebarInset>
            <div className="p-6">
              {children}
            </div>
          </SidebarInset>
        </div>
      </SidebarProvider>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className={`${isHomePage ? "" : "flex-grow"} ${isTurfDetailPage ? "pt-24" : ""}`}>
        {children}
      </main>
      {!isHomePage && <Footer />}
    </div>
  );
};

export default Layout;
