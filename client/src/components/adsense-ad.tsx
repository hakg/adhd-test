import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { ADSENSE_CONFIG, detectAdBlocker, waitForAdSense } from '../lib/adsense-config';

interface AdSenseAdProps {
  adSlot: string;
  adFormat?: 'auto' | 'fluid' | 'rectangle' | 'banner';
  className?: string;
  style?: React.CSSProperties;
  fallbackContent?: React.ReactNode;
}

export function AdSenseAd({ 
  adSlot, 
  adFormat = 'auto', 
  className = '', 
  style = {},
  fallbackContent
}: AdSenseAdProps) {
  const adRef = useRef<HTMLDivElement>(null);
  const [isAdBlocked, setIsAdBlocked] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    const loadAd = async () => {
      try {
        // 개발 모드에서 광고 표시 안함
        if (import.meta.env.DEV && !ADSENSE_CONFIG.SETTINGS.SHOW_IN_DEV) {
          setIsLoading(false);
          return;
        }

        // 광고 차단 감지
        if (ADSENSE_CONFIG.SETTINGS.DETECT_AD_BLOCKER) {
          const blocked = await detectAdBlocker();
          if (blocked) {
            setIsAdBlocked(true);
            setIsLoading(false);
            return;
          }
        }

        // AdSense 로딩 대기
        await waitForAdSense();
        
        // 광고 로드
        if (typeof window !== 'undefined' && (window as any).adsbygoogle) {
          (window as any).adsbygoogle.push({});
          setIsLoading(false);
        }
      } catch (error) {
        console.error('AdSense error:', error);
        setHasError(true);
        setIsLoading(false);
      }
    };

    loadAd();
  }, [adSlot]);

  // 광고 차단된 경우
  if (isAdBlocked) {
    return (
      <motion.div
        className={`adsense-container ${className}`}
        style={style}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <div className="bg-gradient-to-r from-yellow-50 to-orange-50 rounded-2xl p-6 border-2 border-dashed border-yellow-300">
          <div className="text-center">
            <span className="text-xs text-yellow-600 bg-yellow-100 px-3 py-1 rounded-full border">
              광고 차단됨
            </span>
            <p className="text-sm text-yellow-700 mt-2">
              광고 차단기를 비활성화하면 더 나은 서비스를 제공할 수 있습니다.
            </p>
          </div>
        </div>
      </motion.div>
    );
  }

  // 에러 발생한 경우
  if (hasError) {
    return (
      <motion.div
        className={`adsense-container ${className}`}
        style={style}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        {fallbackContent || (
          <div className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-2xl p-6 border-2 border-dashed border-gray-300">
            <div className="text-center">
              <span className="text-xs text-gray-500 bg-white px-2 py-1 rounded-full border">
                광고
              </span>
              <p className="text-sm text-gray-600 mt-2">
                광고를 불러올 수 없습니다.
              </p>
            </div>
          </div>
        )}
      </motion.div>
    );
  }

  return (
    <motion.div
      ref={adRef}
      className={`adsense-container ${className}`}
      style={style}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.2 }}
    >
      <div className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-2xl p-4 border-2 border-dashed border-gray-300">
        <div className="text-center mb-3">
          <span className="text-xs text-gray-500 bg-white px-2 py-1 rounded-full border">
            광고
          </span>
        </div>
        
        {/* AdSense 광고 유닛 */}
        <ins
          className="adsbygoogle"
          style={{ display: 'block' }}
          data-ad-client={ADSENSE_CONFIG.CLIENT_ID}
          data-ad-slot={adSlot}
          data-ad-format={adFormat}
          data-full-width-responsive="true"
        />
        
        {/* 로딩 상태 */}
        {isLoading && (
          <div className="flex items-center justify-center py-8">
            <div className="animate-pulse flex space-x-2">
              <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
              <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
              <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
}

// 다양한 광고 크기별 컴포넌트들
export function BannerAd() {
  return (
    <AdSenseAd
      adSlot={ADSENSE_CONFIG.AD_SLOTS.BANNER}
      adFormat="banner"
      className="w-full max-w-728 h-90 mx-auto"
      style={{ minHeight: '90px' }}
    />
  );
}

export function RectangleAd() {
  return (
    <AdSenseAd
      adSlot={ADSENSE_CONFIG.AD_SLOTS.RECTANGLE}
      adFormat="rectangle"
      className="w-full max-w-300 h-250 mx-auto"
      style={{ minHeight: '250px' }}
    />
  );
}

export function ResponsiveAd() {
  return (
    <AdSenseAd
      adSlot={ADSENSE_CONFIG.AD_SLOTS.RESPONSIVE_1}
      adFormat="auto"
      className="w-full"
      style={{ minHeight: '100px' }}
    />
  );
}

// 결과 페이지 전용 광고들
export function ResultsTopAd() {
  return (
    <AdSenseAd
      adSlot={ADSENSE_CONFIG.AD_SLOTS.RESULTS_TOP}
      adFormat="auto"
      className="w-full mb-8"
      style={{ minHeight: '90px' }}
    />
  );
}

export function ResultsMiddleAd() {
  return (
    <AdSenseAd
      adSlot={ADSENSE_CONFIG.AD_SLOTS.RESULTS_MIDDLE}
      adFormat="rectangle"
      className="w-full max-w-300 h-250 mx-auto mb-8"
      style={{ minHeight: '250px' }}
    />
  );
}

export function ResultsBottomAd() {
  return (
    <AdSenseAd
      adSlot={ADSENSE_CONFIG.AD_SLOTS.RESULTS_BOTTOM}
      adFormat="auto"
      className="w-full mb-8"
      style={{ minHeight: '90px' }}
    />
  );
} 