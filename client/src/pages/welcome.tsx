import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Brain, Info, AlertTriangle } from "lucide-react";
import { useLocation } from "wouter";

export default function Welcome() {
  const [, navigate] = useLocation();

  const handleStartTest = () => {
    navigate("/assessment");
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-background">
      <Card className="w-full max-w-2xl bg-card rounded-2xl shadow-lg">
        <CardContent className="p-8 md:p-12">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-medical-blue rounded-full flex items-center justify-center mx-auto mb-4">
              <Brain className="text-white" size={32} />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              성인 ADHD 자가진단
            </h1>
            <p className="text-lg text-muted-foreground">
              주의력결핍 과다행동장애 선별검사
            </p>
          </div>

          <div className="bg-blue-50 border-l-4 border-medical-blue p-6 mb-8">
            <div className="flex items-start">
              <Info className="text-medical-blue mt-1 mr-3" size={20} />
              <div>
                <h3 className="font-semibold text-foreground mb-2">검사 안내사항</h3>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• 총 18개의 질문으로 구성되어 있습니다</li>
                  <li>• 지난 6개월간의 증상을 기준으로 답해주세요</li>
                  <li>• 정확한 답변을 위해 충분히 생각하고 선택해주세요</li>
                  <li>• 검사 시간은 약 5-10분 소요됩니다</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="bg-red-50 border-l-4 border-red-500 p-6 mb-8">
            <div className="flex items-start">
              <AlertTriangle className="text-red-500 mt-1 mr-3" size={20} />
              <div>
                <h3 className="font-semibold text-foreground mb-2">중요한 안내</h3>
                <p className="text-sm text-muted-foreground">
                  이 검사는 선별용 도구로, 정확한 진단을 위해서는 반드시 전문의와 상담하시기 바랍니다.
                  검사 결과가 진단을 대체할 수 없습니다.
                </p>
              </div>
            </div>
          </div>

          <Button
            onClick={handleStartTest}
            className="w-full bg-medical-blue text-white py-4 px-6 text-lg font-semibold hover:bg-blue-700 transition-colors duration-200"
            size="lg"
          >
            검사 시작하기
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
