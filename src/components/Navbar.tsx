import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Plane } from "lucide-react";
import roavalogo from "../assets/roavalogo.png";

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const links = [
    { label: "Home", to: "/" },
    { label: "Plan Trip", to: "/plan-trip" },
    { label: "Explore", to: "/#explore" },
    { label: "About", to: "/#about" },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "glass-nav shadow-soft" : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between h-16 section-padding">
        {/* Logo */}
        <Link
          to="/"
          className="flex items-center gap-2 font-heading font-bold text-xl text-foreground leading-none"
          onClick={() => setMobileOpen(false)}
        >
          <div className="h-10 w-auto overflow-hidden flex items-center justify-center">
            <img src={roavalogo} alt="Roavo Logo" className="h-10 w-auto scale-125" />
          </div>
          <span>Roavo</span>
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-8">
          {links.map(({ label, to }) => (
            <Link
              key={label}
              to={to}
              className={`text-sm font-medium transition-colors ${
                location.pathname === to
                  ? "text-foreground"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {label}
            </Link>
          ))}
        </div>

        {/* CTA */}
        <div className="hidden md:flex items-center gap-3">
          <button className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
            Log in
          </button>
          <button className="bg-primary text-primary-foreground text-sm font-semibold px-5 py-2 rounded-full hover:opacity-90 transition-opacity">
            Sign Up
          </button>
        </div>

        {/* Mobile Toggle */}
        <button
          className="md:hidden text-foreground"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="md:hidden glass-nav border-t border-border px-6 pb-6 pt-2 space-y-3">
          {links.map(({ label, to }) => (
            <Link
              key={label}
              to={to}
              onClick={() => setMobileOpen(false)}
              className="block text-sm font-medium text-muted-foreground py-2"
            >
              {label}
            </Link>
          ))}
          <div className="flex gap-3 pt-2">
            <button className="text-sm font-medium text-muted-foreground">Log in</button>
            <button className="bg-primary text-primary-foreground text-sm font-semibold px-5 py-2 rounded-full">
              Sign Up
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
