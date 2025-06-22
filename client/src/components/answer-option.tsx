import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

interface AnswerOptionProps {
  value: string;
  text: string;
  isSelected: boolean;
  onSelect: (value: string) => void;
}

export function AnswerOption({ value, text, isSelected, onSelect }: AnswerOptionProps) {
  return (
    <Label
      htmlFor={value}
      className={`block border-2 rounded-xl p-4 cursor-pointer hover:border-medical-light hover:bg-blue-50 transition-all duration-200 ${
        isSelected ? 'border-medical-blue bg-blue-50' : 'border-gray-200'
      }`}
    >
      <div className="flex items-center">
        <RadioGroupItem
          value={value}
          id={value}
          className="mr-3"
          onClick={() => onSelect(value)}
        />
        <span className="font-medium">{text}</span>
      </div>
    </Label>
  );
}
