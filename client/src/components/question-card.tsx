import { RadioGroup } from "@/components/ui/radio-group";
import { Question, answerOptions } from "@/lib/questions";
import { AnswerOption } from "./answer-option";

interface QuestionCardProps {
  question: Question;
  selectedAnswer: string;
  onAnswerChange: (value: string) => void;
}

export function QuestionCard({ question, selectedAnswer, onAnswerChange }: QuestionCardProps) {
  return (
    <div>
      <div className="mb-6">
        <span className="inline-block bg-blue-100 text-medical-blue px-3 py-1 rounded-full text-sm font-medium">
          {question.category}
        </span>
      </div>

      <div className="mb-8">
        <h2 className="text-2xl font-semibold text-foreground mb-4">
          {question.text}
        </h2>
        <p className="text-muted-foreground">지난 6개월 동안 이런 증상이 얼마나 자주 있었나요?</p>
      </div>

      <RadioGroup value={selectedAnswer} onValueChange={onAnswerChange}>
        <div className="space-y-3">
          {answerOptions.map((option) => (
            <AnswerOption
              key={option.value}
              value={option.value.toString()}
              text={option.text}
              isSelected={selectedAnswer === option.value.toString()}
              onSelect={onAnswerChange}
            />
          ))}
        </div>
      </RadioGroup>
    </div>
  );
}
