import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import { useSavedJobs } from '../context/SavedJobsContext';
import { AdBanner } from './AdBanner';
import { imageForCategory } from './JobCard';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { Job } from './types';

export function SavedPage() {
  const navigate = useNavigate();
  const { savedJobs, clearAll, toggleSave } = useSavedJobs();
  const [selected, setSelected] = useState<Set<string>>(new Set());

  const toggleSelect = (id: string) => {
    setSelected(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id); else next.add(id);
      return next;
    });
  };
  const selectAll = () => setSelected(new Set(savedJobs.map(j => j.id)));
  const clearSelection = () => setSelected(new Set());

  const formatSalary = (j: Job) => {
    if (j.salary.type === 'Hourly') return `₱${j.salary.min}–₱${j.salary.max}/hr`;
    if (j.salary.type === 'Daily') return `₱${j.salary.min}–₱${j.salary.max}/day`;
    return `₱${j.salary.min.toLocaleString()}–₱${j.salary.max.toLocaleString()}/mo`;
  };

  return (
    <div style={{ maxWidth: 1100, margin: '0 auto', padding: '16px', fontFamily: "'Noto Sans', sans-serif" }}>
      {/* Breadcrumb */}
      <div style={{ fontSize: 12, color: '#9E9E9E', marginBottom: 12 }}>
        <span style={{ color: '#1565C0', cursor: 'pointer' }} onClick={() => navigate('/')}>Home</span>
        <span> › My Keep List</span>
      </div>

      {/* AD — top banner */}
      <AdBanner zone="AD-TOP-BANNER" label="Ad Placeholder — 1100×90 (AD-TOP-BANNER)" height={90} style={{ marginBottom: 16 }} />

      {/* Page header */}
      <div style={{
        background: '#fff',
        border: '1px solid #D5D5D5',
        borderRadius: 8,
        overflow: 'hidden',
        marginBottom: 16,
      }}>
        <div style={{
          background: 'linear-gradient(180deg, #66BB6A 0%, #43A047 100%)',
          padding: '12px 20px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          borderBottom: '1px solid #388E3C',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <span style={{ fontSize: 22, color: '#FFD54F' }}>★</span>
            <div>
              <div style={{ color: '#fff', fontWeight: 800, fontSize: 18, letterSpacing: -0.3 }}>My Keep List</div>
              <div style={{ color: '#E8F5E9', fontSize: 12 }}>キープリスト — Apply to multiple jobs at once</div>
            </div>
          </div>
          <div style={{ color: '#fff', fontSize: 13, fontWeight: 700 }}>
            <span style={{ fontSize: 22, color: '#FFE082' }}>{savedJobs.length}</span> jobs kept
          </div>
        </div>
      </div>

      {/* Two-step instruction cards (image-20 top) */}
      {savedJobs.length > 0 && (
        <div style={{
          background: '#fff', border: '1px solid #D5D5D5', borderRadius: 8,
          padding: 14, marginBottom: 16,
          display: 'grid', gridTemplateColumns: '1fr 30px 1fr', gap: 12, alignItems: 'center',
        }}>
          {/* Step 1 */}
          <div style={{
            border: '1px solid #43A047', borderRadius: 6, padding: '12px 14px',
            display: 'flex', alignItems: 'center', gap: 12,
            background: '#F1F8E9',
          }}>
            <div style={{
              background: '#43A047', color: '#fff', borderRadius: '50%',
              width: 34, height: 34, display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontWeight: 800, fontSize: 16, flexShrink: 0,
            }}>1</div>
            <div style={{ flex: 1, fontSize: 13, color: '#1A1A1A', lineHeight: 1.5 }}>
              <strong>Check the jobs</strong> you'd like to apply to from the list below.
            </div>
            <span style={{
              background: '#fff', border: '1px solid #66BB6A', color: '#388E3C',
              padding: '4px 10px', borderRadius: 4, fontSize: 11, fontWeight: 700,
            }}>
              Checked: {selected.size}
            </span>
          </div>

          {/* Arrow */}
          <div style={{ textAlign: 'center', fontSize: 22, color: '#9E9E9E', fontWeight: 800 }}>›</div>

          {/* Step 2 */}
          <div style={{
            border: '1px solid #FFA000', borderRadius: 6, padding: '12px 14px',
            display: 'flex', alignItems: 'center', gap: 12,
            background: '#FFF8E1',
          }}>
            <div style={{
              background: '#FFA000', color: '#fff', borderRadius: '50%',
              width: 34, height: 34, display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontWeight: 800, fontSize: 16, flexShrink: 0,
            }}>2</div>
            <div style={{ flex: 1, fontSize: 13, color: '#1A1A1A', lineHeight: 1.5 }}>
              Click the <strong>"Apply All"</strong> button to apply to all checked jobs at once.
            </div>
            <button
              className="btn-3d btn-gold btn-sm"
              disabled={selected.size === 0}
              onClick={() => alert(`Applying to ${selected.size} jobs!`)}
              style={{ opacity: selected.size === 0 ? 0.5 : 1, cursor: selected.size === 0 ? 'not-allowed' : 'pointer' }}
            >
              Apply All
            </button>
          </div>
        </div>
      )}

      {savedJobs.length === 0 ? (
        /* Empty state */
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 300px', gap: 16 }}>
          <div style={{
            background: '#fff', border: '1px solid #D5D5D5', borderRadius: 8,
            padding: 48, textAlign: 'center',
          }}>
            <div style={{ fontSize: 56, marginBottom: 12, color: '#FFD54F' }}>☆</div>
            <div style={{ fontSize: 20, fontWeight: 800, color: '#1A1A1A', marginBottom: 8 }}>No Kept Jobs Yet</div>
            <div style={{ fontSize: 13, color: '#9E9E9E', marginBottom: 24, lineHeight: 1.6 }}>
              Browse part-time jobs and tap the <strong>☆ Keep</strong> button<br />
              to save jobs you want to apply for later!
            </div>
            <button className="btn-3d btn-green btn-lg" onClick={() => navigate('/jobs')} style={{ fontSize: 15 }}>
              Browse Jobs Now ›
            </button>

            <div style={{
              marginTop: 32, background: '#FFF8E1',
              border: '1px solid #FFE082', borderRadius: 6,
              padding: '14px 16px', textAlign: 'left',
            }}>
              <div style={{ fontSize: 13, fontWeight: 700, color: '#E65100', marginBottom: 8 }}>
                Tips for using the Keep List
              </div>
              <ul style={{ margin: 0, paddingLeft: 18, fontSize: 12, color: '#4E4E4E', lineHeight: 2 }}>
                <li>Keep up to 99 jobs at once</li>
                <li>Apply to multiple jobs in one click</li>
                <li>Compare jobs side by side</li>
                <li>Register free to sync across devices</li>
              </ul>
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            <AdBanner zone="AD-SIDEBAR-TOP" label="Ad Placeholder&#10;300×250 (AD-SIDEBAR-TOP)" height={250} />
            <AdBanner zone="AD-SIDEBAR-MID" label="Ad Placeholder&#10;300×250 (AD-SIDEBAR-MID)" height={250} />
          </div>
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 300px', gap: 16 }}>
          {/* Left: numbered keep list */}
          <div>
            {/* Toolbar */}
            <div style={{
              display: 'flex', alignItems: 'center', justifyContent: 'space-between',
              padding: '8px 12px', marginBottom: 12,
              background: '#fff', border: '1px solid #D5D5D5', borderRadius: 6,
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <span style={{ fontSize: 13, fontWeight: 700, color: '#1A1A1A' }}>
                  Total: <span style={{ color: '#E65100', fontSize: 18 }}>{savedJobs.length}</span> jobs
                </span>
                <button onClick={selectAll} style={linkBtn}>Select all</button>
                <button onClick={clearSelection} style={linkBtn}>Clear checks</button>
              </div>
              <button
                onClick={() => { if (window.confirm('Clear all kept jobs?')) clearAll(); }}
                style={{ ...linkBtn, color: '#E65100' }}
              >
                Clear all jobs
              </button>
            </div>

            {/* List items, numbered, with checkbox */}
            <div style={{
              background: '#fff', border: '1px solid #D5D5D5', borderRadius: 8,
              overflow: 'hidden',
            }}>
              {savedJobs.map((job, idx) => (
                <div key={job.id} style={{
                  display: 'flex',
                  alignItems: 'stretch',
                  borderBottom: idx < savedJobs.length - 1 ? '1px solid #E0E0E0' : 'none',
                  background: selected.has(job.id) ? '#FFFDE7' : '#fff',
                }}>
                  {/* Index + checkbox column */}
                  <div style={{
                    width: 70, flexShrink: 0,
                    background: '#F5F5F5',
                    borderRight: '1px solid #E0E0E0',
                    display: 'flex', flexDirection: 'column',
                    alignItems: 'center', justifyContent: 'center', gap: 6,
                    padding: '10px 0',
                  }}>
                    <input
                      type="checkbox"
                      checked={selected.has(job.id)}
                      onChange={() => toggleSelect(job.id)}
                      style={{ width: 18, height: 18, cursor: 'pointer', accentColor: '#43A047' }}
                    />
                    <div style={{ fontSize: 11, fontWeight: 800, color: '#9E9E9E' }}>{String(idx + 1).padStart(2, '0')}</div>
                  </div>

                  {/* Thumb */}
                  <div
                    onClick={() => navigate(`/jobs/${job.id}`)}
                    style={{ width: 110, flexShrink: 0, cursor: 'pointer', background: '#E8F5E9' }}
                  >
                    <ImageWithFallback
                      src={imageForCategory(job.category)}
                      alt={job.category}
                      style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                    />
                  </div>

                  {/* Info */}
                  <div style={{ flex: 1, padding: '10px 14px', minWidth: 0 }}>
                    <div style={{ fontSize: 10, color: '#9E9E9E', marginBottom: 2 }}>
                      {job.district} • {job.category}
                    </div>
                    <div
                      onClick={() => navigate(`/jobs/${job.id}`)}
                      style={{ fontSize: 13, fontWeight: 700, color: '#1A1A1A', lineHeight: 1.4, cursor: 'pointer', marginBottom: 4 }}
                    >
                      {job.title}
                    </div>
                    <div style={{ fontSize: 11, color: '#4E4E4E' }}>{job.company}</div>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4, marginTop: 4 }}>
                      {job.features.slice(0, 4).map(f => (
                        <span key={f} className="feature-chip highlight" style={{ fontSize: 10 }}>{f}</span>
                      ))}
                    </div>
                    <div style={{ fontSize: 11, color: '#4E4E4E', marginTop: 4 }}>
                      • {job.scheduleNote || job.schedule.slice(0, 2).join(' / ')}
                    </div>
                  </div>

                  {/* Right column: pay + actions */}
                  <div style={{
                    width: 170, flexShrink: 0,
                    borderLeft: '1px solid #E0E0E0',
                    padding: '10px 12px',
                    display: 'flex', flexDirection: 'column', gap: 6, justifyContent: 'space-between',
                  }}>
                    <div>
                      <div style={{ fontSize: 10, color: '#9E9E9E', fontWeight: 600 }}>{job.salary.type} Pay</div>
                      <div style={{ fontSize: 15, fontWeight: 800, color: '#E65100', letterSpacing: -0.3 }}>{formatSalary(job)}</div>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                      <button className="btn-3d btn-green btn-sm" style={{ fontSize: 11 }} onClick={() => alert(`Applied to ${job.title}!`)}>
                        Apply Now ›
                      </button>
                      <button
                        onClick={() => toggleSave(job)}
                        style={{
                          background: 'none', border: 'none',
                          color: '#E65100', textDecoration: 'underline',
                          fontSize: 11, cursor: 'pointer',
                        }}
                      >
                        Remove from list
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Sticky apply summary at bottom */}
            <div style={{
              marginTop: 14, padding: '14px 18px',
              background: 'linear-gradient(180deg, #fff 0%, #F1F8E9 100%)',
              border: '1px solid #66BB6A', borderRadius: 8,
              display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12,
            }}>
              <div style={{ fontSize: 13, color: '#1A1A1A' }}>
                <strong style={{ color: '#E65100', fontSize: 18 }}>{selected.size}</strong> of {savedJobs.length} jobs checked
              </div>
              <div style={{ display: 'flex', gap: 8 }}>
                <button
                  className="btn-3d btn-outline-green btn-md"
                  onClick={() => navigate('/jobs')}
                >
                  + Find More Jobs
                </button>
                <button
                  className="btn-3d btn-green btn-md"
                  disabled={selected.size === 0}
                  onClick={() => alert(`Applying to ${selected.size} jobs!`)}
                  style={{
                    opacity: selected.size === 0 ? 0.5 : 1,
                    cursor: selected.size === 0 ? 'not-allowed' : 'pointer',
                    fontSize: 14, padding: '10px 22px',
                  }}
                >
                  Apply to Checked ({selected.size}) ›
                </button>
              </div>
            </div>

            <AdBanner zone="AD-LIST-MID" label="Ad Placeholder — 1100×90 (AD-LIST-MID)" height={90} style={{ margin: '20px 0' }} />
          </div>

          {/* Right sidebar */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            <div style={{
              background: '#F1F8E9', border: '1px solid #A5D6A7',
              borderLeft: '4px solid #43A047', borderRadius: 6, padding: 14,
            }}>
              <div style={{ fontSize: 13, fontWeight: 700, color: '#2E7D32', marginBottom: 8 }}>
                ★ {savedJobs.length} Jobs Kept
              </div>
              <div style={{ fontSize: 11, color: '#4E4E4E', marginBottom: 10, lineHeight: 1.6 }}>
                Check multiple jobs above and apply to all at once.
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                <button style={linkBtn}>Export Keep List</button>
                <button style={linkBtn}>Email this list to myself</button>
              </div>
            </div>

            <AdBanner zone="AD-SIDEBAR-TOP" label="Ad Placeholder&#10;300×250 (AD-SIDEBAR-TOP)" height={250} />

            <div style={{
              background: 'linear-gradient(180deg, #43A047 0%, #2E7D32 100%)',
              borderRadius: 8, padding: 16, color: '#fff', textAlign: 'center',
            }}>
              <div style={{ fontSize: 13, fontWeight: 700, marginBottom: 6 }}>Register FREE!</div>
              <div style={{ fontSize: 11, color: '#E8F5E9', marginBottom: 10, lineHeight: 1.5 }}>
                Sync your Keep List across devices.
              </div>
              <button className="btn-3d btn-gold" style={{ width: '100%', fontSize: 13 }}>
                Register Free ›
              </button>
            </div>

            <AdBanner zone="AD-SIDEBAR-MID" label="Ad Placeholder&#10;300×250 (AD-SIDEBAR-MID)" height={250} />
          </div>
        </div>
      )}
    </div>
  );
}

const linkBtn: React.CSSProperties = {
  background: 'none', border: 'none', color: '#1565C0',
  textDecoration: 'underline', cursor: 'pointer',
  fontSize: 12, textAlign: 'left', padding: 0,
};
