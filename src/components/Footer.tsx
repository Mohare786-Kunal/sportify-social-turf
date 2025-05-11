
import { Link } from "react-router-dom";
import { Facebook, Twitter, Instagram, Mail, Phone } from "lucide-react";

export default function Footer() {
  return (
    <footer className="glass mt-auto py-8 px-6 md:px-12">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row justify-between">
          <div className="mb-6 md:mb-0">
            <Link to="/" className="flex items-center">
              <span className="text-2xl font-bold tracking-tight dark:text-white text-turfGreen">
                Turf<span className="text-turfYellow dark:text-turfGold">Book</span>
              </span>
            </Link>
            <p className="mt-2 max-w-xs text-sm opacity-80">
              The ultimate platform to book sports turfs and connect with other players in Nagpur.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 sm:gap-6">
            <div>
              <h3 className="text-sm font-semibold uppercase">Navigation</h3>
              <ul className="mt-4 space-y-2">
                <li>
                  <Link to="/" className="text-sm hover:text-turfGreen dark:hover:text-turfGold transition-colors">
                    Home
                  </Link>
                </li>
                <li>
                  <Link to="/turfs" className="text-sm hover:text-turfGreen dark:hover:text-turfGold transition-colors">
                    Browse Turfs
                  </Link>
                </li>
                <li>
                  <Link to="/community" className="text-sm hover:text-turfGreen dark:hover:text-turfGold transition-colors">
                    Community
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-semibold uppercase">Legal</h3>
              <ul className="mt-4 space-y-2">
                <li>
                  <Link to="/privacy" className="text-sm hover:text-turfGreen dark:hover:text-turfGold transition-colors">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link to="/terms" className="text-sm hover:text-turfGreen dark:hover:text-turfGold transition-colors">
                    Terms of Service
                  </Link>
                </li>
                <li>
                  <Link to="/refund" className="text-sm hover:text-turfGreen dark:hover:text-turfGold transition-colors">
                    Refund Policy
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-semibold uppercase">Contact</h3>
              <ul className="mt-4 space-y-2">
                <li className="flex items-center text-sm">
                  <Phone className="h-4 w-4 mr-2" />
                  +91 9876543210
                </li>
                <li className="flex items-center text-sm">
                  <Mail className="h-4 w-4 mr-2" />
                  info@turfbook.com
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-8 border-t border-white/10 pt-8 md:flex md:items-center md:justify-between">
          <div>
            <p className="text-xs opacity-80">
              &copy; {new Date().getFullYear()} TurfBook. All rights reserved.
            </p>
          </div>
          <div className="mt-4 flex space-x-5 md:mt-0">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" 
              className="hover:scale-125 hover:rotate-6 transition-transform">
              <Facebook className="h-5 w-5" aria-hidden="true" />
              <span className="sr-only">Facebook</span>
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer"
              className="hover:scale-125 hover:rotate-6 transition-transform">
              <Instagram className="h-5 w-5" aria-hidden="true" />
              <span className="sr-only">Instagram</span>
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer"
              className="hover:scale-125 hover:rotate-6 transition-transform">
              <Twitter className="h-5 w-5" aria-hidden="true" />
              <span className="sr-only">Twitter</span>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
