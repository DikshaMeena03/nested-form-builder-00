import { Plus } from "lucide-react";

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
  const baseStyles =
    "inline-flex items-center gap-2 font-medium px-4 py-2.5 rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed";

  const variantStyles =
    variant === "primary"
      ? "btn-primary"
      : "btn-ghost text-primary hover:bg-primary/10 border border-dashed border-primary/40";

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`${baseStyles} ${variantStyles}`}
    >
      <Plus className="w-4 h-4" />
      <span>{label}</span>
    </button>
  );
};

export default AddQuestionButton;
