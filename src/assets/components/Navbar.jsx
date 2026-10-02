import { useState } from "react";
import { NavLink } from "react-router-dom";
import {
  Home,
  ShoppingBag,
  Package,
  User,
  Menu,
  X,
  Sparkles,
} from "lucide-react";



function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    {
      name: "Home",
      path: "/",
      icon: Home,
    },
    {
      name: "Products",
      path: "/products",
      icon: ShoppingBag,
    },
    {
      name: "My Orders",
      path: "/my-orders",
      icon: Package,
    },
    {
      name: "Profile",
      path: "/profile",
      icon: User,
    },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-200/70 bg-white/50 backdrop-blur-sm">
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <NavLink
          to="/"
          onClick={() => setIsOpen(false)}
          className="flex items-center gap-2"
        >
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-black text-white shadow-sm">
            <Sparkles size={19} strokeWidth={2.2} />
          </div>

          <span className="text-xl font-bold tracking-tight text-gray-900">
            NowFix<span className="text-gray-500">It</span>
          </span>
        </NavLink>

        {/* Desktop Navigation */}
        <div className="hidden items-center gap-1 md:flex">
          {navLinks.map((link) => {
            const Icon = link.icon;

            return (
              <NavLink
                key={link.path}
                to={link.path}
                className={({ isActive }) =>
                  `group flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-medium transition-all duration-200 ${
                    isActive
                      ? "bg-gray-900 text-white shadow-sm"
                      : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                  }`
                }
              >
                <Icon
                  size={17}
                  strokeWidth={2}
                  className="transition-transform duration-200 group-hover:scale-105"
                />

                <span>{link.name}</span>
              </NavLink>
            );
          })}
        </div>

        {/* Mobile Menu Button */}
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="flex h-10 w-10 items-center justify-center rounded-xl text-gray-700 transition hover:bg-gray-100 md:hidden"
          aria-label="Toggle menu"
        >
          {isOpen ? <X size={23} /> : <Menu size={23} />}
        </button>
      </nav>

      {/* Mobile Navigation */}
      <div
        className={`overflow-hidden border-t border-gray-100 bg-white/70 transition-all duration-300 md:hidden ${
          isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="space-y-1 px-4 py-4">
          {navLinks.map((link) => {
            const Icon = link.icon;

            return (
              <NavLink
                key={link.path}
                to={link.path}
                onClick={() => setIsOpen(false)}
                className={({ isActive }) =>
                  `flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-all ${
                    isActive
                      ? "bg-gray-900 text-white"
                      : "text-gray-900 hover:bg-gray-100 hover:text-gray-900"
                  }`
                }
              >
                <Icon size={19} strokeWidth={2} />
                <span>{link.name}</span>
              </NavLink>
            );
          })}
        </div>
      </div>
    </header>
  );
}

export default Navbar;
