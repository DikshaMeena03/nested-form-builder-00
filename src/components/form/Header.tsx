import { FileText } from "lucide-react";

const Header = () => {
  return (
    <header className="bg-card border-b border-border sticky top-0 z-10">
      <div className="container mx-auto px-4 py-4 md:py-5">
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center w-10 h-10 bg-primary/10 rounded-lg">
            <FileText className="w-5 h-5 text-primary" />
          </div>
          <div>
            <h1 className="text-xl md:text-2xl font-bold text-foreground">
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
