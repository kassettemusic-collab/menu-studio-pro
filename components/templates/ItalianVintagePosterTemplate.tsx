"use client";

import { t } from "@/utils/translation";
import { formatPrice } from "@/utils/price";
import { AllergenBadges, BackgroundLayer } from "./shared";
import type { TemplateProps } from "./types";
import { resolveTypography } from "@/types/template";
import type { Allergen } from "@/types/menu";

// ── Paleta de imprenta italiana ───────────────────────────────────────────────

const IVORY   = "#F8EDD6";  // papel marfil envejecido
const IVORY2  = "#EFE0BC";  // papel ligeramente más oscuro
const BURG    = "#5A1A1A";  // borgoña profundo — títulos principales
const BURG2   = "#7A2828";  // borgoña secundario
const GRN     = "#1B3A28";  // verde bosque — etiquetas de categoría
const GRN2    = "#2D5440";  // verde hoja — follaje
const GOLD    = "#B8862A";  // oro antiguo — ornamentos
const GOLD2   = "#D4A642";  // oro claro — detalles sutiles
const INK     = "#1A0F08";  // tinta casi negra

const TEXTURE = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='400'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.68' numOctaves='4' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='400' height='400' filter='url(%23n)' opacity='0.038'/%3E%3C/svg%3E")`;

// ── Ramita de olivo — ilustración botánica ────────────────────────────────────
// Un espécimen de ilustración de herbario, rama con 7 pares de hojas y 3 aceitunas.
// El componente se usa en espejo (scaleX -1) para el lado derecho.

function OliveBranch({ size = 1 }: { size?: number }) {
  const w = Math.round(88 * size);
  const h = Math.round(178 * size);

  // Hoja individual: óvalo alargado rotado alrededor de su centro
  const Leaf = ({
    cx, cy, angle, length = 13, opacity = 0.88,
    fill = GRN,
  }: {
    cx: number; cy: number; angle: number;
    length?: number; opacity?: number; fill?: string;
  }) => (
    <ellipse
      cx={cx} cy={cy}
      rx={3.2} ry={length / 2}
      fill={fill}
      opacity={opacity}
      transform={`rotate(${angle}, ${cx}, ${cy})`}
    />
  );

  return (
    <svg
      width={w} height={h}
      viewBox="0 0 88 178"
      xmlns="http://www.w3.org/2000/svg"
      style={{ display: "block" }}
      aria-hidden
    >
      <defs>
        <filter id="ivp-leaf-soften" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="0.3" result="blur"/>
          <feComposite in="SourceGraphic" in2="blur" operator="over"/>
        </filter>
      </defs>

      {/* Tallo principal — S-curve elegante */}
      <path
        d="M 44,176 C 38,155 30,130 32,104 C 34,80 44,58 46,36 C 47,22 45,10 44,4"
        stroke={GRN2}
        strokeWidth="1.7"
        fill="none"
        strokeLinecap="round"
        opacity="0.9"
      />

      {/* Tallos secundarios (ramilletes) */}
      <path d="M 37,148 C 28,138 22,130 20,122" stroke={GRN2} strokeWidth="0.9" fill="none" opacity="0.65"/>
      <path d="M 47,148 C 58,138 64,130 66,122" stroke={GRN2} strokeWidth="0.9" fill="none" opacity="0.65"/>
      <path d="M 34,120 C 24,110 18,102 16,94"  stroke={GRN2} strokeWidth="0.9" fill="none" opacity="0.6"/>
      <path d="M 46,120 C 56,110 62,102 64,94"  stroke={GRN2} strokeWidth="0.9" fill="none" opacity="0.6"/>
      <path d="M 36,94 C 26,84 20,76 18,68"     stroke={GRN2} strokeWidth="0.8" fill="none" opacity="0.55"/>
      <path d="M 46,94 C 56,84 62,76 64,68"     stroke={GRN2} strokeWidth="0.8" fill="none" opacity="0.55"/>
      <path d="M 38,68 C 28,58 24,50 24,42"     stroke={GRN2} strokeWidth="0.8" fill="none" opacity="0.5"/>
      <path d="M 46,68 C 56,58 60,50 60,42"     stroke={GRN2} strokeWidth="0.8" fill="none" opacity="0.5"/>
      <path d="M 40,44 C 32,34 30,26 32,18"     stroke={GRN2} strokeWidth="0.7" fill="none" opacity="0.45"/>
      <path d="M 46,44 C 54,34 56,26 54,18"     stroke={GRN2} strokeWidth="0.7" fill="none" opacity="0.45"/>

      {/* ── Pares de hojas — 7 niveles ── */}
      {/* Par 1 — base */}
      <Leaf cx={22} cy={128} angle={-52} length={14} opacity={0.86} fill={GRN}/>
      <Leaf cx={64} cy={124} angle={52}  length={13} opacity={0.88} fill={GRN2}/>
      <Leaf cx={18} cy={120} angle={-48} length={12} opacity={0.78} fill={GRN2}/>
      <Leaf cx={68} cy={118} angle={48}  length={12} opacity={0.80} fill={GRN}/>

      {/* Par 2 */}
      <Leaf cx={18} cy={100} angle={-50} length={13} opacity={0.84} fill={GRN}/>
      <Leaf cx={66} cy={98}  angle={50}  length={13} opacity={0.86} fill={GRN2}/>
      <Leaf cx={14} cy={92}  angle={-46} length={11} opacity={0.76} fill={GRN2}/>
      <Leaf cx={66} cy={90}  angle={46}  length={11} opacity={0.78} fill={GRN}/>

      {/* Par 3 */}
      <Leaf cx={20} cy={74}  angle={-48} length={13} opacity={0.82} fill={GRN}/>
      <Leaf cx={66} cy={72}  angle={48}  length={13} opacity={0.84} fill={GRN2}/>
      <Leaf cx={22} cy={66}  angle={-42} length={11} opacity={0.74} fill={GRN2}/>
      <Leaf cx={62} cy={64}  angle={42}  length={11} opacity={0.76} fill={GRN}/>

      {/* Par 4 */}
      <Leaf cx={24} cy={48}  angle={-44} length={12} opacity={0.80} fill={GRN}/>
      <Leaf cx={62} cy={46}  angle={44}  length={12} opacity={0.82} fill={GRN2}/>
      <Leaf cx={26} cy={40}  angle={-38} length={10} opacity={0.70} fill={GRN2}/>
      <Leaf cx={62} cy={38}  angle={38}  length={10} opacity={0.72} fill={GRN}/>

      {/* Par 5 — punta */}
      <Leaf cx={30} cy={24}  angle={-36} length={11} opacity={0.72} fill={GRN}/>
      <Leaf cx={58} cy={22}  angle={36}  length={11} opacity={0.74} fill={GRN2}/>
      <Leaf cx={34} cy={14}  angle={-28} length={9}  opacity={0.62} fill={GRN2}/>
      <Leaf cx={56} cy={12}  angle={28}  length={9}  opacity={0.64} fill={GRN}/>

      {/* ── Aceitunas — pequeñas esferas oscuras ── */}
      <circle cx={34} cy={140} r={3.8}  fill="#3A5E28" opacity={0.60}/>
      <circle cx={52} cy={136} r={3.2}  fill="#4A6E30" opacity={0.52}/>
      <circle cx={30} cy={112} r={3.2}  fill="#3A5E28" opacity={0.55}/>
      <circle cx={52} cy={108} r={2.8}  fill="#4A6E30" opacity={0.48}/>
      <circle cx={32} cy={86}  r={2.8}  fill="#3A5E28" opacity={0.50}/>
      <circle cx={52} cy={82}  r={2.4}  fill="#4A6E30" opacity={0.44}/>

      {/* Destello en cada aceituna */}
      <circle cx={33}  cy={138} r={1.0}  fill="rgba(255,255,255,0.35)"/>
      <circle cx={29}  cy={110} r={0.8}  fill="rgba(255,255,255,0.30)"/>
      <circle cx={31}  cy={84}  r={0.8}  fill="rgba(255,255,255,0.28)"/>
    </svg>
  );
}

// ── Separador ornamental ───────────────────────────────────────────────────────

function OrnamentalRule({
  color = GOLD, width = "100%", thick = false, accentColor = BURG,
}: {
  color?: string; width?: string; thick?: boolean; accentColor?: string;
}) {
  return (
    <div aria-hidden style={{ width, margin: "0 auto", position: "relative", height: thick ? "20px" : "14px", display: "flex", alignItems: "center", justifyContent: "center", gap: "0" }}>
      <svg width="100%" height={thick ? 20 : 14} viewBox="0 0 500 20" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
        {/* Línea base */}
        <line x1="0" y1="10" x2="500" y2="10" stroke={color} strokeWidth={thick ? 1.5 : 0.8} opacity="0.55"/>
        {/* Línea de acento */}
        {thick && <line x1="0" y1="14" x2="500" y2="14" stroke={color} strokeWidth="0.5" opacity="0.30"/>}
        {thick && <line x1="0" y1="6"  x2="500" y2="6"  stroke={color} strokeWidth="0.5" opacity="0.30"/>}
        {/* Rombo central */}
        <polygon points="250,2 258,10 250,18 242,10" fill={accentColor} opacity="0.75"/>
        <polygon points="250,5 255,10 250,15 245,10" fill={IVORY} opacity="0.8"/>
        {/* Ornamentos a 1/4 y 3/4 */}
        <circle cx="125" cy="10" r="2.5" fill={color} opacity="0.5"/>
        <circle cx="375" cy="10" r="2.5" fill={color} opacity="0.5"/>
        {/* Pequeños rombos secundarios */}
        <polygon points="125,7 128,10 125,13 122,10" fill={color} opacity="0.4"/>
        <polygon points="375,7 378,10 375,13 372,10" fill={color} opacity="0.4"/>
        {/* Líneas decorativas cortas flanqueando el rombo central */}
        <line x1="200" y1="10" x2="232" y2="10" stroke={color} strokeWidth="1.5" opacity="0.45"/>
        <line x1="268" y1="10" x2="300" y2="10" stroke={color} strokeWidth="1.5" opacity="0.45"/>
      </svg>
    </div>
  );
}

// ── Esquinas decorativas ──────────────────────────────────────────────────────

function CornerMark({ flip = false }: { flip?: boolean }) {
  return (
    <div aria-hidden style={{
      position: "absolute",
      width: "70px",
      height: "70px",
      overflow: "hidden",
    }}>
      <svg width="70" height="70" viewBox="0 0 70 70" xmlns="http://www.w3.org/2000/svg"
        style={flip ? { transform: "scale(-1,1)", transformOrigin: "35px 35px" } : {}}>
        {/* Arcos de esquina concéntricos */}
        <path d="M 2,68 L 2,12 Q 2,2 12,2 L 68,2" stroke={GOLD} strokeWidth="1.5" fill="none" opacity="0.65"/>
        <path d="M 7,68 L 7,16 Q 7,7 16,7 L 68,7" stroke={GOLD} strokeWidth="0.7" fill="none" opacity="0.40"/>
        <path d="M 12,68 L 12,20 Q 12,12 20,12 L 68,12" stroke={BURG} strokeWidth="0.8" fill="none" opacity="0.35"/>
        {/* Ornamento en la esquina */}
        <circle cx="10" cy="10" r="4" fill="none" stroke={GOLD} strokeWidth="1" opacity="0.55"/>
        <circle cx="10" cy="10" r="1.5" fill={GOLD} opacity="0.6"/>
        {/* Pequeños rombos en los ejes */}
        <polygon points="10,30 13,35 10,40 7,35" fill={GOLD} opacity="0.40"/>
        <polygon points="30,10 35,13 40,10 35,7" fill={GOLD} opacity="0.40"/>
      </svg>
    </div>
  );
}

// ── Marco decorativo completo ─────────────────────────────────────────────────

function VintageFrame() {
  return (
    <div aria-hidden style={{
      position: "absolute",
      inset: 0,
      pointerEvents: "none",
      zIndex: 20,
    }}>
      {/* Líneas del marco — CSS box-shadow */}
      <div style={{
        position: "absolute",
        inset: "10px",
        boxShadow: `
          0 0 0 1px ${GOLD}50,
          0 0 0 3px ${IVORY2}80,
          0 0 0 4.5px ${GOLD}40,
          0 0 0 7px ${BURG}18
        `,
        pointerEvents: "none",
      }}/>
      {/* Esquinas */}
      <div style={{ position: "absolute", top: "10px", left: "10px" }}><CornerMark/></div>
      <div style={{ position: "absolute", top: "10px", right: "10px", transform: "scaleX(-1)" }}><CornerMark/></div>
      <div style={{ position: "absolute", bottom: "10px", left: "10px", transform: "scaleY(-1)" }}><CornerMark/></div>
      <div style={{ position: "absolute", bottom: "10px", right: "10px", transform: "scale(-1,-1)" }}><CornerMark/></div>
    </div>
  );
}

// ── Sello "Fatto con Amore" ───────────────────────────────────────────────────

function FattoStamp({ rotation = -8 }: { rotation?: number }) {
  return (
    <div aria-hidden style={{
      display: "inline-block",
      transform: `rotate(${rotation}deg)`,
      filter: "drop-shadow(0 1px 3px rgba(0,0,0,0.18))",
    }}>
      <svg width="160" height="42" viewBox="0 0 160 42" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <filter id="ivp-stamp-rough">
            <feTurbulence type="turbulence" baseFrequency="0.055" numOctaves="3" result="noise"/>
            <feDisplacementMap in="SourceGraphic" in2="noise" scale="1.2" xChannelSelector="R" yChannelSelector="G"/>
          </filter>
        </defs>
        <g filter="url(#ivp-stamp-rough)">
          {/* Borde del sello */}
          <rect x="1" y="1" width="158" height="40" rx="3" ry="3" fill="none" stroke={BURG} strokeWidth="1.5" strokeDasharray="4,1.5" opacity="0.75"/>
          <rect x="4" y="4" width="152" height="34" rx="2" ry="2" fill="none" stroke={BURG} strokeWidth="0.6" opacity="0.40"/>
        </g>
        {/* Texto del sello */}
        <text x="80" y="14" textAnchor="middle"
          fontFamily="Palatino, Georgia, serif"
          fontSize="7.5" fontWeight="400" letterSpacing="4"
          fill={BURG} opacity="0.65">
          ✦ FATTO CON AMORE ✦
        </text>
        <line x1="20" y1="21" x2="140" y2="21" stroke={BURG} strokeWidth="0.5" opacity="0.30"/>
        <text x="80" y="31" textAnchor="middle"
          fontFamily="Palatino, Georgia, serif"
          fontSize="8.5" fontWeight="700" letterSpacing="2.5"
          fill={BURG} opacity="0.78">
          CUCINA TRADIZIONALE · 1984
        </text>
      </svg>
    </div>
  );
}

// ── Cabecera tipo póster ──────────────────────────────────────────────────────

interface PosterHeaderProps {
  name: string;
  tagline?: string;
  welcomeMessage?: string;
  showLogo: boolean;
  logo?: string;
  logoAlt?: string;
  headingFont: string;
  bodyFont: string;
}

function PosterHeader({
  name, tagline, welcomeMessage, showLogo, logo, logoAlt, headingFont, bodyFont,
}: PosterHeaderProps) {
  return (
    <header style={{ position: "relative", textAlign: "center", padding: "3rem 2rem 2.5rem" }}>

      {/* Logo si existe */}
      {showLogo && logo && (
        <div style={{ marginBottom: "1.5rem" }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={logo} alt={logoAlt ?? name}
            style={{ height: "6rem", objectFit: "contain", opacity: 0.9 }}
          />
        </div>
      )}

      {/* Regla superior */}
      <OrnamentalRule color={GOLD} thick accentColor={BURG}/>
      <div style={{ height: "1.8rem" }}/>

      {/* ── Zona central: olivo izquierdo | título | olivo derecho ── */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "0", position: "relative" }}>

        {/* Rama de olivo izquierda */}
        <div style={{ flexShrink: 0, transform: "translateY(12px)" }}>
          <OliveBranch size={0.95}/>
        </div>

        {/* Bloque de título */}
        <div style={{ flex: 1, minWidth: 0, padding: "0 1.5rem" }}>
          {/* Etiqueta supratítulo */}
          <p style={{
            fontFamily: bodyFont,
            fontSize: "0.65rem",
            fontWeight: 400,
            letterSpacing: "0.45em",
            color: GRN,
            opacity: 0.75,
            textTransform: "uppercase",
            marginBottom: "0.9rem",
          }}>
            Ristorante · Cucina Italiana
          </p>

          {/* NOMBRE — escala póster */}
          <h1 style={{
            fontFamily: headingFont,
            fontSize: "clamp(3.5rem, 8vw, 5.8rem)",
            fontWeight: 700,
            color: BURG,
            lineHeight: 0.90,
            margin: 0,
            letterSpacing: "0.01em",
            textShadow: `1px 2px 0 ${BURG}22, 0 4px 20px rgba(90,26,26,0.12)`,
          }}>
            {name}
          </h1>

          {/* Regla dorada fina bajo el nombre */}
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "0.8rem", margin: "1.2rem auto 0.9rem", maxWidth: "18rem" }}>
            <div style={{ flex: 1, height: "1px", background: `linear-gradient(to right, transparent, ${GOLD}80)` }}/>
            <span style={{ color: GOLD, fontSize: "0.7rem" }}>✦</span>
            <div style={{ flex: 1, height: "1px", background: `linear-gradient(to left, transparent, ${GOLD}80)` }}/>
          </div>

          {/* Tagline */}
          {tagline && (
            <p style={{
              fontFamily: bodyFont,
              fontStyle: "italic",
              fontSize: "1.05rem",
              color: INK,
              opacity: 0.68,
              lineHeight: 1.5,
              margin: "0 0 1.2rem",
            }}>
              {tagline}
            </p>
          )}

          {/* Sello artesanal */}
          <div style={{ display: "flex", justifyContent: "center", marginTop: "0.6rem" }}>
            <FattoStamp rotation={-5}/>
          </div>
        </div>

        {/* Rama de olivo derecha — espejo horizontal */}
        <div style={{ flexShrink: 0, transform: "translateY(12px) scaleX(-1)" }}>
          <OliveBranch size={0.95}/>
        </div>
      </div>

      {/* Mensaje de bienvenida */}
      {welcomeMessage && (
        <div style={{
          margin: "2rem auto 0",
          maxWidth: "30rem",
          padding: "1rem 1.5rem",
          borderTop: `1px solid ${GOLD}40`,
          borderBottom: `1px solid ${GOLD}40`,
        }}>
          <p style={{
            fontFamily: bodyFont,
            fontStyle: "italic",
            fontSize: "0.88rem",
            color: INK,
            opacity: 0.60,
            lineHeight: 1.8,
            margin: 0,
          }}>
            {welcomeMessage}
          </p>
        </div>
      )}

      <div style={{ height: "1.8rem" }}/>
      {/* Regla inferior */}
      <OrnamentalRule color={GOLD} thick accentColor={GRN}/>
    </header>
  );
}

// ── Numeral romano decorativo ─────────────────────────────────────────────────

const ROMAN = ["I","II","III","IV","V","VI","VII","VIII","IX","X"];

function CategoryNumeral({ n }: { n: number }) {
  return (
    <div aria-hidden style={{
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      width: "44px",
      height: "44px",
      borderRadius: "50%",
      border: `1.5px solid ${GOLD}60`,
      background: `radial-gradient(circle, ${IVORY2} 0%, ${IVORY} 100%)`,
      boxShadow: `inset 0 0 0 3px ${IVORY}, inset 0 0 0 4px ${GOLD}30`,
    }}>
      <span style={{
        fontFamily: "\"Cormorant Garamond\", Palatino, serif",
        fontSize: "1rem",
        fontWeight: 700,
        color: GOLD,
        letterSpacing: "0.05em",
        lineHeight: 1,
      }}>
        {ROMAN[n] ?? String(n + 1)}
      </span>
    </div>
  );
}

// ── Sección de categoría ──────────────────────────────────────────────────────

interface CategorySectionProps {
  index: number;
  label: string;
  name: string;
  description?: string;
  headingFont: string;
  bodyFont: string;
  children: React.ReactNode;
}

function CategorySection({ index, label, name, description, headingFont, bodyFont, children }: CategorySectionProps) {
  const isEven = index % 2 === 0;
  const accentColor = isEven ? GRN : BURG2;

  return (
    <section style={{ position: "relative" }}>

      {/* Cabecera de categoría */}
      <div style={{
        position: "relative",
        textAlign: "center",
        padding: "2.5rem 3rem 1.5rem",
      }}>
        {/* Numeral de categoría — parte superior izquierda */}
        <div style={{
          position: "absolute",
          top: "2rem",
          left: "3rem",
          opacity: 0.9,
        }}>
          <CategoryNumeral n={index}/>
        </div>

        {/* Etiqueta de sección */}
        <div style={{
          display: "inline-block",
          background: accentColor,
          padding: "0.28rem 2.2rem",
          marginBottom: "1.1rem",
        }}>
          <span style={{
            fontFamily: bodyFont,
            fontSize: "0.58rem",
            fontWeight: 700,
            letterSpacing: "0.55em",
            color: "rgba(255,255,255,0.90)",
            textTransform: "uppercase",
          }}>
            {label}
          </span>
        </div>

        {/* Nombre de la categoría — escala editorial */}
        <h2 style={{
          fontFamily: headingFont,
          fontSize: "clamp(3rem, 7vw, 4.8rem)",
          fontWeight: 300,
          fontStyle: "italic",
          color: accentColor,
          lineHeight: 0.92,
          margin: "0 0 0.5rem",
          letterSpacing: "0.01em",
          textShadow: `0 2px 8px ${accentColor}18`,
        }}>
          {name}
        </h2>

        {/* Descripción de la categoría */}
        {description && (
          <p style={{
            fontFamily: bodyFont,
            fontStyle: "italic",
            fontSize: "0.85rem",
            color: INK,
            opacity: 0.52,
            lineHeight: 1.6,
            maxWidth: "22rem",
            margin: "0.7rem auto 0",
          }}>
            {description}
          </p>
        )}

        {/* Barra de color tricolor italiana — pequeña, sutil */}
        <div style={{ display: "flex", justifyContent: "center", gap: 0, margin: "1.1rem auto 0", width: "5rem", height: "3px", borderRadius: "1.5px", overflow: "hidden" }}>
          <div style={{ flex: 1, background: GRN }}/>
          <div style={{ flex: 1, background: IVORY2 }}/>
          <div style={{ flex: 1, background: BURG }}/>
        </div>
      </div>

      {/* Regla ornamental bajo el nombre */}
      <div style={{ padding: "0 3rem" }}>
        <OrnamentalRule color={GOLD} accentColor={accentColor}/>
      </div>

      {/* Items */}
      <div style={{ padding: "1rem 3.5rem 2rem" }}>
        {children}
      </div>

    </section>
  );
}

// ── Item de menú ─────────────────────────────────────────────────────────────

interface VintageMenuItemProps {
  name?: string;
  description?: string;
  price?: number;
  currency?: string;
  featured?: boolean;
  allergens?: Allergen[];
  showPrice: boolean;
  showDescription: boolean;
  isLast: boolean;
  headingFont: string;
  bodyFont: string;
}

function VintageMenuItem({
  name, description, price, currency, featured, allergens,
  showPrice, showDescription, isLast, headingFont, bodyFont,
}: VintageMenuItemProps) {
  return (
    <div style={{
      paddingBottom: isLast ? 0 : "1.1rem",
      marginBottom: isLast ? 0 : "1.1rem",
      borderBottom: isLast ? "none" : `1px solid ${GOLD}20`,
    }}>

      {/* Línea de nombre + precio */}
      <div style={{ display: "flex", alignItems: "baseline", gap: "0.5rem" }}>

        {/* Estrella para platos destacados */}
        {featured && (
          <span style={{ color: GOLD, fontSize: "0.8rem", flexShrink: 0, lineHeight: 1, marginTop: "1px" }}>★</span>
        )}

        {/* Nombre del plato */}
        <span style={{
          fontFamily: headingFont,
          fontSize: "1.05rem",
          fontWeight: 600,
          color: INK,
          lineHeight: 1.3,
          flex: "0 1 auto",
        }}>
          {name}
        </span>

        {/* Guía punteada */}
        {showPrice && (
          <span style={{
            flex: 1,
            borderBottom: `1.5px dotted ${INK}28`,
            marginBottom: "3px",
            minWidth: "1.5rem",
          }}/>
        )}

        {/* Precio */}
        {showPrice && price !== undefined && price > 0 && (
          <span style={{
            fontFamily: bodyFont,
            fontStyle: "italic",
            fontSize: "1rem",
            fontWeight: 600,
            color: BURG,
            flexShrink: 0,
            lineHeight: 1.3,
          }}>
            {formatPrice(price, currency)}
          </span>
        )}
      </div>

      {/* Descripción */}
      {showDescription && description && (
        <p style={{
          fontFamily: bodyFont,
          fontStyle: "italic",
          fontSize: "0.84rem",
          color: INK,
          opacity: 0.55,
          lineHeight: 1.65,
          margin: "0.25rem 0 0",
          paddingLeft: featured ? "1.1rem" : 0,
        }}>
          {description}
        </p>
      )}

      {/* Alérgenos */}
      {allergens && allergens.length > 0 && (
        <AllergenBadges allergens={allergens} fontSize="0.55rem" opacity={0.40} marginTop="0.3rem"/>
      )}
    </div>
  );
}

// ── Separador de sección ──────────────────────────────────────────────────────

function SectionDivider({ index }: { index: number }) {
  // Alterna entre dos estilos de separador
  const isAlt = index % 2 === 1;

  return (
    <div style={{ padding: "1rem 2.5rem", position: "relative" }}>
      {isAlt ? (
        /* Separador con texto ornamental */
        <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
          <div style={{ flex: 1, height: "1px", background: `linear-gradient(to right, transparent, ${GOLD}50)` }}/>
          <span style={{
            fontFamily: "\"Cormorant Garamond\", Palatino, serif",
            fontStyle: "italic",
            fontSize: "0.82rem",
            color: GOLD,
            opacity: 0.65,
            letterSpacing: "0.15em",
            whiteSpace: "nowrap",
          }}>
            ✦ ✦ ✦
          </span>
          <div style={{ flex: 1, height: "1px", background: `linear-gradient(to left, transparent, ${GOLD}50)` }}/>
        </div>
      ) : (
        <OrnamentalRule color={GOLD} thick accentColor={BURG}/>
      )}
    </div>
  );
}

// ── Pie de página ─────────────────────────────────────────────────────────────

function VintageFooter({
  address, phone, website, bodyFont,
}: {
  address?: string; phone?: string; website?: string; bodyFont: string;
}) {
  const hasInfo = address || phone || website;
  if (!hasInfo) return null;

  return (
    <footer style={{ padding: "2rem 3rem 2.5rem", textAlign: "center" }}>
      <OrnamentalRule color={GOLD} thick accentColor={GRN}/>
      <div style={{
        marginTop: "1.5rem",
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "center",
        gap: "0.4rem 1.5rem",
      }}>
        {[address, phone, website].filter(Boolean).map((info, i, arr) => (
          <span key={i} style={{
            fontFamily: bodyFont,
            fontSize: "0.76rem",
            color: INK,
            opacity: 0.50,
            letterSpacing: "0.03em",
          }}>
            {info}
            {i < arr.length - 1 && (
              <span style={{ marginLeft: "1.5rem", color: GOLD, opacity: 0.5 }}>·</span>
            )}
          </span>
        ))}
      </div>
    </footer>
  );
}

// ── PLANTILLA PRINCIPAL ───────────────────────────────────────────────────────

export function ItalianVintagePosterTemplate({
  project, categories, design, lang,
}: TemplateProps) {
  const { restaurantInfo, branding, hero } = project;
  const { layout } = design;
  const typo = resolveTypography(design);

  const visible = categories
    .filter((c) => c.visible)
    .sort((a, b) => a.sortOrder - b.sortOrder);

  const hasLogo  = !!(branding?.showLogo && branding.logo);
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
        background: `
          radial-gradient(ellipse at 0%   0%,   rgba(0,0,0,0.04) 0%, transparent 55%),
          radial-gradient(ellipse at 100% 0%,   rgba(0,0,0,0.04) 0%, transparent 55%),
          radial-gradient(ellipse at 50%  100%, rgba(0,0,0,0.05) 0%, transparent 50%),
          ${TEXTURE},
          linear-gradient(165deg, #FBF3DE 0%, ${IVORY} 40%, ${IVORY2} 100%)
        `,
      }}
    >
      {/* Marco decorativo */}
      <VintageFrame/>

      {/* Contenido — margen interior al marco */}
      <div style={{ position: "relative", zIndex: 1, margin: "14px" }}>

        {/* Cabecera tipo póster */}
        <PosterHeader
          name={heroTitle}
          tagline={restaurantInfo.tagline}
          welcomeMessage={branding?.welcomeMessage?.[lang]}
          showLogo={hasLogo}
          logo={branding?.logo}
          logoAlt={restaurantInfo.name}
          headingFont={typo.titleFont}
          bodyFont={typo.bodyFont}
        />

        {/* Categorías */}
        <div style={{ padding: "0 0 2rem" }}>
          {visible.map((cat, idx) => {
            const items = cat.items
              .filter((i) => i.available)
              .sort((a, b) => a.sortOrder - b.sortOrder);
            if (items.length === 0) return null;

            const catName  = t(cat.name, lang) ?? "";
            const catLabel = catName.toUpperCase();
            const catDesc  = layout.showDescriptions
              ? t(cat.description, lang) || undefined
              : undefined;

            return (
              <div key={cat.id}>
                {idx > 0 && <SectionDivider index={idx}/>}

                <CategorySection
                  index={idx}
                  label={catLabel}
                  name={catName}
                  description={catDesc}
                  headingFont={typo.categoryFont}
                  bodyFont={typo.bodyFont}
                >
                  {items.map((item, itemIdx) => (
                    <VintageMenuItem
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
                      isLast={itemIdx === items.length - 1}
                    />
                  ))}
                </CategorySection>
              </div>
            );
          })}
        </div>

        {/* Pie de página */}
        <VintageFooter
          address={restaurantInfo.address}
          phone={restaurantInfo.phone}
          website={restaurantInfo.website}
          bodyFont={typo.bodyFont}
        />

      </div>
    </BackgroundLayer>
  );
}
