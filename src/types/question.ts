export type QuestionType = "short-answer" | "true-false";

export interface Question {
  id: string;
  text: string;
  type: QuestionType;
  answer?: boolean; // Only for true-false questions
  children: Question[];
}

export interface FormState {
  questions: Question[];
  isSubmitted: boolean;
}
