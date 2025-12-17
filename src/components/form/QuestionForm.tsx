import { useState, useCallback } from "react";
import { Question, FormState } from "@/types/question";
import { DragDropContext, Droppable, Draggable, DropResult } from "@hello-pangea/dnd";
import QuestionCard from "./QuestionCard";
import AddQuestionButton from "./AddQuestionButton";
import FormPreview from "./FormPreview";
import { Send, RotateCcw, Layers, Sparkles } from "lucide-react";

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

  // Handle drag end - reorder parent questions only
  const handleDragEnd = useCallback((result: DropResult) => {
    const { destination, source } = result;
    
    // If no destination or dropped in same position, do nothing
    if (!destination || destination.index === source.index) {
      return;
    }

    setFormState((prev) => {
      const newQuestions = Array.from(prev.questions);
      const [removed] = newQuestions.splice(source.index, 1);
      newQuestions.splice(destination.index, 0, removed);
      return { ...prev, questions: newQuestions, isSubmitted: false };
    });
  }, []);

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
      {/* Question Cards with Drag & Drop */}
      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="parent-questions">
          {(provided, snapshot) => (
            <div
              ref={provided.innerRef}
              {...provided.droppableProps}
              className={`space-y-5 transition-colors duration-200 rounded-xl ${
                snapshot.isDraggingOver ? "bg-primary/5" : ""
              }`}
            >
              {formState.questions.map((question, index) => (
                <Draggable key={question.id} draggableId={question.id} index={index}>
                  {(provided, snapshot) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      className={`transition-shadow duration-200 ${
                        snapshot.isDragging ? "shadow-2xl z-50" : ""
                      }`}
                    >
                      <QuestionCard
                        question={question}
                        questionNumber={`Q${index + 1}`}
                        onUpdate={handleUpdateQuestion}
                        onDelete={handleDeleteQuestion}
                        onAddChild={handleAddChild}
                        dragHandleProps={provided.dragHandleProps}
                        isDragging={snapshot.isDragging}
                      />
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>

      {/* Empty State */}
      {!hasQuestions && !formState.isSubmitted && (
        <div className="text-center py-16 px-4 animate-fade-in">
          <div className="relative inline-flex items-center justify-center w-20 h-20 rounded-2xl mb-6 animate-float"
               style={{ background: 'var(--gradient-primary)' }}>
            <Layers className="w-10 h-10 text-primary-foreground" />
            <Sparkles className="w-5 h-5 text-primary-foreground absolute -top-2 -right-2 animate-pulse" />
          </div>
          <h3 className="text-xl font-bold gradient-text mb-3">
            No questions yet
          </h3>
          <p className="text-muted-foreground mb-8 max-w-sm mx-auto">
            Start building your interactive form by adding your first question
          </p>
          <AddQuestionButton onClick={handleAddQuestion} />
        </div>
      )}

      {/* Add Question Button (when questions exist) */}
      {hasQuestions && (
        <div className="flex flex-col sm:flex-row gap-4">
          <AddQuestionButton onClick={handleAddQuestion} />
        </div>
      )}

      {/* Action Buttons */}
      {hasQuestions && (
        <div className="flex flex-col sm:flex-row gap-4 pt-6 border-t border-border/50">
          <button
            onClick={handleSubmit}
            disabled={!canSubmit}
            className="btn-primary flex-1 sm:flex-none inline-flex items-center justify-center gap-2 group interactive-btn"
          >
            <Send className="w-5 h-5 transition-transform group-hover:translate-x-1" />
            <span>Submit Form</span>
          </button>
          <button
            onClick={handleReset}
            className="btn-secondary flex-1 sm:flex-none inline-flex items-center justify-center gap-2 group"
          >
            <RotateCcw className="w-5 h-5 transition-transform group-hover:-rotate-180 duration-500" />
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