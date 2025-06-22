import { motion } from "framer-motion";
import { Trophy, Star, Award, Target } from "lucide-react";

interface AchievementBadgeProps {
  type: "completion" | "speed" | "accuracy" | "first";
  title: string;
  description: string;
  isUnlocked: boolean;
}

export function AchievementBadge({ type, title, description, isUnlocked }: AchievementBadgeProps) {
  const getIcon = () => {
    switch (type) {
      case "completion":
        return <Trophy size={24} />;
      case "speed":
        return <Star size={24} />;
      case "accuracy":
        return <Target size={24} />;
      case "first":
        return <Award size={24} />;
      default:
        return <Trophy size={24} />;
    }
  };

  const getColors = () => {
    if (!isUnlocked) {
      return "bg-gray-100 text-gray-400 border-gray-200";
    }
    
    switch (type) {
      case "completion":
        return "bg-gradient-to-br from-yellow-100 to-orange-100 text-yellow-700 border-yellow-300";
      case "speed":
        return "bg-gradient-to-br from-blue-100 to-purple-100 text-blue-700 border-blue-300";
      case "accuracy":
        return "bg-gradient-to-br from-green-100 to-emerald-100 text-green-700 border-green-300";
      case "first":
        return "bg-gradient-to-br from-purple-100 to-pink-100 text-purple-700 border-purple-300";
      default:
        return "bg-gradient-to-br from-gray-100 to-gray-200 text-gray-700 border-gray-300";
    }
  };

  return (
    <motion.div
      className={`p-4 rounded-2xl border-2 ${getColors()} transition-all duration-300 ${
        isUnlocked ? 'shadow-lg hover:shadow-xl' : 'opacity-50'
      }`}
      whileHover={isUnlocked ? { scale: 1.05 } : {}}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex items-center gap-3">
        <div className={`p-2 rounded-full ${isUnlocked ? 'bg-white/50' : 'bg-gray-200'}`}>
          {getIcon()}
        </div>
        <div>
          <h3 className={`font-semibold ${isUnlocked ? 'text-foreground' : 'text-gray-500'}`}>
            {title}
          </h3>
          <p className={`text-sm ${isUnlocked ? 'text-muted-foreground' : 'text-gray-400'}`}>
            {description}
          </p>
        </div>
      </div>
      
      {isUnlocked && (
        <motion.div
          className="absolute -top-1 -right-1 w-4 h-4 bg-yellow-400 rounded-full"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.5, type: "spring" }}
        />
      )}
    </motion.div>
  );
} 