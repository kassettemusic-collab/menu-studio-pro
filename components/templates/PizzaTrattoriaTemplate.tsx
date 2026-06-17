"use client";

import { t } from "@/utils/translation";
import { formatPrice } from "@/utils/price";
import { AllergenBadges, BackgroundLayer } from "./shared";
import type { TemplateProps } from "./types";
import { resolveTypography } from "@/types/template";
import type { Allergen } from "@/types/menu";

// ─── PALETA ──────────────────────────────────────────────────────────────────
const BG    = "#F5EDD6";
const DARK  = "#1A0D02";
const RED   = "#BF2F28";
const RED2  = "#8C1A14";
const GRN   = "#1A5C2C";
const GRN2  = "#2A6E38";
const GOLD  = "#C4952A";
const INK   = "#1E0E04";
const CREAM = "#FBF3DE";

const NOISE = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.72' numOctaves='4' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='300' height='300' filter='url(%23n)' opacity='0.05'/%3E%3C/svg%3E")`;

// ─── BANDERA ITALIANA — bloques con pincelada ─────────────────────────────────
function FlagBlocks() {
  return (
    <div aria-hidden style={{ position: "absolute", inset: 0, overflow: "hidden", pointerEvents: "none", zIndex: 0 }}>
      <svg width="100%" height="100%" viewBox="0 0 1000 1414" preserveAspectRatio="none"
        xmlns="http://www.w3.org/2000/svg" style={{ position: "absolute", inset: 0 }}>
        <defs>
          <filter id="brush-g" x="-10%" y="-10%" width="120%" height="120%">
            <feTurbulence type="turbulence" baseFrequency="0.015 0.025" numOctaves="6" seed="5" result="n"/>
            <feDisplacementMap in="SourceGraphic" in2="n" scale="32" xChannelSelector="R" yChannelSelector="G"/>
          </filter>
          <filter id="brush-r" x="-10%" y="-10%" width="120%" height="120%">
            <feTurbulence type="turbulence" baseFrequency="0.015 0.025" numOctaves="6" seed="11" result="n"/>
            <feDisplacementMap in="SourceGraphic" in2="n" scale="32" xChannelSelector="R" yChannelSelector="G"/>
          </filter>
        </defs>
        {/* VERDE — esquina superior izquierda */}
        <polygon points="0,0 520,0 0,720" fill={GRN}  opacity="0.88" filter="url(#brush-g)"/>
        <polygon points="0,0 380,0 0,520" fill={GRN2} opacity="0.30" filter="url(#brush-g)"/>
        {/* ROJO — esquina superior derecha */}
        <polygon points="1000,0 480,0 1000,720" fill={RED}  opacity="0.88" filter="url(#brush-r)"/>
        <polygon points="1000,0 620,0 1000,520" fill={RED2} opacity="0.30" filter="url(#brush-r)"/>
        {/* ROJO — esquina inferior derecha */}
        <polygon points="1000,900 800,900 1000,1414" fill={RED}  opacity="0.55" filter="url(#brush-r)"/>
      </svg>
    </div>
  );
}

// ─── MARCA DE AGUA — paisaje italiano ────────────────────────────────────────
function LandscapeWatermark() {
  return (
    <div aria-hidden style={{ position: "absolute", inset: 0, pointerEvents: "none", zIndex: 1, overflow: "hidden" }}>
      <svg width="100%" height="55%" viewBox="0 0 900 500" preserveAspectRatio="xMidYMax meet"
        xmlns="http://www.w3.org/2000/svg" style={{ position: "absolute", bottom: 0 }}>
        {/* Colinas fondo */}
        <path d="M0,420 Q80,340 180,380 Q260,410 340,350 Q420,290 520,330 Q600,360 680,310 Q760,260 860,290 Q920,305 900,420 Z"
          fill={INK} opacity="0.028"/>
        {/* Colinas medias */}
        <path d="M0,460 Q100,400 200,430 Q280,450 380,400 Q440,370 520,400 Q600,430 680,400 Q760,370 850,390 Q900,400 900,460 Z"
          fill={INK} opacity="0.022"/>
        {/* Edificio izquierda */}
        <rect x="90" y="370" width="42" height="60" fill={INK} opacity="0.030"/>
        <path d="M82,370 L111,338 L140,370 Z" fill={INK} opacity="0.030"/>
        <rect x="103" y="350" width="18" height="24" fill={INK} opacity="0.024"/>
        <path d="M103,350 L112,338 L121,350 Z" fill={INK} opacity="0.024"/>
        <rect x="108" y="388" width="14" height="42" fill={INK} opacity="0.020"/>
        {/* Ciprés izquierdo */}
        <path d="M185,370 C179,344 181,316 185,288 C189,316 191,344 185,370 Z" fill={INK} opacity="0.038"/>
        <path d="M185,290 C181,274 183,258 185,242 C187,258 189,274 185,290 Z" fill={INK} opacity="0.030"/>
        {/* Ciprés centro-izquierda */}
        <path d="M355,400 C350,378 352,354 355,330 C358,354 360,378 355,400 Z" fill={INK} opacity="0.032"/>
        {/* Casa centro */}
        <rect x="450" y="380" width="36" height="50" fill={INK} opacity="0.026"/>
        <path d="M444,380 L468,358 L492,380 Z" fill={INK} opacity="0.026"/>
        <rect x="457" y="396" width="12" height="34" fill={INK} opacity="0.020"/>
        {/* Ciprés derecho */}
        <path d="M620,380 C615,356 617,330 620,304 C623,330 625,356 620,380 Z" fill={INK} opacity="0.036"/>
        <path d="M620,306 C617,290 618,274 620,258 C622,274 623,290 620,306 Z" fill={INK} opacity="0.028"/>
        {/* Árboles fondo */}
        <ellipse cx="260" cy="390" rx="20" ry="34" fill={INK} opacity="0.022"/>
        <ellipse cx="290" cy="396" rx="15" ry="26" fill={INK} opacity="0.018"/>
        <ellipse cx="540" cy="388" rx="18" ry="30" fill={INK} opacity="0.022"/>
        <ellipse cx="566" cy="394" rx="14" ry="24" fill={INK} opacity="0.018"/>
      </svg>
    </div>
  );
}

// ─── ILUSTRACIONES ESTILO GRABADO ─────────────────────────────────────────────

// Tomates con albahaca (arriba izquierda)
function TomatoCluster({ w = 140, h = 160 }: { w?: number; h?: number }) {
  return (
    <svg width={w} height={h} viewBox="0 0 140 160" xmlns="http://www.w3.org/2000/svg" aria-hidden>
      {/* Tomate grande */}
      <circle cx="62" cy="105" r="46" fill="none" stroke={INK} strokeWidth="1.2" opacity="0.50"/>
      <circle cx="62" cy="105" r="46" fill={RED} opacity="0.78"/>
      <ellipse cx="46" cy="88" rx="16" ry="11" fill="rgba(255,255,255,0.18)"/>
      {/* Líneas de grabado */}
      <path d="M22,96 Q40,115 62,110 Q84,105 98,122" stroke={DARK} strokeWidth="0.5" fill="none" opacity="0.20"/>
      <path d="M20,110 Q38,128 62,122 Q86,116 100,134" stroke={DARK} strokeWidth="0.5" fill="none" opacity="0.15"/>
      {/* Cáliz */}
      <path d="M62,59 C52,42 36,39 33,50 C42,52 53,56 62,59Z" fill={GRN} opacity="0.90"/>
      <path d="M62,59 C72,42 88,39 91,50 C82,52 71,56 62,59Z" fill={GRN} opacity="0.90"/>
      <path d="M62,59 C59,40 54,30 48,31 C50,40 56,50 62,59Z" fill={GRN2}/>
      <path d="M62,59 C65,40 70,30 76,31 C74,40 68,50 62,59Z" fill={GRN2}/>
      <circle cx="62" cy="59" r="4" fill={GRN2}/>
      {/* Tomate pequeño */}
      <circle cx="104" cy="88" r="28" fill={RED} opacity="0.68"/>
      <circle cx="104" cy="88" r="28" fill="none" stroke={INK} strokeWidth="0.9" opacity="0.40"/>
      <path d="M104,60 C96,48 86,47 84,55 C90,57 97,60 104,60Z" fill={GRN} opacity="0.82"/>
      <path d="M104,60 C112,48 122,47 124,55 C118,57 111,60 104,60Z" fill={GRN} opacity="0.82"/>
      <circle cx="104" cy="60" r="3" fill={GRN2}/>
      {/* Albahaca */}
      <ellipse cx="30" cy="64" rx="12" ry="20" fill={GRN} opacity="0.78" transform="rotate(-38,30,64)"/>
      <path d="M30,48 Q21,64 30,76" stroke={GRN2} strokeWidth="0.9" fill="none"/>
      <ellipse cx="16" cy="76" rx="9" ry="15" fill={GRN2} opacity="0.68" transform="rotate(-52,16,76)"/>
      <ellipse cx="40" cy="50" rx="8" ry="13" fill={GRN} opacity="0.62" transform="rotate(-22,40,50)"/>
      {/* Olivas */}
      <circle cx="50" cy="130" r="7" fill={DARK} opacity="0.55"/>
      <ellipse cx="50" cy="130" rx="3" ry="4" fill="rgba(255,255,255,0.22)"/>
      <circle cx="70" cy="138" r="6" fill={DARK} opacity="0.50"/>
      <circle cx="85" cy="132" r="5" fill={DARK} opacity="0.45"/>
    </svg>
  );
}

// Ajo con ramas (arriba derecha, como en referencia)
function GarlicBranch({ w = 120, h = 140 }: { w?: number; h?: number }) {
  return (
    <svg width={w} height={h} viewBox="0 0 120 140" xmlns="http://www.w3.org/2000/svg" aria-hidden>
      {/* Bulbo de ajo */}
      <ellipse cx="60" cy="95" rx="38" ry="36" fill={CREAM} opacity="0.92"/>
      <ellipse cx="60" cy="95" rx="38" ry="36" fill="none" stroke={INK} strokeWidth="1.1" opacity="0.45"/>
      {/* Dientes */}
      <path d="M60,60 C52,62 45,72 44,82 C52,80 60,76 60,60Z" fill={CREAM} stroke={INK} strokeWidth="0.7" opacity="0.80"/>
      <path d="M60,60 C68,62 75,72 76,82 C68,80 60,76 60,60Z" fill={CREAM} stroke={INK} strokeWidth="0.7" opacity="0.80"/>
      <path d="M44,82 C38,76 36,90 40,100 C48,96 52,88 44,82Z" fill={CREAM} stroke={INK} strokeWidth="0.7" opacity="0.75"/>
      <path d="M76,82 C82,76 84,90 80,100 C72,96 68,88 76,82Z" fill={CREAM} stroke={INK} strokeWidth="0.7" opacity="0.75"/>
      <path d="M40,100 C36,110 40,122 50,126 C56,116 54,104 40,100Z" fill={CREAM} stroke={INK} strokeWidth="0.7" opacity="0.72"/>
      <path d="M80,100 C84,110 80,122 70,126 C64,116 66,104 80,100Z" fill={CREAM} stroke={INK} strokeWidth="0.7" opacity="0.72"/>
      <path d="M50,126 C52,132 60,134 68,132 C68,130 60,128 50,126Z" fill={CREAM} stroke={INK} strokeWidth="0.7" opacity="0.70"/>
      {/* Tallo */}
      <path d="M60,60 C58,44 56,32 54,18" stroke={INK} strokeWidth="1.4" fill="none" opacity="0.50"/>
      <path d="M60,60 C62,44 63,32 62,18" stroke={INK} strokeWidth="0.8" fill="none" opacity="0.30"/>
      {/* Hojitas */}
      <ellipse cx="46" cy="38" rx="9" ry="18" fill={GRN} opacity="0.68" transform="rotate(-30,46,38)"/>
      <ellipse cx="74" cy="34" rx="8" ry="16" fill={GRN2} opacity="0.62" transform="rotate(22,74,34)"/>
      <ellipse cx="56" cy="24" rx="7" ry="14" fill={GRN} opacity="0.58" transform="rotate(-8,56,24)"/>
      {/* Sombra base */}
      <ellipse cx="60" cy="130" rx="34" ry="7" fill={INK} opacity="0.08"/>
    </svg>
  );
}

// Pizza grande (abajo izquierda — protagonista)
function PizzaLarge({ w = 310, h = 290 }: { w?: number; h?: number }) {
  return (
    <svg width={w} height={h} viewBox="0 0 310 290" xmlns="http://www.w3.org/2000/svg" aria-hidden>
      <ellipse cx="155" cy="276" rx="134" ry="14" fill={INK} opacity="0.10"/>
      {/* Borde masa */}
      <circle cx="155" cy="148" r="136" fill="none" stroke={INK} strokeWidth="2" opacity="0.45"/>
      <circle cx="155" cy="148" r="136" fill="#CC9030" opacity="0.82"/>
      <circle cx="155" cy="148" r="118" fill="#C08020" opacity="0.70"/>
      {/* Salsa */}
      <circle cx="155" cy="148" r="112" fill={RED} opacity="0.68"/>
      {/* Mozzarella blobs */}
      {[
        [145,112,22,16], [108,134,18,14], [170,130,16,13], [130,158,20,15],
        [168,160,18,14], [100,162,16,13], [152,184,18,14], [185,144,15,12],
      ].map(([cx,cy,rx,ry],i) => (
        <ellipse key={i} cx={cx} cy={cy} rx={rx} ry={ry} fill={CREAM} opacity={0.88}/>
      ))}
      {/* Aceitunas */}
      {[[118,120],[160,108],[188,132],[96,148],[176,176],[130,178],[104,178]].map(([cx,cy],i) => (
        <g key={i}>
          <circle cx={cx} cy={cy} r="8" fill={DARK} opacity="0.70"/>
          <circle cx={cx} cy={cy} r="3.5" fill={CREAM} opacity="0.35"/>
        </g>
      ))}
      {/* Pimientos verdes */}
      {[[142,140,28],[162,148,-18],[120,156,40],[148,168,-30]].map(([cx,cy,r],i) => (
        <ellipse key={i} cx={cx} cy={cy} rx="5" ry="11" fill={GRN} opacity="0.78"
          transform={`rotate(${r},${cx},${cy})`}/>
      ))}
      {/* Albahaca */}
      <ellipse cx="158" cy="116" rx="12" ry="20" fill={GRN} opacity="0.82" transform="rotate(18,158,116)"/>
      <path d="M158,104 Q153,116 158,128" stroke={GRN2} strokeWidth="1" fill="none"/>
      <ellipse cx="143" cy="120" rx="10" ry="16" fill={GRN2} opacity="0.72" transform="rotate(-12,143,120)"/>
      <ellipse cx="170" cy="114" rx="9" ry="14" fill={GRN} opacity="0.68" transform="rotate(8,170,114)"/>
      {/* Líneas de corte */}
      <line x1="155" y1="12" x2="155" y2="284" stroke={INK} strokeWidth="0.8" opacity="0.15"/>
      <line x1="19" y1="148" x2="291" y2="148" stroke={INK} strokeWidth="0.8" opacity="0.15"/>
      <line x1="59" y1="52" x2="251" y2="244" stroke={INK} strokeWidth="0.7" opacity="0.12"/>
      <line x1="251" y1="52" x2="59" y2="244" stroke={INK} strokeWidth="0.7" opacity="0.12"/>
      {/* Contorno exterior */}
      <circle cx="155" cy="148" r="136" fill="none" stroke={INK} strokeWidth="2" opacity="0.45"/>
    </svg>
  );
}

// Plato de pasta con tenedor (derecha)
function PastaWithFork({ w = 190, h = 200 }: { w?: number; h?: number }) {
  return (
    <svg width={w} height={h} viewBox="0 0 190 200" xmlns="http://www.w3.org/2000/svg" aria-hidden>
      <ellipse cx="95" cy="190" rx="82" ry="12" fill={INK} opacity="0.09"/>
      {/* Plato exterior */}
      <ellipse cx="95" cy="148" rx="88" ry="36" fill="#EDE2C8"/>
      <ellipse cx="95" cy="148" rx="88" ry="36" fill="none" stroke={INK} strokeWidth="1.4" opacity="0.40"/>
      {/* Plato interior */}
      <ellipse cx="95" cy="144" rx="76" ry="30" fill={CREAM}/>
      <ellipse cx="95" cy="144" rx="76" ry="30" fill="none" stroke={INK} strokeWidth="0.7" opacity="0.25"/>
      {/* Nido de pasta */}
      <ellipse cx="95" cy="134" rx="58" ry="26" fill="#C99020" opacity="0.55"/>
      {/* Hebras spaghetti */}
      {[
        ["M42,126 Q60,112 78,120 Q96,128 114,116 Q130,104 144,114", 0.70],
        ["M40,134 Q58,120 76,128 Q94,136 112,124 Q128,112 142,122", 0.65],
        ["M42,142 Q60,128 78,136 Q96,144 114,132 Q130,120 142,130", 0.60],
        ["M44,150 Q62,136 80,144 Q98,152 114,140 Q130,128 140,138", 0.55],
        ["M40,118 Q58,104 76,112 Q94,120 112,108 Q128,96 140,106", 0.65],
      ].map(([d,op],i) => (
        <path key={i} d={d as string} stroke="#9E7010" strokeWidth="2.4" fill="none"
          opacity={op as number} strokeLinecap="round"/>
      ))}
      {/* Salsa roja */}
      <ellipse cx="95" cy="128" rx="32" ry="18" fill={RED} opacity="0.60"/>
      {/* Parmesano */}
      <ellipse cx="95" cy="124" rx="22" ry="12" fill={CREAM} opacity="0.70"/>
      {/* Albahaca */}
      <ellipse cx="92" cy="114" rx="9" ry="15" fill={GRN} opacity="0.82" transform="rotate(-22,92,114)"/>
      <path d="M92,105 Q88,114 92,124" stroke={GRN2} strokeWidth="1" fill="none"/>
      <ellipse cx="104" cy="112" rx="8" ry="12" fill={GRN2} opacity="0.72" transform="rotate(16,104,112)"/>
      {/* Tenedor */}
      <rect x="152" y="30" width="8" height="90" rx="4" fill={INK} opacity="0.48"/>
      <rect x="146" y="28" width="3.5" height="30" rx="1.8" fill={INK} opacity="0.48"/>
      <rect x="151" y="28" width="3.5" height="30" rx="1.8" fill={INK} opacity="0.48"/>
      <rect x="156" y="28" width="3.5" height="30" rx="1.8" fill={INK} opacity="0.48"/>
      <rect x="161" y="28" width="3.5" height="30" rx="1.8" fill={INK} opacity="0.48"/>
    </svg>
  );
}

// Botella de aceite de oliva (derecha)
function OliveOil({ w = 72, h = 176 }: { w?: number; h?: number }) {
  return (
    <svg width={w} height={h} viewBox="0 0 72 176" xmlns="http://www.w3.org/2000/svg" aria-hidden>
      <rect x="30" y="4" width="14" height="20" rx="3" fill="#6A4028"/>
      <path d="M30,24 L25,48 L48,48 L44,24Z" fill="#7A9050" opacity="0.90"/>
      <path d="M22,48 L10,72 L9,142 Q9,158 36,158 Q63,158 63,142 L62,72 L50,48Z"
        fill="#7A9050" opacity="0.86"/>
      <path d="M14,78 L12,140 Q12,154 36,154 Q60,154 60,140 L58,78Z" fill="#C8C020" opacity="0.60"/>
      <rect x="16" y="90" width="42" height="56" rx="4" fill={CREAM} opacity="0.94"/>
      <rect x="19" y="93" width="36" height="50" rx="3" fill="none" stroke={INK} strokeWidth="0.8" opacity="0.38"/>
      <line x1="19" y1="114" x2="55" y2="114" stroke={GOLD} strokeWidth="0.7" opacity="0.45"/>
      <text x="36" y="109" textAnchor="middle" fontFamily="Georgia,serif" fontSize="6.2" fontWeight="700"
        fill={INK} opacity="0.70" letterSpacing="0.5">OLIO</text>
      <text x="36" y="120" textAnchor="middle" fontFamily="Georgia,serif" fontSize="4.8"
        fill={INK} opacity="0.55" letterSpacing="0.3">EXTRA VERGINE</text>
      <text x="36" y="130" textAnchor="middle" fontFamily="Georgia,serif" fontSize="4.2"
        fill={GOLD} opacity="0.55" letterSpacing="0.2">DI OLIVA</text>
      <path d="M16,72 Q18,100 17,134" stroke="rgba(255,255,255,0.25)" strokeWidth="4"
        fill="none" strokeLinecap="round"/>
      <path d="M22,48 L10,72 L9,142 Q9,158 36,158 Q63,158 63,142 L62,72 L50,48Z"
        fill="none" stroke={INK} strokeWidth="1.4" opacity="0.42"/>
    </svg>
  );
}

// Tiramisú (abajo derecha)
function Tiramisu({ w = 156, h = 128 }: { w?: number; h?: number }) {
  return (
    <svg width={w} height={h} viewBox="0 0 156 128" xmlns="http://www.w3.org/2000/svg" aria-hidden>
      <ellipse cx="78" cy="118" rx="70" ry="12" fill={INK} opacity="0.09"/>
      <ellipse cx="78" cy="114" rx="70" ry="15" fill="#E8DECC" opacity="0.85"/>
      <ellipse cx="78" cy="114" rx="62" ry="12" fill={CREAM}/>
      <path d="M16,104 L16,56 Q16,46 78,46 Q140,46 140,56 L140,104Z" fill="#C8A030" opacity="0.82"/>
      <rect x="16" y="68" width="124" height="12" fill="#7A4010" opacity="0.44"/>
      <rect x="16" y="86" width="124" height="12" fill="#7A4010" opacity="0.38"/>
      <ellipse cx="78" cy="56" rx="62" ry="16" fill={CREAM} opacity="0.95"/>
      <ellipse cx="78" cy="56" rx="62" ry="16" fill="#3C2010" opacity="0.30"/>
      {[52,61,70,78,86,95,104].map((x,i) => (
        <line key={i} x1={x} y1="44" x2={x-9} y2="68" stroke="#2A1808" strokeWidth="0.6" opacity="0.20"/>
      ))}
      <path d="M16,104 L16,56 Q16,46 78,46 Q140,46 140,56 L140,104Z"
        fill="none" stroke={INK} strokeWidth="1.2" opacity="0.36"/>
      <ellipse cx="78" cy="56" rx="62" ry="16" fill="none" stroke={INK} strokeWidth="1" opacity="0.30"/>
      <ellipse cx="106" cy="50" rx="9" ry="14" fill={GRN} opacity="0.72" transform="rotate(22,106,50)"/>
      <path d="M106,42 Q103,50 106,60" stroke={GRN2} strokeWidth="0.9" fill="none"/>
    </svg>
  );
}

// ─── ELEMENTOS DECORATIVOS ────────────────────────────────────────────────────

// Sello circular "100% Italian Quality" (esquina sup. izquierda)
function Stamp100({ rotation = -12 }: { rotation?: number }) {
  return (
    <div aria-hidden style={{ transform: `rotate(${rotation}deg)`, width: 108, height: 108 }}>
      <svg width="108" height="108" viewBox="0 0 108 108" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <path id="st-arc" d="M54,54 m-44,0 a44,44 0 1,1 88,0 a44,44 0 1,1 -88,0"/>
          <filter id="st-ink">
            <feTurbulence type="turbulence" baseFrequency="0.05" numOctaves="3" result="n"/>
            <feDisplacementMap in="SourceGraphic" in2="n" scale="1.2" xChannelSelector="R" yChannelSelector="G"/>
          </filter>
        </defs>
        <circle cx="54" cy="54" r="52" fill={CREAM} opacity="0.96"/>
        <g filter="url(#st-ink)">
          <circle cx="54" cy="54" r="52" fill="none" stroke={DARK} strokeWidth="3"   strokeDasharray="3,1"   opacity="0.88"/>
          <circle cx="54" cy="54" r="44" fill="none" stroke={DARK} strokeWidth="1"   opacity="0.40"/>
          <circle cx="54" cy="54" r="36" fill="none" stroke={DARK} strokeWidth="1.5" strokeDasharray="2,0.8" opacity="0.50"/>
        </g>
        <text fontFamily="Georgia,serif" fontSize="7.5" fontWeight="700" letterSpacing="2"
          fill={DARK} opacity="0.88" textAnchor="middle">
          <textPath href="#st-arc" startOffset="8%">★ 100% ITALIAN ★ QUALITY ★</textPath>
        </text>
        <text x="54" y="49" textAnchor="middle" fontFamily="Georgia,serif" fontSize="19"
          fontWeight="700" fill={DARK} opacity="0.90">100%</text>
        <text x="54" y="62" textAnchor="middle" fontFamily="Georgia,serif" fontSize="10"
          fontWeight="700" letterSpacing="2.5" fill={DARK} opacity="0.85">ITALIAN</text>
        <text x="54" y="73" textAnchor="middle" fontFamily="Georgia,serif" fontSize="7"
          letterSpacing="1.5" fill={DARK} opacity="0.60">QUALITY</text>
        <text x="54" y="82" textAnchor="middle" fontFamily="Georgia,serif" fontSize="7"
          fill={DARK} opacity="0.45">★  ★  ★</text>
      </svg>
    </div>
  );
}

// Etiqueta kraft "Buon Appetito!" (esquina sup. derecha)
function KraftTag() {
  return (
    <div aria-hidden style={{ transform: "rotate(6deg)", width: 118, height: 142 }}>
      <svg width="118" height="142" viewBox="0 0 118 142" xmlns="http://www.w3.org/2000/svg">
        {/* Hilo */}
        <path d="M59,6 Q76,18 70,36" stroke="#9A7845" strokeWidth="1.8" fill="none" strokeLinecap="round"/>
        <circle cx="59" cy="6" r="3.8" fill={GOLD} opacity="0.68"/>
        {/* Tarjeta */}
        <rect x="6"  y="34" width="106" height="102" rx="5" fill="#E6CC96"/>
        <rect x="10" y="38" width="98"  height="94"  rx="4" fill="#F0DAAA"/>
        {/* Agujero */}
        <circle cx="59" cy="46" r="5.5" fill={GOLD} opacity="0.42"/>
        <circle cx="59" cy="46" r="3.2" fill="#E6CC96"/>
        {/* Línea decorativa */}
        <line x1="20" y1="60" x2="98" y2="60" stroke="#A89050" strokeWidth="0.7" opacity="0.35"/>
        <line x1="20" y1="62" x2="98" y2="62" stroke="#A89050" strokeWidth="0.3" opacity="0.22"/>
        {/* Textos */}
        <text x="59" y="83"  textAnchor="middle" fontFamily="Georgia,serif" fontStyle="italic"
          fontSize="19" fontWeight="700" fill={GRN}  opacity="0.88">Buon</text>
        <text x="59" y="105" textAnchor="middle" fontFamily="Georgia,serif" fontStyle="italic"
          fontSize="19" fontWeight="700" fill={RED}  opacity="0.88">Appetito!</text>
        {/* Corazón */}
        <path d="M59,114 C59,114 50,106 50,100 C50,97 53,95 56,97 C57,98 59,99 59,99 C59,99 61,98 62,97 C65,95 68,97 68,100 C68,106 59,114 59,114Z"
          fill={RED} opacity="0.70"/>
        {/* Borde tarjeta */}
        <rect x="6" y="34" width="106" height="102" rx="5" fill="none" stroke="#B09458" strokeWidth="1.1" opacity="0.50"/>
      </svg>
    </div>
  );
}

// Sello "Traditional Recipes" (entre columnas)
function RecipeStamp({ rotation = 5 }: { rotation?: number }) {
  return (
    <div aria-hidden style={{ transform: `rotate(${rotation}deg)`, width: 130, height: 130 }}>
      <svg width="130" height="130" viewBox="0 0 130 130" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <path id="rs-arc" d="M65,65 m-52,0 a52,52 0 1,1 104,0 a52,52 0 1,1 -104,0"/>
          <filter id="rs-ink">
            <feTurbulence type="turbulence" baseFrequency="0.05" numOctaves="3" result="n"/>
            <feDisplacementMap in="SourceGraphic" in2="n" scale="1.4" xChannelSelector="R" yChannelSelector="G"/>
          </filter>
        </defs>
        <circle cx="65" cy="65" r="62" fill={CREAM} opacity="0.95"/>
        <g filter="url(#rs-ink)">
          <circle cx="65" cy="65" r="62" fill="none" stroke={RED} strokeWidth="2.8" strokeDasharray="3,1.2" opacity="0.82"/>
          <circle cx="65" cy="65" r="54" fill="none" stroke={RED} strokeWidth="0.8" opacity="0.38"/>
          <circle cx="65" cy="65" r="44" fill="none" stroke={RED} strokeWidth="1.8" strokeDasharray="2,0.8" opacity="0.50"/>
        </g>
        <text fontFamily="Georgia,serif" fontSize="7.5" fontWeight="700" letterSpacing="2"
          fill={RED} opacity="0.80" textAnchor="middle">
          <textPath href="#rs-arc" startOffset="5%">✦ TRADITIONAL ✦ ITALIAN FOOD ✦</textPath>
        </text>
        <text x="65" y="55" textAnchor="middle" fontFamily="Georgia,serif" fontSize="8"
          letterSpacing="2.5" fill={RED} opacity="0.65" fontWeight="700">THE BEST</text>
        <text x="65" y="74" textAnchor="middle" fontFamily="Georgia,serif" fontSize="22"
          fontWeight="700" fontStyle="italic" fill={RED} opacity="0.88">Recipes</text>
        <path d="M45,82 C55,78 75,78 85,82" stroke={RED} strokeWidth="1" fill="none" opacity="0.50"/>
        <path d="M65,85 C62,90 60,95 61,99 C62,104 68,104 69,99 C70,95 68,90 65,85Z"
          fill={RED} opacity="0.62"/>
      </svg>
    </div>
  );
}

// Pizarra artesanal "Buoni Vini Buona Gente"
function ChalkboardSign() {
  return (
    <div style={{
      background: "#263322",
      borderRadius: "3px",
      padding: "0.9rem 1.6rem 1.1rem",
      position: "relative",
      boxShadow: "inset 0 0 0 3px rgba(255,255,255,0.06), 3px 4px 12px rgba(0,0,0,0.35)",
      width: "148px",
      border: `2px solid #1a2518`,
    }}>
      {/* Cinta adhesiva */}
      <div style={{ position: "absolute", top: "-10px", left: "18px", width: "36px", height: "14px",
        background: `${GOLD}40`, transform: "rotate(-3deg)", borderRadius: "2px" }}/>
      <div style={{ position: "absolute", top: "-10px", right: "18px", width: "28px", height: "14px",
        background: `${GOLD}40`, transform: "rotate(4deg)", borderRadius: "2px" }}/>
      {["Buoni", "Vini", "Buona", "Gente"].map((line, i) => (
        <p key={i} style={{
          fontFamily: `"Cormorant Garamond", Georgia, serif`,
          fontStyle: "italic",
          fontSize: i % 2 === 1 ? "1.55rem" : "1.20rem",
          fontWeight: i % 2 === 1 ? 700 : 400,
          color: "rgba(255,255,255,0.88)",
          margin: 0,
          lineHeight: 1.30,
          textAlign: "center",
          textShadow: "0 0 8px rgba(255,255,255,0.12)",
        }}>
          {line}
        </p>
      ))}
    </div>
  );
}

// ─── CABECERA PRINCIPAL ───────────────────────────────────────────────────────

function PosterHeader({ name, tagline }: { name: string; tagline?: string }) {
  // Dividir nombre en hasta 3 líneas
  const words = name.trim().split(/\s+/);
  let lines: string[];
  if (words.length === 1)      lines = [words[0]];
  else if (words.length === 2) lines = [words[0], words[1]];
  else                          lines = [words[0], words.slice(1, words.length - 1).join(" ") || words[1], words[words.length - 1]];

  const lineCount = lines.length;
  const svgH   = lineCount === 1 ? 170 : lineCount === 2 ? 295 : 390;
  const yBase  = lineCount === 1 ? [148] : lineCount === 2 ? [152, 282] : [130, 248, 362];
  const sizes  = lineCount === 1 ? [156] : lineCount === 2 ? [156, 120] : [128, 116, 94];
  const colors = lineCount === 1 ? [DARK] : lineCount === 2 ? [DARK, RED] : [DARK, RED, DARK];

  return (
    <div style={{ position: "relative", textAlign: "center", paddingTop: "0" }}>

      {/* SINCE 1984 */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "0.5rem",
        padding: "1.1rem 0 0.4rem" }}>
        <svg width="72" height="12" viewBox="0 0 72 12" xmlns="http://www.w3.org/2000/svg" aria-hidden>
          <path d="M0,6 Q18,1 36,6 Q54,11 72,6" stroke={INK} strokeWidth="0.9" fill="none" opacity="0.48"/>
          <circle cx="4"  cy="6" r="2" fill={INK} opacity="0.35"/>
          <circle cx="68" cy="6" r="2" fill={INK} opacity="0.35"/>
        </svg>
        <span style={{ fontFamily: `"Cormorant Garamond", Georgia, serif`,
          fontSize: "0.68rem", fontWeight: 700, letterSpacing: "0.42em",
          color: INK, opacity: 0.68, textTransform: "uppercase" }}>
          Since 1984
        </span>
        <svg width="72" height="12" viewBox="0 0 72 12" xmlns="http://www.w3.org/2000/svg" aria-hidden>
          <path d="M0,6 Q18,11 36,6 Q54,1 72,6" stroke={INK} strokeWidth="0.9" fill="none" opacity="0.48"/>
          <circle cx="4"  cy="6" r="2" fill={INK} opacity="0.35"/>
          <circle cx="68" cy="6" r="2" fill={INK} opacity="0.35"/>
        </svg>
      </div>

      {/* TÍTULO SVG full-width woodblock */}
      <div style={{ position: "relative", padding: "0 3%" }}>
        {/* Paisaje watermark detrás */}
        <LandscapeWatermark/>

        <svg width="100%" viewBox={`0 0 860 ${svgH}`} xmlns="http://www.w3.org/2000/svg"
          style={{ display: "block", position: "relative", zIndex: 2 }}>
          <defs>
            <filter id="lp">
              <feOffset dx="3" dy="4" result="sh"/>
              <feFlood floodColor={DARK} floodOpacity="0.15" result="c"/>
              <feComposite in="c" in2="sh" operator="in" result="sc"/>
              <feMerge><feMergeNode in="sc"/><feMergeNode in="SourceGraphic"/></feMerge>
            </filter>
          </defs>
          {lines.map((line, i) => (
            <text key={i}
              x="430" y={yBase[i]}
              textAnchor="middle"
              textLength="838"
              lengthAdjust="spacingAndGlyphs"
              fontFamily={`"Cormorant Garamond", Palatino, Georgia, serif`}
              fontWeight="700"
              fontSize={sizes[i]}
              fill={colors[i]}
              filter="url(#lp)"
            >
              {line.toUpperCase()}
            </text>
          ))}
        </svg>
      </div>

      {/* Fatto con Amore — verde con líneas */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "0.7rem",
        margin: "0.1rem 0 0.6rem", padding: "0 2rem" }}>
        <div style={{ flex: 1, height: "1px", background: `${INK}30` }}/>
        <span style={{ fontFamily: `"Cormorant Garamond", Georgia, serif`, fontStyle: "italic",
          fontSize: "2rem", color: GRN, lineHeight: 1, fontWeight: 500, letterSpacing: "0.015em",
          whiteSpace: "nowrap" }}>
          Fatto con Amore
        </span>
        <div style={{ flex: 1, height: "1px", background: `${INK}30` }}/>
      </div>

      {/* Ribbon banner — forma de cinta SVG */}
      <div style={{ display: "flex", justifyContent: "center", margin: "0 1rem 0.2rem" }}>
        <svg width="100%" viewBox="0 0 600 52" xmlns="http://www.w3.org/2000/svg" style={{ display: "block", maxWidth: "520px" }}>
          {/* Ribbon con extremos curvados/en V */}
          <path d="M0,8 C10,8 14,0 20,0 L580,0 C586,0 590,8 600,8 L600,44 C590,44 586,52 580,52 L20,52 C14,52 10,44 0,44 Z"
            fill={DARK}/>
          {/* Brillos */}
          <path d="M0,8 C10,8 14,0 20,0 L580,0 C586,0 590,8 600,8 L600,24 L0,24Z"
            fill="rgba(255,255,255,0.06)"/>
          <text x="300" y="33" textAnchor="middle"
            fontFamily={`"Cormorant Garamond", Georgia, serif`}
            fontSize="16" fontWeight="700" letterSpacing="4.5"
            fill="rgba(255,255,255,0.95)" dominantBaseline="middle">
            {(tagline || "AUTHENTIC ITALIAN FOOD").toUpperCase()}
          </text>
        </svg>
      </div>

      {/* Separador ornamental */}
      <div style={{ display: "flex", alignItems: "center", padding: "0.6rem 1.8rem 0.2rem" }}>
        <div style={{ flex: 1, height: "1px", background: `${INK}20` }}/>
        <svg width="28" height="28" viewBox="0 0 28 28" xmlns="http://www.w3.org/2000/svg" aria-hidden>
          <path d="M14,2 C14,2 8,8 2,8 C2,14 8,20 14,20 C20,20 26,14 26,8 C20,8 14,2 14,2Z"
            fill="none" stroke={GOLD} strokeWidth="0.9" opacity="0.55"/>
          <circle cx="14" cy="14" r="3" fill="none" stroke={GOLD} strokeWidth="0.9" opacity="0.40"/>
        </svg>
        <div style={{ flex: 1, height: "1px", background: `${INK}20` }}/>
      </div>
    </div>
  );
}

// ─── CABECERA DE CATEGORÍA ────────────────────────────────────────────────────

function CategoryHeader({ name, subtitle, color }: {
  name: string; subtitle?: string; color: string;
}) {
  return (
    <div style={{ marginBottom: "0.6rem" }}>
      {/* Nombre con hojas */}
      <div style={{ display: "flex", alignItems: "center", gap: "0.3rem", flexWrap: "wrap" }}>
        <svg width="30" height="26" viewBox="0 0 30 26" xmlns="http://www.w3.org/2000/svg" aria-hidden>
          <ellipse cx="9"  cy="15" rx="5" ry="10" fill={GRN}  opacity="0.65" transform="rotate(-28,9,15)"/>
          <ellipse cx="20" cy="11" rx="4.5" ry="9" fill={GRN2} opacity="0.58" transform="rotate(-8,20,11)"/>
          <path d="M2,15 Q15,8 28,15" stroke={GRN2} strokeWidth="0.8" fill="none" opacity="0.45"/>
        </svg>
        <h2 style={{
          fontFamily: `"Cormorant Garamond", Palatino, Georgia, serif`,
          fontSize: "clamp(2rem, 5.5vw, 3.4rem)",
          fontWeight: 700,
          fontStyle: "italic",
          color,
          lineHeight: 1,
          margin: 0,
          letterSpacing: "0.01em",
        }}>
          {name}
        </h2>
        <svg width="30" height="26" viewBox="0 0 30 26" xmlns="http://www.w3.org/2000/svg" aria-hidden
          style={{ transform: "scaleX(-1)" }}>
          <ellipse cx="9"  cy="15" rx="5" ry="10" fill={GRN}  opacity="0.65" transform="rotate(-28,9,15)"/>
          <ellipse cx="20" cy="11" rx="4.5" ry="9" fill={GRN2} opacity="0.58" transform="rotate(-8,20,11)"/>
          <path d="M2,15 Q15,8 28,15" stroke={GRN2} strokeWidth="0.8" fill="none" opacity="0.45"/>
        </svg>
      </div>
      {/* Subtítulo en rojo italic */}
      {subtitle && (
        <p style={{
          fontFamily: `"Cormorant Garamond", Georgia, serif`,
          fontStyle: "italic",
          fontSize: "1.05rem",
          color: RED,
          margin: "0.05rem 0 0.25rem 2px",
          opacity: 0.88,
          lineHeight: 1,
        }}>
          {subtitle}
        </p>
      )}
      {/* Línea separadora */}
      <div style={{ display: "flex", alignItems: "center", gap: "0.3rem", marginTop: "0.15rem" }}>
        <div style={{ flex: 1, height: "1px", background: `${color}35` }}/>
        <div style={{ width: "4px", height: "4px", background: color, opacity: 0.35, borderRadius: "50%" }}/>
        <div style={{ width: "22px", height: "1px", background: `${color}35` }}/>
      </div>
    </div>
  );
}

// ─── ITEM DE MENÚ ─────────────────────────────────────────────────────────────

function MenuItem({ name, description, price, currency, featured, allergens,
  showPrice, showDescription, isLast }: {
  name?: string; description?: string; price?: number; currency?: string;
  featured?: boolean; allergens?: Allergen[];
  showPrice: boolean; showDescription: boolean; isLast: boolean;
}) {
  return (
    <div style={{ marginBottom: isLast ? 0 : "0.72rem", paddingBottom: isLast ? 0 : "0.72rem",
      borderBottom: isLast ? "none" : `1px dotted ${INK}18` }}>
      <div style={{ display: "flex", alignItems: "baseline", gap: "0.3rem" }}>
        {featured && <span style={{ color: GOLD, fontSize: "0.68rem", flexShrink: 0, lineHeight: 1 }}>★</span>}
        <span style={{
          fontFamily: `"Cormorant Garamond", Georgia, serif`,
          fontSize: "0.78rem", fontWeight: 700,
          letterSpacing: "0.08em", textTransform: "uppercase",
          color: INK, flex: "0 1 auto", lineHeight: 1.25,
        }}>
          {name}
        </span>
        {showPrice && (
          <span style={{ flex: 1, borderBottom: `1.5px dotted ${INK}22`,
            marginBottom: "2px", minWidth: "0.6rem" }}/>
        )}
        {showPrice && price !== undefined && price > 0 && (
          <span style={{ fontFamily: `"Cormorant Garamond", Georgia, serif`,
            fontSize: "0.84rem", fontWeight: 700, color: INK, flexShrink: 0, lineHeight: 1.25 }}>
            {formatPrice(price, currency)}
          </span>
        )}
      </div>
      {showDescription && description && (
        <p style={{ fontFamily: `"Cormorant Garamond", Georgia, serif`,
          fontSize: "0.72rem", fontStyle: "italic", color: INK, opacity: 0.52,
          lineHeight: 1.45, margin: "0.1rem 0 0", paddingLeft: featured ? "0.9rem" : "0" }}>
          {description}
        </p>
      )}
      {allergens && allergens.length > 0 && (
        <AllergenBadges allergens={allergens} fontSize="0.48rem" opacity={0.34} marginTop="0.14rem"/>
      )}
    </div>
  );
}

// ─── ORNAMENTOS DE ESQUINA ────────────────────────────────────────────────────

function CornerOrnament({ flip = false }: { flip?: boolean }) {
  return (
    <svg width="50" height="50" viewBox="0 0 50 50" xmlns="http://www.w3.org/2000/svg" aria-hidden
      style={{ transform: flip ? "scaleX(-1)" : undefined }}>
      <path d="M4,4 L20,4 L20,6 L6,6 L6,20 L4,20 Z" fill={INK} opacity="0.30"/>
      <path d="M8,4 Q8,8 12,12 Q16,16 20,16" stroke={INK} strokeWidth="0.8" fill="none" opacity="0.28"/>
      <circle cx="8" cy="8" r="2.5" fill="none" stroke={INK} strokeWidth="0.8" opacity="0.28"/>
      <path d="M14,4 Q18,10 18,18" stroke={INK} strokeWidth="0.6" fill="none" opacity="0.20"/>
    </svg>
  );
}

// ─── DATOS DE CATEGORÍA ───────────────────────────────────────────────────────

const CAT_SUBTITLES: Record<number, string> = {
  0: "Starters",   1: "Homemade",    2: "From the oven",
  3: "Main Courses", 4: "Desserts",  5: "Grilled",
  6: "Seafood",    7: "Specials",
};
const CAT_COLORS = [GRN, RED, GRN, GRN, RED, GRN, RED, GRN];

// ─── PLANTILLA PRINCIPAL ──────────────────────────────────────────────────────

export function PizzaTrattoriaTemplate({ project, categories, design, lang }: TemplateProps) {
  const { restaurantInfo, branding, hero } = project;
  const { layout } = design;
  const typo = resolveTypography(design);

  const visible = categories
    .filter((c) => c.visible)
    .sort((a, b) => a.sortOrder - b.sortOrder)
    .filter((c) => c.items.filter((i) => i.available).length > 0);

  const heroTitle = (hero?.showHero && t(hero?.title, lang))
    ? t(hero!.title, lang)!
    : restaurantInfo.name;

  const mid   = Math.ceil(visible.length / 2);
  const left  = visible.slice(0, mid);
  const right = visible.slice(mid);

  return (
    <BackgroundLayer design={design} style={{
      color: INK,
      minHeight: "100%",
      position: "relative",
      background: `${NOISE}, linear-gradient(160deg, #FBF4DF 0%, ${BG} 45%, #EEE0BC 100%)`,
    }}>
      {/* Bandera italiana */}
      <FlagBlocks/>

      {/* Borde decorativo del póster */}
      <div style={{
        position: "absolute", inset: "10px", zIndex: 3, pointerEvents: "none",
        border: `1px solid ${INK}22`,
        boxShadow: `inset 0 0 0 3px ${INK}10`,
      }}/>

      {/* Contenido */}
      <div style={{ position: "relative", zIndex: 4 }}>

        {/* ── HEADER con sellos flotantes ── */}
        <div style={{ position: "relative" }}>
          {/* Ornamentos esquinas */}
          <div style={{ position: "absolute", top: "12px", left: "14px", zIndex: 10 }}>
            <CornerOrnament/>
          </div>
          <div style={{ position: "absolute", top: "12px", right: "14px", zIndex: 10 }}>
            <CornerOrnament flip/>
          </div>
          {/* Sello 100% Italian */}
          <div style={{ position: "absolute", top: "1.0rem", left: "1.0rem", zIndex: 10 }}>
            <Stamp100 rotation={-12}/>
          </div>
          {/* Etiqueta kraft */}
          <div style={{ position: "absolute", top: "0.6rem", right: "0.8rem", zIndex: 10 }}>
            <KraftTag/>
          </div>
          {/* Tomates arriba izquierda */}
          <div style={{ position: "absolute", top: "7rem", left: "-8px", zIndex: 2, opacity: 0.85 }}>
            <TomatoCluster w={130} h={148}/>
          </div>
          {/* Ajo / botella arriba derecha */}
          <div style={{ position: "absolute", top: "6.5rem", right: "-6px", zIndex: 2, opacity: 0.80 }}>
            <GarlicBranch w={110} h={128}/>
          </div>

          <PosterHeader name={heroTitle} tagline={restaurantInfo.tagline}/>
        </div>

        {/* ── 2 COLUMNAS DE CATEGORÍAS ── */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 0,
          padding: "0.3rem 1.6rem 0", position: "relative" }}>

          {/* Columna izquierda */}
          <div style={{ paddingRight: "1.2rem", borderRight: `1px solid ${INK}18`, position: "relative" }}>
            {left.map((cat, idx) => {
              const items = cat.items.filter((i) => i.available).sort((a, b) => a.sortOrder - b.sortOrder);
              return (
                <div key={cat.id} style={{ marginBottom: "1.4rem" }}>
                  <CategoryHeader
                    name={t(cat.name, lang) ?? ""}
                    subtitle={CAT_SUBTITLES[idx]}
                    color={CAT_COLORS[idx % CAT_COLORS.length]}
                  />
                  {items.map((item, i) => (
                    <MenuItem key={item.id}
                      name={t(item.name, lang)}
                      description={layout.showDescriptions ? t(item.description, lang) || undefined : undefined}
                      price={item.price} currency={item.currency}
                      featured={item.featured} allergens={item.allergens?.contains}
                      showPrice={layout.showPrices} showDescription={layout.showDescriptions}
                      isLast={i === items.length - 1}
                    />
                  ))}
                </div>
              );
            })}

            {/* Pizarra abajo-izquierda */}
            <div style={{ marginTop: "0.5rem", marginBottom: "0.5rem" }}>
              <ChalkboardSign/>
            </div>
          </div>

          {/* Columna derecha */}
          <div style={{ paddingLeft: "1.2rem", position: "relative" }}>
            {/* Botella aceite derecha */}
            <div style={{ position: "absolute", top: "0", right: "-4px", zIndex: 0, opacity: 0.78 }}>
              <OliveOil w={68} h={176}/>
            </div>

            {right.map((cat, idx) => {
              const gi = left.length + idx;
              const items = cat.items.filter((i) => i.available).sort((a, b) => a.sortOrder - b.sortOrder);
              return (
                <div key={cat.id} style={{ marginBottom: "1.4rem" }}>
                  <CategoryHeader
                    name={t(cat.name, lang) ?? ""}
                    subtitle={CAT_SUBTITLES[gi] ?? "Specialty"}
                    color={CAT_COLORS[gi % CAT_COLORS.length]}
                  />
                  {items.map((item, i) => (
                    <MenuItem key={item.id}
                      name={t(item.name, lang)}
                      description={layout.showDescriptions ? t(item.description, lang) || undefined : undefined}
                      price={item.price} currency={item.currency}
                      featured={item.featured} allergens={item.allergens?.contains}
                      showPrice={layout.showPrices} showDescription={layout.showDescriptions}
                      isLast={i === items.length - 1}
                    />
                  ))}
                </div>
              );
            })}

            {/* Sello Traditional Recipes — entre columnas, abajo derecha */}
            <div style={{ display: "flex", justifyContent: "flex-end", marginTop: "0.3rem", marginRight: "-1rem" }}>
              <RecipeStamp rotation={5}/>
            </div>
          </div>

          {/* Plato de pasta + tenedor — derecha, posición central */}
          <div style={{ position: "absolute", right: "-12px", top: "50%", transform: "translateY(-50%)",
            zIndex: 0, opacity: 0.82 }}>
            <PastaWithFork w={180} h={190}/>
          </div>
        </div>

        {/* ── PIE con pizza y tiramisu ── */}
        <div style={{ position: "relative", marginTop: "0.5rem", paddingBottom: "0.5rem" }}>
          {/* Pizza grande abajo izquierda */}
          <div style={{ position: "absolute", bottom: "-12px", left: "-18px", zIndex: 0, opacity: 0.88 }}>
            <PizzaLarge w={300} h={280}/>
          </div>
          {/* Tiramisu abajo derecha */}
          <div style={{ position: "absolute", bottom: "-8px", right: "-10px", zIndex: 0, opacity: 0.82 }}>
            <Tiramisu w={152} h={124}/>
          </div>

          {/* "GRAZIE E ARRIVEDERCI!" */}
          <div style={{ textAlign: "center", padding: "0.8rem 2rem 0.5rem", position: "relative", zIndex: 5 }}>
            <div style={{ display: "inline-flex", alignItems: "center", gap: "0.8rem",
              border: `1.5px solid ${INK}35`, padding: "0.42rem 2rem" }}>
              <div style={{ width: "6px", height: "6px", borderRadius: "50%",
                border: `1px solid ${INK}40`, opacity: 0.50 }}/>
              <span style={{
                fontFamily: `"Cormorant Garamond", Georgia, serif`,
                fontSize: "0.76rem", fontWeight: 700, letterSpacing: "0.30em",
                color: INK, opacity: 0.60, textTransform: "uppercase",
              }}>
                Grazie e Arrivederci!
              </span>
              <div style={{ width: "6px", height: "6px", borderRadius: "50%",
                border: `1px solid ${INK}40`, opacity: 0.50 }}/>
            </div>
          </div>

          {/* Footer social */}
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center",
            padding: "0.2rem 1.8rem 1.4rem", flexWrap: "wrap", gap: "0.3rem",
            position: "relative", zIndex: 5 }}>
            <span style={{ fontFamily: typo.bodyFont, fontSize: "0.60rem", color: INK, opacity: 0.40 }}>
              {restaurantInfo.socialLinks?.instagram ? `@ ${restaurantInfo.socialLinks.instagram.replace(/^@/, "")}` : ""}
            </span>
            <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
              {restaurantInfo.address && (
                <span style={{ fontFamily: typo.bodyFont, fontSize: "0.60rem", color: INK, opacity: 0.40 }}>
                  {restaurantInfo.address}
                </span>
              )}
              {restaurantInfo.phone && (
                <span style={{ fontFamily: typo.bodyFont, fontSize: "0.60rem", color: INK, opacity: 0.40 }}>
                  · {restaurantInfo.phone}
                </span>
              )}
            </div>
            <span style={{ fontFamily: typo.bodyFont, fontSize: "0.60rem", color: INK, opacity: 0.40 }}>
              {restaurantInfo.website ?? ""}
            </span>
          </div>
        </div>
      </div>
    </BackgroundLayer>
  );
}
