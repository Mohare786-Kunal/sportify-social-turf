import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ThemeSwitcher } from "@/components/ThemeSwitcher";
import { Menu, X, UserCircle } from "lucide-react";
export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // This would be replaced with actual auth state

  return <header className="fixed top-0 left-0 right-0 z-50 glass py-4 px-6 md:px-12 transition-all duration-300">
      <nav className="flex items-center justify-between">
        <Link to="/" className="flex items-center">
          <span className="text-2xl font-bold tracking-tight dark:text-white text-turfGreen">
            Turf<span className="text-turfYellow dark:text-turfGold">Book</span>
          </span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-6">
          <Link to="/" className="font-medium hover:text-turfGreen dark:hover:text-turfGold transition-colors">
            Home
          </Link>
          <Link to="/turfs" className="font-medium hover:text-turfGreen dark:hover:text-turfGold transition-colors">Browse Turfs</Link>
          <Link to="/my-bookings" className="font-medium hover:text-turfGreen dark:hover:text-turfGold transition-colors">
            My Bookings
          </Link>
          <Link to="/community" className="font-medium hover:text-turfGreen dark:hover:text-turfGold transition-colors">
            Community
          </Link>
          <Link to="/owner" className="font-medium hover:text-turfGreen dark:hover:text-turfGold transition-colors">
            For Owners
          </Link>
          <ThemeSwitcher />
          {isLoggedIn ? <Button variant="ghost" className="rounded-full">
              <UserCircle className="h-6 w-6" />
            </Button> : <Link to="/auth">
              <Button className="bg-turfGreen dark:bg-turfGold text-white dark:text-turfBlue hover:opacity-90 transition-opacity">
                Sign In
              </Button>
            </Link>}
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center">
          <ThemeSwitcher />
          <Button variant="ghost" onClick={() => setIsOpen(!isOpen)} size="icon" className="ml-2">
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>
      </nav>

      {/* Mobile Navigation */}
      {isOpen && <div className="md:hidden glass mt-2 p-4 rounded-lg animate-fade-in">
          <div className="flex flex-col space-y-3">
            <Link to="/" onClick={() => setIsOpen(false)} className="font-medium py-2 hover:text-turfGreen dark:hover:text-turfGold transition-colors">
              Home
            </Link>
            <Link to="/turfs" onClick={() => setIsOpen(false)} className="font-medium py-2 hover:text-turfGreen dark:hover:text-turfGold transition-colors">
              Browse Turfs
            </Link>
            <Link to="/my-bookings" onClick={() => setIsOpen(false)} className="font-medium py-2 hover:text-turfGreen dark:hover:text-turfGold transition-colors">
              My Bookings
            </Link>
            <Link to="/community" onClick={() => setIsOpen(false)} className="font-medium py-2 hover:text-turfGreen dark:hover:text-turfGold transition-colors">
              Community
            </Link>
            <Link to="/owner" onClick={() => setIsOpen(false)} className="font-medium py-2 hover:text-turfGreen dark:hover:text-turfGold transition-colors">
              For Owners
            </Link>
            {isLoggedIn ? <Button variant="ghost" className="justify-start">
                <UserCircle className="h-5 w-5 mr-2" /> My Account
              </Button> : <Link to="/auth" onClick={() => setIsOpen(false)}>
                <Button className="w-full bg-turfGreen dark:bg-turfGold text-white dark:text-turfBlue hover:opacity-90 transition-opacity">
                  Sign In
                </Button>
              </Link>}
          </div>
        </div>}
    </header>;
}