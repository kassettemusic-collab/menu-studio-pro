"use client";

import { t } from "@/utils/translation";
import { formatPrice } from "@/utils/price";
import { AllergenBadges, BackgroundLayer } from "./shared";
import type { TemplateProps } from "./types";
import { resolveTypography } from "@/types/template";
import type { Allergen } from "@/types/menu";

// ─────────────────────────────────────────────────────────────────────────────
//  PALETA
// ─────────────────────────────────────────────────────────────────────────────

const BG    = "#F4EBCE";
const DARK  = "#1A0D02";
const RED   = "#BF2F28";
const RED2  = "#8C1E18";
const GRN   = "#1A5C30";
const GRN2  = "#236638";
const GOLD  = "#C4952A";
const INK   = "#1C0F06";
const CHALK = "#283A28";
const CREAM = "#FBF3DE";

const PAPER = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='400'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.68' numOctaves='4' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='400' height='400' filter='url(%23n)' opacity='0.045'/%3E%3C/svg%3E")`;

// ─────────────────────────────────────────────────────────────────────────────
//  BLOQUES BANDERA ITALIANA — pinceladas grandes en esquinas
// ─────────────────────────────────────────────────────────────────────────────

function ItalianFlagBlocks() {
  return (
    <div aria-hidden style={{ position: "absolute", inset: 0, pointerEvents: "none", zIndex: 0, overflow: "hidden" }}>
      <svg width="100%" height="100%" style={{ position: "absolute", inset: 0 }}
        xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none"
        viewBox="0 0 1000 1414">
        <defs>
          <filter id="brg" x="-8%" y="-8%" width="116%" height="116%">
            <feTurbulence type="turbulence" baseFrequency="0.018 0.032" numOctaves="5" seed="7" result="noise"/>
            <feDisplacementMap in="SourceGraphic" in2="noise" scale="26" xChannelSelector="R" yChannelSelector="G"/>
          </filter>
          <filter id="brr" x="-8%" y="-8%" width="116%" height="116%">
            <feTurbulence type="turbulence" baseFrequency="0.018 0.032" numOctaves="5" seed="13" result="noise"/>
            <feDisplacementMap in="SourceGraphic" in2="noise" scale="26" xChannelSelector="R" yChannelSelector="G"/>
          </filter>
        </defs>

        {/* Verde — esquina superior izquierda — gran bloque triangular */}
        <polygon points="0,0 480,0 0,680" fill={GRN} opacity="0.90" filter="url(#brg)"/>
        <polygon points="0,0 360,0 0,500" fill={GRN2} opacity="0.28" filter="url(#brg)"/>

        {/* Rojo — esquina superior derecha */}
        <polygon points="1000,0 520,0 1000,680" fill={RED} opacity="0.90" filter="url(#brr)"/>
        <polygon points="1000,0 640,0 1000,500" fill={RED2} opacity="0.28" filter="url(#brr)"/>

        {/* Rojo — franja derecha inferior */}
        <polygon points="1000,780 820,780 1000,1200" fill={RED} opacity="0.50" filter="url(#brr)"/>
      </svg>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
//  PAISAJE ITALIANO — marca de agua detrás del título
// ─────────────────────────────────────────────────────────────────────────────

function ItalianLandscape() {
  return (
    <svg width="100%" height="160" viewBox="0 0 800 160" preserveAspectRatio="xMidYMid meet"
      xmlns="http://www.w3.org/2000/svg" aria-hidden style={{ display: "block" }}>
      {/* Colinas lejanas */}
      <path d="M 0,140 Q 60,80 140,100 Q 200,115 260,85 Q 320,55 380,75 Q 440,95 500,65 Q 560,35 620,60 Q 680,85 740,70 Q 780,58 800,65 L 800,160 L 0,160 Z"
        fill={INK} opacity="0.040"/>
      {/* Colinas medias */}
      <path d="M 0,155 Q 80,120 160,135 Q 220,145 300,120 Q 360,100 420,118 Q 490,138 560,115 Q 630,92 700,110 Q 760,125 800,115 L 800,160 L 0,160 Z"
        fill={INK} opacity="0.032"/>
      {/* Ciprés izquierdo */}
      <path d="M 155,100 C 150,80 152,60 155,40 C 158,60 160,80 155,100 Z"
        fill={INK} opacity="0.048"/>
      <path d="M 155,40 C 151,30 153,18 155,8 C 157,18 159,30 155,40 Z"
        fill={INK} opacity="0.038"/>
      {/* Ciprés derecho */}
      <path d="M 640,90 C 635,72 637,54 640,36 C 643,54 645,72 640,90 Z"
        fill={INK} opacity="0.045"/>
      <path d="M 640,36 C 637,26 638,16 640,6 C 642,16 643,26 640,36 Z"
        fill={INK} opacity="0.035"/>
      {/* Pequeño ciprés centro */}
      <path d="M 420,88 C 416,72 418,58 420,44 C 422,58 424,72 420,88 Z"
        fill={INK} opacity="0.030"/>
      {/* Casa/campanario izquierda */}
      <rect x="88" y="110" width="28" height="38" fill={INK} opacity="0.030"/>
      <path d="M 84,110 L 102,92 L 120,110 Z" fill={INK} opacity="0.030"/>
      <rect x="96" y="126" width="12" height="22" fill={INK} opacity="0.022"/>
      {/* Torre campanario */}
      <rect x="94" y="95" width="16" height="18" fill={INK} opacity="0.025"/>
      <path d="M 94,95 L 102,85 L 110,95 Z" fill={INK} opacity="0.025"/>
      {/* Casa derecha */}
      <rect x="580" y="118" width="24" height="32" fill={INK} opacity="0.028"/>
      <path d="M 576,118 L 592,104 L 608,118 Z" fill={INK} opacity="0.028"/>
      {/* Árboles fondo */}
      <ellipse cx="220" cy="125" rx="14" ry="22" fill={INK} opacity="0.022"/>
      <ellipse cx="248" cy="128" rx="11" ry="18" fill={INK} opacity="0.020"/>
      <ellipse cx="530" cy="120" rx="13" ry="20" fill={INK} opacity="0.022"/>
      <ellipse cx="555" cy="122" rx="10" ry="17" fill={INK} opacity="0.018"/>
    </svg>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
//  ILUSTRACIONES — estilo grabado artesanal
// ─────────────────────────────────────────────────────────────────────────────

function TomatoCluster() {
  return (
    <svg width="130" height="145" viewBox="0 0 130 145" xmlns="http://www.w3.org/2000/svg" aria-hidden>
      {/* Tomate grande */}
      <circle cx="55" cy="92" r="42" fill={RED} opacity="0.85"/>
      {/* Degradado interno */}
      <ellipse cx="42" cy="78" rx="14" ry="10" fill="rgba(255,255,255,0.22)"/>
      {/* Líneas de grabado */}
      <path d="M 20,84 Q 36,102 55,96 Q 74,90 88,108" stroke={DARK} strokeWidth="0.55" fill="none" opacity="0.18"/>
      <path d="M 17,96 Q 33,112 55,108 Q 77,104 90,118" stroke={DARK} strokeWidth="0.55" fill="none" opacity="0.14"/>
      {/* Cáliz verde */}
      <path d="M 55,50 C 47,36 34,33 31,42 C 38,44 46,47 55,50 Z" fill={GRN} opacity="0.92"/>
      <path d="M 55,50 C 63,36 76,33 79,42 C 72,44 64,47 55,50 Z" fill={GRN} opacity="0.92"/>
      <path d="M 55,50 C 52,34 48,26 43,27 C 44,34 49,42 55,50 Z" fill={GRN2}/>
      <path d="M 55,50 C 58,34 62,26 67,27 C 66,34 61,42 55,50 Z" fill={GRN2}/>
      <circle cx="55" cy="50" r="3.5" fill={GRN2}/>
      {/* Contorno */}
      <circle cx="55" cy="92" r="42" fill="none" stroke={DARK} strokeWidth="1.3" opacity="0.52"/>
      {/* Tomate pequeño */}
      <circle cx="96" cy="76" r="26" fill={RED} opacity="0.72"/>
      <ellipse cx="88" cy="66" rx="7" ry="5" fill="rgba(255,255,255,0.18)"/>
      <path d="M 96,50 C 90,40 82,39 80,45 C 85,46 90,48 96,50 Z" fill={GRN} opacity="0.85"/>
      <path d="M 96,50 C 102,40 110,39 112,45 C 107,46 102,48 96,50 Z" fill={GRN} opacity="0.85"/>
      <circle cx="96" cy="50" r="2.5" fill={GRN2}/>
      <circle cx="96" cy="76" r="26" fill="none" stroke={DARK} strokeWidth="1.0" opacity="0.42"/>
      {/* Albahaca */}
      <ellipse cx="28" cy="56" rx="11" ry="18" fill={GRN} opacity="0.78" transform="rotate(-38, 28, 56)"/>
      <path d="M 28,42 Q 20,56 28,68" stroke={GRN2} strokeWidth="0.9" fill="none"/>
      <ellipse cx="16" cy="66" rx="9" ry="14" fill={GRN2} opacity="0.68" transform="rotate(-52, 16, 66)"/>
      <ellipse cx="36" cy="44" rx="7" ry="12" fill={GRN} opacity="0.65" transform="rotate(-22, 36, 44)"/>
    </svg>
  );
}

function PizzaIllustration() {
  return (
    <svg width="185" height="178" viewBox="0 0 185 178" xmlns="http://www.w3.org/2000/svg" aria-hidden>
      {/* Sombra */}
      <ellipse cx="93" cy="168" rx="80" ry="10" fill={DARK} opacity="0.10"/>
      {/* Base masa */}
      <circle cx="93" cy="90" r="84" fill="#D4A240" opacity="0.88"/>
      {/* Borde de masa */}
      <circle cx="93" cy="90" r="84" fill="none" stroke="#8B4510" strokeWidth="12" opacity="0.78"/>
      {/* Salsa tomate */}
      <circle cx="93" cy="90" r="71" fill={RED} opacity="0.72"/>
      {/* Mozzarella — manchas irregulares */}
      <path d="M 93,65 C 100,58 112,60 115,70 C 118,80 110,88 100,84 C 90,80 86,70 93,65 Z" fill={CREAM} opacity="0.90"/>
      <path d="M 68,82 C 72,74 84,74 86,84 C 88,94 78,100 70,96 C 62,92 64,90 68,82 Z" fill={CREAM} opacity="0.88"/>
      <path d="M 106,94 C 112,86 122,88 124,98 C 126,108 118,114 110,110 C 102,106 100,102 106,94 Z" fill={CREAM} opacity="0.86"/>
      <path d="M 80,106 C 84,98 96,98 98,108 C 100,118 90,124 82,120 C 74,116 76,114 80,106 Z" fill={CREAM} opacity="0.88"/>
      <path d="M 104,72 C 108,64 118,66 120,74 C 122,82 114,88 106,84 Z" fill={CREAM} opacity="0.82"/>
      {/* Aceitunas */}
      <circle cx="80" cy="76" r="5" fill={DARK} opacity="0.72"/>
      <circle cx="80" cy="76" r="2" fill={CREAM} opacity="0.40"/>
      <circle cx="108" cy="108" r="4.5" fill={DARK} opacity="0.70"/>
      <circle cx="108" cy="108" r="1.8" fill={CREAM} opacity="0.35"/>
      <circle cx="76" cy="104" r="4" fill={DARK} opacity="0.68"/>
      {/* Pimientos verdes */}
      <ellipse cx="100" cy="80" rx="3.5" ry="7" fill={GRN} opacity="0.82" transform="rotate(25, 100, 80)"/>
      <ellipse cx="82" cy="100" rx="3" ry="6.5" fill={GRN} opacity="0.78" transform="rotate(-18, 82, 100)"/>
      <ellipse cx="112" cy="86" rx="3" ry="6" fill={GRN2} opacity="0.72" transform="rotate(40, 112, 86)"/>
      {/* Líneas de corte */}
      <line x1="93" y1="6" x2="93" y2="174" stroke={DARK} strokeWidth="0.7" opacity="0.18"/>
      <line x1="9" y1="90" x2="177" y2="90" stroke={DARK} strokeWidth="0.7" opacity="0.18"/>
      <line x1="34" y1="31" x2="152" y2="149" stroke={DARK} strokeWidth="0.7" opacity="0.14"/>
      <line x1="152" y1="31" x2="34" y2="149" stroke={DARK} strokeWidth="0.7" opacity="0.14"/>
      {/* Contorno */}
      <circle cx="93" cy="90" r="84" fill="none" stroke={DARK} strokeWidth="1.5" opacity="0.48"/>
      {/* Hoja de albahaca fresca */}
      <ellipse cx="96" cy="68" rx="8" ry="14" fill={GRN} opacity="0.82" transform="rotate(18, 96, 68)"/>
      <path d="M 96,58 Q 92,68 96,78" stroke={GRN2} strokeWidth="0.9" fill="none"/>
      <ellipse cx="85" cy="72" rx="6" ry="11" fill={GRN2} opacity="0.72" transform="rotate(-12, 85, 72)"/>
    </svg>
  );
}

function PastaPlate() {
  return (
    <svg width="155" height="145" viewBox="0 0 155 145" xmlns="http://www.w3.org/2000/svg" aria-hidden>
      {/* Sombra plato */}
      <ellipse cx="78" cy="136" rx="68" ry="10" fill={DARK} opacity="0.10"/>
      {/* Plato exterior */}
      <ellipse cx="78" cy="102" rx="72" ry="26" fill="#EDE4CC"/>
      {/* Plato interior */}
      <ellipse cx="78" cy="100" rx="64" ry="22" fill={CREAM}/>
      {/* Pasta — nido */}
      <ellipse cx="78" cy="92" rx="48" ry="26" fill="#C8991E" opacity="0.60"/>
      {/* Hebras de espagueti */}
      {[
        ["M 36,88 Q 52,76 68,83 Q 84,90 100,80 Q 114,70 124,78", 0.68],
        ["M 34,96 Q 50,84 66,91 Q 82,98 98,88 Q 112,78 122,86", 0.64],
        ["M 36,104 Q 52,92 68,99 Q 84,106 100,96 Q 114,86 122,94", 0.60],
        ["M 40,112 Q 55,100 70,106 Q 86,112 100,104 Q 114,96 120,102", 0.56],
        ["M 34,80 Q 50,68 66,75 Q 82,82 98,72 Q 112,62 120,70", 0.62],
      ].map(([d, op], i) => (
        <path key={i} d={d as string} stroke="#B87E10" strokeWidth="2.2" fill="none"
          opacity={op as number} strokeLinecap="round"/>
      ))}
      {/* Salsa roja encima */}
      <ellipse cx="78" cy="88" rx="26" ry="16" fill={RED} opacity="0.58"/>
      {/* Parmesano rallado */}
      <ellipse cx="78" cy="84" rx="18" ry="10" fill={CREAM} opacity="0.65"/>
      {/* Albahaca */}
      <ellipse cx="76" cy="76" rx="8" ry="13" fill={GRN} opacity="0.80" transform="rotate(-22, 76, 76)"/>
      <path d="M 76,68 Q 72,76 76,86" stroke={GRN2} strokeWidth="0.9" fill="none"/>
      <ellipse cx="86" cy="74" rx="7" ry="10" fill={GRN2} opacity="0.72" transform="rotate(16, 86, 74)"/>
      {/* Borde plato */}
      <ellipse cx="78" cy="102" rx="72" ry="26" fill="none" stroke={DARK} strokeWidth="1.3" opacity="0.38"/>
      <ellipse cx="78" cy="100" rx="64" ry="22" fill="none" stroke={DARK} strokeWidth="0.7" opacity="0.25"/>
      {/* Tenedor */}
      <rect x="134" y="32" width="6" height="62" rx="3" fill={DARK} opacity="0.52"/>
      <rect x="129" y="30" width="2.5" height="22" rx="1.2" fill={DARK} opacity="0.52"/>
      <rect x="133" y="30" width="2.5" height="22" rx="1.2" fill={DARK} opacity="0.52"/>
      <rect x="137" y="30" width="2.5" height="22" rx="1.2" fill={DARK} opacity="0.52"/>
      <rect x="141" y="30" width="2.5" height="22" rx="1.2" fill={DARK} opacity="0.52"/>
    </svg>
  );
}

function OliveOilBottle() {
  return (
    <svg width="68" height="168" viewBox="0 0 68 168" xmlns="http://www.w3.org/2000/svg" aria-hidden>
      <rect x="28" y="4"  width="14" height="18" rx="3"  fill="#7A5030"/>
      <rect x="30" y="6"  width="10" height="12" rx="2"  fill="#9A6840"/>
      <path d="M 28,22 L 23,44 L 46,44 L 42,22 Z" fill="#7A9050" opacity="0.88"/>
      <path d="M 21,44 L 10,66 L 9,136 Q 9,152 34,152 Q 60,152 60,136 L 58,66 L 48,44 Z"
        fill="#7A9050" opacity="0.84"/>
      <path d="M 14,72 L 12,134 Q 12,148 34,148 Q 57,148 57,134 L 55,72 Z"
        fill="#C8BE20" opacity="0.62"/>
      <rect x="15" y="84"  width="40" height="54" rx="4"  fill={CREAM} opacity="0.92"/>
      <rect x="18" y="87"  width="34" height="48" rx="3"  fill="none" stroke={DARK} strokeWidth="0.8" opacity="0.38"/>
      <line x1="18" y1="108" x2="52" y2="108" stroke={GOLD} strokeWidth="0.7" opacity="0.45"/>
      <text x="34" y="104" textAnchor="middle" fontFamily="Georgia,serif" fontSize="5.8" fontWeight="700"
        fill={DARK} opacity="0.72" letterSpacing="0.5">OLIO</text>
      <text x="34" y="115" textAnchor="middle" fontFamily="Georgia,serif" fontSize="4.5"
        fill={DARK} opacity="0.58" letterSpacing="0.3">EXTRA VERGINE</text>
      <text x="34" y="124" textAnchor="middle" fontFamily="Georgia,serif" fontSize="4"
        fill={GOLD} opacity="0.55" letterSpacing="0.2">DI OLIVA</text>
      <path d="M 15,68 Q 17,96 16,128" stroke="rgba(255,255,255,0.22)" strokeWidth="3.5"
        fill="none" strokeLinecap="round"/>
      <path d="M 21,44 L 10,66 L 9,136 Q 9,152 34,152 Q 60,152 60,136 L 58,66 L 48,44 Z"
        fill="none" stroke={DARK} strokeWidth="1.3" opacity="0.44"/>
    </svg>
  );
}

function TiramisuIllustration() {
  return (
    <svg width="148" height="122" viewBox="0 0 148 122" xmlns="http://www.w3.org/2000/svg" aria-hidden>
      <ellipse cx="74" cy="112" rx="66" ry="11" fill={DARK} opacity="0.10"/>
      <ellipse cx="74" cy="108" rx="66" ry="14" fill="#E8DECC" opacity="0.85"/>
      <ellipse cx="74" cy="108" rx="58" ry="11" fill={CREAM}/>
      <path d="M 16,98 L 16,54 Q 16,46 74,46 Q 132,46 132,54 L 132,98 Z" fill="#D4A030" opacity="0.82"/>
      <rect x="16" y="66" width="116" height="10" fill="#7A4010" opacity="0.42"/>
      <rect x="16" y="82" width="116" height="10" fill="#7A4010" opacity="0.38"/>
      <ellipse cx="74" cy="54" rx="58" ry="14" fill={CREAM} opacity="0.95"/>
      <ellipse cx="74" cy="54" rx="58" ry="14" fill="#3C2010" opacity="0.32"/>
      {[50,58,66,74,82,90,98].map((x, i) => (
        <line key={i} x1={x} y1="43" x2={x-8} y2="66" stroke="#2A1808" strokeWidth="0.5" opacity="0.22"/>
      ))}
      <path d="M 16,98 L 16,54 Q 16,46 74,46 Q 132,46 132,54 L 132,98 Z"
        fill="none" stroke={DARK} strokeWidth="1.1" opacity="0.38"/>
      <ellipse cx="74" cy="54" rx="58" ry="14" fill="none" stroke={DARK} strokeWidth="0.9" opacity="0.32"/>
      <ellipse cx="100" cy="48" rx="8" ry="13" fill={GRN} opacity="0.72" transform="rotate(22, 100, 48)"/>
      <path d="M 100,40 Q 97,48 100,58" stroke={GRN2} strokeWidth="0.8" fill="none"/>
    </svg>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
//  ELEMENTOS DECORATIVOS
// ─────────────────────────────────────────────────────────────────────────────

function CircularStamp100({ rotation = -10 }: { rotation?: number }) {
  return (
    <div aria-hidden style={{ transform: `rotate(${rotation}deg)`, filter: "drop-shadow(0 2px 6px rgba(0,0,0,0.28))", width: 104, height: 104 }}>
      <svg width="104" height="104" viewBox="0 0 104 104" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <path id="s100-outer" d="M 52,52 m -43,0 a 43,43 0 1,1 86,0 a 43,43 0 1,1 -86,0"/>
          <filter id="s100-r">
            <feTurbulence type="turbulence" baseFrequency="0.06" numOctaves="3" result="n"/>
            <feDisplacementMap in="SourceGraphic" in2="n" scale="1.3" xChannelSelector="R" yChannelSelector="G"/>
          </filter>
        </defs>
        <circle cx="52" cy="52" r="50" fill={CREAM} opacity="0.96"/>
        <g filter="url(#s100-r)">
          <circle cx="52" cy="52" r="50" fill="none" stroke={GRN} strokeWidth="3"   strokeDasharray="2.5,1"   opacity="0.90"/>
          <circle cx="52" cy="52" r="43" fill="none" stroke={GRN} strokeWidth="1"   opacity="0.45"/>
          <circle cx="52" cy="52" r="35" fill="none" stroke={GRN} strokeWidth="1.5" strokeDasharray="1.5,0.5" opacity="0.55"/>
        </g>
        <text fontFamily="Georgia,serif" fontSize="7.8" fontWeight="700" letterSpacing="2.2"
          fill={GRN} opacity="0.88" textAnchor="middle">
          <textPath href="#s100-outer" startOffset="10%">✦ 100% ITALIAN ✦ QUALITY ✦</textPath>
        </text>
        <text x="52" y="48" textAnchor="middle" fontFamily="Georgia,serif" fontSize="17" fontWeight="700"
          fill={GRN} opacity="0.92">100%</text>
        <text x="52" y="61" textAnchor="middle" fontFamily="Georgia,serif" fontSize="9.5" fontWeight="700"
          letterSpacing="2" fill={GRN} opacity="0.88">ITALIAN</text>
        <text x="52" y="72" textAnchor="middle" fontFamily="Georgia,serif" fontSize="6.8"
          letterSpacing="1" fill={GRN} opacity="0.62">QUALITY</text>
        <text x="52" y="81" textAnchor="middle" fontFamily="Georgia,serif" fontSize="6"
          fill={GRN} opacity="0.48">★ ★ ★ ★ ★</text>
      </svg>
    </div>
  );
}

function BuonAppetitoCrossTag() {
  return (
    <div aria-hidden style={{ transform: "rotate(7deg)", filter: "drop-shadow(0 3px 7px rgba(0,0,0,0.24))" }}>
      <svg width="114" height="138" viewBox="0 0 114 138" xmlns="http://www.w3.org/2000/svg">
        <path d="M 57,5 Q 74,16 68,32" stroke="#9A7845" strokeWidth="1.8" fill="none"/>
        <circle cx="57" cy="5" r="3.5" fill={GOLD} opacity="0.70"/>
        <rect x="8"  y="30" width="98" height="100" rx="5" fill="#E8D4A0"/>
        <rect x="12" y="34" width="90" height="92"  rx="4" fill="#F2DEB2"/>
        <circle cx="57" cy="40" r="5.5" fill={GOLD} opacity="0.45"/>
        <circle cx="57" cy="40" r="3.2" fill="#E8D4A0"/>
        <line x1="20" y1="54" x2="94" y2="54" stroke="#A89050" strokeWidth="0.6" opacity="0.35"/>
        <text x="57" y="76"  textAnchor="middle" fontFamily="Georgia,serif" fontStyle="italic"
          fontSize="16" fontWeight="700" fill={GRN}  opacity="0.86">Buon</text>
        <text x="57" y="96"  textAnchor="middle" fontFamily="Georgia,serif" fontStyle="italic"
          fontSize="16" fontWeight="700" fill={RED}  opacity="0.86">Appetito!</text>
        <path d="M 57,105 C 57,105 48,97 48,91 C 48,88 51,86 54,88 C 55,89 57,90 57,90 C 57,90 59,89 60,88 C 63,86 66,88 66,91 C 66,97 57,105 57,105 Z"
          fill={RED} opacity="0.72"/>
        <rect x="8" y="30" width="98" height="100" rx="5" fill="none" stroke="#B09458" strokeWidth="1" opacity="0.48"/>
      </svg>
    </div>
  );
}

function RecipeStamp({ rotation = 6 }: { rotation?: number }) {
  return (
    <div aria-hidden style={{ transform: `rotate(${rotation}deg)`, filter: "drop-shadow(0 2px 5px rgba(0,0,0,0.22))" }}>
      <svg width="126" height="126" viewBox="0 0 126 126" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <path id="rs-path" d="M 63,63 m -48,0 a 48,48 0 1,1 96,0 a 48,48 0 1,1 -96,0"/>
          <filter id="rs-r">
            <feTurbulence type="turbulence" baseFrequency="0.055" numOctaves="3" result="n"/>
            <feDisplacementMap in="SourceGraphic" in2="n" scale="1.6" xChannelSelector="R" yChannelSelector="G"/>
          </filter>
        </defs>
        <circle cx="63" cy="63" r="56" fill={CREAM} opacity="0.95"/>
        <g filter="url(#rs-r)">
          <circle cx="63" cy="63" r="56" fill="none" stroke={RED} strokeWidth="2.8" strokeDasharray="3,1.2" opacity="0.84"/>
          <circle cx="63" cy="63" r="49" fill="none" stroke={RED} strokeWidth="0.8" opacity="0.40"/>
          <circle cx="63" cy="63" r="40" fill="none" stroke={RED} strokeWidth="1.6" strokeDasharray="2,0.8" opacity="0.52"/>
        </g>
        <text fontFamily="Georgia,serif" fontSize="7.2" fontWeight="700" letterSpacing="1.8"
          fill={RED} opacity="0.78" textAnchor="middle">
          <textPath href="#rs-path" startOffset="6%">✦ TRADITIONAL ✦ ITALIAN FOOD ✦</textPath>
        </text>
        <text x="63" y="55" textAnchor="middle" fontFamily="Georgia,serif" fontSize="7.5"
          letterSpacing="2" fill={RED} opacity="0.65">THE BEST</text>
        <text x="63" y="72" textAnchor="middle" fontFamily="Georgia,serif" fontSize="18"
          fontWeight="700" fontStyle="italic" fill={RED} opacity="0.88">Recipes</text>
        <path d="M 44,80 C 54,76 72,76 82,80" stroke={RED} strokeWidth="0.9" fill="none" opacity="0.48"/>
        <path d="M 63,82 C 60,86 58,90 59,93 C 60,97 66,97 67,93 C 68,90 66,86 63,82 Z"
          fill={RED} opacity="0.60"/>
      </svg>
    </div>
  );
}

function ChalkboardSign({ bodyFont }: { bodyFont: string }) {
  return (
    <div style={{
      background: CHALK,
      borderRadius: "4px",
      padding: "0.85rem 1.4rem",
      position: "relative",
      boxShadow: "inset 0 0 0 3px rgba(255,255,255,0.07), 2px 3px 9px rgba(0,0,0,0.32)",
      width: "136px",
    }}>
      <div style={{ position: "absolute", top: "-9px", left: "16px", width: "32px", height: "13px",
        background: `${GOLD}45`, transform: "rotate(-3deg)", borderRadius: "2px" }}/>
      <div style={{ position: "absolute", top: "-9px", right: "16px", width: "26px", height: "13px",
        background: `${GOLD}45`, transform: "rotate(4deg)", borderRadius: "2px" }}/>
      {["Buoni", "Vini", "Buona", "Gente"].map((line, i) => (
        <p key={i} style={{
          fontFamily: bodyFont,
          fontStyle: "italic",
          fontSize: i === 1 || i === 3 ? "1.3rem" : "1.05rem",
          fontWeight: i === 1 || i === 3 ? 600 : 400,
          color: "rgba(255,255,255,0.88)",
          margin: 0,
          lineHeight: 1.32,
          textAlign: "center",
        }}>
          {line}
        </p>
      ))}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
//  TÍTULO TIPO PÓSTER — SVG con textLength para relleno de ancho completo
// ─────────────────────────────────────────────────────────────────────────────

function PosterTitle({ line1, line2, line3 }: { line1: string; line2?: string; line3?: string }) {
  const lines = [line1, line2, line3].filter(Boolean) as string[];

  return (
    <div style={{ position: "relative", width: "100%", padding: "0 4%" }}>
      {/* Paisaje como marca de agua */}
      <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, zIndex: 0 }}>
        <ItalianLandscape/>
      </div>

      <svg
        width="100%"
        viewBox={`0 0 800 ${lines.length === 1 ? 160 : lines.length === 2 ? 260 : 340}`}
        xmlns="http://www.w3.org/2000/svg"
        style={{ display: "block", position: "relative", zIndex: 1 }}
      >
        <defs>
          <filter id="letterpress" x="-2%" y="-5%" width="104%" height="120%">
            <feOffset dx="2.5" dy="3.5" result="shadow"/>
            <feFlood floodColor={DARK} floodOpacity="0.18" result="color"/>
            <feComposite in="color" in2="shadow" operator="in" result="sc"/>
            <feMerge><feMergeNode in="sc"/><feMergeNode in="SourceGraphic"/></feMerge>
          </filter>
          <filter id="roughen-text" x="-2%" y="-10%" width="104%" height="130%">
            <feTurbulence type="fractalNoise" baseFrequency="0.04" numOctaves="4" result="noise"/>
            <feDisplacementMap in="SourceGraphic" in2="noise" scale="1.5" xChannelSelector="R" yChannelSelector="G"/>
          </filter>
        </defs>

        {lines.map((line, i) => {
          const y = lines.length === 1
            ? 138
            : lines.length === 2
              ? [148, 248][i]
              : [128, 228, 320][i];
          const fontSize = lines.length === 1 ? 148 : lines.length === 2 ? [148, 112][i] : [118, 110, 88][i];
          const fill = i === 1 && lines.length > 1 ? RED : i === 2 ? RED : DARK;
          const textLen = 786;

          return (
            <text key={i}
              x="400"
              y={y}
              textAnchor="middle"
              textLength={textLen}
              lengthAdjust="spacingAndGlyphs"
              fontFamily={`"Cormorant Garamond", Palatino, "Book Antiqua", Georgia, serif`}
              fontWeight="700"
              fontSize={fontSize}
              fill={fill}
              filter="url(#letterpress)"
              style={{ textTransform: "uppercase" } as React.CSSProperties}
            >
              {line.toUpperCase()}
            </text>
          );
        })}
      </svg>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
//  CABECERA COMPLETA
// ─────────────────────────────────────────────────────────────────────────────

function PosterHeader({ name, tagline, logo, logoAlt, showLogo, bodyFont }: {
  name: string; tagline?: string; logo?: string; logoAlt?: string;
  showLogo: boolean; bodyFont: string;
}) {
  const words = name.trim().split(/\s+/);
  let line1 = "", line2 = "", line3 = "";
  if (words.length === 1) {
    line1 = words[0];
  } else if (words.length === 2) {
    [line1, line2] = words;
  } else {
    line1 = words[0];
    line2 = words.slice(1, -1).join(" ") || words[1];
    line3 = words[words.length - 1];
  }

  return (
    <div style={{ position: "relative", textAlign: "center", paddingTop: "1.5rem", zIndex: 2 }}>

      {/* Logo si existe */}
      {showLogo && logo && (
        <div style={{ marginBottom: "0.5rem" }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={logo} alt={logoAlt ?? name}
            style={{ height: "5rem", objectFit: "contain", filter: "sepia(0.2) contrast(1.1)", opacity: 0.88 }}/>
        </div>
      )}

      {/* "Since 1984" con curvas decorativas */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "0.5rem", marginBottom: "0.3rem" }}>
        <svg width="88" height="14" viewBox="0 0 88 14" xmlns="http://www.w3.org/2000/svg" aria-hidden>
          <path d="M 0,7 Q 24,2 44,7 Q 64,12 88,7" stroke={DARK} strokeWidth="1.1" fill="none" opacity="0.52"/>
          <circle cx="5"  cy="7" r="2.2" fill={DARK} opacity="0.38"/>
          <circle cx="83" cy="7" r="2.2" fill={DARK} opacity="0.38"/>
        </svg>
        <span style={{ fontFamily: `"Cormorant Garamond", Georgia, serif`, fontSize: "0.70rem",
          fontWeight: 700, letterSpacing: "0.46em", color: DARK, opacity: 0.68,
          textTransform: "uppercase", whiteSpace: "nowrap" }}>
          Since 1984
        </span>
        <svg width="88" height="14" viewBox="0 0 88 14" xmlns="http://www.w3.org/2000/svg" aria-hidden>
          <path d="M 0,7 Q 24,12 44,7 Q 64,2 88,7" stroke={DARK} strokeWidth="1.1" fill="none" opacity="0.52"/>
          <circle cx="5"  cy="7" r="2.2" fill={DARK} opacity="0.38"/>
          <circle cx="83" cy="7" r="2.2" fill={DARK} opacity="0.38"/>
        </svg>
      </div>

      {/* TÍTULO — woodblock SVG full-width */}
      <PosterTitle line1={line1} line2={line2 || undefined} line3={line3 || undefined}/>

      {/* "Fatto con Amore" en cursiva con flechas */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "0.6rem",
        margin: "0.2rem 0 0.55rem", padding: "0 2rem" }}>
        <svg width="58" height="16" viewBox="0 0 58 16" xmlns="http://www.w3.org/2000/svg" aria-hidden>
          <path d="M 56,8 L 4,8 M 4,8 L 12,3 M 4,8 L 12,13" stroke={DARK} strokeWidth="1.3" fill="none" opacity="0.58" strokeLinecap="round"/>
        </svg>
        <span style={{ fontFamily: bodyFont, fontStyle: "italic", fontSize: "1.75rem",
          color: DARK, lineHeight: 1, fontWeight: 400, letterSpacing: "0.01em" }}>
          Fatto con Amore
        </span>
        <svg width="58" height="16" viewBox="0 0 58 16" xmlns="http://www.w3.org/2000/svg" aria-hidden>
          <path d="M 2,8 L 54,8 M 54,8 L 46,3 M 54,8 L 46,13" stroke={DARK} strokeWidth="1.3" fill="none" opacity="0.58" strokeLinecap="round"/>
        </svg>
      </div>

      {/* Banner negro "AUTHENTIC ITALIAN FOOD" */}
      <div style={{ display: "flex", justifyContent: "center" }}>
        <div style={{ background: DARK, padding: "0.52rem 0", width: "100%", display: "flex",
          alignItems: "center", justifyContent: "center", position: "relative" }}>
          <div style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: "12px",
            background: DARK, clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)" }}/>
          <span style={{ fontFamily: `"Cormorant Garamond", Georgia, serif`, fontSize: "0.80rem",
            fontWeight: 700, letterSpacing: "0.36em", color: "rgba(255,255,255,0.95)",
            textTransform: "uppercase" }}>
            {tagline || "Authentic Italian Food"}
          </span>
        </div>
      </div>

      {/* Separador con ornamento */}
      <div style={{ display: "flex", alignItems: "center", gap: "0.6rem", padding: "0.75rem 1.5rem 0" }}>
        <div style={{ flex: 1, height: "1.5px", background: `linear-gradient(to right, transparent, ${DARK}32)` }}/>
        <svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" aria-hidden>
          <polygon points="10,1 12,8 19,8 13,12 15,19 10,15 5,19 7,12 1,8 8,8"
            fill="none" stroke={GOLD} strokeWidth="1.2" opacity="0.62"/>
        </svg>
        <div style={{ flex: 1, height: "1.5px", background: `linear-gradient(to left, transparent, ${DARK}32)` }}/>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
//  CABECERA DE CATEGORÍA
// ─────────────────────────────────────────────────────────────────────────────

function CategoryHeader({ name, subtitle, color, headingFont, bodyFont }: {
  name: string; subtitle?: string; color: string; headingFont: string; bodyFont: string;
}) {
  return (
    <div style={{ marginBottom: "0.75rem" }}>
      <div style={{ display: "flex", alignItems: "center", gap: "0.4rem", flexWrap: "wrap" }}>
        {/* Hojitas izquierda */}
        <svg width="28" height="22" viewBox="0 0 28 22" xmlns="http://www.w3.org/2000/svg" aria-hidden>
          <ellipse cx="8"  cy="12" rx="4.5" ry="9" fill={GRN}  opacity="0.68" transform="rotate(-22, 8, 12)"/>
          <ellipse cx="19" cy="9"  rx="4"   ry="8" fill={GRN2} opacity="0.62" transform="rotate(-6, 19, 9)"/>
          <path d="M 2,12 Q 14,6 24,12" stroke={GRN2} strokeWidth="0.9" fill="none" opacity="0.50"/>
        </svg>

        <h2 style={{ fontFamily: headingFont, fontSize: "clamp(1.8rem, 5vw, 2.9rem)",
          fontWeight: 700, fontStyle: "italic", color, lineHeight: 1, margin: 0,
          letterSpacing: "0.015em", textShadow: `1px 1px 0 ${color}18` }}>
          {name}
        </h2>

        {/* Hojitas derecha */}
        <svg width="28" height="22" viewBox="0 0 28 22" xmlns="http://www.w3.org/2000/svg" aria-hidden
          style={{ transform: "scaleX(-1)" }}>
          <ellipse cx="8"  cy="12" rx="4.5" ry="9" fill={GRN}  opacity="0.68" transform="rotate(-22, 8, 12)"/>
          <ellipse cx="19" cy="9"  rx="4"   ry="8" fill={GRN2} opacity="0.62" transform="rotate(-6, 19, 9)"/>
          <path d="M 2,12 Q 14,6 24,12" stroke={GRN2} strokeWidth="0.9" fill="none" opacity="0.50"/>
        </svg>
      </div>

      {subtitle && (
        <p style={{ fontFamily: bodyFont, fontStyle: "italic", fontSize: "0.95rem",
          color, margin: "0.05rem 0 0.3rem 2px", opacity: 0.68, lineHeight: 1 }}>
          {subtitle}
        </p>
      )}

      <div style={{ display: "flex", alignItems: "center", gap: "0.35rem", marginTop: "0.2rem" }}>
        <div style={{ flex: 1, height: "1px", background: `${color}38` }}/>
        <div style={{ width: "4px", height: "4px", borderRadius: "50%", background: color, opacity: 0.42 }}/>
        <div style={{ width: "24px", height: "1px", background: `${color}38` }}/>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
//  ITEM DE MENÚ
// ─────────────────────────────────────────────────────────────────────────────

function MenuItem({ name, description, price, currency, featured, allergens,
  showPrice, showDescription, headingFont, bodyFont, isLast }: {
  name?: string; description?: string; price?: number; currency?: string;
  featured?: boolean; allergens?: Allergen[]; showPrice: boolean;
  showDescription: boolean; headingFont: string; bodyFont: string; isLast: boolean;
}) {
  return (
    <div style={{ marginBottom: isLast ? 0 : "0.78rem", paddingBottom: isLast ? 0 : "0.78rem",
      borderBottom: isLast ? "none" : `1px dotted ${INK}18` }}>
      <div style={{ display: "flex", alignItems: "baseline", gap: "0.35rem" }}>
        {featured && <span style={{ color: GOLD, fontSize: "0.72rem", flexShrink: 0 }}>★</span>}
        <span style={{ fontFamily: headingFont, fontSize: "0.82rem", fontWeight: 700,
          letterSpacing: "0.07em", textTransform: "uppercase", color: INK,
          flex: "0 1 auto", lineHeight: 1.25 }}>
          {name}
        </span>
        {showPrice && (
          <span style={{ flex: 1, borderBottom: `1.5px dotted ${INK}22`,
            marginBottom: "2px", minWidth: "0.8rem" }}/>
        )}
        {showPrice && price !== undefined && price > 0 && (
          <span style={{ fontFamily: bodyFont, fontSize: "0.88rem", fontWeight: 700,
            color: INK, flexShrink: 0, lineHeight: 1.25 }}>
            {formatPrice(price, currency)}
          </span>
        )}
      </div>
      {showDescription && description && (
        <p style={{ fontFamily: bodyFont, fontSize: "0.76rem", fontStyle: "italic",
          color: INK, opacity: 0.52, lineHeight: 1.48, margin: "0.12rem 0 0",
          paddingLeft: featured ? "1rem" : "0" }}>
          {description}
        </p>
      )}
      {allergens && allergens.length > 0 && (
        <AllergenBadges allergens={allergens} fontSize="0.50rem" opacity={0.36} marginTop="0.18rem"/>
      )}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
//  PLANTILLA PRINCIPAL
// ─────────────────────────────────────────────────────────────────────────────

const CAT_SUBTITLES = [
  "Starters", "Homemade", "From the Wood Oven", "Main Courses",
  "Desserts", "Grilled", "Seafood", "Specials",
];
const CAT_COLORS = [GRN, RED, GRN, RED, GRN, RED, GRN, RED];

export function PizzaTrattoriaTemplate({ project, categories, design, lang }: TemplateProps) {
  const { restaurantInfo, branding, hero } = project;
  const { layout } = design;
  const typo = resolveTypography(design);

  const visible = categories
    .filter((c) => c.visible)
    .sort((a, b) => a.sortOrder - b.sortOrder)
    .filter((c) => c.items.filter((i) => i.available).length > 0);

  const hasLogo = !!(branding?.showLogo && branding.logo);
  const showHero =
    design.capabilities.supportsHeroSection &&
    !!hero?.showHero &&
    (!!hero.heroImage || !!(hero.title?.[lang] || hero.title?.["es"]));
  const heroTitle = (showHero && t(hero?.title, lang)) ? t(hero!.title, lang) : restaurantInfo.name;

  const mid   = Math.ceil(visible.length / 2);
  const left  = visible.slice(0, mid);
  const right = visible.slice(mid);

  return (
    <BackgroundLayer design={design} style={{
      color: INK, fontFamily: typo.bodyFont, minHeight: "100%", position: "relative",
      background: `${PAPER}, linear-gradient(148deg, #FBF2DB 0%, ${BG} 50%, #EDE2C0 100%)`,
    }}>

      {/* Bloques bandera italiana */}
      <ItalianFlagBlocks/>

      <div style={{ position: "relative", zIndex: 1 }}>

        {/* ── Sello + Etiqueta sobre el header ── */}
        <div style={{ position: "relative" }}>
          <div style={{ position: "absolute", top: "1.2rem", left: "1.2rem", zIndex: 10 }}>
            <CircularStamp100 rotation={-10}/>
          </div>
          <div style={{ position: "absolute", top: "0.8rem", right: "1.0rem", zIndex: 10 }}>
            <BuonAppetitoCrossTag/>
          </div>

          <PosterHeader
            name={heroTitle}
            tagline={restaurantInfo.tagline}
            logo={branding?.logo}
            logoAlt={restaurantInfo.name}
            showLogo={hasLogo}
            bodyFont={typo.bodyFont}
          />
        </div>

        {/* ── 2 COLUMNAS DE CATEGORÍAS ── */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 0, padding: "0.5rem 1.4rem 0" }}>

          {/* Columna izquierda */}
          <div style={{ paddingRight: "1.1rem", borderRight: `1px solid ${INK}14` }}>
            {left.map((cat, idx) => {
              const items = cat.items.filter((i) => i.available).sort((a, b) => a.sortOrder - b.sortOrder);
              return (
                <div key={cat.id} style={{ marginBottom: "1.6rem" }}>
                  <CategoryHeader
                    name={t(cat.name, lang) ?? ""}
                    subtitle={CAT_SUBTITLES[idx]}
                    color={CAT_COLORS[idx % CAT_COLORS.length]}
                    headingFont={typo.categoryFont}
                    bodyFont={typo.bodyFont}
                  />
                  {items.map((item, i) => (
                    <MenuItem key={item.id}
                      name={t(item.name, lang)}
                      description={layout.showDescriptions ? t(item.description, lang) || undefined : undefined}
                      price={item.price} currency={item.currency}
                      featured={item.featured} allergens={item.allergens?.contains}
                      showPrice={layout.showPrices} showDescription={layout.showDescriptions}
                      headingFont={typo.categoryFont} bodyFont={typo.bodyFont}
                      isLast={i === items.length - 1}
                    />
                  ))}
                </div>
              );
            })}

            {/* Pizarra artesanal */}
            <div style={{ marginTop: "0.4rem", marginBottom: "0.8rem" }}>
              <ChalkboardSign bodyFont={typo.bodyFont}/>
            </div>
          </div>

          {/* Columna derecha */}
          <div style={{ paddingLeft: "1.1rem", position: "relative" }}>
            {right.map((cat, idx) => {
              const gi = left.length + idx;
              const items = cat.items.filter((i) => i.available).sort((a, b) => a.sortOrder - b.sortOrder);
              return (
                <div key={cat.id} style={{ marginBottom: "1.6rem" }}>
                  <CategoryHeader
                    name={t(cat.name, lang) ?? ""}
                    subtitle={CAT_SUBTITLES[gi] ?? "Specialty"}
                    color={CAT_COLORS[gi % CAT_COLORS.length]}
                    headingFont={typo.categoryFont}
                    bodyFont={typo.bodyFont}
                  />
                  {items.map((item, i) => (
                    <MenuItem key={item.id}
                      name={t(item.name, lang)}
                      description={layout.showDescriptions ? t(item.description, lang) || undefined : undefined}
                      price={item.price} currency={item.currency}
                      featured={item.featured} allergens={item.allergens?.contains}
                      showPrice={layout.showPrices} showDescription={layout.showDescriptions}
                      headingFont={typo.categoryFont} bodyFont={typo.bodyFont}
                      isLast={i === items.length - 1}
                    />
                  ))}
                </div>
              );
            })}

            {/* Sello flotante */}
            <div style={{ display: "flex", justifyContent: "flex-end", marginTop: "0.4rem" }}>
              <RecipeStamp rotation={5}/>
            </div>
          </div>
        </div>

        {/* ── ILUSTRACIONES INTEGRADAS ── */}
        {/* Tomates — izquierda bajo header */}
        <div style={{ position: "absolute", top: "340px", left: "-6px", zIndex: 0, opacity: 0.88 }}>
          <TomatoCluster/>
        </div>
        {/* Pasta + botella — derecha */}
        <div style={{ position: "absolute", top: "280px", right: "-4px", zIndex: 0, opacity: 0.82 }}>
          <PastaPlate/>
        </div>
        <div style={{ position: "absolute", top: "430px", right: "-4px", zIndex: 0, opacity: 0.78 }}>
          <OliveOilBottle/>
        </div>

        {/* ── PIE — pizza + tiramisu + footer ── */}
        <div style={{ position: "relative", padding: "0 0 0.5rem" }}>
          {/* Pizza — abajo izquierda */}
          <div style={{ position: "absolute", bottom: "-10px", left: "-14px", zIndex: 0, opacity: 0.84 }}>
            <PizzaIllustration/>
          </div>
          {/* Tiramisú — abajo derecha */}
          <div style={{ position: "absolute", bottom: "-5px", right: "-8px", zIndex: 0, opacity: 0.80 }}>
            <TiramisuIllustration/>
          </div>

          {/* "GRAZIE E ARRIVEDERCI!" */}
          <div style={{ textAlign: "center", padding: "1.2rem 2rem 0.5rem", position: "relative", zIndex: 2 }}>
            <div style={{ display: "inline-block", border: `1.5px solid ${INK}38`,
              padding: "0.45rem 2.2rem" }}>
              <span style={{ fontFamily: `"Cormorant Garamond", Georgia, serif`,
                fontSize: "0.76rem", fontWeight: 700, letterSpacing: "0.32em",
                color: INK, opacity: 0.62, textTransform: "uppercase" }}>
                Grazie e Arrivederci!
              </span>
            </div>
          </div>

          {/* Info contacto */}
          {(restaurantInfo.address || restaurantInfo.phone || restaurantInfo.website ||
            restaurantInfo.socialLinks?.instagram) && (
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center",
              padding: "0.4rem 1.8rem 1.2rem", flexWrap: "wrap", gap: "0.3rem",
              position: "relative", zIndex: 2 }}>
              <span style={{ fontFamily: typo.bodyFont, fontSize: "0.65rem", color: INK, opacity: 0.46 }}>
                {restaurantInfo.socialLinks?.instagram
                  ? `📷 ${restaurantInfo.socialLinks.instagram}` : ""}
              </span>
              <div style={{ display: "flex", gap: "1.2rem", justifyContent: "center" }}>
                {[restaurantInfo.address, restaurantInfo.phone].filter(Boolean).map((v, i) => (
                  <span key={i} style={{ fontFamily: typo.bodyFont, fontSize: "0.65rem", color: INK, opacity: 0.46 }}>
                    {v}
                  </span>
                ))}
              </div>
              <span style={{ fontFamily: typo.bodyFont, fontSize: "0.65rem", color: INK, opacity: 0.46 }}>
                {restaurantInfo.website ?? ""}
              </span>
            </div>
          )}
        </div>
      </div>
    </BackgroundLayer>
  );
}
