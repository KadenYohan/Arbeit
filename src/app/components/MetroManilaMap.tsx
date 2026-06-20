import { useState } from 'react';
import { DISTRICTS } from './mockData';

interface MetroManilaMapProps {
  onDistrictClick: (districtId: string) => void;
}

// ─────────────────────────────────────────────────────────────────────────────
// SVG viewBox: 0 0 420 580
// Oriented: West (Manila Bay) = left, North (Bulacan) = top
// Reference: official Metro Manila LGU map image
// ─────────────────────────────────────────────────────────────────────────────

const CITY_DEFS = [
  {
    id: 'valenzuela', name: 'Valenzuela', district: 'd3',
    fill: '#6E4694', hover: '#8A5BB5',
    path: 'M 50,20 L 220,20 L 240,80 L 200,120 L 90,110 Z',
    lx: 130, ly: 60,
  },
  {
    id: 'caloocan', name: 'Caloocan', district: 'd3',
    fill: '#8A158A', hover: '#A61FA6',
    path: 'M 220,20 L 370,20 L 390,90 L 250,120 L 240,80 Z',
    lx: 290, ly: 60,
  },
  {
    id: 'malabon', name: 'Malabon', district: 'd3',
    fill: '#B81D45', hover: '#D62754',
    path: 'M 90,110 L 140,100 L 160,130 L 140,170 L 80,160 Z',
    lx: 115, ly: 135,
  },
  {
    id: 'navotas', name: 'Navotas', district: 'd3',
    fill: '#812033', hover: '#A02B43',
    path: 'M 50,120 L 90,110 L 80,160 L 70,200 L 30,180 Z',
    lx: 55, ly: 160, fs: 8,
  },
  {
    id: 'quezon-city', name: 'Quezon City', district: 'd4',
    fill: '#4F2696', hover: '#6535B8',
    path: 'M 250,120 L 390,90 L 440,160 L 440,300 L 320,330 L 250,290 L 220,250 L 200,150 Z',
    lx: 320, ly: 220,
  },
  {
    id: 'marikina', name: 'Marikina', district: 'd2',
    fill: '#2C3682', hover: '#3B48AA',
    path: 'M 390,90 L 440,90 L 460,160 L 440,160 Z',
    lx: 430, ly: 130, fs: 9,
  },
  {
    id: 'manila', name: 'Manila', district: 'd1',
    fill: '#B92D23', hover: '#D9392D',
    path: 'M 70,200 L 140,170 L 200,150 L 220,250 L 180,310 L 90,320 L 40,250 Z',
    lx: 130, ly: 250,
  },
  {
    id: 'san-juan', name: 'San Juan', district: 'd2',
    fill: '#E34821', hover: '#FA5830',
    path: 'M 220,250 L 250,290 L 230,310 L 200,290 Z',
    lx: 225, ly: 285, fs: 8,
  },
  {
    id: 'mandaluyong', name: 'Mandaluyong', district: 'd2',
    fill: '#D83023', hover: '#F04033',
    path: 'M 200,290 L 230,310 L 270,330 L 250,370 L 180,350 Z',
    lx: 225, ly: 335, fs: 8,
  },
  {
    id: 'pasig', name: 'Pasig', district: 'd2',
    fill: '#B84310', hover: '#D65319',
    path: 'M 270,330 L 320,330 L 410,320 L 430,390 L 360,410 L 290,370 Z',
    lx: 350, ly: 360,
  },
  {
    id: 'makati', name: 'Makati', district: 'd4',
    fill: '#F09A20', hover: '#FFAE3A',
    path: 'M 180,350 L 250,370 L 290,370 L 270,430 L 160,410 Z',
    lx: 220, ly: 395,
  },
  {
    id: 'pateros', name: 'Pateros', district: 'd4',
    fill: '#62751E', hover: '#7A9127',
    path: 'M 290,370 L 320,370 L 330,390 L 300,400 Z',
    lx: 310, ly: 385, fs: 7,
  },
  {
    id: 'taguig', name: 'Taguig', district: 'd4',
    fill: '#28752E', hover: '#35993C',
    path: 'M 300,400 L 330,390 L 360,410 L 420,440 L 390,500 L 280,480 L 270,430 Z',
    lx: 340, ly: 450,
  },
  {
    id: 'pasay', name: 'Pasay', district: 'd4',
    fill: '#E46A0B', hover: '#FF7E17',
    path: 'M 90,320 L 180,310 L 180,350 L 160,410 L 80,390 L 50,350 Z',
    lx: 120, ly: 365,
  },
  {
    id: 'paranaque', name: 'Parañaque', district: 'd4',
    fill: '#E57E12', hover: '#FF9221',
    path: 'M 80,390 L 160,410 L 270,430 L 280,480 L 210,500 L 100,460 Z',
    lx: 180, ly: 450,
  },
  {
    id: 'las-pinas', name: 'Las Piñas', district: 'd4',
    fill: '#A9B023', hover: '#C4CB31',
    path: 'M 30,440 L 100,460 L 160,480 L 150,520 L 40,500 Z',
    lx: 90, ly: 480, fs: 9,
  },
  {
    id: 'muntinlupa', name: 'Muntinlupa', district: 'd4',
    fill: '#28813C', hover: '#34A14C',
    path: 'M 160,480 L 210,500 L 280,480 L 290,570 L 170,570 L 140,520 Z',
    lx: 220, ly: 530,
  },
] as const;

// ─── District label polygons ──────────────────────────────────────────────────
const DISTRICT_LABELS = [
  { text: 'BULACAN', x: 230, y: 8, size: 9 },
  { text: 'RIZAL', x: 414, y: 185, size: 9, rotate: -90, rx: 414, ry: 185 },
  { text: 'CAVITE', x: 8, y: 490, size: 8 },
  { text: 'LAGUNA', x: 195, y: 574, size: 9 },
  { text: 'LAGUNA LAKE', x: 398, y: 460, size: 8 },
  { text: 'MANILA BAY', x: 8, y: 280, size: 9, rotate: -90, rx: 8, ry: 280 },
] as const;

export function MetroManilaMap({ onDistrictClick }: MetroManilaMapProps) {
  const [hovered, setHovered] = useState<string | null>(null);

  return (
    <div style={{ position: 'relative', width: '100%' }}>
      <svg
        viewBox="0 0 420 580"
        style={{ width: '100%', height: 'auto', cursor: 'pointer', background: '#B3E5FC', borderRadius: 8, display: 'block' }}
        aria-label="Interactive Metro Manila Geographic Map"
      >
        {/* Laguna de Bay (water body, southeast) */}
        <ellipse cx="390" cy="490" rx="36" ry="60" fill="#72D0E8" opacity="0.85" />
        <text x="380" y="476" fill="#0277BD" fontSize="7" fontWeight="700" textAnchor="middle">LAGUNA</text>
        <text x="380" y="486" fill="#0277BD" fontSize="7" fontWeight="700" textAnchor="middle">LAKE</text>

        {/* Border province labels */}
        <text x="205" y="9" fill="#5D4037" fontSize="9" fontWeight="800" textAnchor="middle" opacity="0.75">BULACAN</text>
        <text x="8" y="488" fill="#5D4037" fontSize="8" fontWeight="800" opacity="0.75">CAVITE</text>
        <text x="205" y="572" fill="#5D4037" fontSize="9" fontWeight="800" textAnchor="middle" opacity="0.75">LAGUNA</text>
        <text x="10" y="245" fill="#0277BD" fontSize="9" fontWeight="800" opacity="0.9"
          transform="rotate(-90,10,245)">MANILA BAY</text>
        <text x="418" y="155" fill="#5D4037" fontSize="9" fontWeight="800" textAnchor="end" opacity="0.75"
          transform="rotate(90,418,155)">RIZAL</text>

        {/* City polygons */}
        {CITY_DEFS.map(c => {
          const isHov = hovered === c.id;
          return (
            <g key={c.id}
              onMouseEnter={() => setHovered(c.id)}
              onMouseLeave={() => setHovered(null)}
              onClick={() => onDistrictClick(c.district)}
              style={{ cursor: 'pointer' }}
            >
              <path
                d={c.path}
                fill={isHov ? c.hover : c.fill}
                stroke="rgba(255,255,255,0.85)"
                strokeWidth={1.5}
                style={{ transition: 'fill 90ms ease', filter: isHov ? 'brightness(1.15) drop-shadow(0 0 5px rgba(0,0,0,0.3))' : 'none' }}
              />
              <text
                x={c.lx} y={c.ly}
                textAnchor="middle"
                fontSize={(c as any).fs ?? 10}
                fontWeight="800"
                fill="#fff"
                paintOrder="stroke"
                stroke="rgba(0,0,0,0.55)"
                strokeWidth={2.5}
                style={{ pointerEvents: 'none', fontFamily: "'Noto Sans', sans-serif" }}
              >
                {c.name}
              </text>
            </g>
          );
        })}
      </svg>

      {/* Hover tooltip */}
      {hovered && (
        <div style={{
          position: 'absolute', top: 8, left: '50%', transform: 'translateX(-50%)',
          background: 'rgba(27,94,32,0.95)', color: '#fff',
          padding: '4px 14px', borderRadius: 5, fontSize: 11, fontWeight: 700,
          pointerEvents: 'none', boxShadow: '0 2px 10px rgba(0,0,0,0.3)',
          whiteSpace: 'nowrap',
        }}>
          {CITY_DEFS.find(c => c.id === hovered)?.name} — click to filter jobs
        </div>
      )}

      {/* District filter buttons */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginTop: 10 }}>
        {DISTRICTS.map(d => (
          <button
            key={d.id}
            onClick={() => onDistrictClick(d.id)}
            style={{
              background: 'linear-gradient(180deg,#e8f5e9,#c8e6c9)',
              border: '1px solid #81C784', borderBottom: '2px solid #4CAF50',
              borderRadius: 6, padding: '4px 10px', cursor: 'pointer',
              fontSize: 11, fontWeight: 700, color: '#1B5E20',
              fontFamily: "'Noto Sans', sans-serif",
            }}
          >
            {d.name.split('—')[0].trim()} — {d.jobCount.toLocaleString()} jobs
          </button>
        ))}
      </div>
    </div>
  );
}
