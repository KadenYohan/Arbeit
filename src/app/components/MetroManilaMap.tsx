import { useState } from 'react';

interface MetroManilaMapProps {
  onDistrictClick: (districtId: string) => void;
}

/* ─────────────────────────────────────────────────────────────────────────────
 * Metro Manila Interactive Map
 * viewBox: 0 0 500 920
 * Colors & shapes traced from the official NCR reference map image
 * ───────────────────────────────────────────────────────────────────────────── */

const CITY_DEFS = [
  // ── CALOOCAN NORTH (large blue area at top) ──
  {
    id: 'caloocan-north', name: 'Caloocan', district: 'd3',
    fill: '#4A6FA5', hover: '#5E8ABF',
    path: `M 170,42 L 200,30 L 240,24 L 285,22 L 330,28 L 358,42
           L 374,68 L 382,105 L 380,148 L 372,178 L 358,198
           L 335,210 L 305,208 L 278,212 L 255,218 L 232,222
           L 214,224 L 200,218 L 190,200 L 182,168 L 178,130
           L 175,88 Z`,
    lx: 278, ly: 108,
  },
  // ── VALENZUELA (purple, upper-left) ──
  {
    id: 'valenzuela', name: 'Valenzuela', district: 'd3',
    fill: '#7B52AB', hover: '#9575CD',
    path: `M 92,68 L 120,55 L 148,46 L 170,42 L 175,88 L 178,130
           L 182,168 L 180,195 L 170,218 L 155,238 L 138,248
           L 118,248 L 102,238 L 92,215 L 88,178 L 86,138 L 88,100 Z`,
    lx: 134, ly: 148,
  },
  // ── MALABON (deep pink, small coastal) ──
  {
    id: 'malabon', name: 'Malabon', district: 'd3',
    fill: '#C2185B', hover: '#E91E63',
    path: `M 52,222 L 78,215 L 102,218 L 118,225 L 118,248 L 112,268
           L 100,288 L 82,298 L 62,298 L 48,285 L 42,262 L 44,238 Z`,
    lx: 82, ly: 258,
  },
  // ── NAVOTAS (dark maroon, tiny coastal) ──
  {
    id: 'navotas', name: 'Navotas', district: 'd3',
    fill: '#880E4F', hover: '#AD1457',
    path: `M 18,248 L 38,238 L 44,238 L 48,260 L 48,285 L 38,305
           L 25,312 L 16,298 L 14,268 Z`,
    lx: 28, ly: 278, fs: 9,
  },
  // ── CALOOCAN SOUTH (blue, central strip) ──
  {
    id: 'caloocan-south', name: 'Caloocan', district: 'd3',
    fill: '#4A6FA5', hover: '#5E8ABF',
    path: `M 118,248 L 138,248 L 155,238 L 170,230 L 190,225
           L 200,218 L 210,228 L 215,248 L 212,272 L 205,295
           L 192,315 L 175,332 L 155,340 L 135,342 L 118,330
           L 105,310 L 100,288 L 112,268 Z`,
    lx: 158, ly: 290,
  },
  // ── QUEZON CITY (deep purple, LARGEST) ──
  {
    id: 'quezon-city', name: 'Quezon City', district: 'd3',
    fill: '#6A1B9A', hover: '#8E24AA',
    path: `M 200,218 L 214,224 L 232,222 L 255,218 L 278,212
           L 305,208 L 335,210 L 358,198 L 372,178 L 380,148
           L 388,142 L 400,150 L 412,175 L 418,208 L 415,248
           L 408,285 L 396,318 L 380,348 L 362,372 L 340,385
           L 312,388 L 288,385 L 265,375 L 245,362 L 230,348
           L 222,330 L 215,308 L 212,285 L 212,272 L 215,248
           L 210,228 Z`,
    lx: 310, ly: 268,
  },
  // ── MARIKINA (light purple, east) ──
  {
    id: 'marikina', name: 'Marikina', district: 'd3',
    fill: '#CE93D8', hover: '#E1BEE7',
    path: `M 388,285 L 408,285 L 418,268 L 435,275 L 452,298
           L 458,328 L 450,358 L 438,378 L 418,395 L 396,400
           L 382,392 L 378,368 L 382,338 L 385,310 Z`,
    lx: 425, ly: 335,
  },
  // ── MANILA (red, west coast) ──
  {
    id: 'manila', name: 'Manila', district: 'd1',
    fill: '#D32F2F', hover: '#EF5350',
    path: `M 48,342 L 72,332 L 98,328 L 118,330 L 135,342 L 155,340
           L 175,345 L 188,360 L 192,385 L 190,412 L 182,438
           L 170,460 L 152,478 L 128,488 L 98,486 L 72,475
           L 52,455 L 42,425 L 38,392 L 40,362 Z`,
    lx: 118, ly: 408,
  },
  // ── SAN JUAN (green, small center) ──
  {
    id: 'san-juan', name: 'San Juan', district: 'd2',
    fill: '#2E7D32', hover: '#43A047',
    path: `M 228,362 L 255,358 L 278,362 L 288,378 L 285,395
           L 268,408 L 248,410 L 232,402 L 225,388 Z`,
    lx: 256, ly: 385, fs: 9,
  },
  // ── MANDALUYONG (pink, center) ──
  {
    id: 'mandaluyong', name: 'Mandaluyong', district: 'd2',
    fill: '#E91E63', hover: '#F48FB1',
    path: `M 218,410 L 248,410 L 268,408 L 295,412 L 318,422
           L 328,442 L 325,462 L 308,478 L 282,482 L 255,478
           L 232,468 L 218,450 L 215,430 Z`,
    lx: 272, ly: 445, fs: 9,
  },
  // ── PASIG (hot pink, center-east) ──
  {
    id: 'pasig', name: 'Pasig', district: 'd2',
    fill: '#EC407A', hover: '#F8BBD0',
    path: `M 328,398 L 340,385 L 362,378 L 382,392 L 396,400
           L 418,395 L 435,408 L 448,432 L 450,462 L 442,495
           L 425,518 L 402,528 L 378,525 L 355,515 L 335,498
           L 320,482 L 318,468 L 325,462 L 328,442 L 318,422 Z`,
    lx: 385, ly: 458,
  },
  // ── MAKATI (blue/teal, center-south) ──
  {
    id: 'makati', name: 'Makati', district: 'd4',
    fill: '#1565C0', hover: '#42A5F5',
    path: `M 170,472 L 195,465 L 218,462 L 238,468 L 258,475
           L 282,482 L 308,478 L 318,492 L 312,518 L 298,542
           L 275,558 L 248,565 L 222,562 L 198,548 L 180,528
           L 172,502 Z`,
    lx: 245, ly: 518,
  },
  // ── PATEROS (dark olive, tiny) ──
  {
    id: 'pateros', name: 'Pateros', district: 'd4',
    fill: '#5D4037', hover: '#795548',
    path: `M 320,482 L 335,498 L 355,515 L 372,520 L 368,540
           L 350,548 L 328,542 L 315,528 L 312,518 L 318,492 Z`,
    lx: 340, ly: 518, fs: 9,
  },
  // ── PASAY (orange, south-west coast) ──
  {
    id: 'pasay', name: 'Pasay', district: 'd4',
    fill: '#EF6C00', hover: '#FB8C00',
    path: `M 88,492 L 112,488 L 128,488 L 152,482 L 170,478
           L 172,502 L 178,528 L 172,558 L 152,575 L 125,580
           L 98,575 L 78,558 L 68,535 L 72,508 Z`,
    lx: 125, ly: 535, fs: 10,
  },
  // ── TAGUIG (olive green, large south-center) ──
  {
    id: 'taguig', name: 'Taguig', district: 'd4',
    fill: '#558B2F', hover: '#7CB342',
    path: `M 275,558 L 298,542 L 328,542 L 350,548 L 368,540
           L 385,548 L 405,572 L 415,605 L 410,645 L 398,678
           L 380,702 L 355,712 L 325,708 L 295,698 L 272,678
           L 258,652 L 255,620 L 260,588 L 268,568 Z`,
    lx: 338, ly: 635,
  },
  // ── PARAÑAQUE (yellow/gold) ──
  {
    id: 'paranaque', name: 'Parañaque', district: 'd4',
    fill: '#F9A825', hover: '#FDD835',
    path: `M 115,582 L 148,575 L 172,562 L 198,568 L 228,575
           L 255,590 L 258,625 L 255,658 L 242,688 L 218,702
           L 188,708 L 155,702 L 128,688 L 112,665 L 105,638
           L 108,608 Z`,
    lx: 185, ly: 642,
  },
  // ── LAS PIÑAS (lime green, southwest) ──
  {
    id: 'las-pinas', name: 'Las Piñas', district: 'd4',
    fill: '#7CB342', hover: '#9CCC65',
    path: `M 72,692 L 105,678 L 128,688 L 155,702 L 185,715
           L 198,742 L 192,772 L 172,792 L 142,798 L 112,792
           L 85,778 L 72,752 L 65,722 Z`,
    lx: 135, ly: 745,
  },
  // ── MUNTINLUPA (dark green, southernmost) ──
  {
    id: 'muntinlupa', name: 'Muntinlupa', district: 'd4',
    fill: '#2E7D32', hover: '#43A047',
    path: `M 185,715 L 218,702 L 242,695 L 272,698 L 305,708
           L 335,718 L 350,745 L 348,778 L 335,812 L 312,842
           L 282,860 L 248,865 L 218,858 L 195,842 L 182,812
           L 178,778 L 182,748 Z`,
    lx: 268, ly: 790,
  },
] as const;

export function MetroManilaMap({ onDistrictClick }: MetroManilaMapProps) {
  const [hovered, setHovered] = useState<string | null>(null);

  return (
    <div style={{ position: 'relative', width: '100%' }}>
      <svg
        viewBox="0 0 500 920"
        style={{
          width: '100%',
          height: 'auto',
          cursor: 'pointer',
          background: '#64B5F6',
          borderRadius: 12,
          display: 'block',
        }}
        aria-label="Interactive Metro Manila Geographic Map"
      >
        {/* ── Water bodies ── */}
        {/* Laguna de Bay (southeast) */}
        <ellipse cx="430" cy="720" rx="80" ry="160" fill="#64B5F6" opacity="0.95" />
        <ellipse cx="420" cy="710" rx="60" ry="120" fill="#90CAF9" opacity="0.4" />

        {/* ── Province / water labels ── */}
        <text x="80" y="18" fill="#fff" fontSize="14" fontWeight="800" opacity="0.85">BULACAN</text>

        <text x="478" y="300" fill="#fff" fontSize="14" fontWeight="800" opacity="0.85"
          transform="rotate(90,478,300)">RIZAL</text>

        <text x="12" y="495" fill="#fff" fontSize="13" fontWeight="800" opacity="0.85"
          transform="rotate(-90,12,495)">MANILA BAY</text>

        <text x="28" y="860" fill="#fff" fontSize="12" fontWeight="800" opacity="0.85">CAVITE</text>

        <text x="420" y="815" fill="#fff" fontSize="11" fontWeight="700" opacity="0.8" textAnchor="middle">LAGUNA</text>
        <text x="420" y="833" fill="#fff" fontSize="11" fontWeight="700" opacity="0.8" textAnchor="middle">LAKE</text>

        <text x="248" y="910" fill="#fff" fontSize="14" fontWeight="800" opacity="0.85" textAnchor="middle">LAGUNA</text>

        {/* ── City polygons ── */}
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
                stroke="rgba(255,255,255,0.9)"
                strokeWidth={1.8}
                style={{
                  transition: 'fill 120ms ease, filter 120ms ease',
                  filter: isHov
                    ? 'brightness(1.15) drop-shadow(0 2px 6px rgba(0,0,0,0.35))'
                    : 'none',
                }}
              />
              <text
                x={c.lx}
                y={c.ly}
                fill="#fff"
                fontSize={'fs' in c ? (c as any).fs : 11}
                fontWeight="700"
                textAnchor="middle"
                dominantBaseline="central"
                style={{ pointerEvents: 'none', textShadow: '0 1px 3px rgba(0,0,0,0.5)' }}
              >
                {c.name}
              </text>
            </g>
          );
        })}

        {/* ── Tooltip ── */}
        {hovered && (() => {
          const city = CITY_DEFS.find(c => c.id === hovered);
          if (!city) return null;
          const tx = city.lx;
          const ty = city.ly - 22;
          return (
            <g style={{ pointerEvents: 'none' }}>
              <rect
                x={tx - 50} y={ty - 12}
                width={100} height={24}
                rx={6}
                fill="rgba(0,0,0,0.8)"
              />
              <text
                x={tx} y={ty + 2}
                fill="#fff" fontSize="10" fontWeight="600"
                textAnchor="middle" dominantBaseline="central"
              >
                {city.name} — Click to explore
              </text>
            </g>
          );
        })()}
      </svg>
    </div>
  );
}
