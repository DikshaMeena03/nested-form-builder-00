import { Question } from "@/types/question";
import { ChevronDown, ChevronUp, CheckCircle2 } from "lucide-react";
import { useState } from "react";

interface FormPreviewProps {
  questions: Question[];
}

const QuestionPreviewItem = ({
  question,
  questionNumber,
}: {
  question: Question;
  questionNumber: string;
}) => {
  return (
    <div className="py-3 first:pt-0 last:pb-0">
      <div className="flex items-start gap-3">
        <span className="question-number text-xs">{questionNumber}</span>
        <div className="flex-1">
          <p className="text-foreground font-medium">
            {question.text || "Untitled Question"}
          </p>
          <div className="flex items-center gap-2 mt-1">
            <span className="text-xs text-muted-foreground capitalize">
              {question.type === "true-false" ? "True/False" : "Short Answer"}
            </span>
            {question.type === "true-false" && question.answer !== undefined && (
              <span
                className={`text-xs font-medium ${
                  question.answer ? "text-success" : "text-destructive"
                }`}
              >
                • {question.answer ? "True" : "False"}
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Nested Children */}
      {question.children.length > 0 && (
        <div className="hierarchy-line mt-3 space-y-2">
          {question.children.map((child, index) => (
            <QuestionPreviewItem
              key={child.id}
              question={child}
              questionNumber={`${questionNumber}.${index + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
};

const FormPreview = ({ questions }: FormPreviewProps) => {
  const [isExpanded, setIsExpanded] = useState(true);

  if (questions.length === 0) {
    return null;
  }

  const totalQuestions = countQuestions(questions);

  return (
    <div className="mt-8 animate-scale-in">
      <div className="bg-success/10 border border-success/30 rounded-lg p-4 mb-4 flex items-center gap-3">
        <CheckCircle2 className="w-5 h-5 text-success" />
        <div>
          <p className="font-medium text-foreground">Form Submitted Successfully</p>
          <p className="text-sm text-muted-foreground">
            {totalQuestions} question{totalQuestions !== 1 ? "s" : ""} submitted
          </p>
        </div>
      </div>

      <div className="preview-card">
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="w-full flex items-center justify-between text-left"
        >
          <h3 className="text-lg font-semibold text-foreground">Form Preview</h3>
          {isExpanded ? (
            <ChevronUp className="w-5 h-5 text-muted-foreground" />
          ) : (
            <ChevronDown className="w-5 h-5 text-muted-foreground" />
          )}
        </button>

        {isExpanded && (
          <div className="mt-4 divide-y divide-border animate-fade-in">
            {questions.map((question, index) => (
              <QuestionPreviewItem
                key={question.id}
                question={question}
                questionNumber={`Q${index + 1}`}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

// Helper function to count all questions including nested ones
function countQuestions(questions: Question[]): number {
  return questions.reduce((count, question) => {
    return count + 1 + countQuestions(question.children);
  }, 0);
}

export default FormPreview;
