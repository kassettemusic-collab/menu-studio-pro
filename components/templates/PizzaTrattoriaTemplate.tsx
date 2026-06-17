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

const TITLE_FONT  = `"Ultra", "Alfa Slab One", "Playfair Display", Georgia, serif`;
const SCRIPT_FONT = `"Cormorant Garamond", Palatino, Georgia, serif`;
const BODY_FONT   = `"Cormorant Garamond", Georgia, serif`;

const NOISE = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.72' numOctaves='4' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='300' height='300' filter='url(%23n)' opacity='0.055'/%3E%3C/svg%3E")`;

// ─── BLOQUES BANDERA ──────────────────────────────────────────────────────────
function FlagBlocks() {
  return (
    <div aria-hidden style={{ position: "absolute", inset: 0, overflow: "hidden", pointerEvents: "none", zIndex: 0 }}>
      <svg width="100%" height="100%" viewBox="0 0 1000 1414" preserveAspectRatio="none"
        xmlns="http://www.w3.org/2000/svg" style={{ position: "absolute", inset: 0 }}>
        <defs>
          <filter id="bg" x="-12%" y="-12%" width="124%" height="124%">
            <feTurbulence type="turbulence" baseFrequency="0.012 0.022" numOctaves="7" seed="3" result="n"/>
            <feDisplacementMap in="SourceGraphic" in2="n" scale="36" xChannelSelector="R" yChannelSelector="G"/>
          </filter>
          <filter id="br" x="-12%" y="-12%" width="124%" height="124%">
            <feTurbulence type="turbulence" baseFrequency="0.012 0.022" numOctaves="7" seed="9" result="n"/>
            <feDisplacementMap in="SourceGraphic" in2="n" scale="36" xChannelSelector="R" yChannelSelector="G"/>
          </filter>
        </defs>
        <polygon points="0,0 560,0 0,780" fill={GRN}  opacity="0.92" filter="url(#bg)"/>
        <polygon points="0,0 400,0 0,560" fill={GRN2} opacity="0.32" filter="url(#bg)"/>
        <polygon points="1000,0 440,0 1000,780" fill={RED}  opacity="0.92" filter="url(#br)"/>
        <polygon points="1000,0 600,0 1000,560" fill={RED2} opacity="0.32" filter="url(#br)"/>
        <polygon points="1000,950 820,950 1000,1414" fill={RED} opacity="0.60" filter="url(#br)"/>
      </svg>
    </div>
  );
}

// ─── PAISAJE ITALIANO ─────────────────────────────────────────────────────────
function LandscapeWatermark() {
  return (
    <svg width="100%" height="100%" viewBox="0 0 900 420" preserveAspectRatio="xMidYMax meet"
      xmlns="http://www.w3.org/2000/svg" aria-hidden
      style={{ position: "absolute", bottom: 0, left: 0, right: 0, pointerEvents: "none" }}>
      <path d="M0,360 Q90,280 200,310 Q290,335 380,280 Q460,230 560,265 Q640,295 730,250 Q820,205 900,230 L900,420 L0,420Z"
        fill={INK} opacity="0.048"/>
      <path d="M0,390 Q110,340 220,365 Q310,382 410,345 Q480,320 560,345 Q650,372 740,345 Q820,320 900,340 L900,420 L0,420Z"
        fill={INK} opacity="0.038"/>
      <rect x="80"  y="320" width="52" height="76" fill={INK} opacity="0.052"/>
      <path d="M72,320 L106,282 L140,320Z" fill={INK} opacity="0.052"/>
      <rect x="98"  y="296" width="20" height="28" fill={INK} opacity="0.042"/>
      <path d="M98,296 L108,282 L118,296Z" fill={INK} opacity="0.042"/>
      <rect x="102" y="352" width="16" height="44" fill={INK} opacity="0.038"/>
      <rect x="84"  y="336" width="10" height="14" fill={INK} opacity="0.032"/>
      <rect x="100" y="336" width="10" height="14" fill={INK} opacity="0.032"/>
      <rect x="116" y="336" width="10" height="14" fill={INK} opacity="0.032"/>
      <path d="M192,310 C185,280 187,248 192,216 C197,248 199,280 192,310Z" fill={INK} opacity="0.058"/>
      <path d="M192,218 C187,196 189,174 192,152 C195,174 197,196 192,218Z" fill={INK} opacity="0.048"/>
      <path d="M216,330 C210,304 212,276 216,248 C220,276 222,304 216,330Z" fill={INK} opacity="0.050"/>
      <path d="M216,250 C212,232 213,214 216,196 C219,214 220,232 216,250Z" fill={INK} opacity="0.040"/>
      <rect x="440" y="336" width="46" height="62" fill={INK} opacity="0.044"/>
      <path d="M434,336 L463,310 L492,336Z" fill={INK} opacity="0.044"/>
      <rect x="454" y="356" width="14" height="42" fill={INK} opacity="0.036"/>
      <rect x="440" y="344" width="12" height="16" fill={INK} opacity="0.032"/>
      <rect x="466" y="344" width="12" height="16" fill={INK} opacity="0.032"/>
      <path d="M408,358 C403,336 405,312 408,288 C411,312 413,336 408,358Z" fill={INK} opacity="0.048"/>
      <path d="M408,290 C405,274 406,258 408,242 C410,258 411,274 408,290Z" fill={INK} opacity="0.038"/>
      <path d="M634,348 C628,322 630,294 634,266 C638,294 640,322 634,348Z" fill={INK} opacity="0.054"/>
      <path d="M634,268 C630,248 631,228 634,208 C637,228 638,248 634,268Z" fill={INK} opacity="0.044"/>
      <ellipse cx="280" cy="350" rx="22" ry="38" fill={INK} opacity="0.036"/>
      <ellipse cx="310" cy="358" rx="18" ry="30" fill={INK} opacity="0.030"/>
      <ellipse cx="560" cy="350" rx="20" ry="34" fill={INK} opacity="0.036"/>
      <ellipse cx="590" cy="358" rx="16" ry="28" fill={INK} opacity="0.030"/>
    </svg>
  );
}

// ─── ILUSTRACIONES ────────────────────────────────────────────────────────────
function TomatoCluster({ w = 144, h = 168 }: { w?: number; h?: number }) {
  return (
    <svg width={w} height={h} viewBox="0 0 144 168" xmlns="http://www.w3.org/2000/svg" aria-hidden>
      <circle cx="64" cy="108" r="48" fill={RED} opacity="0.80"/>
      <circle cx="64" cy="108" r="48" fill="none" stroke={INK} strokeWidth="1.4" opacity="0.52"/>
      <ellipse cx="46" cy="90" rx="18" ry="12" fill="rgba(255,255,255,0.18)"/>
      <path d="M20,98 Q40,118 64,112 Q88,106 102,126" stroke={INK} strokeWidth="0.55" fill="none" opacity="0.22"/>
      <path d="M18,114 Q38,132 64,126 Q90,120 104,140" stroke={INK} strokeWidth="0.55" fill="none" opacity="0.16"/>
      <path d="M24,80 Q42,100 64,96 Q86,92 96,110" stroke={INK} strokeWidth="0.55" fill="none" opacity="0.18"/>
      <path d="M64,60 C52,42 34,38 31,50 C40,52 53,57 64,60Z" fill={GRN} opacity="0.92"/>
      <path d="M64,60 C76,42 94,38 97,50 C88,52 75,57 64,60Z" fill={GRN} opacity="0.92"/>
      <path d="M64,60 C60,40 55,28 48,29 C50,39 57,51 64,60Z" fill={GRN2}/>
      <path d="M64,60 C68,40 73,28 80,29 C78,39 71,51 64,60Z" fill={GRN2}/>
      <circle cx="64" cy="60" r="4.5" fill={GRN2}/>
      <circle cx="108" cy="90" r="30" fill={RED} opacity="0.70"/>
      <circle cx="108" cy="90" r="30" fill="none" stroke={INK} strokeWidth="1.0" opacity="0.44"/>
      <path d="M108,60 C100,48 88,47 86,55 C92,57 100,60 108,60Z" fill={GRN} opacity="0.84"/>
      <path d="M108,60 C116,48 128,47 130,55 C124,57 116,60 108,60Z" fill={GRN} opacity="0.84"/>
      <circle cx="108" cy="60" r="3.2" fill={GRN2}/>
      <ellipse cx="28" cy="66" rx="13" ry="22" fill={GRN} opacity="0.80" transform="rotate(-38,28,66)"/>
      <path d="M28,48 Q19,66 28,80" stroke={GRN2} strokeWidth="1" fill="none"/>
      <ellipse cx="14" cy="78" rx="10" ry="16" fill={GRN2} opacity="0.70" transform="rotate(-52,14,78)"/>
      <ellipse cx="40" cy="52" rx="9" ry="14" fill={GRN} opacity="0.65" transform="rotate(-22,40,52)"/>
      <ellipse cx="52" cy="140" rx="9" ry="6" fill={INK} opacity="0.60" transform="rotate(-20,52,140)"/>
      <ellipse cx="74" cy="148" rx="8" ry="5.5" fill={INK} opacity="0.55" transform="rotate(10,74,148)"/>
      <ellipse cx="90" cy="140" rx="7" ry="5" fill={INK} opacity="0.50" transform="rotate(-5,90,140)"/>
    </svg>
  );
}

function GarlicBranch({ w = 118, h = 148 }: { w?: number; h?: number }) {
  return (
    <svg width={w} height={h} viewBox="0 0 118 148" xmlns="http://www.w3.org/2000/svg" aria-hidden>
      <ellipse cx="59" cy="140" rx="36" ry="8" fill={INK} opacity="0.09"/>
      <ellipse cx="59" cy="104" rx="40" ry="38" fill={CREAM} opacity="0.94"/>
      <ellipse cx="59" cy="104" rx="40" ry="38" fill="none" stroke={INK} strokeWidth="1.2" opacity="0.48"/>
      <path d="M34,90 Q59,110 84,90" stroke={INK} strokeWidth="0.7" fill="none" opacity="0.20"/>
      <path d="M28,104 Q59,124 90,104" stroke={INK} strokeWidth="0.7" fill="none" opacity="0.16"/>
      <path d="M59,66 C49,68 41,79 40,90 C49,88 58,84 59,66Z" fill={CREAM} stroke={INK} strokeWidth="0.8" opacity="0.82"/>
      <path d="M59,66 C69,68 77,79 78,90 C69,88 60,84 59,66Z" fill={CREAM} stroke={INK} strokeWidth="0.8" opacity="0.82"/>
      <path d="M40,90 C33,84 30,98 34,108 C43,104 47,95 40,90Z" fill={CREAM} stroke={INK} strokeWidth="0.8" opacity="0.76"/>
      <path d="M78,90 C85,84 88,98 84,108 C75,104 71,95 78,90Z" fill={CREAM} stroke={INK} strokeWidth="0.8" opacity="0.76"/>
      <path d="M34,108 C28,118 32,130 42,134 C48,122 46,110 34,108Z" fill={CREAM} stroke={INK} strokeWidth="0.8" opacity="0.72"/>
      <path d="M84,108 C90,118 86,130 76,134 C70,122 72,110 84,108Z" fill={CREAM} stroke={INK} strokeWidth="0.8" opacity="0.72"/>
      <path d="M42,134 C44,140 59,142 76,134 C74,130 59,128 42,134Z" fill={CREAM} stroke={INK} strokeWidth="0.8" opacity="0.70"/>
      <path d="M59,66 C56,48 54,34 52,18" stroke={INK} strokeWidth="1.5" fill="none" opacity="0.52"/>
      <path d="M59,66 C61,48 62,34 62,18" stroke={INK} strokeWidth="0.9" fill="none" opacity="0.32"/>
      <ellipse cx="44" cy="40" rx="10" ry="20" fill={GRN} opacity="0.70" transform="rotate(-32,44,40)"/>
      <path d="M44,24 Q40,40 44,54" stroke={GRN2} strokeWidth="1" fill="none" opacity="0.60"/>
      <ellipse cx="74" cy="36" rx="9" ry="17" fill={GRN2} opacity="0.64" transform="rotate(24,74,36)"/>
      <ellipse cx="56" cy="22" rx="8" ry="14" fill={GRN} opacity="0.58" transform="rotate(-8,56,22)"/>
    </svg>
  );
}

function PizzaLarge({ w = 320, h = 306 }: { w?: number; h?: number }) {
  return (
    <svg width={w} height={h} viewBox="0 0 320 306" xmlns="http://www.w3.org/2000/svg" aria-hidden>
      <ellipse cx="160" cy="294" rx="142" ry="14" fill={INK} opacity="0.10"/>
      <circle cx="160" cy="156" r="146" fill="#C88020" opacity="0.90"/>
      <circle cx="160" cy="156" r="132" fill="#B87010" opacity="0.80"/>
      <circle cx="160" cy="156" r="122" fill={RED} opacity="0.74"/>
      {[
        [152,118,26,19],[110,142,22,17],[180,138,20,16],
        [136,168,24,18],[176,170,22,17],[100,168,20,16],
        [158,194,22,17],[196,152,18,14],[128,128,18,14],[168,122,16,13],
      ].map(([cx,cy,rx,ry],i) => (
        <ellipse key={i} cx={cx} cy={cy} rx={rx} ry={ry} fill={CREAM} opacity={0.90}/>
      ))}
      {[[120,126],[166,114],[200,140],[100,154],[184,182],[136,186],[106,184],[152,208],[194,164]].map(([cx,cy],i)=>(
        <g key={i}>
          <circle cx={cx} cy={cy} r={8.5} fill={INK} opacity="0.72"/>
          <ellipse cx={cx-2} cy={cy-2} rx="3.5" ry="2.5" fill={CREAM} opacity="0.32"/>
        </g>
      ))}
      {[[148,146,30],[168,154,-20],[122,162,42],[154,174,-32],[184,146,18],[136,122,55]].map(([cx,cy,r],i)=>(
        <ellipse key={i} cx={cx} cy={cy} rx="5.5" ry="12" fill={GRN} opacity="0.80"
          transform={`rotate(${r},${cx},${cy})`}/>
      ))}
      <ellipse cx="162" cy="122" rx="13" ry="22" fill={GRN} opacity="0.84" transform="rotate(18,162,122)"/>
      <path d="M162,108 Q157,122 162,134" stroke={GRN2} strokeWidth="1.1" fill="none"/>
      <ellipse cx="146" cy="128" rx="11" ry="18" fill={GRN2} opacity="0.75" transform="rotate(-14,146,128)"/>
      <ellipse cx="174" cy="118" rx="10" ry="16" fill={GRN} opacity="0.70" transform="rotate(8,174,118)"/>
      <ellipse cx="140" cy="164" rx="10" ry="16" fill={GRN} opacity="0.72" transform="rotate(-28,140,164)"/>
      <ellipse cx="182" cy="168" rx="9" ry="15" fill={GRN2} opacity="0.68" transform="rotate(22,182,168)"/>
      <line x1="160" y1="10" x2="160" y2="302" stroke={INK} strokeWidth="0.9" opacity="0.14"/>
      <line x1="14"  y1="156" x2="306" y2="156" stroke={INK} strokeWidth="0.9" opacity="0.14"/>
      <line x1="57"  y1="53"  x2="263" y2="259" stroke={INK} strokeWidth="0.7" opacity="0.10"/>
      <line x1="263" y1="53"  x2="57"  y2="259" stroke={INK} strokeWidth="0.7" opacity="0.10"/>
      <circle cx="160" cy="156" r="146" fill="none" stroke={INK} strokeWidth="2.2" opacity="0.52"/>
    </svg>
  );
}

function PastaPlate({ w = 196, h = 208 }: { w?: number; h?: number }) {
  return (
    <svg width={w} height={h} viewBox="0 0 196 208" xmlns="http://www.w3.org/2000/svg" aria-hidden>
      <ellipse cx="98" cy="200" rx="88" ry="10" fill={INK} opacity="0.09"/>
      <ellipse cx="98" cy="154" rx="92" ry="38" fill="#EDE2C8"/>
      <ellipse cx="98" cy="154" rx="92" ry="38" fill="none" stroke={INK} strokeWidth="1.5" opacity="0.42"/>
      <ellipse cx="98" cy="150" rx="80" ry="32" fill={CREAM}/>
      <ellipse cx="98" cy="150" rx="80" ry="32" fill="none" stroke={INK} strokeWidth="0.8" opacity="0.26"/>
      <ellipse cx="98" cy="140" rx="62" ry="28" fill="#C09020" opacity="0.56"/>
      {[
        ["M40,132 Q58,116 78,124 Q98,132 118,120 Q136,108 152,118", 0.72],
        ["M38,140 Q56,124 76,132 Q96,140 116,128 Q134,116 150,126", 0.66],
        ["M40,148 Q58,132 78,140 Q98,148 118,136 Q136,124 150,134", 0.62],
        ["M42,156 Q60,140 80,148 Q100,156 118,144 Q136,132 148,142", 0.56],
        ["M38,124 Q56,108 76,116 Q96,124 116,112 Q134,100 148,110", 0.68],
        ["M40,116 Q58,100 78,108 Q98,116 116,104 Q132,92 146,102",  0.60],
      ].map(([d,op],i)=>(
        <path key={i} d={d as string} stroke="#A07010" strokeWidth="2.6" fill="none"
          opacity={op as number} strokeLinecap="round"/>
      ))}
      <ellipse cx="98" cy="136" rx="34" ry="20" fill={RED}   opacity="0.62"/>
      <ellipse cx="98" cy="130" rx="24" ry="14" fill={CREAM} opacity="0.72"/>
      <ellipse cx="95" cy="118" rx="10" ry="17" fill={GRN}  opacity="0.84" transform="rotate(-22,95,118)"/>
      <path d="M95,108 Q91,118 95,130" stroke={GRN2} strokeWidth="1" fill="none"/>
      <ellipse cx="108" cy="116" rx="9" ry="14" fill={GRN2} opacity="0.74" transform="rotate(16,108,116)"/>
      <ellipse cx="82"  cy="120" rx="8" ry="12" fill={GRN}  opacity="0.68" transform="rotate(-8,82,120)"/>
      <rect x="158" y="28" width="8.5" height="96" rx="4.2" fill={INK} opacity="0.50"/>
      <rect x="150" y="26" width="3.8" height="32" rx="1.9" fill={INK} opacity="0.50"/>
      <rect x="155" y="26" width="3.8" height="32" rx="1.9" fill={INK} opacity="0.50"/>
      <rect x="160" y="26" width="3.8" height="32" rx="1.9" fill={INK} opacity="0.50"/>
      <rect x="165" y="26" width="3.8" height="32" rx="1.9" fill={INK} opacity="0.50"/>
    </svg>
  );
}

function OliveOil({ w = 74, h = 184 }: { w?: number; h?: number }) {
  return (
    <svg width={w} height={h} viewBox="0 0 74 184" xmlns="http://www.w3.org/2000/svg" aria-hidden>
      <ellipse cx="37" cy="176" rx="30" ry="8" fill={INK} opacity="0.09"/>
      <rect x="31" y="4"  width="14" height="20" rx="3.5" fill="#6A4028"/>
      <rect x="33" y="6"  width="10" height="14" rx="2.5" fill="#8A5838"/>
      <path d="M31,24 L25,50 L50,50 L46,24Z" fill="#7A9050" opacity="0.92"/>
      <path d="M22,50 L10,76 L9,148 Q9,164 37,164 Q65,164 65,148 L64,76 L52,50Z" fill="#7A9050" opacity="0.88"/>
      <path d="M15,82 L13,146 Q13,160 37,160 Q61,160 61,146 L59,82Z" fill="#C8C820" opacity="0.62"/>
      <rect x="16" y="96" width="44" height="58" rx="5" fill={CREAM} opacity="0.95"/>
      <rect x="19" y="99" width="38" height="52" rx="4" fill="none" stroke={INK} strokeWidth="0.9" opacity="0.40"/>
      <line x1="19" y1="120" x2="57" y2="120" stroke={GOLD} strokeWidth="0.8" opacity="0.48"/>
      <text x="37" y="115" textAnchor="middle" fontFamily="Georgia,serif" fontSize="6.5" fontWeight="700"
        fill={INK} opacity="0.72" letterSpacing="0.5">OLIO</text>
      <text x="37" y="127" textAnchor="middle" fontFamily="Georgia,serif" fontSize="5.2"
        fill={INK} opacity="0.55">EXTRA VERGINE</text>
      <text x="37" y="137" textAnchor="middle" fontFamily="Georgia,serif" fontSize="4.6"
        fill={GOLD} opacity="0.58">DI OLIVA</text>
      <path d="M16,78 Q18,106 17,142" stroke="rgba(255,255,255,0.25)" strokeWidth="4.5"
        fill="none" strokeLinecap="round"/>
      <path d="M22,50 L10,76 L9,148 Q9,164 37,164 Q65,164 65,148 L64,76 L52,50Z"
        fill="none" stroke={INK} strokeWidth="1.5" opacity="0.44"/>
    </svg>
  );
}

function Tiramisu({ w = 162, h = 136 }: { w?: number; h?: number }) {
  return (
    <svg width={w} height={h} viewBox="0 0 162 136" xmlns="http://www.w3.org/2000/svg" aria-hidden>
      <ellipse cx="81" cy="126" rx="72" ry="12" fill={INK} opacity="0.09"/>
      <ellipse cx="81" cy="122" rx="72" ry="16" fill="#E8DECC" opacity="0.86"/>
      <ellipse cx="81" cy="122" rx="64" ry="13" fill={CREAM}/>
      <path d="M16,110 L16,58 Q16,46 81,46 Q146,46 146,58 L146,110Z" fill="#C8A030" opacity="0.84"/>
      <rect x="16" y="70" width="130" height="13" fill="#7A4010" opacity="0.46"/>
      <rect x="16" y="88" width="130" height="13" fill="#7A4010" opacity="0.40"/>
      <ellipse cx="81" cy="58" rx="65" ry="18" fill={CREAM} opacity="0.96"/>
      <ellipse cx="81" cy="58" rx="65" ry="18" fill="#3C2010" opacity="0.34"/>
      {[54,63,72,81,90,99,108].map((x,i)=>(
        <line key={i} x1={x} y1="44" x2={x-10} y2="70" stroke="#2A1808" strokeWidth="0.6" opacity="0.22"/>
      ))}
      <path d="M16,110 L16,58 Q16,46 81,46 Q146,46 146,58 L146,110Z"
        fill="none" stroke={INK} strokeWidth="1.3" opacity="0.40"/>
      <ellipse cx="81" cy="58" rx="65" ry="18" fill="none" stroke={INK} strokeWidth="1" opacity="0.32"/>
      <ellipse cx="112" cy="50" rx="10" ry="16" fill={GRN} opacity="0.72" transform="rotate(22,112,50)"/>
      <path d="M112,40 Q109,50 112,62" stroke={GRN2} strokeWidth="0.9" fill="none"/>
    </svg>
  );
}

// ─── SELLOS Y DECORACIONES ────────────────────────────────────────────────────
function Stamp100({ rotation = -12 }: { rotation?: number }) {
  return (
    <div aria-hidden style={{ transform: `rotate(${rotation}deg)`, width: 112, height: 112 }}>
      <svg width="112" height="112" viewBox="0 0 112 112" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <path id="s1-arc" d="M56,56 m-46,0 a46,46 0 1,1 92,0 a46,46 0 1,1 -92,0"/>
          <filter id="s1-ink">
            <feTurbulence type="turbulence" baseFrequency="0.055" numOctaves="3" result="n"/>
            <feDisplacementMap in="SourceGraphic" in2="n" scale="1.3" xChannelSelector="R" yChannelSelector="G"/>
          </filter>
        </defs>
        <circle cx="56" cy="56" r="54" fill={CREAM} opacity="0.97"/>
        <g filter="url(#s1-ink)">
          <circle cx="56" cy="56" r="54" fill="none" stroke={DARK} strokeWidth="3"   strokeDasharray="3,1.2" opacity="0.90"/>
          <circle cx="56" cy="56" r="46" fill="none" stroke={DARK} strokeWidth="1"   opacity="0.42"/>
          <circle cx="56" cy="56" r="37" fill="none" stroke={DARK} strokeWidth="1.5" strokeDasharray="2,1" opacity="0.52"/>
        </g>
        <text fontFamily="Georgia,serif" fontSize="7.8" fontWeight="700" letterSpacing="2.2"
          fill={DARK} opacity="0.88">
          <textPath href="#s1-arc" startOffset="7%">★ 100% ITALIAN ★ QUALITY ★</textPath>
        </text>
        <text x="56" y="50" textAnchor="middle" fontFamily="Georgia,serif" fontSize="20"
          fontWeight="700" fill={DARK} opacity="0.90">100%</text>
        <text x="56" y="63" textAnchor="middle" fontFamily="Georgia,serif" fontSize="10.5"
          fontWeight="700" letterSpacing="2.5" fill={DARK} opacity="0.86">ITALIAN</text>
        <text x="56" y="75" textAnchor="middle" fontFamily="Georgia,serif" fontSize="7.2"
          letterSpacing="1.5" fill={DARK} opacity="0.62">QUALITY</text>
        <text x="56" y="85" textAnchor="middle" fontFamily="Georgia,serif" fontSize="7.5"
          fill={DARK} opacity="0.46">★  ★  ★</text>
      </svg>
    </div>
  );
}

function KraftTag() {
  return (
    <div aria-hidden style={{ transform: "rotate(6deg)", width: 122, height: 148 }}>
      <svg width="122" height="148" viewBox="0 0 122 148" xmlns="http://www.w3.org/2000/svg">
        <path d="M61,6 Q80,19 73,38" stroke="#9A7845" strokeWidth="2" fill="none" strokeLinecap="round"/>
        <circle cx="61" cy="6" r="4.2" fill={GOLD} opacity="0.70"/>
        <rect x="7"  y="36" width="108" height="106" rx="5.5" fill="#E8CC98"/>
        <rect x="11" y="40" width="100" height="98"  rx="4.5" fill="#F2DAAC"/>
        <circle cx="61" cy="49" r="6"   fill={GOLD} opacity="0.44"/>
        <circle cx="61" cy="49" r="3.5" fill="#E8CC98"/>
        <line x1="22" y1="64" x2="100" y2="64" stroke="#A89050" strokeWidth="0.8" opacity="0.36"/>
        <line x1="22" y1="66" x2="100" y2="66" stroke="#A89050" strokeWidth="0.4" opacity="0.22"/>
        <text x="61" y="90"  textAnchor="middle" fontFamily="Georgia,serif" fontStyle="italic"
          fontSize="21" fontWeight="700" fill={GRN} opacity="0.90">Buon</text>
        <text x="61" y="114" textAnchor="middle" fontFamily="Georgia,serif" fontStyle="italic"
          fontSize="21" fontWeight="700" fill={RED} opacity="0.90">Appetito!</text>
        <path d="M61,122 C61,122 51,114 51,108 C51,104.5 54,102 57,104 C58.5,105 61,106 61,106 C61,106 63.5,105 65,104 C68,102 71,104.5 71,108 C71,114 61,122 61,122Z"
          fill={RED} opacity="0.74"/>
        <rect x="7" y="36" width="108" height="106" rx="5.5" fill="none" stroke="#B09458" strokeWidth="1.2" opacity="0.52"/>
      </svg>
    </div>
  );
}

function RecipeStamp({ rotation = 5 }: { rotation?: number }) {
  return (
    <div aria-hidden style={{ transform: `rotate(${rotation}deg)`, width: 134, height: 134 }}>
      <svg width="134" height="134" viewBox="0 0 134 134" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <path id="rs-arc" d="M67,67 m-54,0 a54,54 0 1,1 108,0 a54,54 0 1,1 -108,0"/>
          <filter id="rs-ink">
            <feTurbulence type="turbulence" baseFrequency="0.05" numOctaves="3" result="n"/>
            <feDisplacementMap in="SourceGraphic" in2="n" scale="1.5" xChannelSelector="R" yChannelSelector="G"/>
          </filter>
        </defs>
        <circle cx="67" cy="67" r="64" fill={CREAM} opacity="0.96"/>
        <g filter="url(#rs-ink)">
          <circle cx="67" cy="67" r="64" fill="none" stroke={RED} strokeWidth="3"   strokeDasharray="3,1.2" opacity="0.84"/>
          <circle cx="67" cy="67" r="56" fill="none" stroke={RED} strokeWidth="0.9" opacity="0.38"/>
          <circle cx="67" cy="67" r="46" fill="none" stroke={RED} strokeWidth="1.8" strokeDasharray="2,0.8" opacity="0.52"/>
        </g>
        <text fontFamily="Georgia,serif" fontSize="7.8" fontWeight="700" letterSpacing="2"
          fill={RED} opacity="0.80">
          <textPath href="#rs-arc" startOffset="4%">✦ TRADITIONAL ✦ ITALIAN FOOD ✦</textPath>
        </text>
        <text x="67" y="56" textAnchor="middle" fontFamily="Georgia,serif" fontSize="8.5"
          letterSpacing="2.5" fill={RED} opacity="0.68" fontWeight="700">THE BEST</text>
        <text x="67" y="78" textAnchor="middle" fontFamily="Georgia,serif" fontSize="25"
          fontWeight="700" fontStyle="italic" fill={RED} opacity="0.90">Recipes</text>
        <path d="M47,86 C57,82 77,82 87,86" stroke={RED} strokeWidth="1" fill="none" opacity="0.52"/>
        <path d="M67,89 C64,95 62,101 63,105 C64,110 70,110 71,105 C72,101 70,95 67,89Z"
          fill={RED} opacity="0.65"/>
      </svg>
    </div>
  );
}

function ChalkboardSign() {
  return (
    <div style={{
      background: "#263322",
      borderRadius: "4px 4px 3px 3px",
      padding: "1rem 1.7rem 1.2rem",
      position: "relative",
      boxShadow: "inset 0 0 0 3px rgba(255,255,255,0.06), 2px 4px 14px rgba(0,0,0,0.38)",
      width: "155px",
      border: "2.5px solid #1a2518",
    }}>
      <div style={{ position: "absolute", bottom: "-18px", left: "28px", width: "3px", height: "20px",
        background: "#4a3a28", transform: "rotate(6deg)", borderRadius: "2px" }}/>
      <div style={{ position: "absolute", bottom: "-18px", right: "28px", width: "3px", height: "20px",
        background: "#4a3a28", transform: "rotate(-6deg)", borderRadius: "2px" }}/>
      <div style={{ position: "absolute", top: "-10px", left: "20px", width: "38px", height: "15px",
        background: `${GOLD}42`, transform: "rotate(-3deg)", borderRadius: "2px" }}/>
      <div style={{ position: "absolute", top: "-10px", right: "20px", width: "30px", height: "15px",
        background: `${GOLD}42`, transform: "rotate(4deg)", borderRadius: "2px" }}/>
      {["Buoni", "Vini", "Buona", "Gente"].map((line, i) => (
        <p key={i} style={{
          fontFamily: SCRIPT_FONT,
          fontStyle: "italic",
          fontSize: i % 2 === 1 ? "1.65rem" : "1.25rem",
          fontWeight: i % 2 === 1 ? 700 : 400,
          color: "rgba(255,255,255,0.90)",
          margin: 0, lineHeight: 1.28, textAlign: "center",
        }}>
          {line}
        </p>
      ))}
    </div>
  );
}

function CornerFlourish({ flip = false }: { flip?: boolean }) {
  return (
    <svg width="56" height="56" viewBox="0 0 56 56" xmlns="http://www.w3.org/2000/svg" aria-hidden
      style={{ transform: flip ? "scaleX(-1)" : undefined }}>
      <path d="M4,4 L24,4 L24,6.5 L6.5,6.5 L6.5,24 L4,24Z" fill={INK} opacity="0.28"/>
      <path d="M9,4.5 Q9,9 14,14 Q19,19 24,19" stroke={INK} strokeWidth="0.9" fill="none" opacity="0.26"/>
      <circle cx="9" cy="9" r="3" fill="none" stroke={INK} strokeWidth="0.9" opacity="0.26"/>
      <path d="M16,4.5 Q20,11 20,20" stroke={INK} strokeWidth="0.7" fill="none" opacity="0.18"/>
      <ellipse cx="7" cy="19" rx="4" ry="6" fill="none" stroke={INK} strokeWidth="0.7" opacity="0.20"
        transform="rotate(-30,7,19)"/>
    </svg>
  );
}

// ─── HEADER ───────────────────────────────────────────────────────────────────
function PosterHeader({ name, tagline }: { name: string; tagline?: string }) {
  const words = name.trim().split(/\s+/);
  let lines: string[];
  if (words.length === 1)      lines = [words[0]];
  else if (words.length === 2) lines = [words[0], words[1]];
  else                          lines = [words[0], words.slice(1, -1).join(" ") || words[1], words[words.length - 1]];

  const n     = lines.length;
  const svgH  = n === 1 ? 175 : n === 2 ? 310 : 420;
  const yPos  = n === 1 ? [152] : n === 2 ? [158, 300] : [140, 268, 398];
  const sizes = n === 1 ? [162] : n === 2 ? [162, 132] : [136, 124, 100];
  const cols  = n === 1 ? [DARK] : n === 2 ? [DARK, RED] : [DARK, RED, DARK];

  return (
    <div style={{ position: "relative", textAlign: "center" }}>
      {/* SINCE 1984 */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "0.55rem",
        padding: "1.2rem 0 0.35rem" }}>
        <svg width="78" height="13" viewBox="0 0 78 13" xmlns="http://www.w3.org/2000/svg" aria-hidden>
          <path d="M0,6.5 Q20,1 39,6.5 Q58,12 78,6.5" stroke={INK} strokeWidth="1" fill="none" opacity="0.46"/>
          <circle cx="5"  cy="6.5" r="2.2" fill={INK} opacity="0.34"/>
          <circle cx="73" cy="6.5" r="2.2" fill={INK} opacity="0.34"/>
        </svg>
        <span style={{ fontFamily: SCRIPT_FONT, fontSize: "0.72rem", fontWeight: 700,
          letterSpacing: "0.44em", color: INK, opacity: 0.66, textTransform: "uppercase" }}>
          Since 1984
        </span>
        <svg width="78" height="13" viewBox="0 0 78 13" xmlns="http://www.w3.org/2000/svg" aria-hidden>
          <path d="M0,6.5 Q20,12 39,6.5 Q58,1 78,6.5" stroke={INK} strokeWidth="1" fill="none" opacity="0.46"/>
          <circle cx="5"  cy="6.5" r="2.2" fill={INK} opacity="0.34"/>
          <circle cx="73" cy="6.5" r="2.2" fill={INK} opacity="0.34"/>
        </svg>
      </div>

      {/* TÍTULO SVG woodblock con Ultra font */}
      <div style={{ position: "relative", padding: "0 2.5%" }}>
        <div style={{ position: "absolute", inset: 0, zIndex: 0 }}>
          <LandscapeWatermark/>
        </div>
        <svg width="100%" viewBox={`0 0 880 ${svgH}`} xmlns="http://www.w3.org/2000/svg"
          style={{ display: "block", position: "relative", zIndex: 1 }}>
          <defs>
            <filter id="lpress" x="-2%" y="-5%" width="104%" height="120%">
              <feOffset dx="3" dy="4.5" result="sh"/>
              <feFlood floodColor="#000" floodOpacity="0.14" result="c"/>
              <feComposite in="c" in2="sh" operator="in" result="sc"/>
              <feMerge><feMergeNode in="sc"/><feMergeNode in="SourceGraphic"/></feMerge>
            </filter>
          </defs>
          {lines.map((line, i) => (
            <text key={i}
              x="440" y={yPos[i]}
              textAnchor="middle"
              textLength="858"
              lengthAdjust="spacingAndGlyphs"
              fontFamily={TITLE_FONT}
              fontWeight="400"
              fontSize={sizes[i]}
              fill={cols[i]}
              filter="url(#lpress)"
            >
              {line.toUpperCase()}
            </text>
          ))}
        </svg>
      </div>

      {/* Fatto con Amore */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "0.65rem",
        margin: "0.15rem 0 0.55rem", padding: "0 1.8rem" }}>
        <div style={{ flex: 1, height: "1.5px", background: `linear-gradient(to right, transparent, ${INK}28)` }}/>
        <span style={{ fontFamily: SCRIPT_FONT, fontStyle: "italic", fontSize: "2.1rem",
          color: GRN, lineHeight: 1, fontWeight: 500, whiteSpace: "nowrap" }}>
          Fatto con Amore
        </span>
        <div style={{ flex: 1, height: "1.5px", background: `linear-gradient(to left, transparent, ${INK}28)` }}/>
      </div>

      {/* Ribbon banner con extremos en V */}
      <div style={{ display: "flex", justifyContent: "center", margin: "0 1rem 0.25rem" }}>
        <svg width="96%" viewBox="0 0 580 58" xmlns="http://www.w3.org/2000/svg"
          style={{ display: "block", maxWidth: "540px" }}>
          <path d="M14,2 L566,2 C572,2 578,10 578,10 L578,48 C578,48 572,56 566,56 L14,56 C8,56 2,48 2,48 L2,10 C2,10 8,2 14,2Z"
            fill={DARK}/>
          <path d="M2,10 L14,2 L14,18Z"   fill="rgba(255,255,255,0.06)"/>
          <path d="M2,48 L14,56 L14,40Z"   fill="rgba(0,0,0,0.16)"/>
          <path d="M578,10 L566,2 L566,18Z" fill="rgba(255,255,255,0.06)"/>
          <path d="M578,48 L566,56 L566,40Z" fill="rgba(0,0,0,0.16)"/>
          <path d="M14,2 L566,2 C572,2 578,10 578,10 L578,26 L2,26 L2,10 C2,10 8,2 14,2Z"
            fill="rgba(255,255,255,0.055)"/>
          <text x="290" y="37" textAnchor="middle"
            fontFamily={SCRIPT_FONT}
            fontSize="17" fontWeight="700" letterSpacing="5"
            fill="rgba(255,255,255,0.97)" dominantBaseline="middle">
            {(tagline || "AUTHENTIC ITALIAN FOOD").toUpperCase()}
          </text>
        </svg>
      </div>

      {/* Separador */}
      <div style={{ display: "flex", alignItems: "center", padding: "0.55rem 1.6rem 0.1rem" }}>
        <div style={{ flex: 1, height: "1px", background: `${INK}18` }}/>
        <svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden>
          <path d="M12,2 L14,9 L21,9 L15,14 L17,21 L12,17 L7,21 L9,14 L3,9 L10,9Z"
            fill="none" stroke={GOLD} strokeWidth="1.1" opacity="0.55"/>
        </svg>
        <div style={{ flex: 1, height: "1px", background: `${INK}18` }}/>
      </div>
    </div>
  );
}

// ─── CATEGORÍA ────────────────────────────────────────────────────────────────
function CategoryHeader({ name, subtitle, color }: { name: string; subtitle?: string; color: string }) {
  return (
    <div style={{ marginBottom: "0.55rem" }}>
      <div style={{ display: "flex", alignItems: "center", gap: "0.28rem", flexWrap: "wrap" }}>
        <svg width="32" height="28" viewBox="0 0 32 28" xmlns="http://www.w3.org/2000/svg" aria-hidden>
          <ellipse cx="10" cy="17" rx="5.5" ry="11" fill={GRN}  opacity="0.66" transform="rotate(-28,10,17)"/>
          <ellipse cx="22" cy="12" rx="5"   ry="10" fill={GRN2} opacity="0.58" transform="rotate(-8,22,12)"/>
          <path d="M2,17 Q16,9 30,17" stroke={GRN2} strokeWidth="0.9" fill="none" opacity="0.44"/>
        </svg>
        <h2 style={{
          fontFamily: SCRIPT_FONT,
          fontSize: "clamp(2.1rem, 5.5vw, 3.6rem)",
          fontWeight: 700, fontStyle: "italic",
          color, lineHeight: 1, margin: 0, letterSpacing: "0.01em",
        }}>
          {name}
        </h2>
        <svg width="32" height="28" viewBox="0 0 32 28" xmlns="http://www.w3.org/2000/svg" aria-hidden
          style={{ transform: "scaleX(-1)" }}>
          <ellipse cx="10" cy="17" rx="5.5" ry="11" fill={GRN}  opacity="0.66" transform="rotate(-28,10,17)"/>
          <ellipse cx="22" cy="12" rx="5"   ry="10" fill={GRN2} opacity="0.58" transform="rotate(-8,22,12)"/>
          <path d="M2,17 Q16,9 30,17" stroke={GRN2} strokeWidth="0.9" fill="none" opacity="0.44"/>
        </svg>
      </div>
      {subtitle && (
        <p style={{ fontFamily: SCRIPT_FONT, fontStyle: "italic", fontSize: "1.05rem",
          color: RED, margin: "0 0 0.22rem 2px", opacity: 0.90, lineHeight: 1 }}>
          — {subtitle}
        </p>
      )}
      <div style={{ display: "flex", alignItems: "center", gap: "0.3rem", marginTop: "0.1rem" }}>
        <div style={{ flex: 1, height: "1px", background: `${color}32` }}/>
        <div style={{ width: "4px", height: "4px", borderRadius: "50%", background: color, opacity: 0.38 }}/>
        <div style={{ width: "20px", height: "1px", background: `${color}32` }}/>
      </div>
    </div>
  );
}

// ─── ITEM ─────────────────────────────────────────────────────────────────────
function MenuItem({ name, description, price, currency, featured, allergens,
  showPrice, showDescription, isLast }: {
  name?: string; description?: string; price?: number; currency?: string;
  featured?: boolean; allergens?: Allergen[];
  showPrice: boolean; showDescription: boolean; isLast: boolean;
}) {
  return (
    <div style={{ marginBottom: isLast ? 0 : "0.70rem", paddingBottom: isLast ? 0 : "0.70rem",
      borderBottom: isLast ? "none" : `1px dotted ${INK}18` }}>
      <div style={{ display: "flex", alignItems: "baseline", gap: "0.28rem" }}>
        {featured && <span style={{ color: GOLD, fontSize: "0.66rem", flexShrink: 0 }}>★</span>}
        <span style={{ fontFamily: BODY_FONT, fontSize: "0.77rem", fontWeight: 700,
          letterSpacing: "0.09em", textTransform: "uppercase", color: INK,
          flex: "0 1 auto", lineHeight: 1.25 }}>
          {name}
        </span>
        {showPrice && (
          <span style={{ flex: 1, borderBottom: `1.5px dotted ${INK}20`,
            marginBottom: "2px", minWidth: "0.5rem" }}/>
        )}
        {showPrice && price !== undefined && price > 0 && (
          <span style={{ fontFamily: BODY_FONT, fontSize: "0.83rem", fontWeight: 700,
            color: INK, flexShrink: 0, lineHeight: 1.25 }}>
            {formatPrice(price, currency)}
          </span>
        )}
      </div>
      {showDescription && description && (
        <p style={{ fontFamily: BODY_FONT, fontSize: "0.71rem", fontStyle: "italic",
          color: INK, opacity: 0.52, lineHeight: 1.45, margin: "0.10rem 0 0",
          paddingLeft: featured ? "0.85rem" : "0" }}>
          {description}
        </p>
      )}
      {allergens && allergens.length > 0 && (
        <AllergenBadges allergens={allergens} fontSize="0.48rem" opacity={0.33} marginTop="0.12rem"/>
      )}
    </div>
  );
}

// ─── CONSTANTES ───────────────────────────────────────────────────────────────
const CAT_SUB: Record<number, string> = {
  0: "Starters", 1: "Homemade", 2: "From the oven",
  3: "Main Courses", 4: "Desserts", 5: "Grilled", 6: "Seafood", 7: "Specials",
};
const CAT_COL = [GRN, RED, GRN, GRN, RED, GRN, RED, GRN];

// ─── PLANTILLA ────────────────────────────────────────────────────────────────
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

  const mid  = Math.ceil(visible.length / 2);
  const left = visible.slice(0, mid);
  const right = visible.slice(mid);

  return (
    <BackgroundLayer design={design} style={{
      color: INK, minHeight: "100%", position: "relative",
      background: `${NOISE}, linear-gradient(155deg, #FCF5E0 0%, ${BG} 42%, #EEE0BC 100%)`,
    }}>
      <FlagBlocks/>

      {/* Doble borde del póster */}
      <div style={{ position: "absolute", inset: "11px", zIndex: 3, pointerEvents: "none",
        border: `1px solid ${INK}20` }}/>
      <div style={{ position: "absolute", inset: "14px", zIndex: 3, pointerEvents: "none",
        border: `0.5px solid ${INK}10` }}/>

      <div style={{ position: "relative", zIndex: 4 }}>

        {/* ── HEADER ── */}
        <div style={{ position: "relative" }}>
          <div style={{ position: "absolute", top: "13px", left: "16px", zIndex: 8 }}>
            <CornerFlourish/>
          </div>
          <div style={{ position: "absolute", top: "13px", right: "16px", zIndex: 8 }}>
            <CornerFlourish flip/>
          </div>
          <div style={{ position: "absolute", top: "1.0rem", left: "0.9rem", zIndex: 9 }}>
            <Stamp100 rotation={-12}/>
          </div>
          <div style={{ position: "absolute", top: "0.5rem", right: "0.7rem", zIndex: 9 }}>
            <KraftTag/>
          </div>
          <div style={{ position: "absolute", top: "7.5rem", left: "-10px", zIndex: 2, opacity: 0.87 }}>
            <TomatoCluster/>
          </div>
          <div style={{ position: "absolute", top: "7rem", right: "-7px", zIndex: 2, opacity: 0.82 }}>
            <GarlicBranch/>
          </div>
          <PosterHeader name={heroTitle} tagline={restaurantInfo.tagline}/>
        </div>

        {/* ── 2 COLUMNAS ── */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 0,
          padding: "0.25rem 1.5rem 0", position: "relative" }}>

          {/* Izquierda */}
          <div style={{ paddingRight: "1.1rem", borderRight: `1px solid ${INK}16`, position: "relative" }}>
            {left.map((cat, idx) => {
              const items = cat.items.filter((i) => i.available).sort((a, b) => a.sortOrder - b.sortOrder);
              return (
                <div key={cat.id} style={{ marginBottom: "1.3rem" }}>
                  <CategoryHeader
                    name={t(cat.name, lang) ?? ""}
                    subtitle={CAT_SUB[idx]}
                    color={CAT_COL[idx % CAT_COL.length]}
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
            <div style={{ marginTop: "0.4rem", marginBottom: "1rem" }}>
              <ChalkboardSign/>
            </div>
          </div>

          {/* Derecha */}
          <div style={{ paddingLeft: "1.1rem", position: "relative" }}>
            <div style={{ position: "absolute", top: "0", right: "-6px", zIndex: 0, opacity: 0.80 }}>
              <OliveOil/>
            </div>
            {right.map((cat, idx) => {
              const gi    = left.length + idx;
              const items = cat.items.filter((i) => i.available).sort((a, b) => a.sortOrder - b.sortOrder);
              return (
                <div key={cat.id} style={{ marginBottom: "1.3rem" }}>
                  <CategoryHeader
                    name={t(cat.name, lang) ?? ""}
                    subtitle={CAT_SUB[gi] ?? "Specialty"}
                    color={CAT_COL[gi % CAT_COL.length]}
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
            <div style={{ display: "flex", justifyContent: "center", marginTop: "0.2rem", marginRight: "-0.5rem" }}>
              <RecipeStamp rotation={4}/>
            </div>
          </div>

          {/* Plato pasta derecha */}
          <div style={{ position: "absolute", right: "-14px", top: "45%", transform: "translateY(-50%)",
            zIndex: 0, opacity: 0.84 }}>
            <PastaPlate/>
          </div>
        </div>

        {/* ── PIE ── */}
        <div style={{ position: "relative", marginTop: "0.5rem" }}>
          <div style={{ position: "absolute", bottom: "-16px", left: "-22px", zIndex: 0, opacity: 0.90 }}>
            <PizzaLarge/>
          </div>
          <div style={{ position: "absolute", bottom: "-10px", right: "-12px", zIndex: 0, opacity: 0.84 }}>
            <Tiramisu/>
          </div>

          <div style={{ textAlign: "center", padding: "0.7rem 2rem 0.4rem", position: "relative", zIndex: 5 }}>
            <div style={{ display: "inline-flex", alignItems: "center", gap: "0.7rem",
              border: `1.5px solid ${INK}32`, padding: "0.42rem 2.2rem" }}>
              <div style={{ width: "5px", height: "5px", border: `1px solid ${INK}40`,
                borderRadius: "50%", opacity: 0.46 }}/>
              <span style={{ fontFamily: BODY_FONT, fontSize: "0.77rem", fontWeight: 700,
                letterSpacing: "0.28em", color: INK, opacity: 0.58, textTransform: "uppercase" }}>
                Grazie e Arrivederci!
              </span>
              <div style={{ width: "5px", height: "5px", border: `1px solid ${INK}40`,
                borderRadius: "50%", opacity: 0.46 }}/>
            </div>
          </div>

          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center",
            padding: "0.2rem 1.8rem 1.5rem", flexWrap: "wrap", gap: "0.3rem",
            position: "relative", zIndex: 5 }}>
            <span style={{ fontFamily: typo.bodyFont, fontSize: "0.58rem", color: INK, opacity: 0.38 }}>
              {restaurantInfo.socialLinks?.instagram
                ? `@ ${restaurantInfo.socialLinks.instagram.replace(/^@/, "")}` : ""}
            </span>
            <div style={{ display: "flex", gap: "1rem" }}>
              {[restaurantInfo.address, restaurantInfo.phone].filter(Boolean).map((v, i) => (
                <span key={i} style={{ fontFamily: typo.bodyFont, fontSize: "0.58rem", color: INK, opacity: 0.38 }}>
                  {v}
                </span>
              ))}
            </div>
            <span style={{ fontFamily: typo.bodyFont, fontSize: "0.58rem", color: INK, opacity: 0.38 }}>
              {restaurantInfo.website ?? ""}
            </span>
          </div>
        </div>
      </div>
    </BackgroundLayer>
  );
}
