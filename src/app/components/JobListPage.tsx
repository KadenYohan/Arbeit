import React, { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router';
import { MOCK_JOBS, QUICK_CONDITIONS, CONDITION_FILTERS } from './mockData';
import { JobCard } from './JobCard';
import { FilterBar } from './FilterBar';
import { AdBanner } from './AdBanner';
import { AreaSelectionPanel } from './AreaSelectionPanel';
import { SearchFilters } from './types';

const DEFAULT_FILTERS: SearchFilters = {
  area: [], stations: [], jobType: [],
  payType: '', minPay: '',
  schedule: [], workPeriod: [], features: [],
  freeWord: '',
};

const SORT_OPTIONS = [
  { value: 'newest', label: 'Newest First' },
  { value: 'pay-high', label: 'Highest Pay' },
  { value: 'featured', label: 'Featured First' },
  { value: 'barometer', label: 'Most Applied' },
];

export function JobListPage() {
  const navigate = useNavigate();
  const [filters, setFilters] = useState<SearchFilters>(DEFAULT_FILTERS);
  const [sort, setSort] = useState('newest');
  const [page, setPage] = useState(1);
  const [panelOpen, setPanelOpen] = useState(false);
  const JOBS_PER_PAGE = 12;

  const totalCount = MOCK_JOBS.length + 2857;
  const displayedJobs = MOCK_JOBS.slice(0, Math.min(JOBS_PER_PAGE, MOCK_JOBS.length));

  return (
    <div style={{ maxWidth: 1100, margin: '0 auto', padding: '16px', fontFamily: "'Noto Sans', sans-serif" }}>

      {/* Breadcrumb */}
      <div style={{ fontSize: 12, color: '#9E9E9E', marginBottom: 12 }}>
        <span style={{ color: '#1565C0', cursor: 'pointer' }} onClick={() => navigate('/')}>Home</span>
        <span> › All Part-Time Jobs in Metro Manila</span>
        {filters.area.length > 0 && <span> › {filters.area[0]}{filters.area.length > 1 ? ` +${filters.area.length - 1} more` : ''}</span>}
      </div>

      {/* AD — top banner */}
      <AdBanner zone="AD-TOP-BANNER" label="Ad Placeholder — 1200×90 (AD-TOP-BANNER)" height={90} style={{ marginBottom: 16 }} />

      {/* Quick condition shortcuts */}
      <div style={{ background: '#fff', border: '1px solid #BDBDBD', borderRadius: 10, marginBottom: 16, overflow: 'hidden', boxShadow: '0 2px 8px rgba(0,0,0,0.06)' }}>
        <div style={{ background: '#FFF8E1', borderBottom: '1px solid #FFE082', padding: '8px 16px', fontSize: 13, fontWeight: 700, color: '#E65100' }}>
          Short-term & Quick Pay (短期の仕事)
        </div>
        <div style={{ padding: '10px 16px', display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          {QUICK_CONDITIONS.map(cond => (
            <button key={cond.label} style={{
              background: 'linear-gradient(180deg, #fff 0%, #f5f5f5 100%)',
              border: '1px solid #BDBDBD', borderBottom: '3px solid #BDBDBD',
              borderRadius: 8, padding: '8px 14px', cursor: 'pointer',
              textAlign: 'center', minWidth: 100,
              boxShadow: '0 2px 4px rgba(0,0,0,0.06)',
              fontFamily: "'Noto Sans', sans-serif", transition: 'all 80ms',
            }}>
              <div style={{ fontSize: 20 }}>{cond.icon}</div>
              <div style={{ fontSize: 11, fontWeight: 700, color: '#1A1A1A', marginTop: 2 }}>{cond.label} ›</div>
              <div style={{
                background: 'linear-gradient(180deg, #FFB74D 0%, #E65100 100%)',
                color: '#fff', fontSize: 10, fontWeight: 600,
                borderRadius: 4, padding: '2px 6px', marginTop: 3,
                boxShadow: '0 1px 3px rgba(0,0,0,0.3)',
              }}>{cond.sub}</div>
            </button>
          ))}
        </div>
        <div style={{ padding: '6px 16px 10px', borderTop: '1px solid #e0e0e0', background: '#f9f9f9', display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          <div style={{ fontSize: 12, fontWeight: 700, color: '#1A1A1A', width: '100%', marginBottom: 4 }}>Choose by Condition</div>
          {CONDITION_FILTERS.map(cond => (
            <button key={cond.label} style={{
              background: 'linear-gradient(180deg, #fff 0%, #f5f5f5 100%)',
              border: '1px solid #BDBDBD', borderBottom: '2px solid #9E9E9E',
              borderRadius: 8, padding: '6px 12px', cursor: 'pointer',
              display: 'flex', alignItems: 'center', gap: 6,
              boxShadow: '0 1px 3px rgba(0,0,0,0.08)',
              fontFamily: "'Noto Sans', sans-serif", fontSize: 12, color: '#1A1A1A',
            }}>
              <span style={{ fontSize: 18 }}>{cond.icon}</span>
              <span style={{ fontWeight: 600 }}>{cond.label}</span>
              <span style={{ color: '#43A047', fontWeight: 700 }}>›</span>
            </button>
          ))}
          <button style={{ marginLeft: 'auto', fontSize: 11, color: '#1565C0', background: 'none', border: 'none', cursor: 'pointer', textDecoration: 'underline' }}>
            More specific search →
          </button>
        </div>
      </div>

      {/* AD — second banner */}
      <AdBanner zone="AD-LIST-BANNER-2" label="Ad Placeholder — 1200×90 (AD-LIST-BANNER-2)" height={90} style={{ marginBottom: 16 }} />

      {/* Main grid + sidebar */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 300px', gap: 16 }}>

        {/* LEFT — filter + job grid */}
        <div>
          {/* Filter bar */}
          <div style={{ marginBottom: 14 }}>
            <FilterBar
              filters={filters}
              onFiltersChange={setFilters}
              jobCount={totalCount}
              onOpenAreaPanel={() => setPanelOpen(true)}
            />
          </div>

          {/* Results header */}
          <div style={{
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            marginBottom: 12, padding: '8px 12px',
            background: '#fff', border: '1px solid #BDBDBD', borderRadius: 8,
          }}>
            <div style={{ fontWeight: 700, color: '#1B5E20', fontSize: 13 }}>
              <span style={{ fontSize: 18, color: '#E65100' }}>{totalCount.toLocaleString()}</span> part-time jobs in Metro Manila
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <label style={{ fontSize: 12, color: '#4E4E4E' }}>Sort:</label>
              <select value={sort} onChange={e => setSort(e.target.value)} style={{
                padding: '4px 10px', border: '1px solid #BDBDBD', borderRadius: 6,
                fontSize: 12, cursor: 'pointer', fontFamily: "'Noto Sans', sans-serif",
              }}>
                {SORT_OPTIONS.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
              </select>
            </div>
          </div>

          {/* Job list — one per row */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {displayedJobs.map((job, idx) => (
              <React.Fragment key={job.id}>
                <JobCard job={job} onClick={() => navigate(`/jobs/${job.id}`)} />
                {(idx + 1) % 5 === 0 && (
                  <AdBanner
                    zone="AD-FEED-INLINE"
                    label="Sponsored Ad — Full width inline (AD-FEED-INLINE)"
                    height={90}
                    sponsored
                  />
                )}
              </React.Fragment>
            ))}
          </div>

          {/* AD — between pages */}
          <AdBanner zone="AD-LIST-MID" label="Ad Placeholder — 1200×90 (AD-LIST-MID)" height={90} style={{ margin: '20px 0' }} />

          {/* Pagination */}
          <div style={{ display: 'flex', justifyContent: 'center', gap: 6, marginTop: 8 }}>
            <button className="btn-3d btn-outline-green btn-sm">← Prev</button>
            {[1, 2, 3, 4, 5].map(p => (
              <button key={p} className={`btn-3d btn-sm ${p === page ? 'btn-green' : 'btn-outline-green'}`}
                onClick={() => setPage(p)}>{p}</button>
            ))}
            <span style={{ padding: '4px 8px', color: '#9E9E9E', fontSize: 13 }}>...</span>
            <button className="btn-3d btn-outline-green btn-sm">238</button>
            <button className="btn-3d btn-green btn-sm">Next →</button>
          </div>
        </div>

        {/* RIGHT SIDEBAR */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>

          {/* Match count sticky box */}
          <div style={{
            background: '#e8f5e9', border: '1px solid #A5D6A7',
            borderLeft: '4px solid #2E7D32', borderRadius: 8, padding: 14,
          }}>
            <div style={{ fontSize: 13, fontWeight: 700, color: '#2E7D32', marginBottom: 8 }}>
              ● {totalCount.toLocaleString()} jobs match
            </div>
            <button className="btn-3d btn-green" style={{ width: '100%', padding: 10, fontSize: 13 }}>
              Search these conditions ›
            </button>
            <div style={{ marginTop: 8, display: 'flex', flexDirection: 'column', gap: 4 }}>
              <button style={{ background: 'none', border: 'none', color: '#1565C0', textDecoration: 'underline', cursor: 'pointer', fontSize: 12, textAlign: 'left' }}>Save this search</button>
              <button style={{ background: 'none', border: 'none', color: '#1565C0', textDecoration: 'underline', cursor: 'pointer', fontSize: 12, textAlign: 'left' }}>Email alerts for this search</button>
            </div>
          </div>

          {/* AD sidebar top — sticky */}
          <div style={{ position: 'sticky', top: 150 }}>
            <AdBanner zone="AD-SIDEBAR-TOP" label="Ad Placeholder&#10;300×250 (AD-SIDEBAR-TOP)" height={250} style={{ marginBottom: 12 }} />
          </div>

          {/* Recently viewed */}
          <div style={{ background: '#fff', border: '1px solid #BDBDBD', borderRadius: 10, overflow: 'hidden' }}>
            <div className="section-header" style={{ borderRadius: 0 }}>Recently Viewed</div>
            <div style={{ padding: 10 }}>
              {MOCK_JOBS.slice(0, 3).map(job => (
                <div key={job.id} onClick={() => navigate(`/jobs/${job.id}`)} style={{
                  padding: '8px', borderBottom: '1px solid #f0f0f0',
                  cursor: 'pointer', display: 'flex', gap: 8, alignItems: 'flex-start',
                }}>
                  <span style={{ fontSize: 24, flexShrink: 0 }}>{job.categoryIcon}</span>
                  <div>
                    <div style={{ fontSize: 11, fontWeight: 600, color: '#1A1A1A', lineHeight: 1.3 }}>
                      {job.title.slice(0, 48)}...
                    </div>
                    <div style={{ fontSize: 10, color: '#E65100', fontWeight: 700 }}>
                      ₱{job.salary.min}–{job.salary.max}/{job.salary.type === 'Hourly' ? 'hr' : 'day'}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* AD sidebar mid */}
          <AdBanner zone="AD-SIDEBAR-MID" label="Ad Placeholder&#10;300×250 (AD-SIDEBAR-MID)" height={250} />

          {/* Popular searches */}
          <div style={{ background: '#fff', border: '1px solid #BDBDBD', borderRadius: 10, overflow: 'hidden' }}>
            <div className="section-header" style={{ borderRadius: 0 }}>Trending Searches</div>
            <div style={{ padding: '10px 12px' }}>
              {[
                'Starbucks / Coffee', 'Warehouse / Packer',
                'KTV / Entertainment', 'Convenience Store',
                'BPO / Call Center', 'Delivery Rider',
                'Fast Food Chain', 'Clinic Part-time',
              ].map((s, i) => (
                <div key={s} style={{
                  fontSize: 12, color: '#1565C0', cursor: 'pointer',
                  padding: '5px 4px', borderBottom: '1px solid #f0f0f0',
                  display: 'flex', alignItems: 'center', gap: 6,
                }}>
                  <span style={{ color: '#E65100', fontWeight: 700, fontSize: 11, minWidth: 16 }}>{i + 1}.</span>
                  <span style={{ textDecoration: 'underline' }}>{s}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Register box */}
          <div style={{
            background: 'linear-gradient(135deg, #1B5E20 0%, #2E7D32 100%)',
            borderRadius: 10, padding: 16, color: '#fff', textAlign: 'center',
          }}>
            <div style={{ fontSize: 13, fontWeight: 700, marginBottom: 6 }}>Register FREE!</div>
            <div style={{ fontSize: 11, color: '#C8E6C9', marginBottom: 10, lineHeight: 1.5 }}>
              Save jobs, get alerts, apply instantly!
            </div>
            <button className="btn-3d btn-orange" style={{ width: '100%', fontSize: 13 }}>
              Register Free ›
            </button>
          </div>
        </div>
      </div>

      {/* Area panel overlay */}
      {panelOpen && (
        <>
          <div onClick={() => setPanelOpen(false)} style={{
            position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.4)',
            zIndex: 999, backdropFilter: 'blur(2px)',
          }} />
          <AreaSelectionPanel
            onClose={() => setPanelOpen(false)}
            onSearch={(f) => { setFilters(prev => ({ ...prev, area: f.areas, stations: f.stations })); setPanelOpen(false); }}
          />
        </>
      )}
    </div>
  );
}
