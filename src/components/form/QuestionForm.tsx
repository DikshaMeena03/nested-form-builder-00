import { useState, useCallback } from "react";
import { Question, FormState } from "@/types/question";
import QuestionCard from "./QuestionCard";
import AddQuestionButton from "./AddQuestionButton";
import FormPreview from "./FormPreview";
import { Send, RotateCcw } from "lucide-react";

// Utility function to generate unique IDs
const generateId = () => Math.random().toString(36).substring(2, 11);

// Create a new empty question
const createQuestion = (): Question => ({
  id: generateId(),
  text: "",
  type: "short-answer",
  children: [],
});

const QuestionForm = () => {
  const [formState, setFormState] = useState<FormState>({
    questions: [],
    isSubmitted: false,
  });

  const [submittedQuestions, setSubmittedQuestions] = useState<Question[]>([]);

  // Add a new parent question
  const handleAddQuestion = useCallback(() => {
    setFormState((prev) => ({
      ...prev,
      questions: [...prev.questions, createQuestion()],
      isSubmitted: false,
    }));
  }, []);

  // Update a question by ID (recursive helper)
  const updateQuestionById = useCallback(
    (questions: Question[], id: string, updates: Partial<Question>): Question[] => {
      return questions.map((q) => {
        if (q.id === id) {
          return { ...q, ...updates };
        }
        if (q.children.length > 0) {
          return { ...q, children: updateQuestionById(q.children, id, updates) };
        }
        return q;
      });
    },
    []
  );

  const handleUpdateQuestion = useCallback(
    (id: string, updates: Partial<Question>) => {
      setFormState((prev) => ({
        ...prev,
        questions: updateQuestionById(prev.questions, id, updates),
        isSubmitted: false,
      }));
    },
    [updateQuestionById]
  );

  // Delete a question by ID (recursive helper)
  const deleteQuestionById = useCallback(
    (questions: Question[], id: string): Question[] => {
      return questions
        .filter((q) => q.id !== id)
        .map((q) => ({
          ...q,
          children: deleteQuestionById(q.children, id),
        }));
    },
    []
  );

  const handleDeleteQuestion = useCallback(
    (id: string) => {
      setFormState((prev) => ({
        ...prev,
        questions: deleteQuestionById(prev.questions, id),
        isSubmitted: false,
      }));
    },
    [deleteQuestionById]
  );

  // Add a child question to a parent (recursive helper)
  const addChildToQuestion = useCallback(
    (questions: Question[], parentId: string): Question[] => {
      return questions.map((q) => {
        if (q.id === parentId) {
          return { ...q, children: [...q.children, createQuestion()] };
        }
        if (q.children.length > 0) {
          return { ...q, children: addChildToQuestion(q.children, parentId) };
        }
        return q;
      });
    },
    []
  );

  const handleAddChild = useCallback(
    (parentId: string) => {
      setFormState((prev) => ({
        ...prev,
        questions: addChildToQuestion(prev.questions, parentId),
        isSubmitted: false,
      }));
    },
    [addChildToQuestion]
  );

  // Submit handler
  const handleSubmit = useCallback(() => {
    setSubmittedQuestions([...formState.questions]);
    setFormState((prev) => ({ ...prev, isSubmitted: true }));
  }, [formState.questions]);

  // Reset form
  const handleReset = useCallback(() => {
    setFormState({ questions: [], isSubmitted: false });
    setSubmittedQuestions([]);
  }, []);

  const hasQuestions = formState.questions.length > 0;
  const canSubmit = hasQuestions && !formState.isSubmitted;

  return (
    <div className="space-y-6">
      {/* Question Cards */}
      <div className="space-y-4">
        {formState.questions.map((question, index) => (
          <QuestionCard
            key={question.id}
            question={question}
            questionNumber={`Q${index + 1}`}
            onUpdate={handleUpdateQuestion}
            onDelete={handleDeleteQuestion}
            onAddChild={handleAddChild}
          />
        ))}
      </div>

      {/* Empty State */}
      {!hasQuestions && !formState.isSubmitted && (
        <div className="text-center py-12 px-4">
          <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <Send className="w-7 h-7 text-primary" />
          </div>
          <h3 className="text-lg font-semibold text-foreground mb-2">
            No questions yet
          </h3>
          <p className="text-muted-foreground mb-6 max-w-sm mx-auto">
            Start building your form by adding your first question
          </p>
          <AddQuestionButton onClick={handleAddQuestion} />
        </div>
      )}

      {/* Add Question Button (when questions exist) */}
      {hasQuestions && (
        <div className="flex flex-col sm:flex-row gap-3">
          <AddQuestionButton onClick={handleAddQuestion} />
        </div>
      )}

      {/* Action Buttons */}
      {hasQuestions && (
        <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-border">
          <button
            onClick={handleSubmit}
            disabled={!canSubmit}
            className="btn-primary flex-1 sm:flex-none inline-flex items-center justify-center gap-2"
          >
            <Send className="w-4 h-4" />
            <span>Submit Form</span>
          </button>
          <button
            onClick={handleReset}
            className="btn-secondary flex-1 sm:flex-none inline-flex items-center justify-center gap-2"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Reset Form</span>
          </button>
        </div>
      )}

      {/* Preview Section */}
      {formState.isSubmitted && submittedQuestions.length > 0 && (
        <FormPreview questions={submittedQuestions} />
      )}
    </div>
  );
};

export default QuestionForm;
