import { Question } from "@/types/question";
import { Trash2, GripVertical } from "lucide-react";
import QuestionTypeDropdown from "./QuestionTypeDropdown";
import TrueFalseToggle from "./TrueFalseToggle";
import AddQuestionButton from "./AddQuestionButton";

interface QuestionCardProps {
  question: Question;
  questionNumber: string;
  depth?: number;
  onUpdate: (id: string, updates: Partial<Question>) => void;
  onDelete: (id: string) => void;
  onAddChild: (parentId: string) => void;
}

const QuestionCard = ({
  question,
  questionNumber,
  depth = 0,
  onUpdate,
  onDelete,
  onAddChild,
}: QuestionCardProps) => {
  const handleTextChange = (text: string) => {
    onUpdate(question.id, { text });
  };

  const handleTypeChange = (type: Question["type"]) => {
    onUpdate(question.id, { type, answer: undefined, children: [] });
  };

  const handleAnswerChange = (answer: boolean) => {
    onUpdate(question.id, { answer });
  };

  const showAddChild = question.type === "true-false" && question.answer === true;

  return (
    <div className="animate-fade-in">
      <div className="question-card group">
        {/* Card Header */}
        <div className="flex items-start justify-between gap-3 mb-4">
          <div className="flex items-center gap-2">
            <GripVertical className="w-4 h-4 text-muted-foreground/50 cursor-grab hidden sm:block" />
            <span className="question-number">{questionNumber}</span>
          </div>
          <button
            onClick={() => onDelete(question.id)}
            className="btn-destructive opacity-0 group-hover:opacity-100 focus:opacity-100 transition-opacity"
            aria-label="Delete question"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>

        {/* Question Text */}
        <div className="mb-4">
          <label htmlFor={`question-${question.id}`} className="label-text block mb-1.5">
            Question Text
          </label>
          <input
            id={`question-${question.id}`}
            type="text"
            value={question.text}
            onChange={(e) => handleTextChange(e.target.value)}
            placeholder="Enter your question here..."
            className="input-field"
          />
        </div>

        {/* Question Type & Answer */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <QuestionTypeDropdown
            value={question.type}
            onChange={handleTypeChange}
          />
          
          {question.type === "true-false" && (
            <TrueFalseToggle
              value={question.answer}
              onChange={handleAnswerChange}
            />
          )}
        </div>

        {/* Add Child Button */}
        {showAddChild && (
          <div className="mt-4 pt-4 border-t border-border animate-fade-in">
            <AddQuestionButton
              onClick={() => onAddChild(question.id)}
              variant="secondary"
              label="Add Child Question"
            />
          </div>
        )}
      </div>

      {/* Nested Children */}
      {question.children.length > 0 && (
        <div className="hierarchy-line mt-3 space-y-3 animate-fade-in">
          {question.children.map((child, index) => (
            <QuestionCard
              key={child.id}
              question={child}
              questionNumber={`${questionNumber}.${index + 1}`}
              depth={depth + 1}
              onUpdate={onUpdate}
              onDelete={onDelete}
              onAddChild={onAddChild}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default QuestionCard;
