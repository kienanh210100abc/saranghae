import React, { useEffect, useState, useRef } from 'react';
import { loveQuotes } from '../loveQuotes';

function getRandomQuote() {
  return loveQuotes[Math.floor(Math.random() * loveQuotes.length)];
}

export default function QuoteCard() {
  const [quote, setQuote] = useState(getRandomQuote());
  const [progress, setProgress] = useState(0);
  const rafRef = useRef(null);
  const timeoutRef = useRef(null);

  useEffect(() => {
    const duration = 5000;
    const start = Date.now();
    setProgress(100);

    function tick() {
      const elapsed = Date.now() - start;
      const pct = Math.max(0, 100 - (elapsed / duration) * 100);
      setProgress(pct);
      if (elapsed < duration) {
        rafRef.current = requestAnimationFrame(tick);
      }
    }

    rafRef.current = requestAnimationFrame(tick);
    timeoutRef.current = setTimeout(() => {
      setQuote(getRandomQuote());
    }, duration);

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [quote]);

  const handleManual = () => {
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setQuote(getRandomQuote());
    setProgress(100);
  };

  return (
    <div style={{ margin: '18px 0 28px 0', padding: '16px 12px', background: '#fff0f6', borderRadius: 12, boxShadow: '0 2px 8px #fda08522', position: 'relative' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12 }}>
        <div style={{ flex: 1 }}>
          <span style={{ fontSize: 20, color: '#d63384', fontStyle: 'italic' }}>
            “{quote}”
          </span>
        </div>
        <div>
          <button onClick={handleManual} aria-label="Đổi câu" title="Đổi câu" className="refresh-btn" style={{ background: 'transparent', border: 'none', padding: 6, cursor: 'pointer', display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}>
            <svg className="refresh-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="#fda085" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M23 4v6h-6" />
              <path d="M1 20v-6h6" />
              <path d="M3.51 9a9 9 0 0114.13-3.36L23 7" />
              <path d="M20.49 15a9 9 0 01-14.13 3.36L1 17" />
            </svg>
          </button>
        </div>
      </div>

      <div className="progress-bar-container" style={{ width: '100%', height: 7, background: '#fda08522', borderRadius: 5, marginTop: 18, overflow: 'hidden' }}>
        <div className="progress-bar" style={{ width: `${progress}%`, height: '100%', background: 'linear-gradient(90deg, #fda085 0%, #f6d365 100%)', transition: 'width 0.05s linear', borderRadius: 5 }} />
      </div>
    </div>
  );
}
