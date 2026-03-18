import { Link } from "react-router-dom";
import { Instagram, Facebook } from "lucide-react";

const TikTokIcon = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
  >
    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
  </svg>
);

export default function Footer() {
  return (
    <footer className="bg-stone-900 text-stone-300 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <span className="font-serif text-2xl tracking-tight text-white mb-4 block">
              Esty's Strands Elite
            </span>
            <p className="text-stone-400 max-w-sm">
              Luxury beauty brand specializing in wig ventilation, installation, makeup, and bridal styling.
            </p>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
              Quick Links
            </h3>
            <ul className="space-y-2">
              <li>
                <Link to="/services" className="hover:text-rose-400 transition-colors">
                  Services
                </Link>
              </li>
              <li>
                <Link to="/shop" className="hover:text-rose-400 transition-colors">
                  Wig Shop
                </Link>
              </li>
              <li>
                <Link to="/blog" className="hover:text-rose-400 transition-colors">
                  Blog
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-rose-400 transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
              Connect
            </h3>
            <div className="flex space-x-4">
              <a href="#" className="text-stone-400 hover:text-white transition-colors">
                <span className="sr-only">Instagram</span>
                <Instagram className="h-6 w-6" />
              </a>
              <a href="#" className="text-stone-400 hover:text-white transition-colors">
                <span className="sr-only">Facebook</span>
                <Facebook className="h-6 w-6" />
              </a>
              <a href="#" className="text-stone-400 hover:text-white transition-colors">
                <span className="sr-only">TikTok</span>
                <TikTokIcon className="h-6 w-6" />
              </a>
            </div>
          </div>
        </div>
        <div className="mt-12 border-t border-stone-800 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-stone-500">
            &copy; {new Date().getFullYear()} Esty's Strands Elite. All rights reserved.
          </p>
          <div className="mt-4 md:mt-0">
            <Link to="/admin" className="text-sm text-stone-400 hover:text-white transition-colors underline underline-offset-4">
              Admin Login
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
