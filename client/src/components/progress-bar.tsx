import { Progress } from "./ui/progress";
import { CheckCircle, Circle } from "lucide-react";

interface ProgressBarProps {
  current: number;
  total: number;
}

export function ProgressBar({ current, total }: ProgressBarProps) {
  const percentage = (current / total) * 100;
  
  return (
    <div className="mb-8">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-foreground">
          진행 상황
        </h3>
        <span className="text-sm text-muted-foreground">
          {current} / {total}
        </span>
      </div>
      
      <div className="relative">
        <Progress 
          value={percentage} 
          className="h-3 transition-all duration-500 ease-out"
        />
        <div 
          className="absolute inset-0 bg-gradient-to-r from-blue-400 to-blue-600 rounded-full transition-all duration-500 ease-out"
          style={{ 
            width: `${percentage}%`,
            boxShadow: '0 0 10px rgba(59, 130, 246, 0.5)'
          }}
        />
      </div>
      
      {/* Step indicators */}
      <div className="flex justify-between mt-4">
        {Array.from({ length: total }, (_, i) => (
          <div key={i} className="flex flex-col items-center">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 ${
              i < current 
                ? 'bg-medical-blue text-white scale-110' 
                : i === current - 1 
                ? 'bg-medical-blue text-white ring-4 ring-blue-200' 
                : 'bg-gray-200 text-gray-500'
            }`}>
              {i < current ? (
                <CheckCircle size={16} className="animate-pulse" />
              ) : (
                <Circle size={16} />
              )}
            </div>
            <span className="text-xs text-muted-foreground mt-1">
              {i + 1}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
