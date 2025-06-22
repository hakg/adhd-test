import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Check, Eye, Zap, Activity, RotateCcw, Printer, Lightbulb, AlertTriangle, Share2 } from "lucide-react";
import { useLocation } from "wouter";
import { calculateScores, getResultInterpretation } from "@/lib/questions";

export default function Results() {
  const [location, navigate] = useLocation();
  const [scores, setScores] = useState<any>(null);
  const [interpretation, setInterpretation] = useState<any>(null);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const answersParam = urlParams.get('answers');
    
    if (answersParam) {
      try {
        const answers = JSON.parse(decodeURIComponent(answersParam));
        const calculatedScores = calculateScores(answers);
        const resultInterpretation = getResultInterpretation(calculatedScores.totalScore);
        
        setScores(calculatedScores);
        setInterpretation(resultInterpretation);
      } catch (error) {
        console.error("Error parsing answers:", error);
        navigate("/");
      }
    } else {
      navigate("/");
    }
  }, [location]);

  const handleRetakeTest = () => {
    navigate("/");
  };

  const handlePrintResults = () => {
    window.print();
  };

  const handleKakaoShare = () => {
    const message = `🧠 성인 ADHD 자가진단 결과

총점: ${scores.totalScore}/72점
• 주의력 부족: ${scores.inattentionScore}/36점
• 과다행동: ${scores.hyperactivityScore}/24점  
• 충동성: ${scores.impulsivityScore}/12점

결과: ${interpretation.level}

⚠️ 본 검사는 선별용 도구입니다. 정확한 진단을 위해 전문의와 상담하세요.

#ADHD자가진단 #정신건강`;

    // 카카오톡 공유 (웹 기반)
    if (navigator.share) {
      navigator.share({
        title: '성인 ADHD 자가진단 결과',
        text: message,
        url: window.location.origin
      }).catch(console.error);
    } else {
      // 클립보드 복사 fallback
      navigator.clipboard.writeText(message).then(() => {
        alert("결과가 복사되었습니다. 카카오톡에서 붙여넣기 하여 공유하세요.");
      }).catch(() => {
        // 수동 복사를 위한 텍스트 선택
        const textArea = document.createElement('textarea');
        textArea.value = message;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
        
        alert("결과가 복사되었습니다. 카카오톡에서 붙여넣기 하여 공유하세요.");
      });
    }
  };

  if (!scores || !interpretation) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4 bg-background">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-medical-blue mx-auto"></div>
          <p className="mt-4 text-muted-foreground">결과를 계산하고 있습니다...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-background">
      <Card className="w-full max-w-4xl bg-card rounded-2xl shadow-lg">
        <CardContent className="p-8 md:p-12">
          <div className="text-center mb-8">
            <div className="w-20 h-20 bg-success-green rounded-full flex items-center justify-center mx-auto mb-4">
              <Check className="text-white" size={32} />
            </div>
            <h1 className="text-3xl font-bold text-foreground mb-2">검사 완료</h1>
            <p className="text-muted-foreground">성인 ADHD 자가진단 결과입니다</p>
          </div>

          {/* Score Display */}
          <div className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-2xl p-8 mb-8">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-foreground mb-4">총점</h2>
              <div className="text-6xl font-bold text-medical-blue mb-2">
                {scores.totalScore}
              </div>
              <p className="text-muted-foreground">72점 만점</p>
            </div>
          </div>

          {/* Detailed Scores */}
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white border-2 border-gray-100 rounded-xl p-6">
              <div className="text-center">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Eye className="text-medical-blue" size={24} />
                </div>
                <h3 className="font-semibold text-foreground mb-2">주의력 부족</h3>
                <div className="text-2xl font-bold text-medical-blue">
                  {scores.inattentionScore}
                </div>
                <p className="text-sm text-muted-foreground">36점 만점</p>
              </div>
            </div>

            <div className="bg-white border-2 border-gray-100 rounded-xl p-6">
              <div className="text-center">
                <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Activity className="text-orange-500" size={24} />
                </div>
                <h3 className="font-semibold text-foreground mb-2">과다행동</h3>
                <div className="text-2xl font-bold text-orange-500">
                  {scores.hyperactivityScore}
                </div>
                <p className="text-sm text-muted-foreground">24점 만점</p>
              </div>
            </div>

            <div className="bg-white border-2 border-gray-100 rounded-xl p-6">
              <div className="text-center">
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Zap className="text-purple-500" size={24} />
                </div>
                <h3 className="font-semibold text-foreground mb-2">충동성</h3>
                <div className="text-2xl font-bold text-purple-500">
                  {scores.impulsivityScore}
                </div>
                <p className="text-sm text-muted-foreground">12점 만점</p>
              </div>
            </div>
          </div>

          {/* Result Interpretation */}
          <div className="bg-yellow-50 border-l-4 border-yellow-400 p-6 mb-8">
            <div className="flex items-start">
              <Lightbulb className="text-yellow-500 mt-1 mr-3" size={20} />
              <div>
                <h3 className="font-semibold text-foreground mb-2">결과 해석</h3>
                <p className="text-muted-foreground mb-4">
                  귀하의 검사 결과는 <strong>{interpretation.level}</strong>에 해당합니다.
                  {interpretation.description}
                </p>
                <h4 className="font-semibold text-foreground mb-2">권장사항</h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  {interpretation.recommendations.map((rec: string, index: number) => (
                    <li key={index}>• {rec}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Medical Disclaimer */}
          <div className="bg-red-50 border-l-4 border-red-500 p-6 mb-8">
            <div className="flex items-start">
              <AlertTriangle className="text-red-500 mt-1 mr-3" size={20} />
              <div>
                <h3 className="font-semibold text-foreground mb-2">의료진 상담 안내</h3>
                <p className="text-sm text-muted-foreground">
                  본 검사는 선별용 도구로 의학적 진단을 대체할 수 없습니다.
                  정확한 진단과 치료를 위해서는 반드시 정신건강의학과 전문의와 상담하시기 바랍니다.
                </p>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4">
            <Button
              onClick={handleRetakeTest}
              variant="outline"
              className="flex-1 border-2 border-medical-blue text-medical-blue font-semibold hover:bg-blue-50"
            >
              <RotateCcw size={16} className="mr-2" />
              다시 검사하기
            </Button>
            <Button
              onClick={handleKakaoShare}
              variant="outline"
              className="flex-1 border-2 border-green-500 text-green-600 font-semibold hover:bg-green-50"
            >
              <Share2 size={16} className="mr-2" />
              카톡 공유하기
            </Button>
            <Button
              onClick={handlePrintResults}
              className="flex-1 bg-medical-blue text-white font-semibold hover:bg-blue-700"
            >
              <Printer size={16} className="mr-2" />
              결과 인쇄하기
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
