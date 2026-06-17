"use client";

import { t } from "@/utils/translation";
import { formatPrice } from "@/utils/price";
import { AllergenBadges, BackgroundLayer } from "./shared";
import type { TemplateProps } from "./types";
import { resolveTypography } from "@/types/template";
import type { Allergen } from "@/types/menu";

// ─────────────────────────────────────────────────────────────────────────────
//  PALETA — colores de imprenta italiana auténtica
// ─────────────────────────────────────────────────────────────────────────────

const BG      = "#F5EDD4";   // pergamino cálido
const DARK    = "#1E1005";   // tinta oscura para título
const RED     = "#C0312A";   // rojo bandera italiana
const RED2    = "#962020";   // rojo profundo
const GREEN   = "#1A5C32";   // verde bandera italiana
const GREEN2  = "#256B3A";
const GOLD    = "#C49A28";   // oro antiguo
const INK     = "#1C0F08";   // tinta casi negra
const CHALK   = "#2A3826";   // verde pizarra
const CREAM   = "#FBF3DE";   // crema claro

// Textura de papel
const PAPER = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.72' numOctaves='4' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='300' height='300' filter='url(%23n)' opacity='0.042'/%3E%3C/svg%3E")`;

// ─────────────────────────────────────────────────────────────────────────────
//  BLOQUES DE BANDERA ITALIANA — esquinas en pincelada
// ─────────────────────────────────────────────────────────────────────────────

function ItalianFlagBlocks() {
  return (
    <div aria-hidden style={{ position: "absolute", inset: 0, pointerEvents: "none", zIndex: 0, overflow: "hidden" }}>
      <svg width="100%" height="100%" style={{ position: "absolute", inset: 0 }} xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
        <defs>
          <filter id="brush-rough" x="-5%" y="-5%" width="110%" height="110%">
            <feTurbulence type="turbulence" baseFrequency="0.025 0.04" numOctaves="4" seed="8" result="noise"/>
            <feDisplacementMap in="SourceGraphic" in2="noise" scale="18" xChannelSelector="R" yChannelSelector="G"/>
          </filter>
          <filter id="brush-rough-r" x="-5%" y="-5%" width="110%" height="110%">
            <feTurbulence type="turbulence" baseFrequency="0.025 0.04" numOctaves="4" seed="12" result="noise"/>
            <feDisplacementMap in="SourceGraphic" in2="noise" scale="18" xChannelSelector="R" yChannelSelector="G"/>
          </filter>
        </defs>
        {/* Verde — esquina superior izquierda */}
        <polygon points="0,0 420,0 0,560" fill={GREEN} opacity="0.88" filter="url(#brush-rough)"/>
        {/* Verde más claro interior */}
        <polygon points="0,0 330,0 0,430" fill={GREEN2} opacity="0.30" filter="url(#brush-rough)"/>
        {/* Rojo — esquina superior derecha */}
        <polygon points="1190,0 800,0 1190,560" fill={RED} opacity="0.88" filter="url(#brush-rough-r)"/>
        {/* Rojo más claro interior */}
        <polygon points="1190,0 900,0 1190,430" fill={RED2} opacity="0.30" filter="url(#brush-rough-r)"/>
        {/* Rojo — franja derecha media */}
        <polygon points="1190,600 980,600 1190,1100" fill={RED} opacity="0.55" filter="url(#brush-rough-r)"/>
      </svg>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
//  ILUSTRACIONES — estilo grabado artesanal
// ─────────────────────────────────────────────────────────────────────────────

function TomatoCluster({ width = 120, height = 130 }: { width?: number; height?: number }) {
  return (
    <svg width={width} height={height} viewBox="0 0 120 130" xmlns="http://www.w3.org/2000/svg" aria-hidden>
      <defs>
        <filter id="engrave-t"><feGaussianBlur stdDeviation="0.4"/></filter>
      </defs>
      {/* Tomate grande */}
      <circle cx="50" cy="80" r="38" fill={RED} opacity="0.82"/>
      <ellipse cx="38" cy="65" rx="10" ry="7" fill="rgba(255,255,255,0.20)"/>
      {/* Rayas de grabado */}
      <path d="M 18,72 Q 32,90 50,84 Q 68,78 80,92" stroke={DARK} strokeWidth="0.5" fill="none" opacity="0.18"/>
      <path d="M 15,82 Q 30,98 50,94 Q 70,90 82,102" stroke={DARK} strokeWidth="0.5" fill="none" opacity="0.15"/>
      {/* Cáliz */}
      <path d="M 50,42 C 44,30 32,27 29,35 C 35,37 42,39 50,42 Z" fill={GREEN} opacity="0.9"/>
      <path d="M 50,42 C 56,30 68,27 71,35 C 65,37 58,39 50,42 Z" fill={GREEN} opacity="0.9"/>
      <path d="M 50,42 C 48,28 44,22 40,23 C 41,30 45,36 50,42 Z" fill={GREEN2}/>
      <path d="M 50,42 C 52,28 56,22 60,23 C 59,30 55,36 50,42 Z" fill={GREEN2}/>
      <circle cx="50" cy="42" r="3" fill={GREEN2}/>
      {/* Contorno grabado */}
      <circle cx="50" cy="80" r="38" fill="none" stroke={DARK} strokeWidth="1.2" opacity="0.55"/>
      {/* Tomate pequeño detrás */}
      <circle cx="88" cy="68" r="22" fill={RED} opacity="0.70"/>
      <ellipse cx="80" cy="60" rx="6" ry="4" fill="rgba(255,255,255,0.16)"/>
      <path d="M 88,46 C 84,38 76,37 74,42 C 78,43 83,44 88,46 Z" fill={GREEN} opacity="0.85"/>
      <path d="M 88,46 C 92,38 100,37 102,42 C 98,43 93,44 88,46 Z" fill={GREEN} opacity="0.85"/>
      <circle cx="88" cy="46" r="2.2" fill={GREEN2}/>
      <circle cx="88" cy="68" r="22" fill="none" stroke={DARK} strokeWidth="1" opacity="0.45"/>
      {/* Hojas de albahaca */}
      <ellipse cx="25" cy="48" rx="10" ry="16" fill={GREEN} opacity="0.75" transform="rotate(-35, 25, 48)"/>
      <path d="M 25,36 Q 18,48 25,58" stroke={GREEN2} strokeWidth="0.8" fill="none"/>
      <ellipse cx="15" cy="55" rx="8" ry="13" fill={GREEN2} opacity="0.65" transform="rotate(-50, 15, 55)"/>
    </svg>
  );
}

function PizzaIllustration({ width = 160, height = 155 }: { width?: number; height?: number }) {
  return (
    <svg width={width} height={height} viewBox="0 0 160 155" xmlns="http://www.w3.org/2000/svg" aria-hidden>
      {/* Pizza completa */}
      <circle cx="80" cy="78" r="72" fill="#D4A642" opacity="0.85"/>
      {/* Borde de masa */}
      <circle cx="80" cy="78" r="72" fill="none" stroke="#8B4513" strokeWidth="9" opacity="0.75"/>
      {/* Salsa de tomate */}
      <circle cx="80" cy="78" r="62" fill={RED} opacity="0.70"/>
      {/* Mozzarella — manchas blancas */}
      <circle cx="80" cy="58" r="10" fill="rgba(255,252,240,0.85)"/>
      <circle cx="62" cy="82" r="8"  fill="rgba(255,252,240,0.80)"/>
      <circle cx="98" cy="82" r="9"  fill="rgba(255,252,240,0.82)"/>
      <circle cx="75" cy="100" r="7" fill="rgba(255,252,240,0.78)"/>
      <circle cx="92" cy="60"  r="6" fill="rgba(255,252,240,0.75)"/>
      {/* Toppings — aceitunas */}
      <circle cx="70" cy="68" r="4" fill={DARK} opacity="0.70"/>
      <circle cx="90" cy="92" r="4" fill={DARK} opacity="0.70"/>
      <circle cx="68" cy="95" r="3.5" fill={DARK} opacity="0.65"/>
      {/* Pimientos */}
      <ellipse cx="88" cy="68" rx="3" ry="6" fill={GREEN} opacity="0.80" transform="rotate(30, 88, 68)"/>
      <ellipse cx="72" cy="88" rx="3" ry="6" fill={GREEN} opacity="0.78" transform="rotate(-20, 72, 88)"/>
      {/* Líneas de corte */}
      <line x1="80" y1="6" x2="80" y2="150" stroke={DARK} strokeWidth="0.6" opacity="0.20"/>
      <line x1="8" y1="78" x2="152" y2="78" stroke={DARK} strokeWidth="0.6" opacity="0.20"/>
      <line x1="25" y1="25" x2="135" y2="131" stroke={DARK} strokeWidth="0.6" opacity="0.15"/>
      <line x1="135" y1="25" x2="25" y2="131" stroke={DARK} strokeWidth="0.6" opacity="0.15"/>
      {/* Contorno */}
      <circle cx="80" cy="78" r="72" fill="none" stroke={DARK} strokeWidth="1.5" opacity="0.50"/>
      {/* Hoja de albahaca encima */}
      <ellipse cx="82" cy="56" rx="7" ry="14" fill={GREEN} opacity="0.80" transform="rotate(15, 82, 56)"/>
      <path d="M 82,48 Q 78,56 82,66" stroke={GREEN2} strokeWidth="0.8" fill="none"/>
    </svg>
  );
}

function PastaPlate({ width = 140, height = 130 }: { width?: number; height?: number }) {
  return (
    <svg width={width} height={height} viewBox="0 0 140 130" xmlns="http://www.w3.org/2000/svg" aria-hidden>
      {/* Plato — sombra */}
      <ellipse cx="71" cy="95" rx="62" ry="18" fill={DARK} opacity="0.12"/>
      {/* Plato — cuerpo */}
      <ellipse cx="70" cy="88" rx="62" ry="22" fill="#F0E8D5"/>
      <ellipse cx="70" cy="88" rx="55" ry="18" fill={CREAM}/>
      {/* Pasta — nido de espaguetis */}
      <ellipse cx="70" cy="80" rx="42" ry="28" fill="#D4A642" opacity="0.55"/>
      {/* Hebras de pasta */}
      {[
        "M 35,75 Q 50,65 65,72 Q 80,79 95,70 Q 108,62 118,68",
        "M 30,82 Q 45,72 60,79 Q 75,86 90,77 Q 103,68 115,74",
        "M 32,89 Q 47,79 62,86 Q 77,93 92,84 Q 105,75 118,82",
        "M 38,96 Q 52,86 67,92 Q 82,98 96,90 Q 108,83 115,88",
        "M 42,68 Q 57,58 72,65 Q 87,72 100,63 Q 112,55 120,62",
      ].map((d, i) => (
        <path key={i} d={d} stroke="#B8860B" strokeWidth="1.8" fill="none" opacity={0.65 - i * 0.05} strokeLinecap="round"/>
      ))}
      {/* Salsa de tomate encima */}
      <ellipse cx="70" cy="76" rx="22" ry="14" fill={RED} opacity="0.60"/>
      {/* Albahaca */}
      <ellipse cx="68" cy="68" rx="7" ry="11" fill={GREEN} opacity="0.75" transform="rotate(-20, 68, 68)"/>
      <ellipse cx="76" cy="66" rx="6" ry="9"  fill={GREEN2} opacity="0.70" transform="rotate(15, 76, 66)"/>
      {/* Borde del plato */}
      <ellipse cx="70" cy="88" rx="62" ry="22" fill="none" stroke={DARK} strokeWidth="1.2" opacity="0.40"/>
      <ellipse cx="70" cy="88" rx="55" ry="18" fill="none" stroke={DARK} strokeWidth="0.7" opacity="0.28"/>
      {/* Tenedor */}
      <rect x="116" y="30" width="5" height="55" rx="2" fill={DARK} opacity="0.55"/>
      <rect x="112" y="28" width="2" height="20" rx="1" fill={DARK} opacity="0.55"/>
      <rect x="116" y="28" width="2" height="20" rx="1" fill={DARK} opacity="0.55"/>
      <rect x="120" y="28" width="2" height="20" rx="1" fill={DARK} opacity="0.55"/>
      <rect x="124" y="28" width="2" height="20" rx="1" fill={DARK} opacity="0.55"/>
    </svg>
  );
}

function OliveOilBottle({ width = 70, height = 160 }: { width?: number; height?: number }) {
  return (
    <svg width={width} height={height} viewBox="0 0 70 160" xmlns="http://www.w3.org/2000/svg" aria-hidden>
      {/* Corcho */}
      <rect x="28" y="4" width="14" height="16" rx="3" fill="#8B5E3C"/>
      <rect x="30" y="7" width="10" height="10" rx="2" fill="#A0703A"/>
      {/* Cuello */}
      <path d="M 28,20 L 24,40 L 46,40 L 42,20 Z" fill="#8B9E60" opacity="0.85"/>
      {/* Cuerpo de la botella */}
      <path d="M 22,40 L 12,60 L 10,130 Q 10,145 35,145 Q 60,145 60,130 L 58,60 L 48,40 Z" fill="#8B9E60" opacity="0.82"/>
      {/* Aceite dentro */}
      <path d="M 14,70 L 12,128 Q 12,142 35,142 Q 58,142 58,128 L 56,70 Z" fill="#C8B820" opacity="0.65"/>
      {/* Etiqueta */}
      <rect x="16" y="80" width="38" height="50" rx="3" fill={CREAM} opacity="0.90"/>
      <rect x="19" y="83" width="32" height="44" rx="2" fill="none" stroke={DARK} strokeWidth="0.8" opacity="0.40"/>
      <text x="35" y="100" textAnchor="middle" fontFamily="Georgia, serif" fontSize="5.5" fontWeight="700" fill={DARK} opacity="0.75" letterSpacing="0.5">OLIO</text>
      <text x="35" y="110" textAnchor="middle" fontFamily="Georgia, serif" fontSize="4.5" fill={DARK} opacity="0.60" letterSpacing="0.3">EXTRA</text>
      <text x="35" y="119" textAnchor="middle" fontFamily="Georgia, serif" fontSize="4.5" fill={DARK} opacity="0.60" letterSpacing="0.3">VERGINE</text>
      <line x1="20" y1="105" x2="50" y2="105" stroke={GOLD} strokeWidth="0.6" opacity="0.50"/>
      {/* Reflejo */}
      <path d="M 16,60 Q 18,90 17,120" stroke="rgba(255,255,255,0.25)" strokeWidth="3" fill="none" strokeLinecap="round"/>
      {/* Contorno */}
      <path d="M 22,40 L 12,60 L 10,130 Q 10,145 35,145 Q 60,145 60,130 L 58,60 L 48,40 Z" fill="none" stroke={DARK} strokeWidth="1.2" opacity="0.45"/>
    </svg>
  );
}

function TiramisuIllustration({ width = 130, height = 110 }: { width?: number; height?: number }) {
  return (
    <svg width={width} height={height} viewBox="0 0 130 110" xmlns="http://www.w3.org/2000/svg" aria-hidden>
      {/* Base del plato */}
      <ellipse cx="65" cy="98" rx="60" ry="12" fill="#E8DFC8" opacity="0.80"/>
      {/* Cuerpo del tiramisú — forma de bloque */}
      <path d="M 15,90 L 15,50 Q 15,42 65,42 Q 115,42 115,50 L 115,90 Z" fill="#D4A642" opacity="0.80"/>
      {/* Capas internas */}
      <rect x="15" y="62" width="100" height="8" fill="#8B4513" opacity="0.45"/>
      <rect x="15" y="76" width="100" height="8" fill="#8B4513" opacity="0.40"/>
      {/* Tapa de mascarpone */}
      <ellipse cx="65" cy="50" rx="50" ry="12" fill={CREAM} opacity="0.95"/>
      {/* Cacao en polvo */}
      <ellipse cx="65" cy="50" rx="50" ry="12" fill="#4A2E18" opacity="0.35"/>
      {/* Rayas de cacao */}
      {[48,54,60,66,72,78].map((x, i) => (
        <line key={i} x1={x} y1="40" x2={x-6} y2="62" stroke="#3A2010" strokeWidth="0.5" opacity="0.25"/>
      ))}
      {/* Contornos */}
      <path d="M 15,90 L 15,50 Q 15,42 65,42 Q 115,42 115,50 L 115,90 Z" fill="none" stroke={DARK} strokeWidth="1" opacity="0.40"/>
      <ellipse cx="65" cy="50" rx="50" ry="12" fill="none" stroke={DARK} strokeWidth="0.8" opacity="0.35"/>
      {/* Hoja de menta decorativa */}
      <ellipse cx="90" cy="44" rx="7" ry="12" fill={GREEN} opacity="0.70" transform="rotate(20, 90, 44)"/>
      <path d="M 90,36 Q 87,44 90,54" stroke={GREEN2} strokeWidth="0.7" fill="none"/>
    </svg>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
//  ELEMENTOS DECORATIVOS
// ─────────────────────────────────────────────────────────────────────────────

function SinceBanner({ year }: { year: string }) {
  return (
    <div aria-hidden style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "0.5rem" }}>
      {/* Líneas decorativas */}
      <svg width="80" height="14" viewBox="0 0 80 14" xmlns="http://www.w3.org/2000/svg">
        <path d="M 0,7 Q 20,2 40,7 Q 60,12 80,7" stroke={DARK} strokeWidth="1" fill="none" opacity="0.55"/>
        <circle cx="4" cy="7" r="2" fill={DARK} opacity="0.4"/>
        <circle cx="76" cy="7" r="2" fill={DARK} opacity="0.4"/>
      </svg>
      <span style={{
        fontFamily: "\"Cormorant Garamond\", Georgia, serif",
        fontSize: "0.68rem",
        fontWeight: 700,
        letterSpacing: "0.45em",
        color: DARK,
        opacity: 0.70,
        textTransform: "uppercase",
        whiteSpace: "nowrap",
      }}>
        Since {year}
      </span>
      <svg width="80" height="14" viewBox="0 0 80 14" xmlns="http://www.w3.org/2000/svg">
        <path d="M 0,7 Q 20,12 40,7 Q 60,2 80,7" stroke={DARK} strokeWidth="1" fill="none" opacity="0.55"/>
        <circle cx="4" cy="7" r="2" fill={DARK} opacity="0.4"/>
        <circle cx="76" cy="7" r="2" fill={DARK} opacity="0.4"/>
      </svg>
    </div>
  );
}

function FattoConAmoreScript({ bodyFont }: { bodyFont: string }) {
  return (
    <div aria-hidden style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "0.6rem" }}>
      {/* Flecha izquierda */}
      <svg width="60" height="16" viewBox="0 0 60 16" xmlns="http://www.w3.org/2000/svg">
        <path d="M 60,8 L 5,8 L 12,3 M 5,8 L 12,13" stroke={DARK} strokeWidth="1.2" fill="none" opacity="0.60" strokeLinecap="round"/>
      </svg>
      <span style={{
        fontFamily: bodyFont,
        fontStyle: "italic",
        fontSize: "1.8rem",
        color: DARK,
        lineHeight: 1,
        fontWeight: 400,
        letterSpacing: "0.01em",
      }}>
        Fatto con Amore
      </span>
      {/* Flecha derecha */}
      <svg width="60" height="16" viewBox="0 0 60 16" xmlns="http://www.w3.org/2000/svg">
        <path d="M 0,8 L 55,8 L 48,3 M 55,8 L 48,13" stroke={DARK} strokeWidth="1.2" fill="none" opacity="0.60" strokeLinecap="round"/>
      </svg>
    </div>
  );
}

function DarkBanner({ text, headingFont }: { text: string; headingFont: string }) {
  return (
    <div style={{
      background: DARK,
      padding: "0.55rem 2.5rem",
      display: "inline-flex",
      alignItems: "center",
      gap: "0.75rem",
      position: "relative",
    }}>
      {/* Muescas decorativas */}
      <div style={{ position: "absolute", left: "-10px", top: 0, bottom: 0, width: "10px", background: DARK, clipPath: "polygon(0 50%, 100% 0, 100% 100%)" }}/>
      <div style={{ position: "absolute", right: "-10px", top: 0, bottom: 0, width: "10px", background: DARK, clipPath: "polygon(0 0, 0 100%, 100% 50%)" }}/>
      <span style={{
        fontFamily: headingFont,
        fontSize: "0.78rem",
        fontWeight: 700,
        letterSpacing: "0.38em",
        color: "rgba(255,255,255,0.95)",
        textTransform: "uppercase",
      }}>
        {text}
      </span>
    </div>
  );
}

function CircularStamp100({ rotation = -12 }: { rotation?: number }) {
  return (
    <div aria-hidden style={{
      transform: `rotate(${rotation}deg)`,
      filter: "drop-shadow(0 2px 5px rgba(0,0,0,0.25))",
      width: 100, height: 100,
    }}>
      <svg width="100" height="100" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <path id="sc-outer" d="M 50,50 m -40,0 a 40,40 0 1,1 80,0 a 40,40 0 1,1 -80,0"/>
          <path id="sc-inner" d="M 50,50 m -30,0 a 30,30 0 1,1 60,0 a 30,30 0 1,1 -60,0"/>
          <filter id="sc-rough">
            <feTurbulence type="turbulence" baseFrequency="0.06" numOctaves="3" result="noise"/>
            <feDisplacementMap in="SourceGraphic" in2="noise" scale="1.2" xChannelSelector="R" yChannelSelector="G"/>
          </filter>
        </defs>
        <circle cx="50" cy="50" r="46" fill={CREAM} opacity="0.95"/>
        <g filter="url(#sc-rough)">
          <circle cx="50" cy="50" r="46" fill="none" stroke={GREEN} strokeWidth="3" strokeDasharray="2,0.8" opacity="0.90"/>
          <circle cx="50" cy="50" r="40" fill="none" stroke={GREEN} strokeWidth="1" opacity="0.50"/>
          <circle cx="50" cy="50" r="32" fill="none" stroke={GREEN} strokeWidth="1.5" strokeDasharray="1.5,0.5" opacity="0.60"/>
        </g>
        <text fontFamily="Georgia, serif" fontSize="8" fontWeight="700" letterSpacing="2.5" fill={GREEN} opacity="0.88" textAnchor="middle">
          <textPath href="#sc-outer" startOffset="12%">✦ 100% ITALIAN ✦ QUALITY ✦</textPath>
        </text>
        <text x="50" y="46" textAnchor="middle" fontFamily="Georgia, serif" fontSize="16" fontWeight="700" fill={GREEN} opacity="0.92">100%</text>
        <text x="50" y="58" textAnchor="middle" fontFamily="Georgia, serif" fontSize="9" fontWeight="700" letterSpacing="2" fill={GREEN} opacity="0.88">ITALIAN</text>
        <text x="50" y="68" textAnchor="middle" fontFamily="Georgia, serif" fontSize="6.5" letterSpacing="1" fill={GREEN} opacity="0.65">QUALITY</text>
        <text x="50" y="77" textAnchor="middle" fontFamily="Georgia, serif" fontSize="5" letterSpacing="0.5" fill={GREEN} opacity="0.50">★ ★ ★ ★ ★</text>
      </svg>
    </div>
  );
}

function BuonAppetitoCrossTag() {
  return (
    <div aria-hidden style={{ transform: "rotate(8deg)", filter: "drop-shadow(0 3px 6px rgba(0,0,0,0.22))" }}>
      <svg width="110" height="130" viewBox="0 0 110 130" xmlns="http://www.w3.org/2000/svg">
        {/* Hilo de la etiqueta */}
        <path d="M 55,4 Q 70,14 65,28" stroke="#8B7355" strokeWidth="1.5" fill="none"/>
        <circle cx="55" cy="4" r="3" fill="#C4953A" opacity="0.7"/>
        {/* Etiqueta kraft */}
        <rect x="8" y="26" width="94" height="96" rx="5" fill="#E8D5A8"/>
        <rect x="12" y="30" width="86" height="88" rx="4" fill="#F0DFB5"/>
        {/* Agujero de la cuerda */}
        <circle cx="55" cy="36" r="5" fill="#C4953A" opacity="0.50"/>
        <circle cx="55" cy="36" r="3" fill="#E8D5A8"/>
        {/* Texto */}
        <text x="55" y="62" textAnchor="middle" fontFamily="Georgia, serif" fontStyle="italic" fontSize="15" fontWeight="700" fill={GREEN} opacity="0.85">Buon</text>
        <text x="55" y="80" textAnchor="middle" fontFamily="Georgia, serif" fontStyle="italic" fontSize="15" fontWeight="700" fill={RED} opacity="0.85">Appetito!</text>
        {/* Corazón */}
        <path d="M 55,95 C 55,95 47,88 47,83 C 47,80 50,78 53,80 C 54,81 55,82 55,82 C 55,82 56,81 57,80 C 60,78 63,80 63,83 C 63,88 55,95 55,95 Z" fill={RED} opacity="0.70"/>
        {/* Borde */}
        <rect x="8" y="26" width="94" height="96" rx="5" fill="none" stroke="#A89060" strokeWidth="1" opacity="0.50"/>
        <line x1="18" y1="48" x2="92" y2="48" stroke="#A89060" strokeWidth="0.5" opacity="0.35"/>
      </svg>
    </div>
  );
}

function RecipeStamp({ rotation = 6 }: { rotation?: number }) {
  return (
    <div aria-hidden style={{ transform: `rotate(${rotation}deg)`, filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.20))" }}>
      <svg width="120" height="120" viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <path id="rs-path" d="M 60,60 m -46,0 a 46,46 0 1,1 92,0 a 46,46 0 1,1 -92,0"/>
          <filter id="rs-rough">
            <feTurbulence type="turbulence" baseFrequency="0.055" numOctaves="3" result="noise"/>
            <feDisplacementMap in="SourceGraphic" in2="noise" scale="1.5" xChannelSelector="R" yChannelSelector="G"/>
          </filter>
        </defs>
        <circle cx="60" cy="60" r="52" fill={CREAM} opacity="0.95"/>
        <g filter="url(#rs-rough)">
          <circle cx="60" cy="60" r="52" fill="none" stroke={RED} strokeWidth="2.5" strokeDasharray="3,1" opacity="0.85"/>
          <circle cx="60" cy="60" r="46" fill="none" stroke={RED} strokeWidth="0.8" opacity="0.45"/>
          <circle cx="60" cy="60" r="38" fill="none" stroke={RED} strokeWidth="1.5" strokeDasharray="2,0.8" opacity="0.55"/>
        </g>
        <text fontFamily="Georgia, serif" fontSize="7" fontWeight="700" letterSpacing="2" fill={RED} opacity="0.80" textAnchor="middle">
          <textPath href="#rs-path" startOffset="8%">✦ TRADITIONAL ✦ ITALIAN FOOD ✦</textPath>
        </text>
        <text x="60" y="52" textAnchor="middle" fontFamily="Georgia, serif" fontSize="7" letterSpacing="2" fill={RED} opacity="0.68">THE BEST</text>
        <text x="60" y="68" textAnchor="middle" fontFamily="Georgia, serif" fontSize="16" fontWeight="700" fontStyle="italic" fill={RED} opacity="0.88">Recipes</text>
        <path d="M 42,76 C 52,72 68,72 78,76" stroke={RED} strokeWidth="0.8" fill="none" opacity="0.50"/>
        <path d="M 60,77 C 57,80 55,83 56,86 C 57,89 63,89 64,86 C 65,83 63,80 60,77 Z" fill={RED} opacity="0.60"/>
      </svg>
    </div>
  );
}

function ChalkboardSign({ bodyFont }: { bodyFont: string }) {
  return (
    <div style={{
      background: CHALK,
      borderRadius: "4px",
      padding: "1rem 1.5rem",
      position: "relative",
      boxShadow: "inset 0 0 0 3px rgba(255,255,255,0.08), 2px 3px 8px rgba(0,0,0,0.30)",
      width: "130px",
    }}>
      {/* Trozos de cinta adhesiva */}
      <div style={{ position: "absolute", top: "-8px", left: "18px", width: "30px", height: "12px", background: "#C49A2850", transform: "rotate(-3deg)", borderRadius: "2px" }}/>
      <div style={{ position: "absolute", top: "-8px", right: "18px", width: "25px", height: "12px", background: "#C49A2850", transform: "rotate(4deg)", borderRadius: "2px" }}/>
      {/* Texto de pizarra */}
      {["Buoni", "Vini", "Buona", "Gente"].map((line, i) => (
        <p key={i} style={{
          fontFamily: bodyFont,
          fontStyle: "italic",
          fontSize: i === 0 || i === 2 ? "1.1rem" : "1.35rem",
          fontWeight: i === 1 || i === 3 ? 600 : 400,
          color: "rgba(255,255,255,0.88)",
          margin: 0,
          lineHeight: 1.35,
          textAlign: "center",
          letterSpacing: "0.02em",
        }}>
          {line}
        </p>
      ))}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
//  CABECERA PRINCIPAL — estilo póster woodblock
// ─────────────────────────────────────────────────────────────────────────────

interface HeaderProps {
  name: string;
  tagline?: string;
  logo?: string;
  logoAlt?: string;
  showLogo: boolean;
  headingFont: string;
  bodyFont: string;
}

function PosterHeader({ name, tagline, logo, logoAlt, showLogo, headingFont, bodyFont }: HeaderProps) {
  // Separar nombre en líneas si tiene espacio (para el efecto visual)
  const words = name.split(" ");
  const line1 = words.slice(0, Math.ceil(words.length / 2)).join(" ");
  const line2 = words.slice(Math.ceil(words.length / 2)).join(" ");
  const hasTwo = words.length > 1;

  return (
    <div style={{ position: "relative", textAlign: "center", padding: "2rem 5rem 1.5rem", zIndex: 2 }}>

      {/* Ornamento superior con olivo */}
      <div style={{ display: "flex", justifyContent: "center", marginBottom: "0.6rem" }}>
        <svg width="60" height="30" viewBox="0 0 60 30" xmlns="http://www.w3.org/2000/svg" aria-hidden>
          <path d="M 0,15 L 8,15 M 52,15 L 60,15" stroke={DARK} strokeWidth="1" opacity="0.5"/>
          <ellipse cx="14" cy="10" rx="5" ry="9" fill={GREEN2} opacity="0.70" transform="rotate(-30, 14, 10)"/>
          <ellipse cx="22" cy="8"  rx="4" ry="8" fill={GREEN}  opacity="0.65" transform="rotate(-15, 22, 8)"/>
          <ellipse cx="30" cy="7"  rx="4" ry="8" fill={GREEN2} opacity="0.68"/>
          <ellipse cx="38" cy="8"  rx="4" ry="8" fill={GREEN}  opacity="0.65" transform="rotate(15, 38, 8)"/>
          <ellipse cx="46" cy="10" rx="5" ry="9" fill={GREEN2} opacity="0.70" transform="rotate(30, 46, 10)"/>
          <path d="M 8,15 Q 30,5 52,15" stroke={GREEN2} strokeWidth="1.2" fill="none" opacity="0.55"/>
          <circle cx="30" cy="20" r="3" fill={GOLD} opacity="0.60"/>
        </svg>
      </div>

      {/* "Since 1984" */}
      <SinceBanner year="1984"/>

      <div style={{ height: "0.5rem" }}/>

      {/* Logo si existe */}
      {showLogo && logo && (
        <div style={{ marginBottom: "0.8rem" }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={logo} alt={logoAlt ?? name} style={{ height: "5rem", objectFit: "contain", filter: "sepia(0.3) contrast(1.1)", opacity: 0.88 }}/>
        </div>
      )}

      {/* NOMBRE PRINCIPAL — escala póster woodblock */}
      {hasTwo ? (
        <>
          <h1 style={{
            fontFamily: headingFont,
            fontSize: "clamp(4rem, 13vw, 8.5rem)",
            fontWeight: 700,
            color: DARK,
            lineHeight: 0.88,
            margin: "0.2rem 0 0",
            letterSpacing: "-0.01em",
            textShadow: `2px 2px 0 rgba(30,16,5,0.12), 4px 4px 0 rgba(30,16,5,0.07)`,
            textTransform: "uppercase",
          }}>
            {line1}
          </h1>
          <h1 style={{
            fontFamily: headingFont,
            fontSize: "clamp(3rem, 10vw, 6.5rem)",
            fontWeight: 700,
            color: RED,
            lineHeight: 0.92,
            margin: "0.1rem 0 0",
            letterSpacing: "0.02em",
            textShadow: `2px 2px 0 rgba(150,32,32,0.12)`,
            textTransform: "uppercase",
          }}>
            {line2}
          </h1>
        </>
      ) : (
        <h1 style={{
          fontFamily: headingFont,
          fontSize: "clamp(3.5rem, 12vw, 8rem)",
          fontWeight: 700,
          color: DARK,
          lineHeight: 0.88,
          margin: "0.2rem 0 0",
          letterSpacing: "-0.01em",
          textShadow: `2px 2px 0 rgba(30,16,5,0.12), 4px 4px 0 rgba(30,16,5,0.07)`,
          textTransform: "uppercase",
        }}>
          {name}
        </h1>
      )}

      <div style={{ height: "0.8rem" }}/>

      {/* "Fatto con Amore" */}
      <FattoConAmoreScript bodyFont={bodyFont}/>

      <div style={{ height: "0.7rem" }}/>

      {/* Tagline o "AUTHENTIC ITALIAN FOOD" */}
      <div style={{ display: "flex", justifyContent: "center" }}>
        <DarkBanner text={tagline || "Authentic Italian Food"} headingFont={headingFont}/>
      </div>

      <div style={{ height: "1.2rem" }}/>

      {/* Línea divisoria */}
      <div style={{ display: "flex", alignItems: "center", gap: "0.6rem" }}>
        <div style={{ flex: 1, height: "1.5px", background: `linear-gradient(to right, transparent, ${DARK}35)` }}/>
        <svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden>
          <polygon points="12,2 14,10 22,10 16,15 18,23 12,18 6,23 8,15 2,10 10,10" fill="none" stroke={GOLD} strokeWidth="1.2" opacity="0.65"/>
        </svg>
        <div style={{ flex: 1, height: "1.5px", background: `linear-gradient(to left, transparent, ${DARK}35)` }}/>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
//  CABECERA DE CATEGORÍA
// ─────────────────────────────────────────────────────────────────────────────

function CategoryHeader({
  name, subtitle, color, headingFont, bodyFont,
}: {
  name: string; subtitle?: string; color: string; headingFont: string; bodyFont: string;
}) {
  return (
    <div style={{ marginBottom: "0.9rem" }}>
      {/* Hojitas decorativas + nombre */}
      <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", flexWrap: "wrap" }}>
        {/* Hoja izquierda */}
        <svg width="26" height="20" viewBox="0 0 26 20" xmlns="http://www.w3.org/2000/svg" aria-hidden>
          <ellipse cx="8"  cy="10" rx="4" ry="8" fill={GREEN} opacity="0.65" transform="rotate(-20, 8, 10)"/>
          <ellipse cx="18" cy="8"  rx="3.5" ry="7" fill={GREEN2} opacity="0.60" transform="rotate(-5, 18, 8)"/>
          <path d="M 2,10 Q 12,6 22,10" stroke={GREEN2} strokeWidth="0.8" fill="none" opacity="0.50"/>
        </svg>

        <h2 style={{
          fontFamily: headingFont,
          fontSize: "clamp(2rem, 6vw, 3.2rem)",
          fontWeight: 700,
          fontStyle: "italic",
          color: color,
          lineHeight: 1,
          margin: 0,
          letterSpacing: "0.02em",
          textShadow: `1px 1px 0 ${color}20`,
        }}>
          {name}
        </h2>

        {/* Hoja derecha (espejo) */}
        <svg width="26" height="20" viewBox="0 0 26 20" xmlns="http://www.w3.org/2000/svg" aria-hidden style={{ transform: "scaleX(-1)" }}>
          <ellipse cx="8"  cy="10" rx="4" ry="8" fill={GREEN} opacity="0.65" transform="rotate(-20, 8, 10)"/>
          <ellipse cx="18" cy="8"  rx="3.5" ry="7" fill={GREEN2} opacity="0.60" transform="rotate(-5, 18, 8)"/>
          <path d="M 2,10 Q 12,6 22,10" stroke={GREEN2} strokeWidth="0.8" fill="none" opacity="0.50"/>
        </svg>
      </div>

      {/* Subtítulo en cursiva */}
      {subtitle && (
        <p style={{
          fontFamily: bodyFont,
          fontStyle: "italic",
          fontSize: "1.0rem",
          color: color,
          margin: "0.1rem 0 0.4rem 2px",
          opacity: 0.70,
          lineHeight: 1,
        }}>
          {subtitle}
        </p>
      )}

      {/* Línea delgada bajo el header */}
      <div style={{ display: "flex", alignItems: "center", gap: "0.4rem", marginTop: "0.3rem" }}>
        <div style={{ flex: 1, height: "1px", background: `${color}40` }}/>
        <div style={{ width: "4px", height: "4px", borderRadius: "50%", background: color, opacity: 0.45 }}/>
        <div style={{ flex: 0, width: "30px", height: "1px", background: `${color}40` }}/>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
//  ITEM DE MENÚ
// ─────────────────────────────────────────────────────────────────────────────

interface MenuItemProps {
  name?: string;
  description?: string;
  price?: number;
  currency?: string;
  featured?: boolean;
  allergens?: Allergen[];
  showPrice: boolean;
  showDescription: boolean;
  headingFont: string;
  bodyFont: string;
  isLast: boolean;
}

function MenuItem({
  name, description, price, currency, featured, allergens,
  showPrice, showDescription, headingFont, bodyFont, isLast,
}: MenuItemProps) {
  return (
    <div style={{ marginBottom: isLast ? 0 : "0.85rem", paddingBottom: isLast ? 0 : "0.85rem", borderBottom: isLast ? "none" : `1px solid ${DARK}12` }}>
      {/* Nombre + precio */}
      <div style={{ display: "flex", alignItems: "baseline", gap: "0.4rem" }}>
        {featured && <span style={{ color: GOLD, fontSize: "0.75rem", flexShrink: 0 }}>★</span>}
        <span style={{
          fontFamily: headingFont,
          fontSize: "0.85rem",
          fontWeight: 700,
          letterSpacing: "0.06em",
          textTransform: "uppercase",
          color: INK,
          flex: "0 1 auto",
          lineHeight: 1.25,
        }}>
          {name}
        </span>
        {showPrice && (
          <span style={{
            flex: 1,
            borderBottom: `1.5px dotted ${INK}25`,
            marginBottom: "2px",
            minWidth: "1rem",
          }}/>
        )}
        {showPrice && price !== undefined && price > 0 && (
          <span style={{
            fontFamily: bodyFont,
            fontSize: "0.9rem",
            fontWeight: 700,
            color: INK,
            flexShrink: 0,
            lineHeight: 1.25,
          }}>
            {formatPrice(price, currency)}
          </span>
        )}
      </div>
      {/* Descripción */}
      {showDescription && description && (
        <p style={{
          fontFamily: bodyFont,
          fontSize: "0.78rem",
          fontStyle: "italic",
          color: INK,
          opacity: 0.55,
          lineHeight: 1.5,
          margin: "0.15rem 0 0",
          paddingLeft: featured ? "1rem" : "0",
        }}>
          {description}
        </p>
      )}
      {allergens && allergens.length > 0 && (
        <AllergenBadges allergens={allergens} fontSize="0.52rem" opacity={0.38} marginTop="0.2rem"/>
      )}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
//  PIE DE PÁGINA
// ─────────────────────────────────────────────────────────────────────────────

function PosterFooter({ address, phone, website, instagram, bodyFont }: {
  address?: string; phone?: string; website?: string; instagram?: string; bodyFont: string;
}) {
  return (
    <footer style={{ textAlign: "center", padding: "1.5rem 2rem 2rem", position: "relative", zIndex: 2 }}>
      {/* "GRAZIE E ARRIVEDERCI!" */}
      <div style={{
        display: "inline-block",
        border: `1.5px solid ${DARK}40`,
        padding: "0.5rem 2.5rem",
        marginBottom: "1rem",
      }}>
        <span style={{
          fontFamily: `"Cormorant Garamond", Georgia, serif`,
          fontSize: "0.78rem",
          fontWeight: 700,
          letterSpacing: "0.35em",
          color: DARK,
          opacity: 0.65,
          textTransform: "uppercase",
        }}>
          Grazie e Arrivederci!
        </span>
      </div>

      {/* Info de contacto */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: "1rem", flexWrap: "wrap" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
          {instagram && (
            <span style={{ fontFamily: bodyFont, fontSize: "0.68rem", color: DARK, opacity: 0.50 }}>
              📷 {instagram}
            </span>
          )}
        </div>
        <div style={{ display: "flex", gap: "1.5rem", flexWrap: "wrap", justifyContent: "center" }}>
          {[address, phone].filter(Boolean).map((info, i) => (
            <span key={i} style={{ fontFamily: bodyFont, fontSize: "0.68rem", color: DARK, opacity: 0.50, letterSpacing: "0.02em" }}>
              {info}
            </span>
          ))}
        </div>
        {website && (
          <span style={{ fontFamily: bodyFont, fontSize: "0.68rem", color: DARK, opacity: 0.50 }}>
            {website}
          </span>
        )}
      </div>
    </footer>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
//  PLANTILLA PRINCIPAL
// ─────────────────────────────────────────────────────────────────────────────

// Subtítulos editoriales por posición
const CAT_SUBTITLES = [
  "Starters", "Homemade", "From the Wood Oven", "Main Courses", "Desserts",
  "Grilled", "Seafood", "Specials", "Sides", "Extras",
];

// Colores alternados para categorías
const CAT_COLORS = [GREEN, RED, GREEN, RED, GREEN, RED, GREEN, RED];

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

  // Dividir categorías en 2 columnas
  const mid   = Math.ceil(visible.length / 2);
  const left  = visible.slice(0, mid);
  const right = visible.slice(mid);

  return (
    <BackgroundLayer
      design={design}
      style={{
        color: INK,
        fontFamily: typo.bodyFont,
        minHeight: "100%",
        position: "relative",
        background: `${PAPER}, linear-gradient(150deg, #FBF3DE 0%, ${BG} 50%, #EFE3C8 100%)`,
      }}
    >
      {/* Bloques de bandera italiana */}
      <ItalianFlagBlocks/>

      {/* Contenido — sobre z-index 1 */}
      <div style={{ position: "relative", zIndex: 1 }}>

        {/* Cabecera póster */}
        <div style={{ position: "relative" }}>

          {/* Sello 100% Italian — esquina superior izquierda */}
          <div style={{ position: "absolute", top: "1.5rem", left: "1.5rem", zIndex: 10 }}>
            <CircularStamp100 rotation={-10}/>
          </div>

          {/* Etiqueta "Buon Appetito!" — esquina superior derecha */}
          <div style={{ position: "absolute", top: "1rem", right: "1.5rem", zIndex: 10 }}>
            <BuonAppetitoCrossTag/>
          </div>

          <PosterHeader
            name={heroTitle}
            tagline={restaurantInfo.tagline}
            logo={branding?.logo}
            logoAlt={restaurantInfo.name}
            showLogo={hasLogo}
            headingFont={typo.titleFont}
            bodyFont={typo.bodyFont}
          />
        </div>

        {/* ── ZONA DE CATEGORÍAS EN 2 COLUMNAS ── */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "0",
          padding: "0 1.5rem",
          alignItems: "start",
        }}>

          {/* COLUMNA IZQUIERDA */}
          <div style={{ padding: "0 1.2rem 0 0.5rem", borderRight: `1px solid ${DARK}15` }}>
            {left.map((cat, idx) => {
              const items = cat.items.filter((i) => i.available).sort((a, b) => a.sortOrder - b.sortOrder);
              const color = CAT_COLORS[idx % CAT_COLORS.length];
              return (
                <div key={cat.id} style={{ marginBottom: "1.8rem" }}>
                  <CategoryHeader
                    name={t(cat.name, lang) ?? ""}
                    subtitle={CAT_SUBTITLES[idx]}
                    color={color}
                    headingFont={typo.categoryFont}
                    bodyFont={typo.bodyFont}
                  />
                  {items.map((item, i) => (
                    <MenuItem
                      key={item.id}
                      name={t(item.name, lang)}
                      description={layout.showDescriptions ? t(item.description, lang) || undefined : undefined}
                      price={item.price}
                      currency={item.currency}
                      featured={item.featured}
                      allergens={item.allergens?.contains}
                      showPrice={layout.showPrices}
                      showDescription={layout.showDescriptions}
                      headingFont={typo.categoryFont}
                      bodyFont={typo.bodyFont}
                      isLast={i === items.length - 1}
                    />
                  ))}
                </div>
              );
            })}

            {/* Pizarra artesanal — esquina inferior izquierda */}
            <div style={{ marginTop: "0.5rem", marginBottom: "1rem" }}>
              <ChalkboardSign bodyFont={typo.bodyFont}/>
            </div>
          </div>

          {/* COLUMNA DERECHA */}
          <div style={{ padding: "0 0.5rem 0 1.2rem", position: "relative" }}>
            {right.map((cat, idx) => {
              const globalIdx = left.length + idx;
              const items = cat.items.filter((i) => i.available).sort((a, b) => a.sortOrder - b.sortOrder);
              const color = CAT_COLORS[globalIdx % CAT_COLORS.length];
              return (
                <div key={cat.id} style={{ marginBottom: "1.8rem" }}>
                  <CategoryHeader
                    name={t(cat.name, lang) ?? ""}
                    subtitle={CAT_SUBTITLES[globalIdx] ?? "Specialty"}
                    color={color}
                    headingFont={typo.categoryFont}
                    bodyFont={typo.bodyFont}
                  />
                  {items.map((item, i) => (
                    <MenuItem
                      key={item.id}
                      name={t(item.name, lang)}
                      description={layout.showDescriptions ? t(item.description, lang) || undefined : undefined}
                      price={item.price}
                      currency={item.currency}
                      featured={item.featured}
                      allergens={item.allergens?.contains}
                      showPrice={layout.showPrices}
                      showDescription={layout.showDescriptions}
                      headingFont={typo.categoryFont}
                      bodyFont={typo.bodyFont}
                      isLast={i === items.length - 1}
                    />
                  ))}
                </div>
              );
            })}

            {/* Sello "Best Recipes" flotante entre categorías */}
            <div style={{ display: "flex", justifyContent: "center", marginTop: "0.5rem" }}>
              <RecipeStamp rotation={5}/>
            </div>
          </div>
        </div>

        {/* ── ILUSTRACIONES DE COMIDA — integradas en la composición ── */}
        {/* Tomates — zona izquierda bajo el header */}
        <div style={{ position: "absolute", top: "380px", left: "-8px", zIndex: 0, opacity: 0.85 }}>
          <TomatoCluster width={100} height={110}/>
        </div>

        {/* Pasta + botella — zona derecha */}
        <div style={{ position: "absolute", top: "300px", right: "-5px", zIndex: 0, opacity: 0.80 }}>
          <PastaPlate width={120} height={110}/>
        </div>
        <div style={{ position: "absolute", top: "420px", right: "-5px", zIndex: 0, opacity: 0.75 }}>
          <OliveOilBottle width={55} height={130}/>
        </div>

        {/* Pizza ilustración — abajo a la izquierda */}
        <div style={{
          position: "absolute",
          bottom: "80px",
          left: "-20px",
          zIndex: 0,
          opacity: 0.80,
        }}>
          <PizzaIllustration width={150} height={140}/>
        </div>

        {/* Tiramisú — abajo a la derecha */}
        <div style={{
          position: "absolute",
          bottom: "75px",
          right: "-10px",
          zIndex: 0,
          opacity: 0.78,
        }}>
          <TiramisuIllustration width={120} height={105}/>
        </div>

        {/* Pie de página */}
        <PosterFooter
          address={restaurantInfo.address}
          phone={restaurantInfo.phone}
          website={restaurantInfo.website}
          instagram={restaurantInfo.socialLinks?.instagram}
          bodyFont={typo.bodyFont}
        />
      </div>
    </BackgroundLayer>
  );
}
