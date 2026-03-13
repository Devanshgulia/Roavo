import { Plane } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-foreground text-background/70 py-16 section-padding">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <a href="#" className="flex items-center gap-2 font-heading font-bold text-lg text-background">
              <Plane className="h-5 w-5" />
              Wanderly
            </a>
            <p className="mt-3 text-sm leading-relaxed">
              AI-powered trip planning that makes travel effortless.
            </p>
          </div>

          <div>
            <h4 className="font-heading font-semibold text-background text-sm mb-4">Product</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-background transition-colors">Plan Trip</a></li>
              <li><a href="#" className="hover:text-background transition-colors">Explore</a></li>
              <li><a href="#" className="hover:text-background transition-colors">Pricing</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-heading font-semibold text-background text-sm mb-4">Company</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-background transition-colors">About</a></li>
              <li><a href="#" className="hover:text-background transition-colors">Blog</a></li>
              <li><a href="#" className="hover:text-background transition-colors">Careers</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-heading font-semibold text-background text-sm mb-4">Connect</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-background transition-colors">Twitter</a></li>
              <li><a href="#" className="hover:text-background transition-colors">Instagram</a></li>
              <li><a href="#" className="hover:text-background transition-colors">LinkedIn</a></li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-background/10 text-xs text-center">
          © {new Date().getFullYear()} Wanderly. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
