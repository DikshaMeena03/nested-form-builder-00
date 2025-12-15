import { Heart } from "lucide-react";

const Footer = () => {
  return (
    <footer className="border-t border-border mt-auto backdrop-blur-md bg-card/80">
      <div className="container mx-auto px-4 py-4">
        <p className="text-sm text-muted-foreground text-center flex items-center justify-center gap-2">
          Built with <Heart className="w-4 h-4 text-destructive animate-pulse" /> React • Nested Dynamic Question Form
        </p>
      </div>
    </footer>
  );
};

export default Footer;