import { useState } from 'react';

interface TrainSchematicMapProps {
  onStationClick?: (stationName: string, lineId: string) => void;
}

// ─────────────────────────────────────────────────────────────────────────────
// SVG viewBox: 0 0 700 900
// Based on: official "Kalakhang Maynila / Greater Manila Transit Map (Dec 2017)"
//
// LINE ROUTING (from reference image):
//   LRT-1 (Green/Yellow):  vertical line, left side, N-S
//   LRT-2 (Purple/Blue):   east-west horizontal line through middle
//   MRT-3 (Yellow):        diagonal/curved EDSA line N-S
//   PNR:                   left-of-LRT-1 commuter rail
//   MRT-7 (dotted):        north of North Ave stub
//   LRT-2 extension:       east to Antipolo (dashed)
// ─────────────────────────────────────────────────────────────────────────────

export interface StationDef {
  name: string;
  x: number;
  y: number;
  isInterchange?: boolean;
  isTerminal?: boolean;
  isUnderConst?: boolean;
  isDashed?: boolean;
  lineId: string;
  labelSide?: 'left' | 'right' | 'above' | 'below';
  labelOffset?: [number, number];
}

// ─── LINE CONFIG ──────────────────────────────────────────────────────────────
const LINE_CFG: Record<string, { color: string; width: number; dash?: string }> = {
  lrt1:  { color: '#00A651', width: 5 },          // Green
  lrt2:  { color: '#8B1A8B', width: 5 },          // Purple
  mrt3:  { color: '#E6B800', width: 5 },          // Yellow/Gold
  pnr:   { color: '#CC0000', width: 3.5, dash: '6,3' }, // Red dashed
  mrt7:  { color: '#00A651', width: 3, dash: '5,3' },   // Green stub UC
  lrt2e: { color: '#8B1A8B', width: 3.5, dash: '5,3' }, // Purple dashed ext
};

// ─── LRT-1 STATIONS (Green line, runs vertically on left) ────────────────────
// x=130, y=140 (Roosevelt, North terminal) → y=760 (Niog extension south)
// ~22 operational + 8 Cavite extension
const LRT1: StationDef[] = [
  // North → South (operational)
  { name: 'FERNANDO POE JR.\n(Roosevelt)', x: 130, y: 140, isTerminal: true, lineId: 'lrt1', labelSide: 'left' },
  { name: 'BALINTAWAK',      x: 130, y: 170, lineId: 'lrt1', labelSide: 'left' },
  { name: 'MONUMENTO',       x: 130, y: 203, lineId: 'lrt1', labelSide: 'left' },
  { name: '5th AVENUE',      x: 130, y: 233, lineId: 'lrt1', labelSide: 'left' },
  { name: 'R. PAPA',         x: 130, y: 263, lineId: 'lrt1', labelSide: 'left' },
  { name: 'ABAD SANTOS',     x: 130, y: 293, lineId: 'lrt1', labelSide: 'left' },
  { name: 'BLUMENTRITT',     x: 130, y: 323, lineId: 'lrt1', isInterchange: true, labelSide: 'left' }, // PNR interchange
  { name: 'TAYUMAN',         x: 130, y: 353, lineId: 'lrt1', labelSide: 'left' },
  { name: 'BAMBANG',         x: 130, y: 383, lineId: 'lrt1', labelSide: 'left' },
  { name: 'DOROTEO JOSE',    x: 130, y: 413, lineId: 'lrt1', isInterchange: true, labelSide: 'left' }, // ← LRT-2
  { name: 'CARRIEDO',        x: 130, y: 443, lineId: 'lrt1', labelSide: 'left' },
  { name: 'CENTRAL TERMINAL',x: 130, y: 473, lineId: 'lrt1', labelSide: 'left' },
  { name: 'UNITED NATIONS',  x: 130, y: 503, lineId: 'lrt1', labelSide: 'left' },
  { name: 'PEDRO GIL',       x: 130, y: 533, lineId: 'lrt1', labelSide: 'left' },
  { name: 'QUIRINO',         x: 130, y: 563, lineId: 'lrt1', labelSide: 'left' },
  { name: 'VITO CRUZ',       x: 130, y: 593, lineId: 'lrt1', labelSide: 'left' },
  { name: 'GIL PUYAT',       x: 130, y: 623, lineId: 'lrt1', labelSide: 'left' },
  { name: 'LIBERTAD',        x: 130, y: 653, lineId: 'lrt1', labelSide: 'left' },
  { name: 'EDSA',            x: 130, y: 683, lineId: 'lrt1', labelSide: 'left' },
  { name: 'PASAY ROTUNDA',   x: 130, y: 710, lineId: 'lrt1', isInterchange: true, labelSide: 'left' }, // TAFT / MRT-3
  { name: 'BACLARAN',        x: 130, y: 740, isTerminal: true, lineId: 'lrt1', labelSide: 'left' },
  // Cavite Extension (dashed, under construction)
  { name: 'ASEANA',          x: 130, y: 768, isDashed: true, lineId: 'lrt1', labelSide: 'left' },
  { name: 'MALL OF ASIA',    x: 120, y: 796, isDashed: true, lineId: 'lrt1', labelSide: 'left' },
  { name: 'FIVE STAR',       x: 108, y: 822, isDashed: true, lineId: 'lrt1', labelSide: 'left' },
  { name: 'NAIA TERMINAL 3', x: 96,  y: 846, isDashed: true, lineId: 'lrt1', labelSide: 'left' },
  { name: 'NICHOLS',         x: 180, y: 796, isDashed: true, lineId: 'lrt1', labelSide: 'right' },
  { name: 'BICUTAN',         x: 180, y: 826, isDashed: true, lineId: 'lrt1', labelSide: 'right' },
  { name: 'SUCAT',           x: 200, y: 856, isDashed: true, lineId: 'lrt1', labelSide: 'right' },
  { name: 'ALABANG',         x: 220, y: 880, isDashed: true, isTerminal: true, lineId: 'lrt1', labelSide: 'right' },
];

// ─── LRT-2 STATIONS (Purple, runs east-west) ─────────────────────────────────
// Recto at (130, 413) connecting at DOROTEO JOSE level → east → Santolan/Antipolo
const LRT2: StationDef[] = [
  { name: 'RECTO',              x: 130, y: 413, isInterchange: true, lineId: 'lrt2', labelSide: 'above' }, // = Doroteo Jose LRT-1
  { name: 'LEGARDA',            x: 172, y: 413, lineId: 'lrt2', labelSide: 'above' },
  { name: 'PUREZA',             x: 212, y: 413, lineId: 'lrt2', labelSide: 'above' },
  { name: 'V. MAPA',            x: 252, y: 413, lineId: 'lrt2', labelSide: 'above' },
  { name: 'J. RUIZ',            x: 290, y: 413, lineId: 'lrt2', labelSide: 'above' },
  { name: 'GILMORE',            x: 328, y: 413, lineId: 'lrt2', labelSide: 'above' },
  { name: 'BETTY GO-BELMONTE',  x: 365, y: 413, lineId: 'lrt2', labelSide: 'above' },
  { name: 'ARANETA CENTER\n-CUBAO', x: 404, y: 413, isInterchange: true, lineId: 'lrt2', labelSide: 'above' }, // ← MRT-3
  { name: 'ANONAS',             x: 443, y: 413, lineId: 'lrt2', labelSide: 'above' },
  { name: 'KATIPUNAN',          x: 481, y: 413, lineId: 'lrt2', labelSide: 'above' },
  { name: 'SANTOLAN',           x: 518, y: 413, isTerminal: true, lineId: 'lrt2', labelSide: 'above' },
  // Extension (dashed) to Marikina-Pasig and Antipolo
  { name: 'MARIKINA-PASIG',     x: 557, y: 413, isDashed: true, lineId: 'lrt2e', labelSide: 'above' },
  { name: 'ANTIPOLO',           x: 596, y: 413, isDashed: true, isTerminal: true, lineId: 'lrt2e', labelSide: 'above' },
];

// ─── MRT-3 STATIONS (Yellow, EDSA diagonal) ──────────────────────────────────
// North Ave (top, right of LRT-1) → diagonal south → Taft Ave (connects LRT-1)
// Reference: runs along EDSA in a rough diagonal
//   North Ave = (344, 193) → follows EDSA → Taft = (199, 710)
const MRT3_COORDS: [number, number, string, boolean, boolean][] = [
  // x, y, name, isInterchange, isTerminal
  [344, 193, 'NORTH AVENUE',           false, true],
  [362, 243, 'QUEZON AVENUE',          false, false],
  [380, 293, 'GMA-KAMUNING',           false, false],
  [398, 343, 'ARANETA CENTER-CUBAO',   true,  false], // LRT-2
  [390, 383, 'SANTOLAN-ANNAPOLIS',     false, false],
  [378, 423, 'ORTIGAS',               false, false],
  [362, 463, 'SHAW BOULEVARD',         false, false],
  [344, 503, 'BONI',                   false, false],
  [322, 543, 'GUADALUPE',             true,  false], // Pasig river
  [300, 583, 'BUENDIA',               false, false],
  [272, 623, 'AYALA',                 false, false],
  [244, 663, 'MAGALLANES',            false, false],
  [216, 710, 'TAFT AVENUE',           true,  true],  // LRT-1
];
const MRT3: StationDef[] = MRT3_COORDS.map(([x, y, name, isInterchange, isTerminal]) => ({
  name, x, y, isInterchange, isTerminal, lineId: 'mrt3',
  labelSide: x > 300 ? 'right' : 'left' as 'left' | 'right',
}));

// ─── PNR STATIONS (Red commuter, runs near LRT-1 but further left) ────────────
const PNR: StationDef[] = [
  { name: 'CALOOCAN',     x: 80,  y: 193, isTerminal: true, lineId: 'pnr', labelSide: 'left' },
  { name: 'SOLIS',        x: 80,  y: 253, lineId: 'pnr', labelSide: 'left' },
  { name: 'TUTUBAN',      x: 80,  y: 323, isInterchange: true, lineId: 'pnr', labelSide: 'left' }, // Manila PNR hub
  { name: 'ESPANA',       x: 80,  y: 383, lineId: 'pnr', labelSide: 'left' },
  { name: 'PANDACAN',     x: 80,  y: 443, lineId: 'pnr', labelSide: 'left' },
  { name: 'PACO',         x: 80,  y: 503, lineId: 'pnr', labelSide: 'left' },
  { name: 'BUENDIA (PNR)',x: 80,  y: 563, lineId: 'pnr', labelSide: 'left' },
  { name: 'VITO CRUZ (PNR)',x: 80,y: 623, lineId: 'pnr', labelSide: 'left' },
  { name: 'NICHOLS',      x: 80,  y: 683, lineId: 'pnr', labelSide: 'left' },
  { name: 'FTI',          x: 80,  y: 743, lineId: 'pnr', labelSide: 'left' },
  { name: 'BICUTAN',      x: 80,  y: 803, lineId: 'pnr', labelSide: 'left' },
  { name: 'SUCAT',        x: 80,  y: 843, lineId: 'pnr', labelSide: 'left' },
  { name: 'ALABANG',      x: 80,  y: 883, isTerminal: true, lineId: 'pnr', labelSide: 'left' },
];

// ─── MRT-7 (stub, north of North Ave, under construction) ────────────────────
const MRT7: StationDef[] = [
  { name: 'NORTH AVENUE\n(Common Station)', x: 344, y: 193, isInterchange: true, lineId: 'mrt7' },
  { name: 'UNIVERSITY AVENUE',              x: 380, y: 160, isUnderConst: true, lineId: 'mrt7', labelSide: 'right' },
  { name: 'QUEZON MEMORIAL CIRCLE',         x: 415, y: 128, isUnderConst: true, lineId: 'mrt7', labelSide: 'right' },
];

// ─── Component ────────────────────────────────────────────────────────────────
export function TrainSchematicMap({ onStationClick }: TrainSchematicMapProps) {
  const [hovered, setHovered] = useState<StationDef | null>(null);
  const [selected, setSelected] = useState<StationDef | null>(null);

  const handleClick = (s: StationDef) => {
    setSelected(s);
    onStationClick?.(s.name.replace('\n', ' '), s.lineId);
  };

  const renderStation = (s: StationDef, index: number) => {
    const cfg = LINE_CFG[s.lineId];
    const isHov = hovered?.name === s.name && hovered?.lineId === s.lineId;
    const isSel = selected?.name === s.name && selected?.lineId === s.lineId;
    const r = s.isInterchange ? 9 : s.isTerminal ? 7 : 5;
    const fillColor = isSel ? cfg.color : '#fff';

    return (
      <g
        key={`${s.lineId}-${index}`}
        onMouseEnter={() => setHovered(s)}
        onMouseLeave={() => setHovered(null)}
        onClick={() => handleClick(s)}
        style={{ cursor: 'pointer' }}
      >
        {(isHov || isSel) && (
          <circle cx={s.x} cy={s.y} r={r + 6} fill={cfg.color} opacity={0.2} />
        )}
        {s.isInterchange && (
          <circle cx={s.x} cy={s.y} r={r + 3} fill="none" stroke={cfg.color} strokeWidth={1.5} opacity={0.4} />
        )}
        <circle
          cx={s.x} cy={s.y} r={r}
          fill={fillColor}
          stroke={s.isDashed ? '#999' : cfg.color}
          strokeWidth={s.isInterchange ? 3 : 2.5}
          style={{ transition: 'all 80ms' }}
        />
        {s.isInterchange && !isSel && (
          <circle cx={s.x} cy={s.y} r={3} fill={cfg.color} />
        )}
      </g>
    );
  };

  const renderLabel = (s: StationDef, index: number) => {
    const cfg = LINE_CFG[s.lineId];
    const isKey = s.isTerminal || s.isInterchange;
    if (!isKey) return null;

    const [ox, oy] = s.labelOffset ?? [0, 0];
    let x = s.x + ox;
    let y = s.y + oy;
    let anchor = 'start';
    const lines = s.name.split('\n');

    if (s.labelSide === 'left') { x = s.x - 13; anchor = 'end'; y = s.y + 4; }
    else if (s.labelSide === 'right') { x = s.x + 13; anchor = 'start'; y = s.y + 4; }
    else if (s.labelSide === 'above') { x = s.x; y = s.y - 13; anchor = 'middle'; }
    else if (s.labelSide === 'below') { x = s.x; y = s.y + 20; anchor = 'middle'; }

    return (
      <text
        key={`lbl-${s.lineId}-${index}`}
        x={x} y={y}
        fontSize={s.isInterchange ? 8.5 : 7.5}
        fontWeight={s.isInterchange ? '800' : '700'}
        fill={cfg.color}
        textAnchor={anchor}
        style={{ pointerEvents: 'none', userSelect: 'none', fontFamily: "'Noto Sans', sans-serif" }}
        paintOrder="stroke"
        stroke="#fff"
        strokeWidth={2.5}
      >
        {lines.map((line, i) => (
          <tspan key={i} x={x} dy={i === 0 ? 0 : 10}>{line}</tspan>
        ))}
      </text>
    );
  };

  // Build line polylines
  const lrt1MainPts  = LRT1.filter(s => !s.isDashed).map(s => `${s.x},${s.y}`).join(' ');
  const lrt1ExtPts   = LRT1.filter(s => s.isDashed).map(s => `${s.x},${s.y}`).join(' ');
  const lrt2MainPts  = LRT2.filter(s => s.lineId === 'lrt2').map(s => `${s.x},${s.y}`).join(' ');
  const lrt2ExtPts   = LRT2.filter(s => s.lineId === 'lrt2e').map(s => `${LRT2.find(x => x.lineId === 'lrt2' && x.isTerminal)!.x},${LRT2.find(x => x.lineId === 'lrt2' && x.isTerminal)!.y} ${s.x},${s.y}`).join(' ');
  const mrt3Pts      = MRT3.map(s => `${s.x},${s.y}`).join(' ');
  const pnrPts       = PNR.map(s => `${s.x},${s.y}`).join(' ');
  const mrt7Pts      = MRT7.map(s => `${s.x},${s.y}`).join(' ');

  // Transfer connector line between LRT-1 TAFT and MRT-3 TAFT
  const lrt1Taft = LRT1.find(s => s.name === 'PASAY ROTUNDA')!;
  const mrt3Taft = MRT3.find(s => s.name === 'TAFT AVENUE')!;

  // Transfer connector between LRT-1 Doroteo Jose and LRT-2 Recto
  // They share the same point (x=130, y=413)

  return (
    <div style={{ position: 'relative', background: '#f8f9fc', borderRadius: 8, border: '1px solid #D0D0D0', overflow: 'hidden' }}>
      <svg
        viewBox="0 0 700 900"
        style={{ width: '100%', height: 'auto', display: 'block' }}
        aria-label="Greater Manila Transit Schematic Map"
      >
        {/* Background */}
        <rect width="700" height="900" fill="#f8f9fc" />

        {/* Title */}
        <text x="350" y="28" textAnchor="middle" fontSize="14" fontWeight="800" fill="#1A1A1A"
          style={{ fontFamily: "'Noto Sans', sans-serif" }}>
          Greater Manila Transit Map
        </text>

        {/* Subtle grid */}
        {[100,200,300,400,500,600].map(x => (
          <line key={`gx${x}`} x1={x} y1="0" x2={x} y2="900" stroke="#ececec" strokeWidth={1} />
        ))}
        {[100,200,300,400,500,600,700,800].map(y => (
          <line key={`gy${y}`} x1="0" y1={y} x2="700" y2={y} stroke="#ececec" strokeWidth={1} />
        ))}

        {/* Boundary labels */}
        <text x="350" y="55" textAnchor="middle" fontSize="10" fill="#8D6E63" fontWeight="700" opacity="0.7">BULACAN / NORTH</text>
        <text x="8" y="500" fontSize="10" fill="#0277BD" fontWeight="700" opacity="0.85"
          transform="rotate(-90,8,500)">MANILA BAY</text>
        <text x="350" y="895" textAnchor="middle" fontSize="10" fill="#8D6E63" fontWeight="700" opacity="0.7">LAGUNA PROVINCE</text>
        <text x="695" y="430" fontSize="10" fill="#8D6E63" fontWeight="700" opacity="0.7" textAnchor="end"
          transform="rotate(90,695,430)">RIZAL PROVINCE</text>

        {/* ── DRAW TRACKS (back to front order) ─────────────────────── */}

        {/* PNR (red, behind everything) */}
        <polyline points={pnrPts} fill="none"
          stroke={LINE_CFG.pnr.color} strokeWidth={LINE_CFG.pnr.width}
          strokeDasharray={LINE_CFG.pnr.dash}
          strokeLinecap="round" strokeLinejoin="round" opacity={0.85}
        />

        {/* MRT-7 stub (UC, dashed) */}
        <polyline points={mrt7Pts} fill="none"
          stroke={LINE_CFG.mrt7.color} strokeWidth={LINE_CFG.mrt7.width}
          strokeDasharray={LINE_CFG.mrt7.dash}
          strokeLinecap="round" strokeLinejoin="round" opacity={0.75}
        />

        {/* LRT-2 Main (purple, horizontal) */}
        <polyline points={lrt2MainPts} fill="none"
          stroke={LINE_CFG.lrt2.color} strokeWidth={LINE_CFG.lrt2.width}
          strokeLinecap="round" strokeLinejoin="round"
        />
        {/* LRT-2 Extension (dashed) */}
        <polyline points={`518,413 ${LRT2.filter(s => s.lineId === 'lrt2e').map(s => `${s.x},${s.y}`).join(' ')}`}
          fill="none"
          stroke={LINE_CFG.lrt2e.color} strokeWidth={LINE_CFG.lrt2e.width}
          strokeDasharray={LINE_CFG.lrt2e.dash}
          strokeLinecap="round" strokeLinejoin="round" opacity={0.8}
        />

        {/* MRT-3 (yellow diagonal) */}
        <polyline points={mrt3Pts} fill="none"
          stroke={LINE_CFG.mrt3.color} strokeWidth={LINE_CFG.mrt3.width}
          strokeLinecap="round" strokeLinejoin="round"
        />

        {/* LRT-1 Main (green, vertical) */}
        <polyline points={lrt1MainPts} fill="none"
          stroke={LINE_CFG.lrt1.color} strokeWidth={LINE_CFG.lrt1.width}
          strokeLinecap="round" strokeLinejoin="round"
        />
        {/* LRT-1 Extension (dashed, Cavite) */}
        <polyline points={`130,740 130,768 120,796 108,822 96,846`}
          fill="none"
          stroke={LINE_CFG.lrt1.color} strokeWidth={LINE_CFG.lrt1.width * 0.65}
          strokeDasharray="6,3"
          strokeLinecap="round" strokeLinejoin="round" opacity={0.7}
        />
        <polyline points={`130,740 180,796 180,826 200,856 220,880`}
          fill="none"
          stroke={LINE_CFG.lrt1.color} strokeWidth={LINE_CFG.lrt1.width * 0.65}
          strokeDasharray="6,3"
          strokeLinecap="round" strokeLinejoin="round" opacity={0.7}
        />

        {/* ── TRANSFER CONNECTORS ──────────────────────────────── */}
        {/* LRT-1 PASAY ROTUNDA ↔ MRT-3 TAFT AVE */}
        {lrt1Taft && mrt3Taft && (
          <line
            x1={lrt1Taft.x} y1={lrt1Taft.y}
            x2={mrt3Taft.x} y2={mrt3Taft.y}
            stroke="#555" strokeWidth={2} strokeDasharray="4,3" opacity={0.5}
          />
        )}

        {/* LRT-2 CUBAO ↔ MRT-3 CUBAO */}
        <line x1="404" y1="413" x2="398" y2="343"
          stroke="#555" strokeWidth={2} strokeDasharray="4,3" opacity={0.5}
        />

        {/* ── STATION DOTS ────────────────────────────────────── */}
        {PNR.map(renderStation)}
        {MRT7.map(renderStation)}
        {MRT3.map(renderStation)}
        {LRT2.map(renderStation)}
        {LRT1.map(renderStation)}

        {/* ── STATION LABELS (key stations only) ──────────────── */}
        {LRT1.map(renderLabel)}
        {LRT2.map(renderLabel)}
        {MRT3.map(renderLabel)}
        {PNR.slice(0, 3).map(renderLabel)} {/* Only show a few PNR labels */}

        {/* ── INTERCHANGE LABELS ─────────────────────────────── */}
        {/* LRT-2 × LRT-1: RECTO / DOROTEO JOSE */}
        <text x="116" y="413" textAnchor="end" fontSize="8" fontWeight="800" fill="#8B1A8B"
          paintOrder="stroke" stroke="#fff" strokeWidth={2}
          style={{ pointerEvents: 'none' }}>
          RECTO
        </text>
        <text x="116" y="425" textAnchor="end" fontSize="7" fontWeight="600" fill="#555"
          style={{ pointerEvents: 'none' }}>
          (LRT-1: Doroteo Jose)
        </text>

        {/* ── LINE LEGEND ──────────────────────────────────────── */}
        <g transform="translate(492, 52)">
          <rect x="0" y="0" width="200" height="165" rx="6" fill="#fff" stroke="#D0D0D0" strokeWidth="1.2"
            style={{ filter: 'drop-shadow(0 2px 6px rgba(0,0,0,0.08))' }}
          />
          <text x="100" y="18" textAnchor="middle" fontSize="10" fontWeight="800" fill="#1A1A1A"
            style={{ fontFamily: "'Noto Sans', sans-serif" }}>Transit Lines</text>
          {[
            { code: '1', name: 'LRT-1  Linyang Lawton', color: '#00A651', dash: undefined, op: true },
            { code: '2', name: 'LRT-2  Linyang Aurora', color: '#8B1A8B', dash: undefined, op: true },
            { code: '3', name: 'MRT-3  Linyang EDSA',   color: '#E6B800', dash: undefined, op: true },
            { code: 'P', name: 'PNR  Commuter Line',    color: '#CC0000', dash: '5,3', op: true },
            { code: '7', name: 'MRT-7',                 color: '#00A651', dash: '5,3', op: false },
          ].map((l, i) => (
            <g key={l.code} transform={`translate(10, ${28 + i * 27})`}>
              {/* Line code badge */}
              <rect x="0" y="-9" width="18" height="16" rx="3" fill={l.color} />
              <text x="9" y="3" textAnchor="middle" fontSize="9" fontWeight="800" fill="#fff">{l.code}</text>
              {/* Track sample */}
              <line x1="24" y1="-1" x2="56" y2="-1"
                stroke={l.color} strokeWidth="3.5"
                strokeDasharray={l.dash}
                strokeLinecap="round"
              />
              {/* Name */}
              <text x="62" y="3" fontSize="8.5" fill="#1A1A1A"
                style={{ fontFamily: "'Noto Sans', sans-serif" }}>{l.name}</text>
              {/* Status */}
              <text x="62" y="14" fontSize="7.5"
                fill={l.op ? '#388E3C' : '#E65100'}
                style={{ fontFamily: "'Noto Sans', sans-serif" }}>
                {l.op ? 'Operational' : 'Under Construction'}
              </text>
            </g>
          ))}
          {/* Interchange key */}
          <g transform="translate(10, 163)">
            <circle cx="9" cy="-5" r="7" fill="#fff" stroke="#555" strokeWidth="2" />
            <circle cx="9" cy="-5" r="2.5" fill="#555" />
            <text x="22" y="-1" fontSize="8" fill="#555"
              style={{ fontFamily: "'Noto Sans', sans-serif" }}>Transfer station</text>
          </g>
        </g>

        {/* ── HOVER TOOLTIP ───────────────────────────────────── */}
        {hovered && <HoverTooltip s={hovered} />}
      </svg>

      {/* Selected station bar */}
      {selected && (
        <div style={{
          padding: '8px 14px', borderTop: '2px solid #e0e0e0',
          background: '#fff',
          display: 'flex', alignItems: 'center', gap: 10,
        }}>
          <div style={{
            width: 12, height: 12, borderRadius: '50%', flexShrink: 0,
            background: LINE_CFG[selected.lineId]?.color ?? '#888',
            boxShadow: `0 0 0 2px white, 0 0 0 3px ${LINE_CFG[selected.lineId]?.color ?? '#888'}`,
          }} />
          <span style={{ fontSize: 12, fontWeight: 700, color: '#1A1A1A', flex: 1, fontFamily: "'Noto Sans', sans-serif" }}>
            {selected.name.replace('\n', ' ')}
          </span>
          <button
            onClick={() => onStationClick?.(selected.name.replace('\n', ' '), selected.lineId)}
            style={{
              background: '#1B5E20', color: '#fff', border: 'none',
              borderRadius: 5, padding: '5px 12px', fontSize: 11,
              cursor: 'pointer', fontWeight: 700, fontFamily: "'Noto Sans', sans-serif",
            }}
          >Find Jobs Near This Station →</button>
          <button
            onClick={() => setSelected(null)}
            style={{ background: 'none', border: 'none', color: '#9E9E9E', cursor: 'pointer', fontSize: 16 }}
          >✕</button>
        </div>
      )}
    </div>
  );
}

// ─── Hover Tooltip ────────────────────────────────────────────────────────────
function HoverTooltip({ s }: { s: StationDef }) {
  const cfg = LINE_CFG[s.lineId];
  const label = s.name.replace('\n', ' ');
  const w = Math.max(label.length * 6.2 + 24, 90);
  let tx = s.x + 14;
  let ty = s.y - 10;
  if (tx + w > 690) tx = s.x - w - 10;
  if (ty < 14) ty = s.y + 20;

  return (
    <g style={{ pointerEvents: 'none' }}>
      <rect x={tx - 4} y={ty - 15} width={w} height={24} rx={5}
        fill="rgba(15,15,15,0.92)" />
      <circle cx={tx + 8} cy={ty - 3} r={5} fill="none" stroke={cfg.color} strokeWidth={2} />
      <text x={tx + 18} y={ty + 2} fontSize="9.5" fontWeight="700" fill="#fff"
        style={{ fontFamily: "'Noto Sans', sans-serif" }}>{label}</text>
    </g>
  );
}
