import React, { useState } from 'react';
import { SearchFilters } from './types';

interface FilterBarProps {
  filters: SearchFilters;
  onFiltersChange: (filters: SearchFilters) => void;
  jobCount: number;
  onOpenAreaPanel?: () => void;
}

const JOB_TYPE_OPTIONS = [
  'Food & Beverage', 'Retail / Sales', 'Admin / Office', 'Customer Service',
  'Education / Tutoring', 'Logistics / Warehouse', 'Healthcare', 'IT / Tech',
  'Beauty / Wellness', 'Events / Promotions', 'Manufacturing', 'Security',
  'Cleaning / Maintenance', 'Delivery / Driver', 'Others',
];

const SCHEDULE_OPTIONS = ['Weekdays', 'Weekends', 'Mornings', 'Afternoons', 'Evenings', 'Night Shift', 'Flexible / Shift Consult'];
const WORK_PERIOD_OPTIONS = ['Short-term (under 1 month)', 'Within 1 week', 'Within 1 day (spot work)', 'Regular Part-time', 'Seasonal', 'Full-time available'];
const FEATURE_OPTIONS = [
  'No Experience OK', 'Students OK (College)', 'High School Students OK', 'Housewife/Husband OK',
  'Middle-Aged Welcome', 'Senior Welcome', 'No Interview', 'No Resume Needed',
  'Immediate Start', 'Daily Pay Available', 'WFH / Remote Option', 'Uniform Provided',
  'Transportation Allowance', 'Meal Allowance', 'HMO Provided', 'Happy Bonus',
  'Hair & Style Freedom', 'Tattoos OK', 'Night Differential', 'Overtime Pay',
];

function FilterRow({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div style={{
      display: 'flex',
      borderBottom: '1px solid #e0e0e0',
      minHeight: 44,
    }}>
      <div style={{
        width: 130,
        flexShrink: 0,
        padding: '8px 12px',
        background: 'linear-gradient(180deg, #f9fff9 0%, #e8f5e9 100%)',
        borderRight: '1px solid #e0e0e0',
        display: 'flex',
        alignItems: 'center',
        fontSize: 12,
        fontWeight: 700,
        color: '#1B5E20',
      }}>
        {label}
      </div>
      <div style={{ flex: 1, padding: '8px 12px', display: 'flex', flexWrap: 'wrap', gap: 6, alignItems: 'center' }}>
        {children}
      </div>
    </div>
  );
}

export function FilterBar({ filters, onFiltersChange, jobCount, onOpenAreaPanel }: FilterBarProps) {
  const [expanded, setExpanded] = useState(false);

  const toggleFeature = (f: string) => {
    const current = filters.features;
    onFiltersChange({
      ...filters,
      features: current.includes(f) ? current.filter(x => x !== f) : [...current, f],
    });
  };

  const toggleSchedule = (s: string) => {
    const current = filters.schedule;
    onFiltersChange({
      ...filters,
      schedule: current.includes(s) ? current.filter(x => x !== s) : [...current, s],
    });
  };

  const toggleWorkPeriod = (s: string) => {
    const current = filters.workPeriod;
    onFiltersChange({
      ...filters,
      workPeriod: current.includes(s) ? current.filter(x => x !== s) : [...current, s],
    });
  };

  return (
    <div style={{
      background: '#fff',
      border: '1px solid #BDBDBD',
      borderRadius: 10,
      overflow: 'hidden',
      boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
      fontFamily: "'Noto Sans', sans-serif",
    }}>
      {/* Filter header */}
      <div style={{
        background: 'linear-gradient(180deg, #4CAF50 0%, #2E7D32 100%)',
        padding: '8px 16px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderBottom: '2px solid #1B5E20',
      }}>
        <div style={{ color: '#fff', fontWeight: 700, fontSize: 14, display: 'flex', gap: 8, alignItems: 'center' }}>
          <span>Search Conditions (こだわり条件)</span>
        </div>
        <div style={{ color: '#C8E6C9', fontSize: 12 }}>
          <span style={{ color: '#fff', fontSize: 16, fontWeight: 800 }}>{jobCount.toLocaleString()}</span> jobs match
        </div>
      </div>

      {/* Area filter row */}
      <FilterRow label="Area (エリア)">
        {filters.area.length > 0
          ? filters.area.map(a => (
            <span key={a} className="feature-chip highlight" style={{ fontSize: 11 }}>
              {a}
              <button
                onClick={() => onFiltersChange({ ...filters, area: filters.area.filter(x => x !== a) })}
                style={{ background: 'none', border: 'none', cursor: 'pointer', marginLeft: 4, color: '#1B5E20', fontSize: 12, lineHeight: 1 }}
              >✕</button>
            </span>
          ))
          : <span style={{ color: '#9E9E9E', fontSize: 12 }}>No area selected — click map to choose</span>
        }
        <button className="btn-3d btn-sm btn-outline-green" style={{ marginLeft: 'auto', fontSize: 11 }}
          onClick={onOpenAreaPanel}>
          + Add / Change Area
        </button>
        <button style={{ fontSize: 11, color: '#1565C0', background: 'none', border: 'none', cursor: 'pointer', textDecoration: 'underline' }}>
          Search by Line
        </button>
      </FilterRow>

      {/* Job type row */}
      <FilterRow label="Job Type (職種)">
        {JOB_TYPE_OPTIONS.slice(0, expanded ? undefined : 7).map(type => {
          const selected = filters.jobType.includes(type);
          return (
            <label key={type} style={{
              display: 'flex', alignItems: 'center', gap: 5,
              padding: '3px 8px', borderRadius: 4, cursor: 'pointer',
              background: selected ? '#e8f5e9' : '#f9f9f9',
              border: selected ? '1px solid #43A047' : '1px solid #BDBDBD',
              fontSize: 11, color: selected ? '#1B5E20' : '#1A1A1A',
              fontWeight: selected ? 600 : 400,
            }}>
              <input type="checkbox"
                checked={selected}
                onChange={() => {
                  const current = filters.jobType;
                  onFiltersChange({ ...filters, jobType: selected ? current.filter(x => x !== type) : [...current, type] });
                }}
                style={{ accentColor: '#2E7D32', width: 13, height: 13 }}
              />
              {type}
            </label>
          );
        })}
        {!expanded && <button onClick={() => setExpanded(true)} className="btn-3d btn-sm btn-outline-green" style={{ fontSize: 11 }}>See all ▼</button>}
      </FilterRow>

      {/* Pay filter row */}
      <FilterRow label="Pay (給与)">
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <label style={{ fontSize: 12, color: '#4E4E4E' }}>Pay Type:</label>
          <select
            value={filters.payType}
            onChange={e => onFiltersChange({ ...filters, payType: e.target.value })}
            style={{
              padding: '5px 10px', border: '1px solid #BDBDBD', borderRadius: 6,
              fontSize: 12, cursor: 'pointer', fontFamily: "'Noto Sans', sans-serif",
              color: '#1A1A1A', background: '#fff',
            }}
          >
            <option value="">Any Pay Type</option>
            <option value="hourly">Hourly</option>
            <option value="daily">Daily</option>
            <option value="monthly">Monthly</option>
          </select>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <label style={{ fontSize: 12, color: '#4E4E4E' }}>Minimum:</label>
          <select
            value={filters.minPay}
            onChange={e => onFiltersChange({ ...filters, minPay: e.target.value })}
            style={{
              padding: '5px 10px', border: '1px solid #BDBDBD', borderRadius: 6,
              fontSize: 12, cursor: 'pointer', fontFamily: "'Noto Sans', sans-serif",
              color: '#1A1A1A', background: '#fff',
            }}
          >
            <option value="">Any Amount</option>
            <option value="50">₱50+/hr</option>
            <option value="75">₱75+/hr</option>
            <option value="100">₱100+/hr</option>
            <option value="125">₱125+/hr</option>
            <option value="150">₱150+/hr</option>
          </select>
        </div>
      </FilterRow>

      {/* Schedule row */}
      <FilterRow label="Schedule (勤務)">
        {SCHEDULE_OPTIONS.map(s => {
          const selected = filters.schedule.includes(s);
          return (
            <label key={s} style={{
              display: 'flex', alignItems: 'center', gap: 5,
              padding: '3px 8px', borderRadius: 4, cursor: 'pointer',
              background: selected ? '#e8f5e9' : '#f9f9f9',
              border: selected ? '1px solid #43A047' : '1px solid #BDBDBD',
              fontSize: 11, color: selected ? '#1B5E20' : '#1A1A1A',
            }}>
              <input type="checkbox" checked={selected} onChange={() => toggleSchedule(s)}
                style={{ accentColor: '#2E7D32', width: 13, height: 13 }} />
              {s}
            </label>
          );
        })}
      </FilterRow>

      {/* Work period row */}
      <FilterRow label="Work Period (期間)">
        {WORK_PERIOD_OPTIONS.map(s => {
          const selected = filters.workPeriod.includes(s);
          return (
            <label key={s} style={{
              display: 'flex', alignItems: 'center', gap: 5,
              padding: '3px 8px', borderRadius: 4, cursor: 'pointer',
              background: selected ? '#e8f5e9' : '#f9f9f9',
              border: selected ? '1px solid #43A047' : '1px solid #BDBDBD',
              fontSize: 11, color: selected ? '#1B5E20' : '#1A1A1A',
            }}>
              <input type="checkbox" checked={selected} onChange={() => toggleWorkPeriod(s)}
                style={{ accentColor: '#2E7D32', width: 13, height: 13 }} />
              {s}
            </label>
          );
        })}
      </FilterRow>

      {/* Features row */}
      <FilterRow label="Features (特徴)">
        {FEATURE_OPTIONS.map(f => {
          const selected = filters.features.includes(f);
          return (
            <label key={f} style={{
              display: 'flex', alignItems: 'center', gap: 5,
              padding: '3px 8px', borderRadius: 4, cursor: 'pointer',
              background: selected ? '#fff3e0' : '#f9f9f9',
              border: selected ? '1px solid #E65100' : '1px solid #BDBDBD',
              fontSize: 11,
              color: selected ? '#E65100' : '#1A1A1A',
              fontWeight: selected ? 600 : 400,
            }}>
              <input type="checkbox" checked={selected} onChange={() => toggleFeature(f)}
                style={{ accentColor: '#E65100', width: 13, height: 13 }} />
              {f}
            </label>
          );
        })}
      </FilterRow>

      {/* Free word row */}
      <FilterRow label="Free Word (フリーワード)">
        <input
          type="text"
          placeholder="Store name, same-day pay, BGC, Starbucks, weekly pay..."
          value={filters.freeWord}
          onChange={e => onFiltersChange({ ...filters, freeWord: e.target.value })}
          style={{
            flex: 1,
            maxWidth: 380,
            padding: '6px 12px',
            border: '1px solid #BDBDBD',
            borderRadius: 6,
            fontSize: 12,
            outline: 'none',
            fontFamily: "'Noto Sans', sans-serif",
          }}
        />
        <button className="btn-3d btn-green btn-sm" style={{ fontSize: 12 }}>
          Filter ›
        </button>
      </FilterRow>

      {/* Bottom search bar */}
      <div style={{
        background: '#f9f9f9',
        padding: '10px 16px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderTop: '2px solid #e0e0e0',
        gap: 12,
      }}>
        <div style={{ fontSize: 12, color: '#4E4E4E' }}>
          Want more specific search options?
        </div>
        <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
          <button
            className="btn-3d btn-sm btn-outline-green"
            onClick={() => onFiltersChange({ area: [], stations: [], jobType: [], payType: '', minPay: '', schedule: [], workPeriod: [], features: [], freeWord: '' })}
            style={{ fontSize: 11 }}
          >
            Clear All Filters
          </button>
          <div style={{
            background: '#e8f5e9', borderLeft: '4px solid #2E7D32',
            padding: '8px 12px', borderRadius: 6,
            display: 'flex', alignItems: 'center', gap: 12,
          }}>
            <div style={{ fontSize: 13, fontWeight: 700, color: '#2E7D32' }}>
              ● {jobCount.toLocaleString()} jobs match
            </div>
            <button className="btn-3d btn-green btn-md" style={{ fontSize: 13 }}>
              Search with these conditions ›
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
