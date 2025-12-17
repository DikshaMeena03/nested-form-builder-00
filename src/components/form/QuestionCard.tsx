import { Question } from "@/types/question";
import { Trash2, GripVertical, ChevronRight } from "lucide-react";
import { DraggableProvidedDragHandleProps } from "@hello-pangea/dnd";
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
  // Drag handle props - only passed for parent questions
  dragHandleProps?: DraggableProvidedDragHandleProps | null;
  isDragging?: boolean;
}

const QuestionCard = ({
  question,
  questionNumber,
  depth = 0,
  onUpdate,
  onDelete,
  onAddChild,
  dragHandleProps,
  isDragging,
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

  // Check if this is a parent-level question (has drag handle)
  const isParent = depth === 0;

  return (
    <div className="animate-fade-in">
      <div className={`question-card group hover-lift glass-effect transition-all duration-200 ${
        isDragging ? "ring-2 ring-primary shadow-2xl scale-[1.02]" : ""
      }`}>
        {/* Card Header */}
        <div className="flex items-start justify-between gap-3 mb-5">
          <div className="flex items-center gap-3">
            {/* Drag handle - only functional for parent questions */}
            {isParent && dragHandleProps ? (
              <div
                {...dragHandleProps}
                className="p-1 rounded hover:bg-muted/50 cursor-grab active:cursor-grabbing transition-colors touch-none"
                title="Drag to reorder"
              >
                <GripVertical className="w-5 h-5 text-muted-foreground hover:text-foreground transition-colors" />
              </div>
            ) : (
              <GripVertical className="w-5 h-5 text-muted-foreground/20 hidden sm:block" />
            )}
            <span className="question-number shadow-sm">{questionNumber}</span>
            {depth > 0 && (
              <div className="flex items-center gap-1 text-xs text-muted-foreground">
                <ChevronRight className="w-3 h-3" />
                <span>Child of {questionNumber.split('.').slice(0, -1).join('.')}</span>
              </div>
            )}
          </div>
          <button
            onClick={() => onDelete(question.id)}
            className="btn-destructive opacity-0 group-hover:opacity-100 focus:opacity-100 transition-all duration-300"
            aria-label="Delete question"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>

        {/* Question Text */}
        <div className="mb-5">
          <label htmlFor={`question-${question.id}`} className="label-text block mb-2">
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
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
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
          <div className="mt-5 pt-5 border-t border-border/50 animate-fade-in">
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
        <div className="hierarchy-line mt-4 space-y-4 animate-fade-in">
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