import { Button } from "../components/ui/button";
import { Card, CardContent } from "../components/ui/card";
import { Brain, Info, AlertTriangle, Sparkles, Clock, CheckCircle } from "lucide-react";
import { useLocation } from "wouter";
import { motion } from "framer-motion";

export default function Welcome() {
  const [, navigate] = useLocation();

  const handleStartTest = () => {
    navigate("/assessment");
  };

  const features = [
    { icon: Clock, text: "5-10분 소요", color: "text-blue-600" },
    { icon: CheckCircle, text: "18개 질문", color: "text-green-600" },
    { icon: Sparkles, text: "정확한 분석", color: "text-purple-600" }
  ];

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="w-full max-w-2xl"
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
                className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg"
                whileHover={{ scale: 1.1, rotate: 5 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <Brain className="text-white" size={40} />
              </motion.div>
              
              <motion.h1 
                className="text-4xl md:text-5xl font-bold text-foreground mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.6 }}
              >
                성인 ADHD 자가진단
              </motion.h1>
              
              <motion.p 
                className="text-xl text-muted-foreground"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.6 }}
              >
                주의력결핍 과다행동장애 선별검사
              </motion.p>
            </motion.div>

            {/* Features */}
            <motion.div 
              className="flex justify-center gap-6 mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.6 }}
            >
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  className="flex flex-col items-center gap-2"
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <div className={`w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center ${feature.color}`}>
                    <feature.icon size={24} />
                  </div>
                  <span className="text-sm font-medium text-muted-foreground">{feature.text}</span>
                </motion.div>
              ))}
            </motion.div>

            <motion.div 
              className="bg-gradient-to-r from-blue-50 to-blue-100 border-l-4 border-blue-500 p-6 mb-8 rounded-r-xl"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1.0, duration: 0.6 }}
            >
              <div className="flex items-start">
                <Info className="text-blue-600 mt-1 mr-3" size={20} />
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
            </motion.div>

            <motion.div 
              className="bg-gradient-to-r from-red-50 to-red-100 border-l-4 border-red-500 p-6 mb-8 rounded-r-xl"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1.2, duration: 0.6 }}
            >
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
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.4, duration: 0.6 }}
            >
              <Button
                onClick={handleStartTest}
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-6 px-8 text-xl font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-[1.02] shadow-lg hover:shadow-xl rounded-2xl"
                size="lg"
              >
                <Sparkles className="mr-2" size={20} />
                검사 시작하기
              </Button>
            </motion.div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
