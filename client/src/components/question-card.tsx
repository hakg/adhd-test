import { RadioGroup } from "./ui/radio-group";
import { Question, answerOptions } from "../lib/questions";
import { AnswerOption } from "./answer-option";
import { motion } from "framer-motion";

interface QuestionCardProps {
  question: Question;
  selectedAnswer: string;
  onAnswerChange: (value: string) => void;
}

export function QuestionCard({ question, selectedAnswer, onAnswerChange }: QuestionCardProps) {
  const getCategoryColor = (category: string) => {
    switch (category) {
      case "주의력 부족":
        return "bg-blue-100 text-blue-700 border-blue-200";
      case "과다행동":
        return "bg-orange-100 text-orange-700 border-orange-200";
      case "충동성":
        return "bg-purple-100 text-purple-700 border-purple-200";
      default:
        return "bg-gray-100 text-gray-700 border-gray-200";
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "주의력 부족":
        return "👁️";
      case "과다행동":
        return "🏃";
      case "충동성":
        return "⚡";
      default:
        return "❓";
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <div className="mb-6">
        <motion.span 
          className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium border ${getCategoryColor(question.category)}`}
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.3 }}
        >
          <span className="text-lg">{getCategoryIcon(question.category)}</span>
          {question.category}
        </motion.span>
      </div>

      <motion.div 
        className="mb-8"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.3, duration: 0.5 }}
      >
        <h2 className="text-2xl md:text-3xl font-semibold text-foreground mb-4 leading-tight">
          {question.text}
        </h2>
        <p className="text-muted-foreground text-lg">
          지난 6개월 동안 이런 증상이 얼마나 자주 있었나요?
        </p>
      </motion.div>

      <RadioGroup value={selectedAnswer} onValueChange={onAnswerChange}>
        <motion.div 
          className="space-y-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
        >
          {answerOptions.map((option, index) => (
            <motion.div
              key={option.value}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 + index * 0.1, duration: 0.3 }}
            >
              <AnswerOption
                value={option.value.toString()}
                text={option.text}
                isSelected={selectedAnswer === option.value.toString()}
                onSelect={onAnswerChange}
              />
            </motion.div>
          ))}
        </motion.div>
      </RadioGroup>
    </motion.div>
  );
}
