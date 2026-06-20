import React, { useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router';
import { useSavedJobs } from '../context/SavedJobsContext';

const CATEGORY_MENU = [
  { label: 'Search by Area', to: '/jobs' },
  { label: 'Search by Train', to: '/jobs' },
  { label: 'Food & Beverage', to: '/jobs' },
  { label: 'Retail / Sales', to: '/jobs' },
  { label: 'Office / Admin', to: '/jobs' },
  { label: 'Daily Pay Jobs', to: '/jobs' },
  { label: 'Students OK', to: '/jobs' },
  { label: 'Work From Home', to: '/jobs' },
  { label: 'Immediate Start', to: '/jobs' },
];

export function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const { savedJobs } = useSavedJobs();
  const [menuOpen, setMenuOpen] = useState(false);

  const isActive = (path: string) => location.pathname === path;

  return (
    <header style={{ fontFamily: "'Noto Sans', sans-serif", position: 'sticky', top: 0, zIndex: 500 }}>
      {/* Top announcement bar */}
      <div style={{
        background: '#2E7D32',
        color: '#E8F5E9', fontSize: 11, textAlign: 'center',
        padding: '4px 16px', letterSpacing: 0.3,
      }}>
        Metro Manila's #1 Part-Time Job Platform &nbsp;|&nbsp; 2,864 New Jobs This Week! &nbsp;|&nbsp; Register FREE for instant job alerts!
      </div>

      {/* Main navbar — single bar, mild 3D */}
      <div style={{
        background: 'linear-gradient(180deg, #66BB6A 0%, #43A047 100%)',
        borderBottom: '1px solid #2E7D32',
        boxShadow: '0 2px 5px rgba(0,0,0,0.18)',
      }}>
        <div style={{ maxWidth: 1100, margin: '0 auto', padding: '0 16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, height: 58 }}>

            {/* Logo */}
            <Link to="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 8 }}>
              <div style={{
                background: 'linear-gradient(180deg, #fff 0%, #F1F8E9 100%)',
                borderRadius: 6, padding: '4px 10px',
                border: '1px solid #A5D6A7',
                boxShadow: '0 1px 2px rgba(0,0,0,0.15), inset 0 1px 0 rgba(255,255,255,0.8)',
                fontSize: 20, fontWeight: 800, color: '#2E7D32',
                letterSpacing: -0.5,
              }}>
                Arbeit<span style={{ color: '#FF8F00', fontSize: 13 }}>PH</span>
              </div>
              <div style={{ color: '#E8F5E9', fontSize: 10, lineHeight: 1.2, textShadow: '0 1px 1px rgba(0,0,0,0.25)' }}>
                <div style={{ fontSize: 9, opacity: 0.85 }}>Metro Manila</div>
                <div style={{ fontWeight: 700 }}>Part-Time Jobs</div>
              </div>
            </Link>

            {/* Categories menu toggle */}
            <button
              onClick={() => setMenuOpen(o => !o)}
              style={{
                background: menuOpen
                  ? 'linear-gradient(180deg, #fff 0%, #F1F8E9 100%)'
                  : 'rgba(255,255,255,0.18)',
                border: '1px solid',
                borderColor: menuOpen ? '#A5D6A7' : 'rgba(255,255,255,0.4)',
                borderBottom: menuOpen ? '1px solid #A5D6A7' : '2px solid rgba(0,0,0,0.15)',
                borderRadius: 6, padding: '6px 12px', cursor: 'pointer',
                color: menuOpen ? '#2E7D32' : '#fff',
                fontSize: 13, fontWeight: 700,
                textShadow: menuOpen ? 'none' : '0 1px 1px rgba(0,0,0,0.25)',
                display: 'flex', alignItems: 'center', gap: 6,
                fontFamily: "'Noto Sans', sans-serif",
              }}
            >
              <span style={{ fontSize: 14 }}>☰</span> Categories
            </button>

            {/* Search */}
            <form
              style={{ flex: 1, display: 'flex', maxWidth: 420 }}
              onSubmit={e => { e.preventDefault(); navigate('/jobs'); }}
            >
              <input
                type="text"
                placeholder="Job title, company, station, area..."
                style={{
                  flex: 1, padding: '7px 12px',
                  border: '1px solid #A5D6A7', borderRight: 'none',
                  borderRadius: '6px 0 0 6px', fontSize: 13, outline: 'none',
                  background: '#fff',
                  fontFamily: "'Noto Sans', sans-serif",
                }}
              />
              <button type="submit" className="btn-3d btn-gold btn-md"
                style={{ borderRadius: '0 6px 6px 0' }}>
                Search
              </button>
            </form>

            {/* Right side links */}
            <nav style={{ display: 'flex', gap: 5, alignItems: 'center', marginLeft: 'auto' }}>
              <button
                onClick={() => navigate('/jobs')}
                style={navBtnStyle(isActive('/jobs'))}>
                Find Jobs
              </button>

              <button
                onClick={() => navigate('/saved')}
                style={{ ...navBtnStyle(isActive('/saved')), position: 'relative' }}
              >
                ★ Keep List
                {savedJobs.length > 0 && (
                  <span style={{
                    position: 'absolute', top: -6, right: -6,
                    background: '#FF8F00', color: '#fff',
                    borderRadius: '50%', width: 18, height: 18,
                    fontSize: 10, fontWeight: 800,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    border: '2px solid #fff',
                  }}>{savedJobs.length}</span>
                )}
              </button>

              <button style={navBtnStyle(false)}>Post a Job</button>
              <button className="btn-3d btn-gold btn-md">Register</button>
              <button style={navBtnStyle(false)}>Login</button>
            </nav>
          </div>
        </div>

        {/* Collapsable category menu */}
        {menuOpen && (
          <div style={{
            background: 'linear-gradient(180deg, #fff 0%, #F1F8E9 100%)',
            borderTop: '1px solid #C8E6C9',
            borderBottom: '1px solid #C8E6C9',
            boxShadow: '0 4px 8px rgba(0,0,0,0.08)',
          }}>
            <div style={{ maxWidth: 1100, margin: '0 auto', padding: '10px 16px' }}>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 6 }}>
                {CATEGORY_MENU.map(item => (
                  <button
                    key={item.label}
                    onClick={() => { navigate(item.to); setMenuOpen(false); }}
                    style={{
                      background: '#fff',
                      border: '1px solid #C8E6C9',
                      borderBottom: '2px solid #A5D6A7',
                      borderRadius: 6, padding: '8px 10px', cursor: 'pointer',
                      display: 'flex', alignItems: 'center', gap: 6,
                      fontSize: 12, color: '#1B5E20', fontWeight: 600,
                      fontFamily: "'Noto Sans', sans-serif",
                      textAlign: 'left',
                    }}
                  >
                    <span>{item.label}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}

function navBtnStyle(active: boolean): React.CSSProperties {
  return {
    background: active
      ? 'linear-gradient(180deg, #fff 0%, #F1F8E9 100%)'
      : 'rgba(255,255,255,0.16)',
    border: '1px solid',
    borderColor: active ? '#A5D6A7' : 'rgba(255,255,255,0.32)',
    borderBottom: active ? '1px solid #A5D6A7' : '2px solid rgba(0,0,0,0.15)',
    borderRadius: 6, padding: '6px 12px', cursor: 'pointer',
    color: active ? '#2E7D32' : '#fff',
    fontSize: 12, fontWeight: 700,
    fontFamily: "'Noto Sans', sans-serif",
    textShadow: active ? 'none' : '0 1px 1px rgba(0,0,0,0.25)',
    whiteSpace: 'nowrap',
  };
}
