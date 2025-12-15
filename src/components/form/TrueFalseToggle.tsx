import { Check, X } from "lucide-react";

interface TrueFalseToggleProps {
  value: boolean | undefined;
  onChange: (value: boolean) => void;
}

const TrueFalseToggle = ({ value, onChange }: TrueFalseToggleProps) => {
  return (
    <div className="space-y-1.5">
      <label className="label-text block">Answer</label>
      <div className="flex gap-2">
        <button
          type="button"
          onClick={() => onChange(true)}
          className={`flex-1 flex items-center justify-center gap-2 py-2.5 px-4 rounded-lg font-medium transition-all duration-200 ${
            value === true
              ? "bg-success text-success-foreground"
              : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
          }`}
        >
          <Check className="w-4 h-4" />
          <span>True</span>
        </button>
        <button
          type="button"
          onClick={() => onChange(false)}
          className={`flex-1 flex items-center justify-center gap-2 py-2.5 px-4 rounded-lg font-medium transition-all duration-200 ${
            value === false
              ? "bg-destructive text-destructive-foreground"
              : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
          }`}
        >
          <X className="w-4 h-4" />
          <span>False</span>
        </button>
      </div>
      {value === true && (
        <p className="helper-text text-success mt-2 animate-fade-in">
          You can now add child questions below
        </p>
      )}
    </div>
  );
};

export default TrueFalseToggle;
