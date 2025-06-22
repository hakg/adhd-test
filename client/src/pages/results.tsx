import { useEffect, useState } from "react";
import { Button } from "../components/ui/button";
import { Card, CardContent } from "../components/ui/card";
import { Check, Eye, Zap, Activity, RotateCcw, Printer, Lightbulb, AlertTriangle, Share2, TrendingUp, Award, Trophy } from "lucide-react";
import { useLocation } from "wouter";
import { calculateScores, getResultInterpretation } from "../lib/questions";
import { motion } from "framer-motion";
import { AchievementBadge } from "../components/achievement-badge";
import { ResultsTopAd, ResultsBottomAd } from "../components/adsense-ad";

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

  const getScoreColor = (score: number, max: number) => {
    const percentage = (score / max) * 100;
    if (percentage >= 80) return "text-red-600";
    if (percentage >= 60) return "text-orange-600";
    if (percentage >= 40) return "text-yellow-600";
    return "text-green-600";
  };

  const getScoreBarColor = (score: number, max: number) => {
    const percentage = (score / max) * 100;
    if (percentage >= 80) return "bg-red-500";
    if (percentage >= 60) return "bg-orange-500";
    if (percentage >= 40) return "bg-yellow-500";
    return "bg-green-500";
  };

  // 성취 배지 계산
  const getAchievements = () => {
    if (!scores) return [];
    
    const achievements = [
      {
        type: "completion" as const,
        title: "검사 완료",
        description: "모든 질문에 답변했습니다",
        isUnlocked: true
      },
      {
        type: "first" as const,
        title: "첫 번째 검사",
        description: "처음으로 검사를 완료했습니다",
        isUnlocked: true
      },
      {
        type: "accuracy" as const,
        title: "정확한 답변",
        description: "모든 질문에 신중하게 답변했습니다",
        isUnlocked: scores.totalScore > 0
      },
      {
        type: "speed" as const,
        title: "빠른 완료",
        description: "5분 이내에 검사를 완료했습니다",
        isUnlocked: false // 실제로는 시간 측정이 필요
      }
    ];
    
    return achievements;
  };

  if (!scores || !interpretation) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-blue-50 via-white to-purple-50">
        <motion.div 
          className="text-center"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
        >
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-medical-blue mx-auto"></div>
          <p className="mt-4 text-muted-foreground text-lg">결과를 계산하고 있습니다...</p>
        </motion.div>
      </div>
    );
  }

  const achievements = getAchievements();

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="w-full max-w-4xl"
      >
        <Card className="bg-card/80 backdrop-blur-sm rounded-3xl shadow-2xl border-0">
          <CardContent className="p-8 md:p-12">
            <motion.div 
              className="text-center mb-8"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
            >
              <motion.div 
                className="w-24 h-24 bg-gradient-to-br from-green-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg"
                whileHover={{ scale: 1.1, rotate: 5 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <Check className="text-white" size={40} />
              </motion.div>
              <h1 className="text-4xl font-bold text-foreground mb-2">검사 완료</h1>
              <p className="text-xl text-muted-foreground">성인 ADHD 자가진단 결과입니다</p>
            </motion.div>

            {/* Score Display */}
            <motion.div 
              className="bg-gradient-to-r from-blue-50 to-purple-100 rounded-3xl p-8 mb-8 border border-blue-200"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
            >
              <div className="text-center">
                <h2 className="text-3xl font-bold text-foreground mb-4 flex items-center justify-center gap-2">
                  <Award className="text-yellow-600" size={32} />
                  총점
                </h2>
                <motion.div 
                  className="text-8xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2"
                  initial={{ scale: 0.5, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.6, duration: 0.8, type: "spring" }}
                >
                  {scores.totalScore}
                </motion.div>
                <p className="text-muted-foreground text-lg">72점 만점</p>
              </div>
            </motion.div>

            {/* AdSense 광고 1 - 결과 상단 */}
            <ResultsTopAd />

            {/* Detailed Scores */}
            <motion.div 
              className="grid md:grid-cols-3 gap-6 mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.6 }}
            >
              <motion.div 
                className="bg-white border-2 border-gray-100 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300"
                whileHover={{ scale: 1.02 }}
              >
                <div className="text-center">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Eye className="text-medical-blue" size={32} />
                  </div>
                  <h3 className="font-semibold text-foreground mb-2 text-lg">주의력 부족</h3>
                  <div className={`text-4xl font-bold mb-2 ${getScoreColor(scores.inattentionScore, 36)}`}>
                    {scores.inattentionScore}
                  </div>
                  <p className="text-sm text-muted-foreground mb-3">36점 만점</p>
                  
                  {/* Progress bar */}
                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <motion.div 
                      className={`h-3 rounded-full ${getScoreBarColor(scores.inattentionScore, 36)}`}
                      initial={{ width: 0 }}
                      animate={{ width: `${(scores.inattentionScore / 36) * 100}%` }}
                      transition={{ delay: 0.8, duration: 1 }}
                    />
                  </div>
                </div>
              </motion.div>

              <motion.div 
                className="bg-white border-2 border-gray-100 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300"
                whileHover={{ scale: 1.02 }}
              >
                <div className="text-center">
                  <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Activity className="text-orange-500" size={32} />
                  </div>
                  <h3 className="font-semibold text-foreground mb-2 text-lg">과다행동</h3>
                  <div className={`text-4xl font-bold mb-2 ${getScoreColor(scores.hyperactivityScore, 24)}`}>
                    {scores.hyperactivityScore}
                  </div>
                  <p className="text-sm text-muted-foreground mb-3">24점 만점</p>
                  
                  {/* Progress bar */}
                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <motion.div 
                      className={`h-3 rounded-full ${getScoreBarColor(scores.hyperactivityScore, 24)}`}
                      initial={{ width: 0 }}
                      animate={{ width: `${(scores.hyperactivityScore / 24) * 100}%` }}
                      transition={{ delay: 0.9, duration: 1 }}
                    />
                  </div>
                </div>
              </motion.div>

              <motion.div 
                className="bg-white border-2 border-gray-100 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300"
                whileHover={{ scale: 1.02 }}
              >
                <div className="text-center">
                  <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Zap className="text-purple-500" size={32} />
                  </div>
                  <h3 className="font-semibold text-foreground mb-2 text-lg">충동성</h3>
                  <div className={`text-4xl font-bold mb-2 ${getScoreColor(scores.impulsivityScore, 12)}`}>
                    {scores.impulsivityScore}
                  </div>
                  <p className="text-sm text-muted-foreground mb-3">12점 만점</p>
                  
                  {/* Progress bar */}
                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <motion.div 
                      className={`h-3 rounded-full ${getScoreBarColor(scores.impulsivityScore, 12)}`}
                      initial={{ width: 0 }}
                      animate={{ width: `${(scores.impulsivityScore / 12) * 100}%` }}
                      transition={{ delay: 1.0, duration: 1 }}
                    />
                  </div>
                </div>
              </motion.div>
            </motion.div>

            {/* AdSense 광고 2 - 상세 점수 후 */}
            <ResultsBottomAd />

            {/* Achievements Section */}
            <motion.div 
              className="mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.6 }}
            >
              <h3 className="text-2xl font-bold text-foreground mb-4 flex items-center gap-2">
                <Trophy className="text-yellow-600" size={28} />
                획득한 성취
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {achievements.map((achievement, index) => (
                  <AchievementBadge
                    key={index}
                    type={achievement.type}
                    title={achievement.title}
                    description={achievement.description}
                    isUnlocked={achievement.isUnlocked}
                  />
                ))}
              </div>
            </motion.div>

            {/* Result Interpretation */}
            <motion.div 
              className="bg-gradient-to-r from-yellow-50 to-orange-50 border-l-4 border-yellow-400 p-6 mb-8 rounded-r-xl"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1.0, duration: 0.6 }}
            >
              <div className="flex items-start">
                <Lightbulb className="text-yellow-500 mt-1 mr-3" size={24} />
                <div>
                  <h3 className="font-semibold text-foreground mb-2 text-lg">결과 해석</h3>
                  <p className="text-muted-foreground mb-4 text-lg">
                    귀하의 검사 결과는 <strong className="text-foreground">{interpretation.level}</strong>에 해당합니다.
                    {interpretation.description}
                  </p>
                  <h4 className="font-semibold text-foreground mb-2">권장사항</h4>
                  <ul className="text-sm text-muted-foreground space-y-2">
                    {interpretation.recommendations.map((rec: string, index: number) => (
                      <motion.li 
                        key={index}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 1.2 + index * 0.1, duration: 0.3 }}
                        className="flex items-start gap-2"
                      >
                        <span className="text-yellow-500 mt-1">•</span>
                        {rec}
                      </motion.li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>

            {/* Medical Disclaimer */}
            <motion.div 
              className="bg-gradient-to-r from-red-50 to-pink-50 border-l-4 border-red-500 p-6 mb-8 rounded-r-xl"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1.4, duration: 0.6 }}
            >
              <div className="flex items-start">
                <AlertTriangle className="text-red-500 mt-1 mr-3" size={24} />
                <div>
                  <h3 className="font-semibold text-foreground mb-2 text-lg">의료진 상담 안내</h3>
                  <p className="text-sm text-muted-foreground text-lg">
                    본 검사는 선별용 도구로 의학적 진단을 대체할 수 없습니다.
                    정확한 진단과 치료를 위해서는 반드시 정신건강의학과 전문의와 상담하시기 바랍니다.
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Action Buttons */}
            <motion.div 
              className="flex flex-col sm:flex-row gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.7, duration: 0.6 }}
            >
              <Button
                onClick={handleRetakeTest}
                variant="outline"
                className="flex-1 border-2 border-medical-blue text-medical-blue font-semibold hover:bg-blue-50 py-4 text-lg rounded-2xl transition-all duration-300 hover:scale-[1.02]"
              >
                <RotateCcw size={20} className="mr-2" />
                다시 검사하기
              </Button>
              <Button
                onClick={handleKakaoShare}
                variant="outline"
                className="flex-1 border-2 border-green-500 text-green-600 font-semibold hover:bg-green-50 py-4 text-lg rounded-2xl transition-all duration-300 hover:scale-[1.02]"
              >
                <Share2 size={20} className="mr-2" />
                카톡 공유하기
              </Button>
              <Button
                onClick={handlePrintResults}
                className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold hover:from-blue-700 hover:to-purple-700 py-4 text-lg rounded-2xl transition-all duration-300 hover:scale-[1.02] shadow-lg"
              >
                <Printer size={20} className="mr-2" />
                결과 인쇄하기
              </Button>
            </motion.div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
