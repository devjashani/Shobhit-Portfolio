import React, { useRef, useState, useEffect, useLayoutEffect, useCallback } from 'react';

export interface FitTextProps {
  text: string;
  maxSize: number;
  minSize: number;
  className?: string;
}

export const FitText: React.FC<FitTextProps> = ({
  text,
  maxSize,
  minSize,
  className = '',
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLSpanElement>(null);
  const [fontSize, setFontSize] = useState<number>(maxSize);
  const fontSizeRef = useRef<number>(maxSize);

  const calculateSize = useCallback(() => {
    const container = containerRef.current;
    const textEl = textRef.current;
    if (!container || !textEl) return;

    const containerWidth = container.clientWidth;
    if (containerWidth <= 0) return;

    // Get current font size applied to the text element
    const computed = parseFloat(window.getComputedStyle(textEl).fontSize);
    const currentSize = !isNaN(computed) && computed > 0 ? computed : (fontSizeRef.current || maxSize);

    const textWidth = textEl.scrollWidth;
    if (textWidth <= 0) return;

    // Calculate proportional font size to fit container width
    const targetSize = (containerWidth / textWidth) * currentSize;
    let clampedSize = Math.max(minSize, Math.min(maxSize, targetSize));

    // Apply clamped size to measure potential sub-pixel overflow
    textEl.style.fontSize = `${clampedSize}px`;

    if (textEl.scrollWidth > containerWidth && clampedSize > minSize) {
      clampedSize = Math.max(minSize, (containerWidth / textEl.scrollWidth) * clampedSize * 0.995);
      textEl.style.fontSize = `${clampedSize}px`;
    }

    const finalSize = Math.floor(clampedSize * 10) / 10;
    fontSizeRef.current = finalSize;
    setFontSize(finalSize);
  }, [maxSize, minSize]);

  // Synchronous initial measurement before paint
  useLayoutEffect(() => {
    calculateSize();
  }, [calculateSize, text]);

  // Handle ResizeObserver, window resize, and font loading
  useEffect(() => {
    calculateSize();

    // Re-measure when document fonts finish loading (critical for custom fonts like Syne)
    if (typeof document !== 'undefined' && 'fonts' in document) {
      document.fonts.ready.then(() => {
        calculateSize();
      });
    }

    const handleFontsDone = () => {
      calculateSize();
    };

    document.fonts?.addEventListener?.('loadingdone', handleFontsDone);

    let ro: ResizeObserver | null = null;
    if (typeof ResizeObserver !== 'undefined' && containerRef.current) {
      ro = new ResizeObserver(() => {
        calculateSize();
      });
      ro.observe(containerRef.current);
    }

    const handleResize = () => {
      calculateSize();
    };

    window.addEventListener('resize', handleResize);

    return () => {
      document.fonts?.removeEventListener?.('loadingdone', handleFontsDone);
      if (ro) ro.disconnect();
      window.removeEventListener('resize', handleResize);
    };
  }, [calculateSize]);

  return (
    <div
      ref={containerRef}
      style={{
        display: 'block',
        width: '100%',
        whiteSpace: 'nowrap',
      }}
      className="w-full"
    >
      <span
        ref={textRef}
        className={className}
        style={{
          display: 'inline-block',
          whiteSpace: 'nowrap',
          fontSize: `${fontSize}px`,
          lineHeight: 0.88,
        }}
      >
        {text}
      </span>
    </div>
  );
};
