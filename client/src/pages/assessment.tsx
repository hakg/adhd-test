import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useLocation } from "wouter";
import { questions } from "@/lib/questions";
import { ProgressBar } from "@/components/progress-bar";
import { QuestionCard } from "@/components/question-card";
import { useToast } from "@/hooks/use-toast";

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

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-background">
      <Card className="w-full max-w-3xl bg-card rounded-2xl shadow-lg">
        <CardContent className="p-8 md:p-12">
          <ProgressBar current={currentQuestion + 1} total={questions.length} />

          <QuestionCard
            question={question}
            selectedAnswer={answers[currentQuestion]}
            onAnswerChange={handleAnswerChange}
          />

          <div className="flex justify-between mt-8">
            <Button
              onClick={handlePrevious}
              disabled={currentQuestion === 0}
              variant="ghost"
              className="flex items-center text-muted-foreground hover:text-foreground"
            >
              <ChevronLeft size={16} className="mr-2" />
              이전
            </Button>

            <Button
              onClick={handleNext}
              className="flex items-center bg-medical-blue text-white font-semibold hover:bg-blue-700"
            >
              {isLastQuestion ? "결과 보기" : "다음"}
              <ChevronRight size={16} className="ml-2" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
