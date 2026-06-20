import React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router';
import {
  UtensilsCrossed, ShoppingBag, Briefcase, BookOpen, CalendarDays,
  Truck, HeartPulse, Laptop, Sparkles, Headphones, Factory, MoreHorizontal,
  Zap, Calendar, Rocket, Banknote, ChevronRight,
} from 'lucide-react';
import { MetroManilaMap } from './MetroManilaMap';
import { TrainSchematicMap } from './TrainSchematicMap';
import { AreaSelectionPanel } from './AreaSelectionPanel';
import { JobCard } from './JobCard';
import { AdBanner } from './AdBanner';
import { MOCK_JOBS, JOB_CATEGORIES, QUICK_CONDITIONS, CONDITION_FILTERS, DISTRICTS } from './mockData';

// ─── Lucide icon lookup ────────────────────────────────────────────────────────
const LUCIDE_ICONS: Record<string, React.ComponentType<{ size?: number; strokeWidth?: number; color?: string }>> = {
  UtensilsCrossed, ShoppingBag, Briefcase, BookOpen, CalendarDays,
  Truck, HeartPulse, Laptop, Sparkles, Headphones, Factory, MoreHorizontal,
  Zap, Calendar, Rocket, Banknote,
};

function CategoryIcon({ name, size = 22 }: { name: string; size?: number }) {
  const Icon = LUCIDE_ICONS[name];
  if (!Icon) return null;
  return <Icon size={size} strokeWidth={1.6} />;
}

const STAT_ITEMS = [
  { num: '2,864', label: 'New Jobs This Week' },
  { num: '1,234', label: 'Companies Hiring' },
  { num: '45,230', label: 'Total Postings' },
  { num: '₱80~', label: 'Average Hourly' },
];

// ─── Component ────────────────────────────────────────────────────────────────
export function HomePage() {
  const navigate = useNavigate();
  const [panelOpen, setPanelOpen] = useState(false);
  const [panelDistrict, setPanelDistrict] = useState('d1');
  const [searchTab, setSearchTab] = useState<'area' | 'train'>('area');

  const handleDistrictClick = (districtId: string) => {
    setPanelDistrict(districtId);
    setPanelOpen(true);
  };

  const goToJobs = () => navigate('/jobs');

  return (
    <div style={{ background: '#f0f4f0', minHeight: '100vh', fontFamily: "'Noto Sans', sans-serif" }}>

      {/* Stats bar */}
      <div style={{
        background: 'linear-gradient(180deg, #fff 0%, #f9fff9 100%)',
        borderBottom: '2px solid #C8E6C9',
        padding: '10px 0',
      }}>
        <div style={{ maxWidth: 1100, margin: '0 auto', padding: '0 16px', display: 'flex', justifyContent: 'center' }}>
          {STAT_ITEMS.map((item, i) => (
            <div key={item.label} style={{
              flex: 1, maxWidth: 220, textAlign: 'center', padding: '8px 16px',
              borderRight: i < STAT_ITEMS.length - 1 ? '1px solid #C8E6C9' : 'none',
            }}>
              <div style={{ fontSize: 20, fontWeight: 800, color: '#E65100', lineHeight: 1.2 }}>{item.num}</div>
              <div style={{ fontSize: 11, color: '#4E4E4E', marginTop: 2 }}>{item.label}</div>
            </div>
          ))}
        </div>
      </div>

      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '16px' }}>

        {/* AD — top leaderboard */}
        <AdBanner zone="AD-TOP-BANNER" label="Ad Placeholder — 1200×90 (AD-TOP-BANNER)" height={90} style={{ marginBottom: 16 }} />

        {/* HERO: Map + Categories */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 20 }}>

          {/* Left: Interactive Map */}
          <div style={{
            background: '#fff', border: '1px solid #BDBDBD',
            borderRadius: 10, overflow: 'hidden',
            boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
          }}>
            <div style={{ display: 'flex', borderBottom: '2px solid #BDBDBD', background: '#f9f9f9' }}>
              {[
                { key: 'area',  label: 'Search by Area' },
                { key: 'train', label: 'Search by Transportation' },
              ].map(tab => (
                <button key={tab.key}
                  className={`tab-btn ${searchTab === tab.key ? 'active' : ''}`}
                  onClick={() => setSearchTab(tab.key as 'area' | 'train')}
                  style={{ flex: 1, textAlign: 'center', fontSize: 13 }}
                >{tab.label}</button>
              ))}
            </div>
            <div style={{ padding: 16 }}>
              {searchTab === 'area' ? (
                <>
                  <h2 style={{ fontSize: 16, fontWeight: 700, color: '#1B5E20', marginBottom: 12, display: 'flex', alignItems: 'center', gap: 8 }}>
                    Find Part-Time Jobs in Metro Manila
                    <span style={{ fontSize: 11, background: '#e8f5e9', color: '#2E7D32', padding: '2px 8px', borderRadius: 10, fontWeight: 600 }}>
                      Click a district!
                    </span>
                  </h2>
                  <MetroManilaMap onDistrictClick={handleDistrictClick} />
                </>
              ) : (
                <TrainSearchSection onSearch={goToJobs} onStationClick={(station) => {
                  // Could open panel pre-filtered — for now navigate to jobs
                  navigate('/jobs');
                }} />
              )}
            </div>
          </div>

          {/* Right: Categories + Districts + Conditions */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>

            {/* Job type grid */}
            <div style={{ background: '#fff', border: '1px solid #BDBDBD', borderRadius: 10, overflow: 'hidden', boxShadow: '0 2px 8px rgba(0,0,0,0.06)' }}>
              <div className="section-header">Search by Job Type (職種から探す)</div>
              <div style={{ padding: 12, display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 6 }}>
                {JOB_CATEGORIES.map(cat => (
                  <button key={cat.name} onClick={goToJobs} style={{
                    background: 'linear-gradient(180deg, #fff 0%, #f9fff9 100%)',
                    border: '1px solid #BDBDBD', borderBottom: '2px solid #A5D6A7',
                    borderRadius: 8, padding: '8px 4px', cursor: 'pointer',
                    textAlign: 'center', boxShadow: '0 2px 4px rgba(0,0,0,0.06)',
                    transition: 'all 80ms', fontFamily: "'Noto Sans', sans-serif",
                    display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3,
                  }}
                    onMouseEnter={e => {
                      e.currentTarget.style.borderColor = '#2E7D32';
                      e.currentTarget.style.background = 'linear-gradient(180deg, #e8f5e9 0%, #c8e6c9 100%)';
                      e.currentTarget.style.transform = 'translateY(-1px)';
                    }}
                    onMouseLeave={e => {
                      e.currentTarget.style.borderColor = '#BDBDBD';
                      e.currentTarget.style.background = 'linear-gradient(180deg, #fff 0%, #f9fff9 100%)';
                      e.currentTarget.style.transform = 'none';
                    }}
                  >
                    <div style={{ color: '#1B5E20', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <CategoryIcon name={cat.icon} size={20} />
                    </div>
                    <div style={{ fontSize: 10, fontWeight: 600, color: '#1A1A1A', lineHeight: 1.2 }}>{cat.name}</div>
                    <div style={{ fontSize: 9, color: '#fff', background: '#43A047', borderRadius: 3, padding: '1px 4px', display: 'inline-block' }}>
                      {cat.count.toLocaleString()}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Districts */}
            <div style={{ background: '#fff', border: '1px solid #BDBDBD', borderRadius: 10, overflow: 'hidden', boxShadow: '0 2px 8px rgba(0,0,0,0.06)' }}>
              <div className="section-header">Search by District</div>
              <div style={{ padding: '10px 12px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
                {DISTRICTS.map(d => (
                  <button key={d.id} onClick={() => handleDistrictClick(d.id)} style={{
                    background: `linear-gradient(135deg, ${d.color} 0%, ${d.hoverColor} 100%)`,
                    border: '1px solid #2E7D32', borderBottom: '3px solid #1B5E20',
                    borderRadius: 8, padding: '10px 12px', cursor: 'pointer',
                    textAlign: 'left', boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                    fontFamily: "'Noto Sans', sans-serif", transition: 'all 80ms',
                  }}
                    onMouseEnter={e => (e.currentTarget.style.transform = 'translateY(-1px)')}
                    onMouseLeave={e => (e.currentTarget.style.transform = 'none')}
                  >
                    <div style={{ fontSize: 11, fontWeight: 700, color: '#1B5E20' }}>{d.name}</div>
                    <div style={{ fontSize: 10, color: '#4E4E4E', marginTop: 2 }}>
                      {d.cities.slice(0, 3).join(', ')}{d.cities.length > 3 ? '...' : ''}
                    </div>
                    <div style={{ fontSize: 12, color: '#E65100', fontWeight: 800, marginTop: 4, display: 'flex', alignItems: 'center', gap: 3 }}>
                      {d.jobCount.toLocaleString()} jobs
                      <ChevronRight size={12} color="#E65100" />
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Condition shortcuts */}
            <div style={{ background: '#fff', border: '1px solid #BDBDBD', borderRadius: 10, overflow: 'hidden', boxShadow: '0 2px 8px rgba(0,0,0,0.06)' }}>
              <div className="section-header">Choose by Condition</div>
              <div style={{ padding: '10px 12px', display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                {CONDITION_FILTERS.map(cond => (
                  <button key={cond.label} onClick={goToJobs} style={{
                    background: 'linear-gradient(180deg, #fff 0%, #f5f5f5 100%)',
                    border: '1px solid #BDBDBD', borderBottom: '2px solid #9E9E9E',
                    borderRadius: 6, padding: '5px 10px', cursor: 'pointer',
                    display: 'flex', alignItems: 'center', gap: 5,
                    fontSize: 12, color: '#1A1A1A',
                    fontFamily: "'Noto Sans', sans-serif",
                  }}>
                    <span>{cond.label}</span>
                    <ChevronRight size={12} color="#43A047" />
                  </button>
                ))}
              </div>
              <div style={{ padding: '8px 12px', borderTop: '1px solid #e0e0e0', background: '#f9f9f9' }}>
                <button className="btn-3d btn-outline-green btn-md" onClick={goToJobs} style={{ width: '100%', fontSize: 13 }}>
                  Advanced Search — More Conditions
                  <ChevronRight size={14} style={{ verticalAlign: 'middle' }} />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Short-term quick links */}
        <div style={{ background: '#fff', border: '1px solid #BDBDBD', borderRadius: 10, marginBottom: 20, overflow: 'hidden', boxShadow: '0 2px 8px rgba(0,0,0,0.06)' }}>
          <div style={{ background: '#FFF8E1', borderBottom: '1px solid #FFE082', padding: '8px 16px', fontSize: 14, fontWeight: 700, color: '#E65100' }}>
            Short-term Jobs (短期の仕事) — Earn Fast, Start Now!
          </div>
          <div style={{ padding: '12px 16px', display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            {QUICK_CONDITIONS.map(cond => (
              <button key={cond.label} onClick={goToJobs} style={{
                background: 'linear-gradient(180deg, #fff 0%, #fafafa 100%)',
                border: '1px solid #BDBDBD', borderBottom: '3px solid #9E9E9E',
                borderRadius: 8, padding: '10px 16px', cursor: 'pointer',
                textAlign: 'center', minWidth: 115,
                boxShadow: '0 2px 4px rgba(0,0,0,0.06)',
                fontFamily: "'Noto Sans', sans-serif", transition: 'all 80ms',
                display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4,
              }}
                onMouseEnter={e => (e.currentTarget.style.transform = 'translateY(-1px)')}
                onMouseLeave={e => (e.currentTarget.style.transform = 'none')}
              >
                <div style={{ color: '#E65100', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <CategoryIcon name={cond.icon} size={24} />
                </div>
                <div style={{ fontSize: 13, fontWeight: 700, color: '#1A1A1A', display: 'flex', alignItems: 'center', gap: 2 }}>
                  {cond.label} <ChevronRight size={12} />
                </div>
                <div style={{
                  background: 'linear-gradient(180deg, #FFB74D 0%, #E65100 100%)',
                  color: '#fff', fontSize: 11, fontWeight: 600,
                  borderRadius: 4, padding: '2px 8px',
                  boxShadow: '0 1px 3px rgba(0,0,0,0.25), inset 0 1px 0 rgba(255,255,255,0.3)',
                }}>{cond.sub}</div>
              </button>
            ))}
          </div>
        </div>

        {/* AD — mid */}
        <AdBanner zone="AD-MID-BANNER" label="Ad Placeholder — 1200×90 (AD-MID-BANNER)" height={90} style={{ marginBottom: 20 }} />

        {/* Featured Jobs */}
        <JobSection
          title="Featured Jobs (注目求人)"
          titleColor="#F57F17"
          jobs={MOCK_JOBS.filter(j => j.isFeatured)}
          onJobClick={id => navigate(`/jobs/${id}`)}
          onSeeAll={goToJobs}
        />

        <AdBanner zone="AD-SECTION-BANNER" label="Ad Placeholder — 1200×90 (AD-SECTION-BANNER)" height={90} style={{ marginBottom: 20 }} />

        <JobSection
          title="Newly Posted (新着求人)"
          titleColor="#1565C0"
          jobs={MOCK_JOBS.filter(j => j.isNew)}
          onJobClick={id => navigate(`/jobs/${id}`)}
          onSeeAll={goToJobs}
        />

        <JobSection
          title="Urgent Hiring — Apply Today!"
          titleColor="#E65100"
          jobs={MOCK_JOBS.filter(j => j.isUrgent)}
          onJobClick={id => navigate(`/jobs/${id}`)}
          onSeeAll={goToJobs}
          style={{ marginBottom: 20 }}
        />

        <AdBanner zone="AD-PRE-CTA" label="Ad Placeholder — 1200×90 (AD-PRE-CTA)" height={90} style={{ marginBottom: 20 }} />

        {/* Registration CTA */}
        <div style={{
          background: 'linear-gradient(135deg, #1B5E20 0%, #2E7D32 60%, #43A047 100%)',
          borderRadius: 12, padding: '28px 32px', marginBottom: 8,
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          boxShadow: '0 4px 16px rgba(0,0,0,0.2)', border: '2px solid #1B5E20',
        }}>
          <div>
            <h3 style={{ fontSize: 20, fontWeight: 800, color: '#fff', marginBottom: 6 }}>
              Register FREE — Find Your Perfect Part-Time Job!
            </h3>
            <p style={{ fontSize: 13, color: '#C8E6C9', maxWidth: 480 }}>
              Save jobs, set up alerts, apply instantly, and get notified of new openings that match your preferences!
            </p>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8, flexShrink: 0 }}>
            <button className="btn-3d btn-orange btn-xl" style={{ minWidth: 200 }}>
              Register Now — It's FREE!
            </button>
            <button className="btn-3d btn-xl" style={{
              minWidth: 200,
              background: 'rgba(255,255,255,0.15)',
              border: '1px solid rgba(255,255,255,0.4)',
              borderBottom: '3px solid rgba(0,0,0,0.2)',
              color: '#fff',
            }}>Post a Job for Employers</button>
          </div>
        </div>
      </div>

      {/* Area Selection Panel overlay */}
      {panelOpen && (
        <>
          <div
            onClick={() => setPanelOpen(false)}
            style={{
              position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.4)',
              zIndex: 999, backdropFilter: 'blur(2px)',
            }}
          />
          <AreaSelectionPanel
            initialDistrict={panelDistrict}
            onClose={() => setPanelOpen(false)}
            onSearch={() => { setPanelOpen(false); navigate('/jobs'); }}
          />
        </>
      )}
    </div>
  );
}

// ─── Job Section ──────────────────────────────────────────────────────────────
function JobSection({
  title, titleColor, jobs, onJobClick, onSeeAll, style,
}: {
  title: string; titleColor: string;
  jobs: typeof MOCK_JOBS;
  onJobClick: (id: string) => void;
  onSeeAll: () => void;
  style?: React.CSSProperties;
}) {
  return (
    <div style={{ marginBottom: 20, ...style }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
        <h2 style={{
          fontSize: 17, fontWeight: 800, color: '#1B5E20',
          display: 'flex', alignItems: 'center', gap: 8,
          borderLeft: `4px solid ${titleColor}`, paddingLeft: 10, margin: 0,
        }}>{title}</h2>
        <button onClick={onSeeAll} className="btn-3d btn-sm btn-outline-green" style={{ display: 'flex', alignItems: 'center', gap: 3 }}>
          See All <ChevronRight size={13} />
        </button>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        {jobs.map(job => (
          <JobCard key={job.id} job={job} onClick={() => onJobClick(job.id)} />
        ))}
      </div>
    </div>
  );
}

// ─── Train Search Section ─────────────────────────────────────────────────────
function TrainSearchSection({ onSearch, onStationClick }: { onSearch: () => void; onStationClick: (s: string) => void }) {
  const trainLines = [
    { id: 'lrt1',   name: 'LRT-1',          code: '1', color: '#E65100', status: 'Operational',        stations: 29 },
    { id: 'lrt2',   name: 'LRT-2',          code: '2', color: '#6A1B9A', status: 'Operational',        stations: 13 },
    { id: 'mrt3',   name: 'MRT-3',          code: '3', color: '#1565C0', status: 'Operational',        stations: 13 },
    { id: 'mrt7',   name: 'MRT-7',          code: '7', color: '#2E7D32', status: 'Under Construction', stations: 14 },
    { id: 'subway', name: 'MRT-9 Subway',   code: 'M', color: '#00838F', status: 'Under Construction', stations: 17 },
    { id: 'nscr',   name: 'NSCR Commuter',  code: 'N', color: '#BF360C', status: 'Under Construction', stations: 36 },
  ];
  const busRoutes = [
    { id: 'edsa',   name: 'EDSA Bus Carousel', color: '#1B5E20', stops: 20 },
    { id: 'bgc',    name: 'BGC Bus Routes',    color: '#0D47A1', stops: 15 },
    { id: 'makati', name: 'Makati Ayala Bus',  color: '#4A148C', stops: 14 },
    { id: 'pitx',   name: 'PITX Terminal P2P', color: '#880E4F', stops: 15 },
  ];

  return (
    <div>
      <h2 style={{ fontSize: 15, fontWeight: 700, color: '#1B5E20', marginBottom: 10 }}>
        Search Jobs Near Your Station or Bus Stop
      </h2>

      {/* Interactive schematic map */}
      <div style={{ marginBottom: 12 }}>
        <TrainSchematicMap onStationClick={onStationClick} />
      </div>

      {/* Rail line grid */}
      <div style={{ marginBottom: 10 }}>
        <div style={{ fontSize: 11, fontWeight: 700, color: '#4E4E4E', marginBottom: 6 }}>Rail Lines</div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 6 }}>
          {trainLines.map(line => (
            <button key={line.id} onClick={onSearch} style={{
              background: '#fff',
              border: '1px solid #D5D5D5', borderBottom: '2px solid #BDBDBD',
              borderRadius: 6, padding: '8px 10px', cursor: 'pointer', textAlign: 'left',
              fontFamily: "'Noto Sans', sans-serif",
              display: 'flex', alignItems: 'center', gap: 8,
              transition: 'all 80ms',
            }}
              onMouseEnter={e => (e.currentTarget.style.borderColor = line.color)}
              onMouseLeave={e => (e.currentTarget.style.borderColor = '#D5D5D5')}
            >
              <div style={{
                width: 26, height: 26, borderRadius: 5,
                background: line.color, color: '#fff',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontWeight: 800, fontSize: 13, flexShrink: 0,
              }}>{line.code}</div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: 12, fontWeight: 700, color: '#1A1A1A' }}>{line.name}</div>
                <div style={{ fontSize: 10, color: line.status === 'Operational' ? '#388E3C' : '#E65100' }}>
                  {line.status} · {line.stations} stations
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Bus routes */}
      <div>
        <div style={{ fontSize: 11, fontWeight: 700, color: '#4E4E4E', marginBottom: 6 }}>Bus & P2P Routes</div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 6 }}>
          {busRoutes.map(r => (
            <button key={r.id} onClick={onSearch} style={{
              background: '#fff',
              border: '1px solid #D5D5D5', borderBottom: '2px solid #BDBDBD',
              borderRadius: 6, padding: '8px 10px', cursor: 'pointer', textAlign: 'left',
              fontFamily: "'Noto Sans', sans-serif",
              display: 'flex', alignItems: 'center', gap: 8,
              transition: 'all 80ms',
            }}
              onMouseEnter={e => (e.currentTarget.style.borderColor = r.color)}
              onMouseLeave={e => (e.currentTarget.style.borderColor = '#D5D5D5')}
            >
              <div style={{
                width: 26, height: 26, borderRadius: 5,
                background: r.color, color: '#fff',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontWeight: 800, fontSize: 9, flexShrink: 0,
              }}>BUS</div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: 12, fontWeight: 700, color: '#1A1A1A' }}>{r.name}</div>
                <div style={{ fontSize: 10, color: '#9E9E9E' }}>{r.stops} stops</div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
