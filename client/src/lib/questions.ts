export interface Question {
  id: number;
  category: string;
  text: string;
  type: 'inattention' | 'hyperactivity' | 'impulsivity';
}

export const questions: Question[] = [
  {
    id: 1,
    category: "주의력 부족",
    text: "업무나 일상 활동에서 세부사항을 놓치거나 부주의한 실수를 자주 한다",
    type: "inattention"
  },
  {
    id: 2,
    category: "주의력 부족",
    text: "회의나 대화 중에 집중을 유지하는데 어려움이 있다",
    type: "inattention"
  },
  {
    id: 3,
    category: "주의력 부족",
    text: "업무나 가정에서 해야 할 일을 완료하지 못한다",
    type: "inattention"
  },
  {
    id: 4,
    category: "주의력 부족",
    text: "복잡한 업무나 과제를 체계적으로 정리하고 수행하는데 어려움이 있다",
    type: "inattention"
  },
  {
    id: 5,
    category: "주의력 부족",
    text: "지속적인 정신적 노력이 필요한 업무를 피하거나 미루는 경향이 있다",
    type: "inattention"
  },
  {
    id: 6,
    category: "주의력 부족",
    text: "중요한 물건(열쇠, 지갑, 휴대폰 등)을 자주 잃어버린다",
    type: "inattention"
  },
  {
    id: 7,
    category: "주의력 부족",
    text: "외부 자극이나 생각에 쉽게 산만해진다",
    type: "inattention"
  },
  {
    id: 8,
    category: "주의력 부족",
    text: "일상적인 활동(약속, 청구서 납부 등)을 자주 잊어버린다",
    type: "inattention"
  },
  {
    id: 9,
    category: "주의력 부족",
    text: "업무나 여가 활동에서 지속적으로 주의를 집중하는데 어려움이 있다",
    type: "inattention"
  },
  {
    id: 10,
    category: "과다행동",
    text: "회의나 식사 등 앉아있어야 하는 상황에서 자리를 떠나고 싶어한다",
    type: "hyperactivity"
  },
  {
    id: 11,
    category: "과다행동",
    text: "끊임없이 움직이거나 마치 모터가 달린 것처럼 행동한다",
    type: "hyperactivity"
  },
  {
    id: 12,
    category: "과다행동",
    text: "여가 활동에 조용히 참여하는 것이 어렵다",
    type: "hyperactivity"
  },
  {
    id: 13,
    category: "과다행동",
    text: "지나치게 말을 많이 한다",
    type: "hyperactivity"
  },
  {
    id: 14,
    category: "과다행동",
    text: "업무나 일상 활동에서 안절부절 못하거나 불안해한다",
    type: "hyperactivity"
  },
  {
    id: 15,
    category: "충동성",
    text: "다른 사람의 말이 끝나기 전에 성급하게 대답한다",
    type: "impulsivity"
  },
  {
    id: 16,
    category: "충동성",
    text: "자신의 순서를 기다리는데 어려움이 있다",
    type: "impulsivity"
  },
  {
    id: 17,
    category: "충동성",
    text: "다른 사람의 대화나 활동에 끼어들거나 방해한다",
    type: "impulsivity"
  },
  {
    id: 18,
    category: "충동성",
    text: "중요한 결정을 성급하게 내리거나 충동적으로 행동한다",
    type: "impulsivity"
  }
];

export const answerOptions = [
  { value: 0, text: "전혀 없음" },
  { value: 1, text: "드물게" },
  { value: 2, text: "때때로" },
  { value: 3, text: "자주" },
  { value: 4, text: "매우 자주" }
];

export function calculateScores(answers: number[]) {
  let inattentionScore = 0;
  let hyperactivityScore = 0;
  let impulsivityScore = 0;

  questions.forEach((question, index) => {
    const score = answers[index] || 0;
    switch (question.type) {
      case 'inattention':
        inattentionScore += score;
        break;
      case 'hyperactivity':
        hyperactivityScore += score;
        break;
      case 'impulsivity':
        impulsivityScore += score;
        break;
    }
  });

  const totalScore = inattentionScore + hyperactivityScore + impulsivityScore;

  return {
    totalScore,
    inattentionScore,
    hyperactivityScore,
    impulsivityScore
  };
}

export function getResultInterpretation(totalScore: number) {
  if (totalScore >= 40) {
    return {
      level: "고위험군",
      description: "성인 ADHD 증상이 심각한 수준으로 나타났습니다. 일상생활과 직장생활에 상당한 영향을 미칠 수 있는 상태입니다.",
      recommendations: [
        "정신건강의학과 전문의 상담을 즉시 받으시기 바랍니다",
        "정확한 진단을 위한 종합적인 평가가 필요합니다",
        "약물치료 및 인지행동치료를 고려해볼 수 있습니다",
        "직장과 가정에서의 적응 전략에 대해 전문가와 상의하세요"
      ]
    };
  } else if (totalScore >= 28) {
    return {
      level: "중등도 위험군",
      description: "성인 ADHD 증상이 일상생활에 영향을 줄 수 있는 수준으로 나타났습니다.",
      recommendations: [
        "정신건강의학과 전문의 상담을 받아보시기 바랍니다",
        "정확한 진단을 위한 추가 검사가 필요할 수 있습니다",
        "일상생활 관리 방법과 스트레스 대처법에 대해 전문가와 상의하세요",
        "규칙적인 생활습관과 시간 관리 전략을 실천하세요"
      ]
    };
  } else if (totalScore >= 16) {
    return {
      level: "경미한 위험군",
      description: "일부 성인 ADHD 증상이 관찰되지만 경미한 수준입니다.",
      recommendations: [
        "증상이 지속되거나 악화될 경우 전문의 상담을 고려하세요",
        "규칙적인 생활패턴과 충분한 수면을 유지하세요",
        "스트레스 관리와 건강한 생활습관을 실천하세요",
        "정기적으로 자가 모니터링을 해보세요"
      ]
    };
  } else {
    return {
      level: "정상 범위",
      description: "현재 성인 ADHD 증상이 거의 나타나지 않는 정상 범위입니다.",
      recommendations: [
        "현재 상태를 잘 유지하시기 바랍니다",
        "건강한 생활습관을 지속적으로 실천하세요",
        "스트레스 관리에 지속적으로 관심을 가지세요",
        "필요시 정기적인 정신건강 체크를 받아보세요"
      ]
    };
  }
}
