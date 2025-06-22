import { useState } from "react";
import { Button } from "../components/ui/button";
import { Card, CardContent } from "../components/ui/card";
import { ChevronLeft, ChevronRight, Sparkles, Timer } from "lucide-react";
import { useLocation } from "wouter";
import { questions } from "../lib/questions";
import { ProgressBar } from "../components/progress-bar";
import { QuestionCard } from "../components/question-card";
import { useToast } from "../hooks/use-toast";
import { motion, AnimatePresence } from "framer-motion";

export default function Assessment() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<string[]>(new Array(questions.length).fill(""));
  const [, navigate] = useLocation();
  const { toast } = useToast();

  const handleAnswerChange = (value: string) => {
    const newAnswers = [...answers];
    newAnswers[currentQuestion] = value;
    setAnswers(newAnswers);
  };

  const handleNext = () => {
    if (!answers[currentQuestion]) {
      toast({
        title: "답변을 선택해주세요",
        description: "다음 질문으로 넘어가려면 답변을 선택해야 합니다.",
        variant: "destructive",
      });
      return;
    }

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      // Convert answers to numbers and navigate to results
      const numericAnswers = answers.map(answer => parseInt(answer));
      navigate(`/results?answers=${encodeURIComponent(JSON.stringify(numericAnswers))}`);
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const question = questions[currentQuestion];
  const isLastQuestion = currentQuestion === questions.length - 1;
  const estimatedTime = Math.max(1, Math.ceil((questions.length - currentQuestion) * 0.5));

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="w-full max-w-3xl"
      >
        <Card className="bg-card/80 backdrop-blur-sm rounded-3xl shadow-2xl border-0">
          <CardContent className="p-8 md:p-12">
            {/* Header with progress and timer */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="mb-8"
            >
              <ProgressBar current={currentQuestion + 1} total={questions.length} />
              
              {/* Timer indicator */}
              <div className="flex items-center justify-center gap-2 mt-4 text-sm text-muted-foreground">
                <Timer size={16} />
                <span>예상 소요시간: 약 {estimatedTime}분</span>
              </div>
            </motion.div>

            {/* Question Card with AnimatePresence */}
            <AnimatePresence mode="wait">
              <motion.div
                key={currentQuestion}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
              >
                <QuestionCard
                  question={question}
                  selectedAnswer={answers[currentQuestion]}
                  onAnswerChange={handleAnswerChange}
                />
              </motion.div>
            </AnimatePresence>

            {/* Navigation Buttons */}
            <motion.div 
              className="flex justify-between mt-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
            >
              <Button
                onClick={handlePrevious}
                disabled={currentQuestion === 0}
                variant="ghost"
                className="flex items-center text-muted-foreground hover:text-foreground py-3 px-6 rounded-2xl transition-all duration-300 hover:scale-[1.02]"
              >
                <ChevronLeft size={20} className="mr-2" />
                이전
              </Button>

              <Button
                onClick={handleNext}
                className="flex items-center bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold hover:from-blue-700 hover:to-purple-700 py-3 px-8 rounded-2xl transition-all duration-300 hover:scale-[1.02] shadow-lg"
              >
                {isLastQuestion ? (
                  <>
                    <Sparkles size={20} className="mr-2" />
                    결과 보기
                  </>
                ) : (
                  <>
                    다음
                    <ChevronRight size={20} className="ml-2" />
                  </>
                )}
              </Button>
            </motion.div>

            {/* Progress indicator dots */}
            <motion.div 
              className="flex justify-center gap-2 mt-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.6 }}
            >
              {questions.map((_, index) => (
                <motion.div
                  key={index}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === currentQuestion
                      ? 'bg-medical-blue scale-125'
                      : index < currentQuestion
                      ? 'bg-green-500'
                      : 'bg-gray-300'
                  }`}
                  whileHover={{ scale: 1.2 }}
                />
              ))}
            </motion.div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
