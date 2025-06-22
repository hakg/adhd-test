// Google AdSense 설정
export const ADSENSE_CONFIG = {
  // 실제 AdSense 클라이언트 ID로 교체하세요
  CLIENT_ID: 'ca-pub-9206407310839464',
  
  // 광고 슬롯 ID들 (실제 AdSense에서 생성한 슬롯 ID로 교체하세요)
  AD_SLOTS: {
    // 반응형 광고
    RESPONSIVE_1: '3979136788',
    RESPONSIVE_2: '3236900755',
    
    // 결과 페이지 전용 광고
    RESULTS_TOP: '3979136788',
    RESULTS_BOTTOM: '3236900755',
  },
  
  // 광고 표시 설정
  SETTINGS: {
    // 광고 차단 감지
    DETECT_AD_BLOCKER: true,
    
    // 광고 로딩 타임아웃 (ms)
    LOADING_TIMEOUT: 5000,
    
    // 광고 새로고침 간격 (ms) - 0이면 새로고침 안함
    REFRESH_INTERVAL: 0,
    
    // 개발 모드에서 광고 표시 여부
    SHOW_IN_DEV: false,
  }
};

// 환경별 설정
export const getAdSenseConfig = () => {
  const isDevelopment = import.meta.env.DEV;
  const isProduction = import.meta.env.PROD;
  
  return {
    ...ADSENSE_CONFIG,
    SETTINGS: {
      ...ADSENSE_CONFIG.SETTINGS,
      SHOW_IN_DEV: isDevelopment && ADSENSE_CONFIG.SETTINGS.SHOW_IN_DEV,
    }
  };
};

// 광고 차단 감지 함수
export const detectAdBlocker = (): Promise<boolean> => {
  return new Promise((resolve) => {
    const testAd = document.createElement('div');
    testAd.innerHTML = '&nbsp;';
    testAd.className = 'adsbox';
    testAd.style.position = 'absolute';
    testAd.style.left = '-10000px';
    testAd.style.top = '-1000px';
    testAd.style.width = '1px';
    testAd.style.height = '1px';
    
    document.body.appendChild(testAd);
    
    setTimeout(() => {
      const isBlocked = testAd.offsetHeight === 0;
      document.body.removeChild(testAd);
      resolve(isBlocked);
    }, 100);
  });
};

// 광고 로딩 상태 확인
export const waitForAdSense = (): Promise<void> => {
  return new Promise((resolve, reject) => {
    const timeout = setTimeout(() => {
      reject(new Error('AdSense loading timeout'));
    }, ADSENSE_CONFIG.SETTINGS.LOADING_TIMEOUT);
    
    const checkAdSense = () => {
      if (typeof window !== 'undefined' && (window as any).adsbygoogle) {
        clearTimeout(timeout);
        resolve();
      } else {
        setTimeout(checkAdSense, 100);
      }
    };
    
    checkAdSense();
  });
}; 