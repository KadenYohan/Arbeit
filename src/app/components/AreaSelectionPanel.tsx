import { useState } from 'react';
import { X } from 'lucide-react';
import { DISTRICTS, TRAIN_LINES, BUS_ROUTES, P2P_ROUTES } from './mockData';

interface AreaSelectionPanelProps {
  initialDistrict?: string;
  onClose: () => void;
  onSearch: (filters: { areas: string[]; stations: string[] }) => void;
}

const DISTRICT_CITIES: Record<string, Array<{ name: string; count: number }>> = {
  d1: [
    { name: 'Manila — Binondo', count: 124 },
    { name: 'Manila — Ermita', count: 89 },
    { name: 'Manila — Intramuros', count: 34 },
    { name: 'Manila — Malate', count: 78 },
    { name: 'Manila — Paco', count: 45 },
    { name: 'Manila — Pandacan', count: 31 },
    { name: 'Manila — Port Area', count: 28 },
    { name: 'Manila — Quiapo', count: 56 },
    { name: 'Manila — Sampaloc', count: 92 },
    { name: 'Manila — San Miguel', count: 41 },
    { name: 'Manila — Santa Ana', count: 38 },
    { name: 'Manila — Santa Cruz', count: 67 },
    { name: 'Manila — Tondo', count: 112 },
  ],
  d2: [
    { name: 'Mandaluyong City', count: 178 },
    { name: 'Marikina City — Sto. Niño', count: 56 },
    { name: 'Marikina City — Calumpang', count: 43 },
    { name: 'Pasig City — Ortigas Center', count: 234 },
    { name: 'Pasig City — Kapitolyo', count: 89 },
    { name: 'Pasig City — Ugong', count: 45 },
    { name: 'Quezon City — Araneta Center', count: 145 },
    { name: 'Quezon City — Commonwealth', count: 78 },
    { name: 'Quezon City — Diliman', count: 167 },
    { name: 'Quezon City — Eastwood', count: 112 },
    { name: 'Quezon City — Fairview', count: 89 },
    { name: 'Quezon City — Quezon Ave Area', count: 134 },
    { name: 'Quezon City — Project 6', count: 67 },
    { name: 'San Juan City', count: 92 },
  ],
  d3: [
    { name: 'Caloocan City — Sangandaan', count: 78 },
    { name: 'Caloocan City — Monumento Area', count: 112 },
    { name: 'Caloocan City — EDSA Area', count: 89 },
    { name: 'Malabon City', count: 67 },
    { name: 'Navotas City', count: 34 },
    { name: 'Valenzuela City — Malinta', count: 78 },
    { name: 'Valenzuela City — Polo', count: 56 },
    { name: 'Valenzuela City — Tagalag', count: 45 },
    { name: 'Valenzuela City — Gen. T. de Leon', count: 41 },
  ],
  d4: [
    { name: 'Las Piñas City', count: 123 },
    { name: 'Makati City — Ayala / CBD', count: 345 },
    { name: 'Makati City — Rockwell', count: 89 },
    { name: 'Makati City — Poblacion', count: 67 },
    { name: 'Makati City — Guadalupe', count: 78 },
    { name: 'Muntinlupa City — Alabang', count: 112 },
    { name: 'Muntinlupa City — Filinvest', count: 67 },
    { name: 'Parañaque City — Sucat', count: 89 },
    { name: 'Parañaque City — BF Homes', count: 56 },
    { name: 'Parañaque City — PITX Area', count: 78 },
    { name: 'Parañaque City — Airport Village', count: 45 },
    { name: 'Pasay City — Roxas Blvd', count: 123 },
    { name: 'Pasay City — MOA Area', count: 145 },
    { name: 'Pateros', count: 23 },
    { name: 'Taguig City — BGC', count: 234 },
    { name: 'Taguig City — FTI / Bicutan', count: 89 },
    { name: 'Taguig City — Western Bicutan', count: 67 },
  ],
};

export function AreaSelectionPanel({ initialDistrict, onClose, onSearch }: AreaSelectionPanelProps) {
  const [activeTab, setActiveTab] = useState<'area' | 'line' | 'bus'>('area');
  const [selectedDistrict, setSelectedDistrict] = useState(initialDistrict || 'd1');
  const [selectedLine, setSelectedLine] = useState('mrt3');
  const [checkedAreas, setCheckedAreas] = useState<Set<string>>(new Set());
  const [checkedStations, setCheckedStations] = useState<Set<string>>(new Set());

  const toggleArea = (area: string) => {
    const next = new Set(checkedAreas);
    next.has(area) ? next.delete(area) : next.add(area);
    setCheckedAreas(next);
  };

  const toggleStation = (station: string) => {
    const next = new Set(checkedStations);
    next.has(station) ? next.delete(station) : next.add(station);
    setCheckedStations(next);
  };

  const totalSelected = checkedAreas.size + checkedStations.size;
  const currentLine = TRAIN_LINES.find(l => l.id === selectedLine);

  const handleSearch = () => {
    onSearch({ areas: [...checkedAreas], stations: [...checkedStations] });
    onClose();
  };

  return (
    <div style={{
      position: 'fixed',
      top: 0, right: 0, bottom: 0,
      width: 500,
      background: '#fff',
      zIndex: 1000,
      display: 'flex',
      flexDirection: 'column',
      boxShadow: '-4px 0 24px rgba(0,0,0,0.25)',
      fontFamily: "'Noto Sans', sans-serif",
      borderLeft: '2px solid #BDBDBD',
    }}>
      {/* Header */}
      <div className="green-panel-header" style={{ borderRadius: 0, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span style={{ fontSize: 15 }}>Select Search Area / Station</span>
        <button
          onClick={onClose}
          style={{ background: 'rgba(255,255,255,0.2)', border: '1px solid rgba(255,255,255,0.4)', borderRadius: 4, color: '#fff', width: 28, height: 28, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
          aria-label="Close"
        ><X size={16} /></button>
      </div>

      {/* Tabs */}
      <div style={{ display: 'flex', borderBottom: '2px solid #BDBDBD', background: '#f9f9f9' }}>
        {[
          { key: 'area', label: 'By Area', sublabel: 'Choose city/district' },
          { key: 'line', label: 'By Train Line', sublabel: 'LRT/MRT/Subway' },
          { key: 'bus', label: 'By Bus Route', sublabel: 'EDSA/BGC/P2P' },
        ].map(tab => (
          <button
            key={tab.key}
            className={`tab-btn ${activeTab === tab.key ? 'active' : ''}`}
            onClick={() => setActiveTab(tab.key as any)}
            style={{ flex: 1, flexDirection: 'column', display: 'flex', alignItems: 'center', paddingTop: 8, paddingBottom: 8 }}
          >
            <span>{tab.label}</span>
            <span style={{ fontSize: 10, fontWeight: 400, color: '#9E9E9E', marginTop: 1 }}>{tab.sublabel}</span>
          </button>
        ))}
      </div>

      {/* Content */}
      <div style={{ flex: 1, overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>

        {/* AREA TAB */}
        {activeTab === 'area' && (
          <div style={{ display: 'flex', flex: 1, overflow: 'hidden' }}>
            {/* Left: District list */}
            <div style={{ width: 160, borderRight: '1px solid #BDBDBD', overflowY: 'auto', flexShrink: 0 }}>
              {DISTRICTS.map(d => (
                <button
                  key={d.id}
                  onClick={() => setSelectedDistrict(d.id)}
                  style={{
                    width: '100%',
                    padding: '12px 10px',
                    textAlign: 'left',
                    border: 'none',
                    borderBottom: '1px solid #e0e0e0',
                    cursor: 'pointer',
                    background: selectedDistrict === d.id ? '#C8E6C9' : '#fff',
                    color: selectedDistrict === d.id ? '#1B5E20' : '#1A1A1A',
                    fontWeight: selectedDistrict === d.id ? 700 : 400,
                    fontSize: 12,
                    fontFamily: "'Noto Sans', sans-serif",
                    lineHeight: 1.4,
                    borderLeft: selectedDistrict === d.id ? '3px solid #2E7D32' : '3px solid transparent',
                    transition: 'all 100ms',
                  }}
                >
                  <div style={{ fontWeight: 700 }}>{d.name.split('—')[0]}</div>
                  <div style={{ fontSize: 10, color: selectedDistrict === d.id ? '#2E7D32' : '#9E9E9E' }}>
                    {d.name.includes('—') ? d.name.split('—')[1] : ''}
                  </div>
                  <div style={{ fontSize: 10, color: '#E65100', fontWeight: 600 }}>{d.jobCount} jobs</div>
                </button>
              ))}
            </div>

            {/* Right: City/area checkboxes */}
            <div style={{ flex: 1, overflowY: 'auto', padding: 12 }}>
              {/* Select all for district */}
              <div style={{
                background: '#e8f5e9', borderRadius: 6, padding: '8px 10px',
                marginBottom: 10, display: 'flex', alignItems: 'center', gap: 8,
                border: '1px solid #A5D6A7',
              }}>
                <input type="checkbox"
                  style={{ accentColor: '#2E7D32', width: 16, height: 16 }}
                  onChange={() => {
                    const district = DISTRICTS.find(d => d.id === selectedDistrict);
                    if (!district) return;
                    const all = DISTRICT_CITIES[selectedDistrict]?.map(c => c.name) || [];
                    const allChecked = all.every(a => checkedAreas.has(a));
                    const next = new Set(checkedAreas);
                    if (allChecked) { all.forEach(a => next.delete(a)); }
                    else { all.forEach(a => next.add(a)); }
                    setCheckedAreas(next);
                  }}
                />
                <span style={{ fontSize: 12, fontWeight: 700, color: '#1B5E20' }}>
                  Select All of {DISTRICTS.find(d => d.id === selectedDistrict)?.name}
                </span>
              </div>

              {/* Area checkboxes */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: 2 }}>
                {(DISTRICT_CITIES[selectedDistrict] || []).map(({ name, count }) => (
                  <label key={name} style={{
                    display: 'flex', alignItems: 'center', gap: 8,
                    padding: '6px 8px', borderRadius: 4, cursor: 'pointer',
                    background: checkedAreas.has(name) ? '#e8f5e9' : 'transparent',
                    border: checkedAreas.has(name) ? '1px solid #A5D6A7' : '1px solid transparent',
                    fontSize: 12, color: '#1A1A1A',
                    fontFamily: "'Noto Sans', sans-serif",
                  }}>
                    <input
                      type="checkbox"
                      checked={checkedAreas.has(name)}
                      onChange={() => toggleArea(name)}
                      style={{ accentColor: '#2E7D32', width: 15, height: 15 }}
                    />
                    <span style={{ flex: 1 }}>{name}</span>
                    <span style={{ color: '#9E9E9E', fontSize: 11 }}>({count})</span>
                  </label>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TRAIN LINE TAB */}
        {activeTab === 'line' && (
          <div style={{ display: 'flex', flex: 1, overflow: 'hidden' }}>
            {/* Left: Line list */}
            <div style={{ width: 175, borderRight: '1px solid #BDBDBD', overflowY: 'auto', flexShrink: 0 }}>
              <div style={{ padding: '8px 10px', fontSize: 10, fontWeight: 700, color: '#9E9E9E', background: '#f9f9f9', borderBottom: '1px solid #e0e0e0' }}>
                ■ RAIL LINES
              </div>
              {TRAIN_LINES.map(line => (
                <button
                  key={line.id}
                  onClick={() => setSelectedLine(line.id)}
                  style={{
                    width: '100%',
                    padding: '10px 10px',
                    textAlign: 'left',
                    border: 'none',
                    borderBottom: '1px solid #e0e0e0',
                    cursor: 'pointer',
                    background: selectedLine === line.id ? '#C8E6C9' : '#fff',
                    color: selectedLine === line.id ? '#1B5E20' : '#1A1A1A',
                    fontWeight: selectedLine === line.id ? 700 : 400,
                    fontSize: 12,
                    fontFamily: "'Noto Sans', sans-serif",
                    borderLeft: selectedLine === line.id ? '3px solid #2E7D32' : '3px solid transparent',
                    transition: 'all 100ms',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                    <div style={{ width: 24, height: 4, borderRadius: 2, background: line.color, flexShrink: 0 }} />
                    <span>{line.name}</span>
                  </div>
                  {line.status === 'under-construction' && (
                    <span style={{
                      fontSize: 9, background: '#FFF3E0', color: '#E65100',
                      border: '1px solid #FFB74D', borderRadius: 3, padding: '1px 5px', marginTop: 3, display: 'inline-block',
                    }}>Under Construction</span>
                  )}
                </button>
              ))}
            </div>

            {/* Right: Station checkboxes */}
            <div style={{ flex: 1, overflowY: 'auto', padding: 12 }}>
              {currentLine && (
                <>
                  <div style={{
                    display: 'flex', alignItems: 'center', gap: 8,
                    marginBottom: 10, background: '#f5f5f5', borderRadius: 6,
                    padding: '8px 10px', border: '1px solid #BDBDBD',
                  }}>
                    <div style={{ width: 28, height: 6, borderRadius: 3, background: currentLine.color }} />
                    <span style={{ fontSize: 13, fontWeight: 700, color: '#1A1A1A' }}>{currentLine.name}</span>
                    {currentLine.status === 'under-construction' && (
                      <span style={{ fontSize: 10, color: '#E65100', background: '#FFF3E0', padding: '2px 6px', borderRadius: 3, border: '1px solid #FFB74D' }}>
                        Under Construction — stations still bookmarkable
                      </span>
                    )}
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: 2 }}>
                    {currentLine.stations.map((station, i) => (
                      <label key={station} style={{
                        display: 'flex', alignItems: 'center', gap: 8,
                        padding: '7px 8px', borderRadius: 4, cursor: 'pointer',
                        background: checkedStations.has(station) ? '#e8f5e9' : 'transparent',
                        border: checkedStations.has(station) ? '1px solid #A5D6A7' : '1px solid transparent',
                        fontSize: 12, color: '#1A1A1A',
                        fontFamily: "'Noto Sans', sans-serif",
                      }}>
                        <input
                          type="checkbox"
                          checked={checkedStations.has(station)}
                          onChange={() => toggleStation(station)}
                          style={{ accentColor: currentLine.color, width: 15, height: 15 }}
                        />
                        <div style={{
                          width: 6, height: 6, borderRadius: '50%',
                          background: currentLine.color, border: '2px solid #fff',
                          boxShadow: `0 0 0 1.5px ${currentLine.color}`,
                          flexShrink: 0,
                        }} />
                        <span style={{ flex: 1 }}>{station}</span>
                        {currentLine.status === 'under-construction' && (
                          <span style={{ fontSize: 9, color: '#E65100' }}>UC</span>
                        )}
                      </label>
                    ))}
                  </div>
                </>
              )}
            </div>
          </div>
        )}

        {/* BUS / P2P TAB */}
        {activeTab === 'bus' && (
          <div style={{ flex: 1, overflowY: 'auto', padding: 12 }}>
            <div style={{ fontWeight: 700, fontSize: 13, color: '#1B5E20', marginBottom: 12 }}>
              Bus Routes & P2P Services
            </div>

            {BUS_ROUTES.map(route => (
              <div key={route.id} style={{
                marginBottom: 14, border: '1px solid #BDBDBD',
                borderRadius: 8, overflow: 'hidden',
              }}>
                <div style={{
                  background: route.color, color: '#fff',
                  padding: '7px 12px', fontSize: 12, fontWeight: 700,
                  display: 'flex', alignItems: 'center', gap: 6,
                }}>
                  <span>{route.name}</span>
                </div>
                <div style={{ padding: '8px 10px', display: 'flex', flexWrap: 'wrap', gap: 4 }}>
                  {route.stops.map(stop => (
                    <label key={stop} style={{
                      display: 'flex', alignItems: 'center', gap: 4,
                      padding: '3px 8px', borderRadius: 12,
                      border: '1px solid #BDBDBD', cursor: 'pointer',
                      background: checkedStations.has(stop) ? '#e8f5e9' : '#f9f9f9',
                      fontSize: 11,
                    }}>
                      <input type="checkbox"
                        checked={checkedStations.has(stop)}
                        onChange={() => toggleStation(stop)}
                        style={{ accentColor: '#2E7D32', width: 12, height: 12 }}
                      />
                      {stop}
                    </label>
                  ))}
                </div>
              </div>
            ))}

            {/* P2P routes */}
            <div style={{ fontWeight: 700, fontSize: 13, color: '#1B5E20', marginBottom: 10, marginTop: 4 }}>
              Point-to-Point (P2P) Bus Services
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
              {P2P_ROUTES.map(route => (
                <div key={route.origin} style={{
                  border: '1px solid #A5D6A7', borderRadius: 8, overflow: 'hidden',
                  background: '#f9fff9',
                }}>
                  <div style={{
                    background: '#2E7D32', color: '#fff', padding: '5px 10px',
                    fontSize: 11, fontWeight: 700,
                  }}>
                    From: {route.origin}
                  </div>
                  <div style={{ padding: '6px 10px' }}>
                    {route.destinations.map(dest => (
                      <label key={dest} style={{
                        display: 'flex', alignItems: 'center', gap: 5,
                        fontSize: 11, marginBottom: 3, cursor: 'pointer',
                      }}>
                        <input type="checkbox"
                          checked={checkedStations.has(dest)}
                          onChange={() => toggleStation(dest)}
                          style={{ accentColor: '#2E7D32' }}
                        />
                        {dest}
                      </label>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Ad placeholder inside panel */}
      <div className="ad-placeholder" style={{ margin: '0 12px 8px', height: 60, fontSize: 11 }}>
        <div className="ad-label">Ad</div>
        <span>Ad Placeholder — 300×60px</span>
      </div>

      {/* Bottom action bar */}
      <div style={{
        padding: '12px 16px',
        borderTop: '2px solid #BDBDBD',
        background: '#f9f9f9',
        display: 'flex',
        alignItems: 'center',
        gap: 10,
      }}>
        <div style={{ fontSize: 12, color: '#2E7D32', fontWeight: 700, flex: 1 }}>
          {totalSelected > 0
            ? `${totalSelected} area${totalSelected > 1 ? 's' : ''}/station${totalSelected > 1 ? 's' : ''} selected`
            : 'No areas selected yet'}
        </div>
        <button
          className="btn-3d btn-sm btn-outline-green"
          onClick={() => { setCheckedAreas(new Set()); setCheckedStations(new Set()); }}
          style={{ fontSize: 11 }}
        >
          Clear All
        </button>
        <button
          className="btn-3d btn-lg btn-green"
          onClick={handleSearch}
          style={{ fontSize: 13 }}
        >
          Search with these conditions ›
        </button>
      </div>
    </div>
  );
}
