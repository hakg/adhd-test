import { cn } from "../lib/utils";
import { Check } from "lucide-react";

interface AnswerOptionProps {
  value: string;
  text: string;
  isSelected: boolean;
  onSelect: (value: string) => void;
}

export function AnswerOption({ value, text, isSelected, onSelect }: AnswerOptionProps) {
  return (
    <div
      onClick={() => onSelect(value)}
      className={cn(
        "relative p-4 rounded-xl border-2 cursor-pointer transition-all duration-300 transform hover:scale-[1.02] hover:shadow-lg",
        "group",
        isSelected
          ? "border-medical-blue bg-blue-50 shadow-md"
          : "border-gray-200 bg-white hover:border-blue-300 hover:bg-blue-25"
      )}
    >
      <div className="flex items-center justify-between">
        <span className={cn(
          "text-lg font-medium transition-colors duration-200",
          isSelected ? "text-medical-blue" : "text-foreground group-hover:text-medical-blue"
        )}>
          {text}
        </span>
        
        <div className={cn(
          "w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all duration-300",
          isSelected
            ? "border-medical-blue bg-medical-blue"
            : "border-gray-300 group-hover:border-medical-blue"
        )}>
          {isSelected && (
            <Check 
              size={14} 
              className="text-white animate-in zoom-in-50 duration-200" 
            />
          )}
        </div>
      </div>
      
      {/* Hover effect overlay */}
      <div className={cn(
        "absolute inset-0 rounded-xl bg-gradient-to-r from-blue-500/5 to-purple-500/5 opacity-0 transition-opacity duration-300",
        "group-hover:opacity-100"
      )} />
      
      {/* Selection indicator */}
      {isSelected && (
        <div className="absolute -top-1 -right-1 w-4 h-4 bg-medical-blue rounded-full animate-in zoom-in-50 duration-200" />
      )}
    </div>
  );
}
