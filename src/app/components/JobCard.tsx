import React from 'react';
import { useSavedJobs } from '../context/SavedJobsContext';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { Job } from './types';

interface JobCardProps {
  job: Job;
  onClick: () => void;
}

// Category → photo
const CATEGORY_IMAGES: Record<string, string> = {
  'Food & Beverage':    'https://images.unsplash.com/photo-1718791985055-e1b06ef5961d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600',
  'Retail / Sales':     'https://images.unsplash.com/photo-1758524055641-49f35de917eb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600',
  'Office / Admin':     'https://images.unsplash.com/photo-1559664043-6b68aa7347d6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600',
  'Admin / Office':     'https://images.unsplash.com/photo-1559664043-6b68aa7347d6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600',
  'Logistics':          'https://images.unsplash.com/photo-1740914994657-f1cdffdc418e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600',
  'Customer Service':   'https://images.unsplash.com/photo-1766066014237-00645c74e9c6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600',
  'Events':             'https://images.unsplash.com/photo-1759692072092-d109f5a85c61?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600',
  'Education':          'https://images.unsplash.com/flagged/photo-1564445477052-8a3787406bbf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600',
  'Healthcare':         'https://images.unsplash.com/photo-1559664043-6b68aa7347d6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600',
  'IT / Tech':          'https://images.unsplash.com/photo-1559664043-6b68aa7347d6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600',
  'Beauty / Wellness':  'https://images.unsplash.com/photo-1758524055641-49f35de917eb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600',
  'Manufacturing':      'https://images.unsplash.com/photo-1740914994657-f1cdffdc418e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600',
  'Delivery':           'https://images.unsplash.com/photo-1711702321525-01dbf0836ad4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600',
};

export function imageForCategory(category: string) {
  return CATEGORY_IMAGES[category] || CATEGORY_IMAGES['Food & Beverage'];
}

export function JobCard({ job, onClick }: JobCardProps) {
  const { isSaved, toggleSave } = useSavedJobs();
  const kept = isSaved(job.id);

  const formatSalary = (j: Job) => {
    if (j.salary.type === 'Hourly') return `₱${j.salary.min}–₱${j.salary.max}/hr`;
    if (j.salary.type === 'Daily') return `₱${j.salary.min}–₱${j.salary.max}/day`;
    return `₱${j.salary.min.toLocaleString()}–₱${j.salary.max.toLocaleString()}/mo`;
  };

  const barometer = job.applicationBarometer;
  const photo = imageForCategory(job.category);

  return (
    <div className="card-3d" style={{ display: 'flex', overflow: 'hidden', width: '100%' }}>
      {/* Image column */}
      <div
        onClick={onClick}
        style={{
          width: 200, flexShrink: 0, position: 'relative', cursor: 'pointer',
          background: '#E8F5E9',
        }}
      >
        <ImageWithFallback
          src={photo}
          alt={job.category}
          style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
        />
        {/* Badges */}
        <div style={{ position: 'absolute', top: 6, left: 6, display: 'flex', flexDirection: 'column', gap: 3 }}>
          {job.isNew && <span style={badgeStyle('#1976D2')}>NEW</span>}
          {job.isFeatured && <span style={badgeStyle('#F57F17')}>FEATURED</span>}
          {job.isUrgent && <span style={badgeStyle('#E65100')}>URGENT</span>}
        </div>
        <div style={{
          position: 'absolute', bottom: 6, left: 6,
          background: 'rgba(46,125,50,0.92)', color: '#fff',
          fontSize: 10, fontWeight: 700, padding: '2px 6px', borderRadius: 3,
        }}>{job.employmentType}</div>
      </div>

      {/* Content column */}
      <div style={{ flex: 1, padding: '12px 16px', display: 'flex', flexDirection: 'column', gap: 6, minWidth: 0 }}>
        {/* Breadcrumb */}
        <div style={{ fontSize: 11, color: '#9E9E9E' }}>
          {job.district} • {job.category}
        </div>

        {/* Title */}
        <div onClick={onClick} style={{
          fontSize: 15, fontWeight: 700, color: '#1A1A1A', lineHeight: 1.35, cursor: 'pointer',
        }}>{job.title}</div>

        {/* Company */}
        <div style={{ fontSize: 12, color: '#4E4E4E' }}>
          {job.company}
        </div>

        {/* Two-column data row */}
        <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: 12, marginTop: 4 }}>
          {/* Left: pay */}
          <div style={{
            display: 'flex', alignItems: 'center', gap: 8,
            padding: '6px 10px', background: '#FFF8E1', borderRadius: 6, border: '1px solid #FFE082',
          }}>
            <div>
              <div style={{ fontSize: 10, color: '#9E9E9E', fontWeight: 600 }}>{job.salary.type} Pay</div>
              <div style={{ fontSize: 16, fontWeight: 800, color: '#E65100', letterSpacing: -0.5 }}>{formatSalary(job)}</div>
            </div>
          </div>
          {/* Right: location/station */}
          <div style={{ fontSize: 11, color: '#4E4E4E', lineHeight: 1.5 }}>
            <div>{job.location}</div>
            {job.nearestStation[0] && (
              <div style={{ color: '#1565C0', fontWeight: 600 }}>{job.nearestStation[0]}</div>
            )}
          </div>
        </div>

        {/* Features (no emoji checkmarks — just text chips) */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4 }}>
          {job.features.slice(0, 6).map(f => (
            <span key={f} className="feature-chip highlight" style={{ fontSize: 10 }}>{f}</span>
          ))}
          {job.features.length > 6 && <span className="feature-chip" style={{ fontSize: 10 }}>+{job.features.length - 6}</span>}
        </div>

        {/* Schedule */}
        <div style={{ fontSize: 11, color: '#4E4E4E', lineHeight: 1.4 }}>
          • {job.scheduleNote || job.schedule.slice(0, 3).join(' / ')}
        </div>

        {/* Bottom row: barometer + actions */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginTop: 'auto', paddingTop: 6 }}>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 10, fontWeight: 600, color: '#4E4E4E', marginBottom: 3 }}>
              Application Status
              {job.slotsLeft && <span style={{ color: '#E65100', marginLeft: 6, fontWeight: 700 }}>({job.slotsLeft} slots left)</span>}
            </div>
            <div style={{ display: 'flex', gap: 2, position: 'relative', height: 16 }}>
              {[1, 2, 3, 4, 5].map(n => (
                <div key={n} className={n <= barometer ? 'barometer-block barometer-filled' : 'barometer-block barometer-empty'} style={{ height: 16 }} />
              ))}
              <div style={{
                position: 'absolute', inset: 0,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 10, fontWeight: 700, color: '#fff',
                textShadow: '0 1px 2px rgba(0,0,0,0.5)', pointerEvents: 'none',
              }}>
                {barometer >= 5 ? 'Applications Pouring In!' : barometer >= 4 ? 'Actively Recruiting' : barometer >= 3 ? 'Hiring Now' : barometer >= 2 ? 'Still Accepting' : 'Apply Now!'}
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', gap: 6, flexShrink: 0 }}>
            <button
              className="btn-3d btn-outline-green btn-sm"
              style={{
                fontSize: 11,
                background: kept ? 'linear-gradient(180deg, #FFF8E1 0%, #FFE0B2 100%)' : undefined,
                borderColor: kept ? '#FFA000' : undefined,
                color: kept ? '#E65100' : undefined,
              }}
              onClick={e => { e.stopPropagation(); toggleSave(job); }}
            >
              {kept ? '★ Kept' : '☆ Keep'}
            </button>
            <button className="btn-3d btn-green btn-sm" style={{ fontSize: 11 }} onClick={onClick}>
              See Details ›
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function badgeStyle(bg: string): React.CSSProperties {
  return {
    background: bg, color: '#fff', fontSize: 10, fontWeight: 700,
    padding: '2px 6px', borderRadius: 3, boxShadow: '0 1px 3px rgba(0,0,0,0.3)',
    width: 'fit-content',
  };
}
