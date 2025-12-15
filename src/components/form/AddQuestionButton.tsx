import { Plus, Sparkles } from "lucide-react";

interface AddQuestionButtonProps {
  onClick: () => void;
  variant?: "primary" | "secondary";
  label?: string;
  disabled?: boolean;
}

const AddQuestionButton = ({
  onClick,
  variant = "primary",
  label = "Add Question",
  disabled = false,
}: AddQuestionButtonProps) => {
  const isPrimary = variant === "primary";

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`
        group relative inline-flex items-center gap-2 font-medium px-5 py-3 rounded-xl 
        transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed
        overflow-hidden interactive-btn
        ${isPrimary 
          ? "btn-primary" 
          : "btn-ghost text-primary hover:bg-primary/10 border-2 border-dashed border-primary/40 hover:border-primary/60"
        }
      `}
    >
      <span className="relative z-10 flex items-center gap-2">
        <Plus className={`w-5 h-5 transition-transform duration-300 ${isPrimary ? 'group-hover:rotate-90' : 'group-hover:scale-110'}`} />
        <span>{label}</span>
        {isPrimary && (
          <Sparkles className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        )}
      </span>
    </button>
  );
};

export default AddQuestionButton;