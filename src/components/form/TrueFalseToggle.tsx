import { Check, X, Sparkles } from "lucide-react";

interface TrueFalseToggleProps {
  value: boolean | undefined;
  onChange: (value: boolean) => void;
}

const TrueFalseToggle = ({ value, onChange }: TrueFalseToggleProps) => {
  return (
    <div className="space-y-2">
      <label className="label-text block">Answer</label>
      <div className="flex gap-3">
        <button
          type="button"
          onClick={() => onChange(true)}
          className={`
            group flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-xl 
            font-medium transition-all duration-300 relative overflow-hidden interactive-btn
            ${value === true
              ? "text-success-foreground shadow-lg"
              : "bg-secondary text-secondary-foreground hover:bg-secondary/80 hover:-translate-y-1"
            }
          `}
          style={value === true ? { background: 'var(--gradient-success)' } : undefined}
        >
          <Check className={`w-5 h-5 transition-transform duration-300 ${value === true ? 'scale-110' : 'group-hover:scale-110'}`} />
          <span>True</span>
          {value === true && (
            <Sparkles className="w-4 h-4 absolute top-2 right-2 animate-pulse" />
          )}
        </button>
        <button
          type="button"
          onClick={() => onChange(false)}
          className={`
            group flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-xl 
            font-medium transition-all duration-300 relative overflow-hidden interactive-btn
            ${value === false
              ? "text-destructive-foreground shadow-lg"
              : "bg-secondary text-secondary-foreground hover:bg-secondary/80 hover:-translate-y-1"
            }
          `}
          style={value === false ? { background: 'var(--gradient-destructive)' } : undefined}
        >
          <X className={`w-5 h-5 transition-transform duration-300 ${value === false ? 'scale-110' : 'group-hover:scale-110'}`} />
          <span>False</span>
        </button>
      </div>
      {value === true && (
        <div className="flex items-center gap-2 mt-3 animate-fade-in">
          <div className="w-2 h-2 rounded-full bg-success animate-pulse" />
          <p className="helper-text text-success">
            You can now add child questions below
          </p>
        </div>
      )}
    </div>
  );
};

export default TrueFalseToggle;