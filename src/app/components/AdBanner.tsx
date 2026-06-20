import React from 'react';

interface AdBannerProps {
  zone: string;
  width?: string | number;
  height?: number;
  label?: string;
  sponsored?: boolean;
  className?: string;
  style?: React.CSSProperties;
}

export function AdBanner({ zone, width = '100%', height = 90, label, sponsored, style }: AdBannerProps) {
  return (
    <div
      className="ad-placeholder"
      style={{
        width,
        height,
        minHeight: height,
        position: 'relative',
        ...style,
      }}
    >
      {sponsored ? (
        <div style={{
          position: 'absolute', top: 5, left: 8,
          background: '#43A047', color: '#fff',
          fontSize: 10, padding: '2px 7px', borderRadius: 3, fontWeight: 700,
          letterSpacing: 0.3,
        }}>Sponsored</div>
      ) : (
        <div className="ad-label">Ad</div>
      )}
      <span style={{ fontSize: 11, color: '#9E9E9E', textAlign: 'center', lineHeight: 1.4 }}>
        {label || zone}
      </span>
    </div>
  );
}
