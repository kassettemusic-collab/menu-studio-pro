"use client";

import { t } from "@/utils/translation";
import { formatPrice } from "@/utils/price";
import { AllergenBadges, BackgroundLayer } from "./shared";
import type { TemplateProps } from "./types";
import { resolveTypography } from "@/types/template";
import type { Allergen } from "@/types/menu";

// ─────────────────────────────────────────────────────────────────────────────
//  PALETA DE IMPRENTA
// ─────────────────────────────────────────────────────────────────────────────
const G    = "#1a5c1a";   // verde bandera
const G2   = "#2e7d2e";
const R    = "#7a1515";   // rojo profundo
const R2   = "#9e1f1f";
const GOLD = "#b8933a";   // dorado oxidado
const GOLD2= "#d4aa55";
const INK  = "#180800";   // tinta casi negra
const PARCHMENT = "#f3e8cf"; // papel envejecido
const PARCHMENT2 = "#ede0b8";

// ─────────────────────────────────────────────────────────────────────────────
//  TEXTURA DE PAPEL — SVG inline como background-image
// ─────────────────────────────────────────────────────────────────────────────
// Grain muy sutil + manchas de tinta envejecida
const PAPER_TEXTURE = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='300' height='300' filter='url(%23n)' opacity='0.045'/%3E%3C/svg%3E")`;

// ─────────────────────────────────────────────────────────────────────────────
//  SELLO DE TINTA — "Fatto con Amore" — circular, ligeramente rotado
//  Como un sello de caucho aplicado a mano. Imperfecto a propósito.
// ─────────────────────────────────────────────────────────────────────────────
function FattoConAmoreStamp({ rotation = -14 }: { rotation?: number }) {
  return (
    <div aria-hidden style={{
      position: "absolute",
      bottom: "-38px",
      right: "24px",
      zIndex: 30,
      transform: `rotate(${rotation}deg)`,
      pointerEvents: "none",
      filter: "drop-shadow(0 3px 8px rgba(0,0,0,0.35))",
    }}>
      <svg width="118" height="118" viewBox="0 0 118 118" xmlns="http://www.w3.org/2000/svg">
        <defs>
          {/* El radio del círculo de texto */}
          <path id="stamp-circle-outer"
            d="M 59,59 m -46,0 a 46,46 0 1,1 92,0 a 46,46 0 1,1 -92,0"/>
          <path id="stamp-circle-inner"
            d="M 59,59 m -34,0 a 34,34 0 1,1 68,0 a 34,34 0 1,1 -68,0"/>
          {/* Filtro para simular tinta irregular */}
          <filter id="stamp-roughen">
            <feTurbulence type="turbulence" baseFrequency="0.065" numOctaves="3" result="noise"/>
            <feDisplacementMap in="SourceGraphic" in2="noise" scale="1.4" xChannelSelector="R" yChannelSelector="G"/>
          </filter>
        </defs>

        {/* Fondo circular opaco para que tape el hero */}
        <circle cx="59" cy="59" r="54" fill={PARCHMENT} opacity="0.96"/>

        {/* Borde exterior con filtro de rugosidad */}
        <g filter="url(#stamp-roughen)">
          <circle cx="59" cy="59" r="52" fill="none" stroke={R} strokeWidth="2.8" strokeDasharray="3,1.2,5,0.8,2,1.5" opacity="0.92"/>
          <circle cx="59" cy="59" r="47" fill="none" stroke={R} strokeWidth="1"   opacity="0.55"/>
          <circle cx="59" cy="59" r="37" fill="none" stroke={R} strokeWidth="1.2" opacity="0.45"/>
        </g>

        {/* Texto circular exterior: FATTO CON AMORE */}
        <text
          fontFamily="Palatino, Georgia, serif"
          fontSize="7.5"
          fontWeight="700"
          letterSpacing="2.8"
          fill={R}
          opacity="0.95"
          textAnchor="middle"
        >
          <textPath href="#stamp-circle-outer" startOffset="12%">
            · FATTO CON AMORE · CUCINA ITALIANA ·
          </textPath>
        </text>

        {/* Centro del sello */}
        <text x="59" y="53" textAnchor="middle"
          fontFamily="Palatino, Georgia, serif"
          fontSize="8.5" fontWeight="700" letterSpacing="1.5"
          fill={R} opacity="0.85" textLength="44">
          SINCE
        </text>
        <text x="59" y="68" textAnchor="middle"
          fontFamily="Palatino, Georgia, serif"
          fontSize="15" fontWeight="700"
          fill={R} opacity="0.95">
          1984
        </text>
        <text x="59" y="80" textAnchor="middle"
          fontFamily="Palatino, Georgia, serif"
          fontSize="6.5" fontWeight="400" letterSpacing="1"
          fill={R} opacity="0.65">
          ROMA · ITALIA
        </text>

        {/* Estrella central decorativa */}
        <text x="59" y="47" textAnchor="middle"
          fontFamily="serif" fontSize="8" fill={GOLD} opacity="0.8">
          ★
        </text>
      </svg>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
//  CINTA ARTESANAL — "Since 1984" — ligeramente torcida, fuera de la cuadrícula
// ─────────────────────────────────────────────────────────────────────────────
function ArtisanalRibbon() {
  return (
    <div aria-hidden style={{
      position: "absolute",
      bottom: "-16px",
      left: "-8px",
      zIndex: 25,
      transform: "rotate(-3.5deg)",
      pointerEvents: "none",
      filter: "drop-shadow(0 2px 6px rgba(0,0,0,0.3))",
    }}>
      <svg width="200" height="38" viewBox="0 0 200 38" xmlns="http://www.w3.org/2000/svg">
        {/* Cinta con colas en V */}
        <polygon points="0,19 12,0 188,0 200,19 188,38 12,38" fill={G}/>
        {/* Colas en V más oscuras (doblez) */}
        <polygon points="0,19 12,0 12,38"   fill={G2} opacity="0.6"/>
        <polygon points="200,19 188,0 188,38" fill={G2} opacity="0.6"/>
        {/* Línea dorada interior */}
        <polygon points="4,19 14,3 186,3 196,19 186,35 14,35"
          fill="none" stroke={GOLD} strokeWidth="0.7" opacity="0.55"/>
        {/* Texto */}
        <text x="100" y="23.5" textAnchor="middle"
          fontFamily="Palatino, Georgia, serif"
          fontSize="9.5" fontWeight="700" letterSpacing="3.5"
          fill="rgba(255,255,255,0.92)">
          SINCE  1984
        </text>
      </svg>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
//  NOTA MANUSCRITA — texto artesanal fuera de la cuadrícula principal
// ─────────────────────────────────────────────────────────────────────────────
function HandwrittenNote({ text, rotation = 3, color = R }: { text: string; rotation?: number; color?: string }) {
  return (
    <div aria-hidden style={{
      display: "inline-block",
      transform: `rotate(${rotation}deg)`,
      pointerEvents: "none",
    }}>
      <span style={{
        fontFamily: "Palatino, Georgia, serif",
        fontStyle: "italic",
        fontSize: "0.88rem",
        color,
        opacity: 0.7,
        letterSpacing: "0.04em",
        borderBottom: `1.5px solid ${color}40`,
        paddingBottom: "1px",
        display: "inline-block",
      }}>
        {text}
      </span>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
//  MARCO ORNAMENTAL — CSS puro para bordes + SVG fijo para esquinas
//  Sin preserveAspectRatio="none": los círculos no se deforman nunca
// ─────────────────────────────────────────────────────────────────────────────

// Esquina decorativa (top-left). Se voltea con CSS para las demás.
function CornerRosette() {
  // Arcos concéntricos de cuarto de círculo desde la esquina (0,0)
  // + badge central + hojas decorativas
  return (
    <svg width="110" height="110" viewBox="0 0 110 110"
      xmlns="http://www.w3.org/2000/svg" style={{ display: "block" }}>

      {/* ── Arcos concéntricos — capas de borde visual ── */}
      {/* verde exterior */}
      <path d="M 0 104 A 104 104 0 0 1 104 0 L 110 0 L 110 110 L 0 110 Z"
        fill={G}/>
      {/* franja crema */}
      <path d="M 0 96 A 96 96 0 0 1 96 0 L 104 0 A 104 104 0 0 0 0 104 Z"
        fill={PARCHMENT2}/>
      {/* línea dorada */}
      <path d="M 0 94 A 94 94 0 0 1 94 0 L 96 0 A 96 96 0 0 0 0 96 Z"
        fill={GOLD}/>
      {/* franja crema */}
      <path d="M 0 91 A 91 91 0 0 1 91 0 L 94 0 A 94 94 0 0 0 0 94 Z"
        fill={PARCHMENT2}/>
      {/* rojo */}
      <path d="M 0 84 A 84 84 0 0 1 84 0 L 91 0 A 91 91 0 0 0 0 91 Z"
        fill={R}/>
      {/* línea dorada interior */}
      <path d="M 0 82 A 82 82 0 0 1 82 0 L 84 0 A 84 84 0 0 0 0 84 Z"
        fill={GOLD} opacity="0.6"/>
      {/* franja crema interior */}
      <path d="M 0 79 A 79 79 0 0 1 79 0 L 82 0 A 82 82 0 0 0 0 82 Z"
        fill={PARCHMENT}/>

      {/* ── Badge central en la esquina ── */}
      {/* Fondo verde del badge */}
      <circle cx="0" cy="0" r="52" fill={G}/>
      {/* Anillo dorado */}
      <circle cx="0" cy="0" r="45" fill={GOLD}/>
      {/* Relleno rojo */}
      <circle cx="0" cy="0" r="40" fill={R}/>
      {/* Línea dorada */}
      <circle cx="0" cy="0" r="35" fill="none" stroke={GOLD} strokeWidth="1.5"/>
      {/* Interior crema */}
      <circle cx="0" cy="0" r="32" fill={PARCHMENT}/>
      {/* Medallón dorado central */}
      <circle cx="0" cy="0" r="22" fill={GOLD}/>
      {/* Centro rojo */}
      <circle cx="0" cy="0" r="15" fill={R}/>
      {/* Punto blanco */}
      <circle cx="0" cy="0" r="7"  fill={PARCHMENT2}/>
      <circle cx="0" cy="0" r="3"  fill={GOLD}/>

      {/* ── Hojas decorativas en los brazos del arco ── */}
      {/* brazo horizontal (arriba) */}
      <ellipse cx="58" cy="5"  rx="12" ry="3.5" transform="rotate(-8  58 5)"  fill={GOLD} opacity="0.75"/>
      <ellipse cx="76" cy="4"  rx="10" ry="3"   transform="rotate(-5  76 4)"  fill={GOLD} opacity="0.6"/>
      <ellipse cx="92" cy="3"  rx="8"  ry="2.5" transform="rotate(-3  92 3)"  fill={GOLD} opacity="0.5"/>
      {/* brazo vertical (izquierda) */}
      <ellipse cx="5"  cy="58" rx="12" ry="3.5" transform="rotate(-82 5  58)" fill={GOLD} opacity="0.75"/>
      <ellipse cx="4"  cy="76" rx="10" ry="3"   transform="rotate(-85 4  76)" fill={GOLD} opacity="0.6"/>
      <ellipse cx="3"  cy="92" rx="8"  ry="2.5" transform="rotate(-87 3  92)" fill={GOLD} opacity="0.5"/>

      {/* ── Pequeños rombos decorativos ── */}
      <path d="M 50 9 L 54 5 L 58 9 L 54 13 Z" fill={R} opacity="0.7"/>
      <path d="M 9 50 L 5 54 L 9 58 L 13 54 Z" fill={R} opacity="0.7"/>
    </svg>
  );
}

// Medallón para el centro de cada lado del borde
function SideMedallion({ horizontal = true }: { horizontal?: boolean }) {
  return (
    <svg
      width={horizontal ? 48 : 26}
      height={horizontal ? 26 : 48}
      viewBox="0 0 48 26"
      xmlns="http://www.w3.org/2000/svg"
      style={{ display: "block", transform: horizontal ? "none" : "rotate(90deg)" }}
    >
      {/* Cuerpo del medallón — rombo ovalado */}
      <ellipse cx="24" cy="13" rx="23" ry="12" fill={G}/>
      <ellipse cx="24" cy="13" rx="19" ry="9"  fill={GOLD}/>
      <ellipse cx="24" cy="13" rx="15" ry="6"  fill={R}/>
      <ellipse cx="24" cy="13" rx="10" ry="4"  fill={GOLD}/>
      <ellipse cx="24" cy="13" rx="5"  ry="2"  fill={R}/>
      <circle  cx="24" cy="13" r="2"           fill={PARCHMENT2}/>
      {/* Puntas */}
      <path d="M 0 13 L 5 10 L 5 16 Z"  fill={G}/>
      <path d="M 48 13 L 43 10 L 43 16 Z" fill={G}/>
    </svg>
  );
}

function OrnateFrame() {
  return (
    <div aria-hidden style={{ position: "absolute", inset: 0, zIndex: 20, pointerEvents: "none" }}>

      {/* ── CAPAS DE BORDE — CSS box-shadow, sin distorsión ── */}
      <div style={{
        position: "absolute", inset: 0,
        boxShadow: `
          inset 0 0 0 9px  ${G},
          inset 0 0 0 12px ${PARCHMENT2},
          inset 0 0 0 13px ${GOLD},
          inset 0 0 0 14px ${PARCHMENT2},
          inset 0 0 0 20px ${R},
          inset 0 0 0 21px ${GOLD}90,
          inset 0 0 0 23px ${PARCHMENT}
        `,
      }}/>

      {/* ── ESQUINAS — SVG fijo 110×110, volteo CSS ── */}
      <div style={{ position: "absolute", top: 0, left: 0 }}>
        <CornerRosette />
      </div>
      <div style={{ position: "absolute", top: 0, right: 0, transform: "scaleX(-1)" }}>
        <CornerRosette />
      </div>
      <div style={{ position: "absolute", bottom: 0, left: 0, transform: "scaleY(-1)" }}>
        <CornerRosette />
      </div>
      <div style={{ position: "absolute", bottom: 0, right: 0, transform: "scale(-1,-1)" }}>
        <CornerRosette />
      </div>

      {/* ── MEDALLONES LATERALES — centro de cada lado ── */}
      {/* Arriba */}
      <div style={{ position: "absolute", top: 0, left: "50%", transform: "translateX(-50%)" }}>
        <SideMedallion horizontal={true} />
      </div>
      {/* Abajo */}
      <div style={{ position: "absolute", bottom: 0, left: "50%", transform: "translateX(-50%) scaleY(-1)" }}>
        <SideMedallion horizontal={true} />
      </div>
      {/* Izquierda */}
      <div style={{ position: "absolute", left: 0, top: "50%", transform: "translateY(-50%)" }}>
        <SideMedallion horizontal={false} />
      </div>
      {/* Derecha */}
      <div style={{ position: "absolute", right: 0, top: "50%", transform: "translateY(-50%) scaleX(-1)" }}>
        <SideMedallion horizontal={false} />
      </div>

    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
//  CABECERA — bloque tipo cartel vintage. Impreso sobre papel. No web.
// ─────────────────────────────────────────────────────────────────────────────
function VintageHero({
  logo, logoAlt, name, tagline, welcomeMessage, chefMessage,
  showLogo, showWelcomeMessage, showChefMessage,
  headingFont, bodyFont,
}: {
  logo?: string; logoAlt?: string; name: string; tagline?: string;
  welcomeMessage?: string; chefMessage?: string;
  showLogo?: boolean; showWelcomeMessage?: boolean; showChefMessage?: boolean;
  headingFont: string; bodyFont: string;
}) {
  return (
    <div style={{ position: "relative" }}>

      {/* ── BANDA TRICOLOR SUPERIOR — ancha, visible ── */}
      <div>
        <div style={{
          height: "34px",
          background: `linear-gradient(90deg, ${G} 0%, ${G2} 50%, ${G} 100%)`,
          display: "flex", alignItems: "center", justifyContent: "center",
        }}>
          <span style={{
            color: "rgba(255,255,255,0.82)", fontSize: "0.42rem",
            letterSpacing: "0.85em", fontFamily: bodyFont,
            textTransform: "uppercase", fontWeight: 400,
          }}>
            &nbsp;&nbsp;&nbsp;ristorante autentico italiano
          </span>
        </div>
        <div style={{ height: "8px", background: PARCHMENT2 }}/>
        <div style={{
          height: "20px",
          background: `linear-gradient(90deg, ${R} 0%, ${R2} 50%, ${R} 100%)`,
        }}/>
      </div>

      {/* ── CUERPO PRINCIPAL DEL HERO — bermellón profundo ── */}
      <div style={{
        position: "relative",
        background: `
          radial-gradient(ellipse at 50% 30%, #6a0f0f 0%, #4a0808 45%, #2e0404 100%)
        `,
        padding: "3.5rem 4rem 4.5rem",
        textAlign: "center",
        overflow: "hidden",
      }}>

        {/* Textura de líneas finas sobre el bloque rojo */}
        <div aria-hidden style={{
          position: "absolute", inset: 0, pointerEvents: "none",
          backgroundImage: `repeating-linear-gradient(
            0deg,
            rgba(255,255,255,0.018) 0px,
            rgba(255,255,255,0.018) 1px,
            transparent 1px,
            transparent 14px
          )`,
        }}/>

        {/* Vignette lateral */}
        <div aria-hidden style={{
          position: "absolute", inset: 0, pointerEvents: "none",
          background: "radial-gradient(ellipse at 50% 50%, transparent 55%, rgba(0,0,0,0.35) 100%)",
        }}/>

        {/* Marco dorado interior del hero */}
        <div aria-hidden style={{
          position: "absolute", inset: "12px", pointerEvents: "none",
          border: `1px solid ${GOLD}45`,
          boxShadow: `inset 0 0 0 4px ${GOLD}18`,
        }}/>

        {/* Logo */}
        {showLogo && logo && (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={logo} alt={logoAlt ?? name} style={{
            height: "7rem", objectFit: "contain",
            marginBottom: "1.75rem", position: "relative",
            filter: "brightness(0) invert(1) sepia(0.2)", opacity: 0.92,
          }}/>
        )}

        {/* Ornamento superior de estrellas */}
        <div style={{ position: "relative", display: "flex", alignItems: "center", justifyContent: "center", gap: "0.6rem", marginBottom: "1.75rem" }}>
          <div style={{ flex: 1, height: "1px", background: `linear-gradient(to right, transparent, ${GOLD2}80)` }}/>
          <span style={{ color: GOLD2, fontSize: "0.55rem", letterSpacing: "0.5em" }}>★ ★ ★ ★ ★</span>
          <div style={{ flex: 1, height: "1px", background: `linear-gradient(to left, transparent, ${GOLD2}80)` }}/>
        </div>

        {/* NOMBRE — 7rem, tipografía de póster */}
        <h1 style={{
          position: "relative",
          fontFamily: headingFont,
          fontSize: "7rem",
          fontWeight: 700,
          color: "#ffffff",
          margin: 0,
          lineHeight: 0.88,
          letterSpacing: "0.025em",
          textShadow: `
            0 2px 4px rgba(0,0,0,0.6),
            0 6px 30px rgba(0,0,0,0.5),
            0 0 80px rgba(180,80,80,0.3)
          `,
        }}>
          {name}
        </h1>

        {/* Regla dorada triple */}
        <div style={{ position: "relative", display: "flex", flexDirection: "column", alignItems: "center", gap: "3px", margin: "2.25rem auto 1.5rem", width: "55%", maxWidth: "18rem" }}>
          <div style={{ width: "100%", height: "1px", background: `linear-gradient(to right, transparent, ${GOLD2}, transparent)` }}/>
          <div style={{ width: "60%", height: "2px", background: `linear-gradient(to right, transparent, ${GOLD2}cc, transparent)` }}/>
          <div style={{ width: "100%", height: "1px", background: `linear-gradient(to right, transparent, ${GOLD2}, transparent)` }}/>
        </div>

        {/* Tagline */}
        {tagline && (
          <p style={{
            position: "relative",
            fontFamily: bodyFont, fontStyle: "italic",
            fontSize: "1.08rem", color: "rgba(255,255,255,0.8)",
            margin: 0, letterSpacing: "0.07em",
          }}>
            {tagline}
          </p>
        )}

        {/* Welcome message — caja con borde */}
        {showWelcomeMessage && welcomeMessage && (
          <div style={{
            position: "relative",
            margin: "1.75rem auto 0",
            padding: "1.1rem 2.5rem",
            maxWidth: "28rem",
            borderTop: `1px solid ${GOLD}50`,
            borderBottom: `1px solid ${GOLD}50`,
          }}>
            <p style={{
              fontFamily: bodyFont, fontStyle: "italic",
              fontSize: "0.87rem", color: "rgba(255,255,255,0.62)",
              lineHeight: 1.95, margin: 0,
            }}>
              {welcomeMessage}
            </p>
          </div>
        )}

        {/* Chef message */}
        {showChefMessage && chefMessage && (
          <p style={{
            position: "relative",
            fontFamily: bodyFont, fontStyle: "italic",
            fontSize: "0.81rem", color: "rgba(255,255,255,0.45)",
            lineHeight: 2, maxWidth: "26rem",
            margin: "1.25rem auto 0",
          }}>
            {chefMessage}
          </p>
        )}

        {/* ── SELLO DE IMPRENTA — rompe la simetría intencionalmente ── */}
        <FattoConAmoreStamp rotation={-14} />

        {/* ── CINTA "Since 1984" — fuera del grid, rotada ── */}
        <ArtisanalRibbon />

      </div>

      {/* ── FRANJA VERDE DE BIENVENIDA ── */}
      <div style={{
        background: `linear-gradient(90deg, ${G} 0%, ${G2} 30%, ${G2} 70%, ${G} 100%)`,
        padding: "0.9rem 3rem",
        textAlign: "center",
        display: "flex", alignItems: "center", justifyContent: "center", gap: "1.5rem",
        borderTop: `2px solid ${GOLD}30`,
        borderBottom: `2px solid ${GOLD}30`,
      }}>
        <div style={{ height: "1px", flex: 1, background: "rgba(255,255,255,0.3)" }}/>
        <span style={{
          fontFamily: bodyFont, fontStyle: "italic",
          fontSize: "0.82rem", color: "rgba(255,255,255,0.88)",
          letterSpacing: "0.06em", whiteSpace: "nowrap",
        }}>
          Cucina è amore — benvenuti alla nostra tavola
        </span>
        <div style={{ height: "1px", flex: 1, background: "rgba(255,255,255,0.3)" }}/>
      </div>

    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
//  REGLA TIPOGRÁFICA — borde ornamental superior/inferior de categoría
// ─────────────────────────────────────────────────────────────────────────────
function TypographicRule({ accent }: { accent: string }) {
  return (
    <svg width="100%" height="28" viewBox="0 0 500 28" preserveAspectRatio="none"
      xmlns="http://www.w3.org/2000/svg" style={{ display: "block" }}>
      {/* Línea gruesa */}
      <line x1="0" y1="14" x2="500" y2="14" stroke={accent} strokeWidth="3"/>
      {/* Línea fina dorada encima */}
      <line x1="0" y1="10" x2="500" y2="10" stroke={GOLD} strokeWidth="0.8" opacity="0.6"/>
      {/* Línea fina dorada debajo */}
      <line x1="0" y1="18" x2="500" y2="18" stroke={GOLD} strokeWidth="0.8" opacity="0.6"/>
      {/* Rombo ornamental izquierdo */}
      <path d="M 24 14 L 32 8 L 40 14 L 32 20 Z" fill={accent}/>
      <path d="M 26 14 L 32 10 L 38 14 L 32 18 Z" fill={GOLD} opacity="0.7"/>
      {/* Rombo central */}
      <path d="M 242 14 L 250 5  L 258 14 L 250 23 Z" fill={accent}/>
      <path d="M 244 14 L 250 8  L 256 14 L 250 20 Z" fill={GOLD} opacity="0.8"/>
      <circle cx="250" cy="14" r="3" fill={PARCHMENT}/>
      {/* Rombo ornamental derecho */}
      <path d="M 460 14 L 468 8 L 476 14 L 468 20 Z" fill={accent}/>
      <path d="M 462 14 L 468 10 L 474 14 L 468 18 Z" fill={GOLD} opacity="0.7"/>
      {/* Puntos decorativos flanqueando el centro */}
      <circle cx="220" cy="14" r="3" fill={accent} opacity="0.7"/>
      <circle cx="210" cy="14" r="2" fill={accent} opacity="0.4"/>
      <circle cx="280" cy="14" r="3" fill={accent} opacity="0.7"/>
      <circle cx="290" cy="14" r="2" fill={accent} opacity="0.4"/>
    </svg>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
//  SEPARADOR ENTRE CATEGORÍAS — pausa visual de peso tipográfico real
// ─────────────────────────────────────────────────────────────────────────────
function OrnamentalDivider({ index }: { index: number }) {
  const notes = ["— la vera cucina —", "— ingredienti freschi —", "— fatto a mano —"];
  const note  = notes[index % notes.length];
  const c1    = index % 2 === 0 ? R : G;
  const c2    = index % 2 === 0 ? G : R;
  return (
    <div style={{
      position: "relative",
      padding: "3rem 0",
      display: "flex", flexDirection: "column", alignItems: "center", gap: "0.6rem",
    }}>
      {/* Nota manuscrita rotada — fuera de cuadrícula */}
      <div aria-hidden style={{
        position: "absolute", top: "10px", right: "10px",
        transform: "rotate(5deg)", pointerEvents: "none",
      }}>
        <span style={{
          fontFamily: "Palatino, Georgia, serif", fontStyle: "italic",
          fontSize: "0.7rem", color: c1, opacity: 0.5, letterSpacing: "0.04em",
        }}>{note}</span>
      </div>

      {/* Triple regla coloreada */}
      <div style={{ width: "100%", height: "2px", background: `linear-gradient(to right, transparent, ${c1} 15%, ${c1} 85%, transparent)` }}/>
      <div style={{ width: "70%",  height: "1px", background: `linear-gradient(to right, transparent, ${GOLD}80, transparent)` }}/>
      <div style={{ width: "100%", height: "2px", background: `linear-gradient(to right, transparent, ${c2} 15%, ${c2} 85%, transparent)` }}/>

      {/* Ornamento central grande */}
      <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)" }}>
        <svg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg">
          <circle cx="30" cy="30" r="28" fill={PARCHMENT}/>
          <circle cx="30" cy="30" r="26" fill="none" stroke={c1} strokeWidth="2"/>
          <circle cx="30" cy="30" r="20" fill={c1}/>
          <circle cx="30" cy="30" r="14" fill={GOLD}/>
          <circle cx="30" cy="30" r="9"  fill={c2}/>
          <circle cx="30" cy="30" r="5"  fill={PARCHMENT2}/>
          <circle cx="30" cy="30" r="2"  fill={GOLD}/>
        </svg>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
//  BLOQUE DE CATEGORÍA — carta italiana premium: visible a varios metros
// ─────────────────────────────────────────────────────────────────────────────
function CategoryBlock({
  index, label, title, description,
  headingFont, bodyFont,
  children,
}: {
  index: number; label: string; title: string; description?: string;
  headingFont: string; bodyFont: string;
  children: React.ReactNode;
}) {
  const isEven = index % 2 === 0;
  const accent  = isEven ? G  : R;
  const accent2 = isEven ? G2 : R2;
  const bgBlock = isEven ? "#e8f2e8" : "#f2e8e8";

  return (
    <div style={{
      position: "relative",
      background: bgBlock,
      border: `1.5px solid ${accent}30`,
      boxShadow: `0 4px 24px ${accent}18, inset 0 0 0 4px ${PARCHMENT}`,
      marginBottom: "0.5rem",
    }}>

      {/* ── Regla tipográfica superior ── */}
      <TypographicRule accent={accent} />

      {/* ── Número de capítulo rotado — fuera de cuadrícula ── */}
      <div aria-hidden style={{
        position: "absolute", top: "28px", right: "16px",
        transform: "rotate(8deg)", zIndex: 5, pointerEvents: "none",
      }}>
        <svg width="54" height="54" viewBox="0 0 54 54" xmlns="http://www.w3.org/2000/svg">
          <circle cx="27" cy="27" r="25" fill={PARCHMENT}/>
          <circle cx="27" cy="27" r="23" fill="none" stroke={accent} strokeWidth="1.5" strokeDasharray="4,2" opacity="0.6"/>
          <circle cx="27" cy="27" r="18" fill={accent} opacity="0.12"/>
          <text x="27" y="32" textAnchor="middle"
            fontFamily="Palatino, Georgia, serif" fontSize="18" fontWeight="700"
            fill={accent} opacity="0.65">
            {String(index + 1).padStart(2, "0")}
          </text>
        </svg>
      </div>

      {/* ── Banda de etiqueta — ALTA y protagonista ── */}
      <div style={{
        background: `linear-gradient(135deg, ${accent} 0%, ${accent2} 40%, ${accent2} 60%, ${accent} 100%)`,
        padding: "1.4rem 4rem",
        display: "flex", alignItems: "center", justifyContent: "center", gap: "1.5rem",
        borderTop: `1px solid ${GOLD}55`,
        borderBottom: `1px solid ${GOLD}55`,
      }}>
        {/* Rombo decorativo izquierdo */}
        <svg width="14" height="14" viewBox="0 0 14 14" style={{ flexShrink: 0 }}>
          <path d="M 7 0 L 14 7 L 7 14 L 0 7 Z" fill={GOLD} opacity="0.75"/>
          <path d="M 7 3 L 11 7 L 7 11 L 3 7 Z" fill={PARCHMENT} opacity="0.4"/>
        </svg>
        <div style={{ flex: 1, height: "1.5px", background: "rgba(255,255,255,0.35)" }}/>
        <span style={{
          fontFamily: bodyFont, fontSize: "0.68rem", fontWeight: 900,
          letterSpacing: "0.72em", textTransform: "uppercase",
          color: "#ffffff", whiteSpace: "nowrap",
          textShadow: "0 1px 6px rgba(0,0,0,0.4)",
        }}>
          {label}
        </span>
        <div style={{ flex: 1, height: "1.5px", background: "rgba(255,255,255,0.35)" }}/>
        {/* Rombo decorativo derecho */}
        <svg width="14" height="14" viewBox="0 0 14 14" style={{ flexShrink: 0 }}>
          <path d="M 7 0 L 14 7 L 7 14 L 0 7 Z" fill={GOLD} opacity="0.75"/>
          <path d="M 7 3 L 11 7 L 7 11 L 3 7 Z" fill={PARCHMENT} opacity="0.4"/>
        </svg>
      </div>

      {/* ── NOMBRE — el más grande de la carta, visible desde lejos ── */}
      <div style={{ textAlign: "center", padding: "3rem 2rem 1.5rem" }}>
        <h2 style={{
          fontFamily: headingFont,
          fontSize: "7rem",
          fontWeight: 300,
          fontStyle: "italic",
          color: INK,
          margin: 0,
          lineHeight: 0.88,
          letterSpacing: "-0.03em",
          textShadow: `2px 2px 0 ${accent}20, 4px 4px 0 ${accent}0c`,
        }}>
          {title}
        </h2>

        {description && (
          <p style={{
            fontFamily: bodyFont, fontStyle: "italic",
            fontSize: "0.88rem", color: INK, opacity: 0.48,
            margin: "1.1rem 0 0", lineHeight: 1.85,
            maxWidth: "22rem", marginLeft: "auto", marginRight: "auto",
          }}>
            {description}
          </p>
        )}

        {/* Minibandera tricolor */}
        <div style={{
          display: "flex", justifyContent: "center", alignItems: "stretch",
          margin: "2rem auto 0", width: "5rem", height: "4px",
          borderRadius: "2px", overflow: "hidden",
          boxShadow: "0 1px 4px rgba(0,0,0,0.18)",
        }}>
          <div style={{ flex: 1, background: G }}/>
          <div style={{ flex: 1, background: PARCHMENT2 }}/>
          <div style={{ flex: 1, background: R }}/>
        </div>
      </div>

      {/* ── Regla tipográfica inferior — antes de los ítems ── */}
      <div style={{ padding: "0.5rem 0" }}>
        <TypographicRule accent={accent} />
      </div>

      {/* ── Lista de ítems — generosa, aireada ── */}
      <div style={{ padding: "0.5rem 3rem 3rem" }}>
        {children}
      </div>

      {/* ── Regla tipográfica de cierre ── */}
      <TypographicRule accent={accent} />

    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
//  ÍTEM DE MENÚ — puntos líder, precio en tinta, nada de lista HTML
// ─────────────────────────────────────────────────────────────────────────────
function MenuItem({
  name, description, price, currency,
  featured, allergens, image,
  showPrice, showDescription,
  categoryFont, bodyFont, priceFont, isLast,
}: {
  name: string; description?: string; price?: number; currency?: string;
  featured?: boolean; allergens?: Allergen[]; image?: string;
  showPrice: boolean; showDescription: boolean;
  categoryFont: string; bodyFont: string; priceFont: string;
  isLast: boolean;
}) {
  return (
    <div>
      <div style={{ display: "flex", gap: "1rem", alignItems: "flex-start", padding: "1.55rem 0" }}>

        {image && (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={image} alt={name} style={{
            width: "5.5rem", height: "5.5rem",
            objectFit: "cover", borderRadius: "2px", flexShrink: 0,
            border: `1.5px solid ${GOLD}35`,
            boxShadow: "0 2px 8px rgba(0,0,0,0.12)",
          }}/>
        )}

        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ display: "flex", alignItems: "baseline", gap: "0.65rem" }}>

            {featured && (
              <span style={{ color: R, fontSize: "0.42rem", flexShrink: 0, lineHeight: 1, position: "relative", top: "-0.1em" }}>✦</span>
            )}

            <span style={{
              fontFamily: categoryFont, fontSize: "1.28rem",
              fontWeight: featured ? 600 : 400,
              color: INK, letterSpacing: "0.01em", lineHeight: 1.2,
              flex: "0 1 auto",
            }}>
              {name}
            </span>

            {/* puntos líder */}
            <span style={{
              flex: 1, borderBottom: `1.5px dotted ${INK}25`,
              marginBottom: "0.32rem", minWidth: "1rem",
            }}/>

            {showPrice && price != null && (
              <span style={{
                fontFamily: priceFont, fontSize: "1rem",
                fontWeight: 700, fontStyle: "italic",
                color: R, whiteSpace: "nowrap", flexShrink: 0,
              }}>
                {formatPrice(price, currency)}
              </span>
            )}
          </div>

          {showDescription && description && (
            <p style={{
              fontFamily: bodyFont, fontStyle: "italic",
              fontSize: "0.82rem", color: INK, opacity: 0.48,
              margin: "0.42rem 0 0", lineHeight: 1.85,
              paddingLeft: featured ? "1rem" : "0",
            }}>
              {description}
            </p>
          )}

          {allergens && allergens.length > 0 && (
            <AllergenBadges allergens={allergens} fontSize="0.56rem" opacity={0.36} marginTop="0.3rem"/>
          )}
        </div>
      </div>

      {!isLast && (
        <div style={{
          height: "1px",
          background: `linear-gradient(to right, transparent, ${INK}18 15%, ${INK}14 85%, transparent)`,
        }}/>
      )}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
//  COMPONENTE PRINCIPAL
// ─────────────────────────────────────────────────────────────────────────────
export function PizzaTrattoriaTemplate({ project, categories, design, lang }: TemplateProps) {
  const { restaurantInfo, branding, hero } = project;
  const { layout } = design;
  const typo = resolveTypography(design);

  const visible = categories
    .filter((c) => c.visible)
    .sort((a, b) => a.sortOrder - b.sortOrder);

  const hasLogo = !!(branding?.showLogo && branding.logo);

  const showHero =
    design.capabilities.supportsHeroSection &&
    !!hero?.showHero &&
    (!!hero.heroImage || !!(hero.title?.[lang] || hero.title?.["es"]));

  const heroTitle = (showHero && t(hero?.title, lang))
    ? t(hero!.title, lang)
    : restaurantInfo.name;

  return (
    <BackgroundLayer
      design={design}
      style={{
        color: INK,
        fontFamily: typo.bodyFont,
        minHeight: "100%",
        position: "relative",
        // Papel envejecido: color base + textura SVG + vignette radial
        background: `
          radial-gradient(ellipse at 50% 0%,    rgba(0,0,0,0.06) 0%, transparent 60%),
          radial-gradient(ellipse at 0% 50%,    rgba(0,0,0,0.04) 0%, transparent 50%),
          radial-gradient(ellipse at 100% 50%,  rgba(0,0,0,0.04) 0%, transparent 50%),
          radial-gradient(ellipse at 50% 100%,  rgba(0,0,0,0.06) 0%, transparent 60%),
          ${PAPER_TEXTURE},
          linear-gradient(160deg, #f8edd5 0%, ${PARCHMENT} 35%, ${PARCHMENT2} 100%)
        `,
      }}
    >

      {/* ── Marco ornamental (encima de todo) ─────────────────────────────── */}
      <OrnateFrame />

      {/* ── Contenido — margen interior al marco ──────────────────────────── */}
      <div style={{ position: "relative", zIndex: 1, margin: "14px" }}>

        {/* ── Hero vintage ──────────────────────────────────────────────── */}
        <VintageHero
          logo={branding?.logo}
          logoAlt={restaurantInfo.name}
          name={heroTitle}
          tagline={restaurantInfo.tagline}
          welcomeMessage={branding?.welcomeMessage?.[lang]}
          chefMessage={hero?.chefMessage?.[lang]}
          showLogo={hasLogo}
          showWelcomeMessage={!!(branding?.welcomeMessage?.[lang])}
          showChefMessage={!!(hero?.showChefMessage && hero.chefMessage?.[lang])}
          headingFont={typo.titleFont}
          bodyFont={typo.bodyFont}
        />

        {/* ── Categorías sobre papel envejecido ─────────────────────────── */}
        <div style={{ padding: "2rem 2.5rem 4rem" }}>
          {visible.map((cat, idx) => {
            const items = cat.items
              .filter((i) => i.available)
              .sort((a, b) => a.sortOrder - b.sortOrder);
            if (items.length === 0) return null;

            const catLabel = t(cat.name, lang)?.toUpperCase() ?? "";
            const catDesc  = layout.showDescriptions
              ? t(cat.description, lang) || undefined
              : undefined;

            return (
              <section key={cat.id}>

                {idx > 0 && <OrnamentalDivider index={idx} />}

                <CategoryBlock
                  index={idx}
                  label={catLabel}
                  title={t(cat.name, lang)}
                  description={catDesc}
                  headingFont={typo.categoryFont}
                  bodyFont={typo.bodyFont}
                >
                  {items.map((item, itemIdx) => (
                    <MenuItem
                      key={item.id}
                      name={t(item.name, lang)}
                      description={layout.showDescriptions ? t(item.description, lang) || undefined : undefined}
                      price={item.price}
                      currency={item.currency}
                      featured={item.featured}
                      allergens={item.allergens?.contains}
                      image={item.image}
                      showPrice={layout.showPrices}
                      showDescription={layout.showDescriptions}
                      categoryFont={typo.categoryFont}
                      bodyFont={typo.bodyFont}
                      priceFont={typo.priceFont}
                      isLast={itemIdx === items.length - 1}
                    />
                  ))}
                </CategoryBlock>

              </section>
            );
          })}
        </div>

        {/* ── Pie de página — sobre verde oscuro ────────────────────────── */}
        {(restaurantInfo.address || restaurantInfo.phone ||
          restaurantInfo.website || restaurantInfo.socialLinks?.instagram) && (
          <div>
            {/* Separador ornamental final */}
            <OrnamentalDivider index={0} />

            <div style={{
              background: `linear-gradient(90deg, ${G} 0%, ${G2} 40%, ${G2} 60%, ${G} 100%)`,
              padding: "1.5rem 3rem",
              textAlign: "center",
              borderTop: `1px solid ${GOLD}40`,
            }}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "0.75rem", marginBottom: "0.75rem" }}>
                <div style={{ height: "1px", flex: 1, background: "rgba(255,255,255,0.3)" }}/>
                <span style={{ color: GOLD2, opacity: 0.85, fontSize: "0.48rem", letterSpacing: "0.45em" }}>✦ ✦ ✦</span>
                <div style={{ height: "1px", flex: 1, background: "rgba(255,255,255,0.3)" }}/>
              </div>
              <p style={{
                fontFamily: typo.bodyFont, fontStyle: "italic",
                fontSize: "0.71rem", color: "rgba(255,255,255,0.75)",
                margin: 0, letterSpacing: "0.035em", lineHeight: 2,
              }}>
                {[
                  restaurantInfo.address,
                  restaurantInfo.phone,
                  restaurantInfo.website,
                  restaurantInfo.socialLinks?.instagram,
                ].filter(Boolean).join("  ·  ")}
              </p>
            </div>

            {/* Banda tricolor inferior */}
            <div>
              <div style={{ height: "20px", background: `linear-gradient(90deg, ${R} 0%, ${R2} 50%, ${R} 100%)` }}/>
              <div style={{ height: "8px", background: PARCHMENT2 }}/>
              <div style={{ height: "34px", background: `linear-gradient(90deg, ${G} 0%, ${G2} 50%, ${G} 100%)`, display: "flex", alignItems: "center", justifyContent: "center" }}>
                <span style={{ color: "rgba(255,255,255,0.6)", fontSize: "0.38rem", letterSpacing: "0.8em", fontFamily: typo.bodyFont }}>
                  &nbsp;&nbsp;&nbsp;fatto con amore
                </span>
              </div>
            </div>
          </div>
        )}

      </div>
    </BackgroundLayer>
  );
}
