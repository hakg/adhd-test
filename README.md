# 성인 ADHD 자가진단 도구

한국어로 제작된 성인 ADHD 자가진단 웹 애플리케이션입니다.

## 주요 기능

- 18개 질문으로 구성된 ADHD 선별검사
- 주의력 부족, 과다행동, 충동성 점수 계산
- 4단계 위험도 해석 (정상~고위험군)
- 카카오톡 공유 기능
- 검사 결과 인쇄 기능
- 의료진 상담 안내

## 기술 스택

- **Frontend**: React, TypeScript, Tailwind CSS
- **Backend**: Express.js, TypeScript
- **State Management**: TanStack Query
- **UI Components**: Radix UI + Shadcn/ui
- **Icons**: Lucide React

## 로컬 개발

```bash
# 의존성 설치
npm install

# 개발 서버 시작
npm run dev

# 브라우저에서 http://localhost:5000 접속
```

## 배포

이 프로젝트는 Vercel에 최적화되어 있습니다.

## 의료 면책조항

본 검사는 선별용 도구로 의학적 진단을 대체할 수 없습니다. 정확한 진단을 위해서는 반드시 정신건강의학과 전문의와 상담하시기 바랍니다.

## 라이선스

MIT License