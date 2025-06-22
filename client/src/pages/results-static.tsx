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

  const handlePrint = () => {
    window.print();
  };

  const handleKakaoShare = () => {
    if (typeof window !== 'undefined' && (window as any).Kakao) {
      (window as any).Kakao.Share.sendDefault({
        objectType: 'feed',
        content: {
          title: 'ADHD 자가진단 결과',
          description: `총점: ${scores?.totalScore}점 (${interpretation?.level})`,
          imageUrl: 'https://developers.kakao.com/assets/img/about/logos/kakaolink/kakaolink_btn_medium.png',
          link: {
            mobileWebUrl: window.location.href,
            webUrl: window.location.href,
          },
        },
        buttons: [
          {
            title: '결과 보기',
            link: {
              mobileWebUrl: window.location.href,
              webUrl: window.location.href,
            },
          },
        ],
      });
    } else {
      // Fallback: copy to clipboard
      const shareText = `ADHD 자가진단 결과\n총점: ${scores?.totalScore}점 (${interpretation?.level})\n${window.location.href}`;
      navigator.clipboard.writeText(shareText).then(() => {
        alert('결과가 클립보드에 복사되었습니다.');
      });
    }
  };

  if (!scores || !interpretation) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-medical-blue mx-auto mb-4"></div>
          <p className="text-muted-foreground">결과를 계산하고 있습니다...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="mb-8 text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Check className="text-green-500" size={32} />
          </div>
          <h1 className="text-3xl font-bold text-foreground mb-2">
            ADHD 자가진단 결과
          </h1>
          <p className="text-muted-foreground">
            검사가 완료되었습니다. 아래 결과를 확인해보세요.
          </p>
        </div>

        {/* 총점 및 위험도 */}
        <Card className="mb-8 border-2 border-medical-blue/20">
          <CardContent className="p-8 text-center">
            <div className="mb-6">
              <h2 className="text-4xl font-bold text-medical-blue mb-2">
                {scores.totalScore}점
              </h2>
              <p className="text-muted-foreground">72점 만점</p>
            </div>
            
            <div className={`inline-flex items-center px-6 py-3 rounded-full text-lg font-semibold ${
              interpretation.level === "정상" ? "bg-green-100 text-green-700" :
              interpretation.level === "경미한 위험" ? "bg-yellow-100 text-yellow-700" :
              interpretation.level === "중간 위험" ? "bg-orange-100 text-orange-700" :
              "bg-red-100 text-red-700"
            }`}>
              {interpretation.level === "정상" ? <Check className="mr-2" size={20} /> :
               interpretation.level === "경미한 위험" ? <Eye className="mr-2" size={20} /> :
               interpretation.level === "중간 위험" ? <Lightbulb className="mr-2" size={20} /> :
               <AlertTriangle className="mr-2" size={20} />}
              {interpretation.level}
            </div>
          </CardContent>
        </Card>

        {/* 세부 점수 */}
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

        {/* 결과 해석 */}
        <Card className="mb-8">
          <CardContent className="p-6">
            <h3 className="text-xl font-semibold mb-4 flex items-center">
              <Lightbulb className="mr-2 text-amber-500" size={24} />
              결과 해석
            </h3>
            <div className="prose max-w-none">
              <p className="text-muted-foreground leading-relaxed mb-4">
                {interpretation.description}
              </p>
              <div className="bg-amber-50 border-l-4 border-amber-400 p-4 rounded-r-lg">
                <p className="text-amber-800 font-medium mb-2">
                  ⚠️ 중요한 안내사항
                </p>
                <p className="text-amber-700 text-sm leading-relaxed">
                  이 자가진단 도구는 참고용으로만 사용되어야 하며, 의학적 진단을 대체할 수 없습니다. 
                  정확한 진단과 치료를 위해서는 반드시 정신건강의학과 전문의와 상담하시기 바랍니다.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* 액션 버튼들 */}
        <div className="flex flex-wrap gap-4 justify-center">
          <Button 
            onClick={handleRetakeTest}
            className="bg-medical-blue hover:bg-medical-blue/90"
          >
            <RotateCcw className="mr-2" size={16} />
            다시 검사하기
          </Button>
          
          <Button 
            variant="outline" 
            onClick={handlePrint}
            className="border-medical-blue text-medical-blue hover:bg-medical-blue/10"
          >
            <Printer className="mr-2" size={16} />
            결과 인쇄하기
          </Button>
          
          <Button 
            variant="outline" 
            onClick={handleKakaoShare}
            className="border-yellow-500 text-yellow-600 hover:bg-yellow-50"
          >
            <Share2 className="mr-2" size={16} />
            카카오톡 공유
          </Button>
        </div>

        {/* 전문가 상담 안내 */}
        {interpretation.level !== "정상" && (
          <Card className="mt-8 border-2 border-amber-200 bg-amber-50">
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-3 flex items-center text-amber-800">
                <AlertTriangle className="mr-2" size={20} />
                전문가 상담 권장
              </h3>
              <p className="text-amber-700 leading-relaxed">
                검사 결과에 따르면 전문가 상담을 받아보시는 것이 좋겠습니다. 
                정신건강의학과에서 보다 정확한 평가와 필요시 적절한 치료 방향을 제시받을 수 있습니다.
              </p>
            </CardContent>
          </Card>
        )}
      </div>

      {/* 카카오톡 SDK 로드 */}
      <script
        dangerouslySetInnerHTML={{
          __html: `
            if (!window.Kakao) {
              const script = document.createElement('script');
              script.src = 'https://t1.kakaocdn.net/kakao_js_sdk/2.7.2/kakao.min.js';
              script.integrity = 'sha384-TiCUE00h649CAMonG018J2ujOgDKW/kVWlChEuu4jK2vxfAAD0eZxzCKakxg55G4';
              script.crossOrigin = 'anonymous';
              script.onload = function() {
                window.Kakao.init('YOUR_KAKAO_JS_KEY');
              };
              document.head.appendChild(script);
            }
          `
        }}
      />
    </div>
  );
}