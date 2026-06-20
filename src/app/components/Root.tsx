import { Outlet, useLocation } from 'react-router';
import { Navbar } from './Navbar';
import { Footer } from './Footer';
import { AdBanner } from './AdBanner';

export function Root() {
  const location = useLocation();

  return (
    <div style={{
      minHeight: '100vh',
      background: '#f0f4f0',
      display: 'flex',
      flexDirection: 'column',
      fontFamily: "'Noto Sans', sans-serif",
      paddingBottom: 50, // room for mobile sticky ad
    }}>
      <Navbar />

      <main style={{ flex: 1 }}>
        <Outlet />
      </main>

      <Footer />

      {/* Mobile sticky bottom ad — fixed on all pages */}
      <div style={{
        position: 'fixed',
        bottom: 0, left: 0, right: 0,
        height: 50,
        zIndex: 600,
        background: '#fff',
        borderTop: '2px solid #BDBDBD',
        boxShadow: '0 -2px 8px rgba(0,0,0,0.12)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
        <AdBanner
          zone="AD-MOBILE-STICKY"
          label="Mobile Sticky Ad — 320×50 (AD-MOBILE-STICKY)"
          height={50}
          style={{ border: 'none', borderRadius: 0, background: 'transparent' }}
        />
        <button
          onClick={e => (e.currentTarget.parentElement!.style.display = 'none')}
          style={{
            position: 'absolute', right: 8, top: 8,
            background: '#e0e0e0', border: '1px solid #BDBDBD',
            borderRadius: 3, width: 18, height: 18,
            cursor: 'pointer', fontSize: 11, color: '#9E9E9E',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            lineHeight: 1, padding: 0,
          }}
        >✕</button>
      </div>
    </div>
  );
}
