
import { useLocation } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const location = useLocation();
  const isHomePage = location.pathname === "/";

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className={isHomePage ? "" : "flex-grow"}>{children}</main>
      {!isHomePage && <Footer />}
    </div>
  );
};

export default Layout;
