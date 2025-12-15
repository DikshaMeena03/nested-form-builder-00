import { QuestionType } from "@/types/question";
import { ChevronDown } from "lucide-react";

interface QuestionTypeDropdownProps {
  value: QuestionType;
  onChange: (type: QuestionType) => void;
}

const QuestionTypeDropdown = ({ value, onChange }: QuestionTypeDropdownProps) => {
  const options: { value: QuestionType; label: string }[] = [
    { value: "short-answer", label: "Short Answer" },
    { value: "true-false", label: "True / False" },
  ];

  return (
    <div className="relative">
      <label className="label-text block mb-1.5">Question Type</label>
      <div className="relative">
        <select
          value={value}
          onChange={(e) => onChange(e.target.value as QuestionType)}
          className="select-field w-full appearance-none pr-10"
        >
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
      </div>
    </div>
  );
};

export default QuestionTypeDropdown;
