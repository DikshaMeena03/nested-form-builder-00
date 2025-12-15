import { FileText, Sparkles } from "lucide-react";

const Header = () => {
  return (
    <header className="border-b border-border sticky top-0 z-10 backdrop-blur-md bg-card/80">
      <div className="container mx-auto px-4 py-4 md:py-5">
        <div className="flex items-center gap-4">
          <div className="relative flex items-center justify-center w-12 h-12 rounded-xl animate-float" 
               style={{ background: 'var(--gradient-primary)' }}>
            <FileText className="w-6 h-6 text-primary-foreground" />
            <Sparkles className="w-3 h-3 text-primary-foreground absolute -top-1 -right-1 animate-pulse" />
          </div>
          <div>
            <h1 className="text-xl md:text-2xl font-bold gradient-text">
              Dynamic Question Builder
            </h1>
            <p className="text-sm text-muted-foreground hidden sm:block">
              Create nested questions with conditional logic
            </p>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;