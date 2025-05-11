
import { Outlet, useLocation } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";

const Layout = () => {
  const location = useLocation();
  const isHomePage = location.pathname === "/";
  const isTurfDetailPage = location.pathname.startsWith("/turfs/");

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className={`flex-grow ${isHomePage ? "" : "mt-24"} ${isTurfDetailPage ? "" : ""}`}>
        <Outlet />
      </main>
      {!isHomePage && <Footer />}
    </div>
  );
};

export default Layout;
