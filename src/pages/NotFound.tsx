
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Home } from "lucide-react";
import { Button } from "@/components/ui/button";

const NotFound = () => {
  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="glass p-10 rounded-xl text-center max-w-md"
      >
        <div className="text-6xl font-bold mb-2 text-turfGreen dark:text-turfGold">404</div>
        <h1 className="text-3xl font-bold mb-6">Page Not Found</h1>
        <p className="opacity-80 mb-8">
          The page you are looking for doesn't exist or has been moved.
        </p>
        <Link to="/">
          <Button className="bg-turfGreen dark:bg-turfGold text-white dark:text-turfBlue hover:bg-turfGreen-dark dark:hover:bg-turfGold-dark">
            <Home className="mr-2 h-4 w-4" />
            Return to Home
          </Button>
        </Link>
      </motion.div>
    </div>
  );
};

export default NotFound;
