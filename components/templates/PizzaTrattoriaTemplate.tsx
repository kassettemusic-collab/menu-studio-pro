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
//  MARCO ORNAMENTAL — todo el documento, tipo menú impreso victoriano
// ─────────────────────────────────────────────────────────────────────────────
function OrnateFrame() {
  // Margen desde el borde del papel
  const M = 14;
  const W = "calc(100% - 28px)";
  const H = "calc(100% - 28px)";

  return (
    <div aria-hidden style={{ position: "absolute", inset: 0, zIndex: 20, pointerEvents: "none" }}>
      <svg
        style={{ position: "absolute", top: M, left: M, width: W, height: H }}
        viewBox="0 0 600 860" preserveAspectRatio="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Capa exterior verde */}
        <rect x="0"  y="0"  width="600" height="860" fill="none" stroke={G}    strokeWidth="10"/>
        {/* Línea dorada fina */}
        <rect x="6"  y="6"  width="588" height="848" fill="none" stroke={GOLD} strokeWidth="1.5"/>
        {/* Capa roja */}
        <rect x="10" y="10" width="580" height="840" fill="none" stroke={R}    strokeWidth="7"/>
        {/* Línea dorada interior */}
        <rect x="16" y="16" width="568" height="828" fill="none" stroke={GOLD} strokeWidth="1"/>
        {/* Línea negra de cierre */}
        <rect x="20" y="20" width="560" height="820" fill="none" stroke={INK}  strokeWidth="0.5" opacity="0.3"/>

        {/* ── Ornamentos en las 4 esquinas ── */}
        {/* SUPERIOR IZQUIERDA */}
        <g transform="translate(0,0)">
          <circle cx="10" cy="10" r="9"  fill={G}/>
          <circle cx="10" cy="10" r="6"  fill={R}/>
          <circle cx="10" cy="10" r="3.5" fill={GOLD}/>
          <circle cx="10" cy="10" r="1.5" fill="#fff" opacity="0.7"/>
          {/* flores decorativas */}
          <path d="M 22 10 Q 32 4 42 10 Q 32 16 22 10Z" fill={GOLD} opacity="0.65"/>
          <path d="M 10 22 Q 4 32 10 42 Q 16 32 10 22Z" fill={GOLD} opacity="0.65"/>
          <circle cx="42" cy="10" r="3" fill={R} opacity="0.7"/>
          <circle cx="10" cy="42" r="3" fill={R} opacity="0.7"/>
          {/* pequeñas hojas de laurel */}
          <ellipse cx="30" cy="7"  rx="8" ry="3" transform="rotate(-15 30 7)"  fill={G} opacity="0.7"/>
          <ellipse cx="7"  cy="30" rx="8" ry="3" transform="rotate(-75 7 30)"  fill={G} opacity="0.7"/>
        </g>
        {/* SUPERIOR DERECHA */}
        <g transform="translate(600,0) scale(-1,1)">
          <circle cx="10" cy="10" r="9"  fill={G}/>
          <circle cx="10" cy="10" r="6"  fill={R}/>
          <circle cx="10" cy="10" r="3.5" fill={GOLD}/>
          <circle cx="10" cy="10" r="1.5" fill="#fff" opacity="0.7"/>
          <path d="M 22 10 Q 32 4 42 10 Q 32 16 22 10Z" fill={GOLD} opacity="0.65"/>
          <path d="M 10 22 Q 4 32 10 42 Q 16 32 10 22Z" fill={GOLD} opacity="0.65"/>
          <circle cx="42" cy="10" r="3" fill={R} opacity="0.7"/>
          <circle cx="10" cy="42" r="3" fill={R} opacity="0.7"/>
          <ellipse cx="30" cy="7"  rx="8" ry="3" transform="rotate(-15 30 7)"  fill={G} opacity="0.7"/>
          <ellipse cx="7"  cy="30" rx="8" ry="3" transform="rotate(-75 7 30)"  fill={G} opacity="0.7"/>
        </g>
        {/* INFERIOR IZQUIERDA */}
        <g transform="translate(0,860) scale(1,-1)">
          <circle cx="10" cy="10" r="9"  fill={G}/>
          <circle cx="10" cy="10" r="6"  fill={R}/>
          <circle cx="10" cy="10" r="3.5" fill={GOLD}/>
          <circle cx="10" cy="10" r="1.5" fill="#fff" opacity="0.7"/>
          <path d="M 22 10 Q 32 4 42 10 Q 32 16 22 10Z" fill={GOLD} opacity="0.65"/>
          <path d="M 10 22 Q 4 32 10 42 Q 16 32 10 22Z" fill={GOLD} opacity="0.65"/>
          <circle cx="42" cy="10" r="3" fill={R} opacity="0.7"/>
          <circle cx="10" cy="42" r="3" fill={R} opacity="0.7"/>
          <ellipse cx="30" cy="7"  rx="8" ry="3" transform="rotate(-15 30 7)"  fill={G} opacity="0.7"/>
          <ellipse cx="7"  cy="30" rx="8" ry="3" transform="rotate(-75 7 30)"  fill={G} opacity="0.7"/>
        </g>
        {/* INFERIOR DERECHA */}
        <g transform="translate(600,860) scale(-1,-1)">
          <circle cx="10" cy="10" r="9"  fill={G}/>
          <circle cx="10" cy="10" r="6"  fill={R}/>
          <circle cx="10" cy="10" r="3.5" fill={GOLD}/>
          <circle cx="10" cy="10" r="1.5" fill="#fff" opacity="0.7"/>
          <path d="M 22 10 Q 32 4 42 10 Q 32 16 22 10Z" fill={GOLD} opacity="0.65"/>
          <path d="M 10 22 Q 4 32 10 42 Q 16 32 10 22Z" fill={GOLD} opacity="0.65"/>
          <circle cx="42" cy="10" r="3" fill={R} opacity="0.7"/>
          <circle cx="10" cy="42" r="3" fill={R} opacity="0.7"/>
          <ellipse cx="30" cy="7"  rx="8" ry="3" transform="rotate(-15 30 7)"  fill={G} opacity="0.7"/>
          <ellipse cx="7"  cy="30" rx="8" ry="3" transform="rotate(-75 7 30)"  fill={G} opacity="0.7"/>
        </g>

        {/* ── Medallones centrales en los bordes laterales ── */}
        <g transform="translate(0,430)">
          <circle cx="10" cy="0" r="7" fill={G}/>
          <circle cx="10" cy="0" r="4" fill={GOLD}/>
          <circle cx="10" cy="0" r="2" fill={R}/>
        </g>
        <g transform="translate(600,430) scale(-1,1)">
          <circle cx="10" cy="0" r="7" fill={G}/>
          <circle cx="10" cy="0" r="4" fill={GOLD}/>
          <circle cx="10" cy="0" r="2" fill={R}/>
        </g>
        <g transform="translate(300,0)">
          <circle cx="0" cy="10" r="7" fill={G}/>
          <circle cx="0" cy="10" r="4" fill={GOLD}/>
          <circle cx="0" cy="10" r="2" fill={R}/>
        </g>
        <g transform="translate(300,860) scale(1,-1)">
          <circle cx="0" cy="10" r="7" fill={G}/>
          <circle cx="0" cy="10" r="4" fill={GOLD}/>
          <circle cx="0" cy="10" r="2" fill={R}/>
        </g>
      </svg>
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
//  SEPARADOR ORNAMENTAL — flourish impreso entre categorías
// ─────────────────────────────────────────────────────────────────────────────
function OrnamentalDivider({ index }: { index: number }) {
  const color = index % 2 === 0 ? R : G;
  return (
    <div aria-hidden style={{ padding: "2rem 0", textAlign: "center" }}>
      <svg width="440" height="52" viewBox="0 0 440 52"
        xmlns="http://www.w3.org/2000/svg" style={{ display: "inline-block" }}>

        {/* Líneas base */}
        <line x1="0"   y1="26" x2="440" y2="26" stroke={PARCHMENT2} strokeWidth="1"/>
        <line x1="0"   y1="24" x2="440" y2="24" stroke={color} strokeWidth="0.6" opacity="0.3"/>
        <line x1="0"   y1="28" x2="440" y2="28" stroke={color} strokeWidth="0.6" opacity="0.3"/>

        {/* Rama izquierda */}
        <path d="M 0 26 C 40 24 80 20 130 24 C 160 26 178 26 196 26"
          stroke={G} strokeWidth="2" fill="none" opacity="0.8"/>
        {/* Hojas izquierda */}
        {[[30,23],[58,21],[86,21],[114,22],[145,23],[172,24]].map(([x,y],i) => (
          <g key={i}>
            <ellipse cx={x} cy={y-2} rx={11-i*0.8} ry={3.2-i*0.25}
              transform={`rotate(-10 ${x} ${y-2})`} fill={G} opacity={0.72-i*0.07}/>
            <ellipse cx={x+2} cy={y+4} rx={10-i*0.8} ry={3-i*0.2}
              transform={`rotate(10 ${x+2} ${y+4})`} fill={G} opacity={0.68-i*0.07}/>
          </g>
        ))}

        {/* Ornamento central */}
        <circle cx="220" cy="26" r="13" fill={color} opacity="0.15"/>
        <circle cx="220" cy="26" r="10" fill={color}/>
        <circle cx="220" cy="26" r="7"  fill={GOLD}/>
        <circle cx="220" cy="26" r="4"  fill={color}/>
        <circle cx="220" cy="26" r="2"  fill="#fff" opacity="0.9"/>
        {/* flancos del ornamento */}
        <circle cx="200" cy="26" r="3.5" fill={GOLD} opacity="0.8"/>
        <circle cx="240" cy="26" r="3.5" fill={GOLD} opacity="0.8"/>
        <circle cx="192" cy="26" r="2"   fill={color} opacity="0.6"/>
        <circle cx="248" cy="26" r="2"   fill={color} opacity="0.6"/>

        {/* Rama derecha espejo */}
        <path d="M 440 26 C 400 24 360 20 310 24 C 280 26 262 26 244 26"
          stroke={G} strokeWidth="2" fill="none" opacity="0.8"/>
        {[[410,23],[382,21],[354,21],[326,22],[295,23],[268,24]].map(([x,y],i) => (
          <g key={i}>
            <ellipse cx={x} cy={y-2} rx={11-i*0.8} ry={3.2-i*0.25}
              transform={`rotate(10 ${x} ${y-2})`} fill={G} opacity={0.72-i*0.07}/>
            <ellipse cx={x-2} cy={y+4} rx={10-i*0.8} ry={3-i*0.2}
              transform={`rotate(-10 ${x-2} ${y+4})`} fill={G} opacity={0.68-i*0.07}/>
          </g>
        ))}

        {/* Detalles rojos — tomates/bayas */}
        <circle cx="60"  cy="16" r="7" fill={R} opacity="0.7"/>
        <circle cx="60"  cy="16" r="4" fill={R2} opacity="0.8"/>
        <path d="M 58 9 Q 60 6 62 9" stroke={G} strokeWidth="1.5" fill="none"/>
        <circle cx="380" cy="16" r="7" fill={R} opacity="0.7"/>
        <circle cx="380" cy="16" r="4" fill={R2} opacity="0.8"/>
        <path d="M 378 9 Q 380 6 382 9" stroke={G} strokeWidth="1.5" fill="none"/>
      </svg>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
//  BLOQUE DE CATEGORÍA — contenedor visual propio, papel dentro de papel
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
  const accent = isEven ? G : R;
  const accent2 = isEven ? G2 : R2;

  return (
    <div style={{
      // Contenedor con borde lateral izquierdo del color de la categoría
      borderLeft: `5px solid ${accent}`,
      background: `linear-gradient(to right, ${isEven ? "#eef5ee" : "#f5eeee"}60, ${PARCHMENT}00)`,
      marginBottom: "0.5rem",
    }}>

      {/* Etiqueta de sección — banda ancha de color */}
      <div style={{
        background: `linear-gradient(90deg, ${accent} 0%, ${accent2} 40%, ${accent2} 60%, ${accent} 100%)`,
        padding: "0.85rem 2.5rem",
        display: "flex", alignItems: "center", justifyContent: "center", gap: "1.25rem",
        marginLeft: "-5px", // cubrir el borde izquierdo
      }}>
        <div style={{ flex: 1, height: "1px", background: "rgba(255,255,255,0.4)" }}/>
        <span style={{
          fontFamily: bodyFont, fontSize: "0.6rem", fontWeight: 800,
          letterSpacing: "0.65em", textTransform: "uppercase",
          color: "#ffffff",
        }}>
          {label}
        </span>
        <div style={{ flex: 1, height: "1px", background: "rgba(255,255,255,0.4)" }}/>
      </div>

      {/* Nombre de categoría — grande, fuera del flujo de lista */}
      <div style={{
        textAlign: "center",
        padding: "2.25rem 2rem 1rem",
      }}>
        <h2 style={{
          fontFamily: headingFont,
          fontSize: "5.5rem",
          fontWeight: 300,
          fontStyle: "italic",
          color: INK,
          margin: 0, lineHeight: 0.92,
          letterSpacing: "-0.025em",
          // Efecto de sombra que simula letterpress
          textShadow: `1px 1px 0 ${accent}22, 2px 2px 0 ${accent}10`,
        }}>
          {title}
        </h2>

        {description && (
          <p style={{
            fontFamily: bodyFont, fontStyle: "italic",
            fontSize: "0.83rem", color: INK, opacity: 0.44,
            margin: "0.9rem 0 0", lineHeight: 1.85,
            maxWidth: "22rem", marginLeft: "auto", marginRight: "auto",
          }}>
            {description}
          </p>
        )}

        {/* Minibandera debajo */}
        <div style={{
          display: "flex", justifyContent: "center",
          margin: "1.5rem auto 0",
          width: "4rem", borderRadius: "1px", overflow: "hidden",
        }}>
          <div style={{ flex: 1, height: "3px", background: G }}/>
          <div style={{ flex: 1, height: "3px", background: PARCHMENT2 }}/>
          <div style={{ flex: 1, height: "3px", background: R }}/>
        </div>
      </div>

      {/* Lista de ítems — dentro del contenedor */}
      <div style={{ padding: "0.25rem 2.5rem 2rem" }}>
        {children}
      </div>

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
