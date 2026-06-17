"use client";

import { t } from "@/utils/translation";
import { formatPrice } from "@/utils/price";
import { AllergenBadges, BackgroundLayer } from "./shared";
import type { TemplateProps } from "./types";
import { resolveTypography } from "@/types/template";
import type { Allergen } from "@/types/menu";

// ─────────────────────────────────────────────────────────────────────────────
// PALETA — colores de la bandera italiana + dorado de imprenta
// ─────────────────────────────────────────────────────────────────────────────

const G  = "#1a5c1a";   // verde Italia
const G2 = "#2a7a2a";   // verde medio
const R  = "#8b1a1a";   // rojo profundo
const R2 = "#a82020";   // rojo medio
const AU = "#c9a96e";   // dorado
const CR = "#faf3e8";   // crema papel
const IN = "#1e0a02";   // tinta oscura

// ─────────────────────────────────────────────────────────────────────────────
// MARCO TRICOLOR — borde completo como póster impreso
// ─────────────────────────────────────────────────────────────────────────────

function PosterFrame() {
  return (
    <>
      {/* Borde exterior verde */}
      <div aria-hidden style={{
        position: "absolute", inset: 0, zIndex: 20, pointerEvents: "none",
        boxShadow: `inset 0 0 0 10px ${G}`,
      }}/>
      {/* Línea dorada interior */}
      <div aria-hidden style={{
        position: "absolute", inset: "10px", zIndex: 20, pointerEvents: "none",
        boxShadow: `inset 0 0 0 2px ${AU}55`,
      }}/>
      {/* Borde rojo más interior */}
      <div aria-hidden style={{
        position: "absolute", inset: "14px", zIndex: 20, pointerEvents: "none",
        boxShadow: `inset 0 0 0 6px ${R}`,
      }}/>
      {/* Línea dorada final */}
      <div aria-hidden style={{
        position: "absolute", inset: "20px", zIndex: 20, pointerEvents: "none",
        boxShadow: `inset 0 0 0 1px ${AU}40`,
      }}/>
    </>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// ORNAMENTO DE ESQUINA — esquinas decorativas en SVG
// ─────────────────────────────────────────────────────────────────────────────

function CornerOrnament({ flipX = false, flipY = false }) {
  return (
    <svg width="90" height="90" viewBox="0 0 90 90"
      xmlns="http://www.w3.org/2000/svg" aria-hidden
      style={{
        display: "block",
        transform: `scale(${flipX ? -1 : 1}, ${flipY ? -1 : 1})`,
      }}>
      <g opacity="0.9">
        {/* L-shape base */}
        <rect x="0" y="0" width="90" height="8"  fill={G}/>
        <rect x="0" y="0" width="8"  height="90" fill={G}/>
        <rect x="2" y="10" width="4" height="76" fill={AU} opacity="0.5"/>
        <rect x="10" y="2" width="76" height="4" fill={AU} opacity="0.5"/>
        {/* Corner circle ornament */}
        <circle cx="4" cy="4" r="10" fill={G}/>
        <circle cx="4" cy="4" r="7"  fill={R}/>
        <circle cx="4" cy="4" r="4"  fill={AU}/>
        <circle cx="4" cy="4" r="2"  fill="#fff" opacity="0.8"/>
        {/* Decorative sprigs */}
        <path d="M 20 8 Q 28 4 36 8"  stroke={AU} strokeWidth="1.2" fill="none" opacity="0.7"/>
        <path d="M 8 20 Q 4 28 8 36"  stroke={AU} strokeWidth="1.2" fill="none" opacity="0.7"/>
        <circle cx="22" cy="6"  r="2" fill={AU} opacity="0.6"/>
        <circle cx="34" cy="6"  r="2" fill={AU} opacity="0.6"/>
        <circle cx="6"  cy="22" r="2" fill={AU} opacity="0.6"/>
        <circle cx="6"  cy="34" r="2" fill={AU} opacity="0.6"/>
      </g>
    </svg>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// CABECERA PRINCIPAL — póster vintage, tipografía enorme
// ─────────────────────────────────────────────────────────────────────────────

function PosterHero({
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

      {/* ── BANDA SUPERIOR TRICOLOR ─────────────────────────── */}
      <div style={{ display: "flex", flexDirection: "column" }}>
        <div style={{ height: "28px", background: `linear-gradient(to right, ${G}, ${G2}, ${G})`, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <span style={{ color: "rgba(255,255,255,0.7)", fontSize: "0.42rem", letterSpacing: "0.8em", fontFamily: bodyFont, textTransform: "uppercase" }}>
            ristorante autentico italiano
          </span>
        </div>
        <div style={{ height: "12px", background: "#f7f0e6", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <div style={{ width: "80%", height: "1px", background: `linear-gradient(to right, transparent, ${AU}60, transparent)` }}/>
        </div>
        <div style={{ height: "28px", background: `linear-gradient(to right, ${R}, ${R2}, ${R})`, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <span style={{ color: "rgba(255,255,255,0.65)", fontSize: "0.42rem", letterSpacing: "0.8em", fontFamily: bodyFont, textTransform: "uppercase" }}>
            cucina tradizionale dal 1984
          </span>
        </div>
      </div>

      {/* ── BLOQUE ROJO CENTRAL — nombre del restaurante ───── */}
      <div style={{
        background: `radial-gradient(ellipse at 50% 40%, #7a1010 0%, #5c0c0c 60%, #3d0808 100%)`,
        padding: "4.5rem 5rem 5rem",
        textAlign: "center",
        position: "relative",
        overflow: "hidden",
      }}>

        {/* Textura de fondo — líneas finas */}
        <div aria-hidden style={{
          position: "absolute", inset: 0, pointerEvents: "none", opacity: 0.06,
          backgroundImage: `repeating-linear-gradient(0deg, ${AU} 0px, ${AU} 1px, transparent 1px, transparent 18px)`,
        }}/>

        {/* Ornamentos de esquina dentro del hero */}
        <div style={{ position: "absolute", top: "12px", left: "12px"  }}><CornerOrnament /></div>
        <div style={{ position: "absolute", top: "12px", right: "12px" }}><CornerOrnament flipX /></div>
        <div style={{ position: "absolute", bottom: "12px", left: "12px"  }}><CornerOrnament flipY /></div>
        <div style={{ position: "absolute", bottom: "12px", right: "12px" }}><CornerOrnament flipX flipY /></div>

        {/* Logo */}
        {showLogo && logo && (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={logo} alt={logoAlt ?? name} style={{
            height: "7rem", objectFit: "contain", marginBottom: "2rem",
            filter: "brightness(0) invert(1)", opacity: 0.9,
          }}/>
        )}

        {/* Estrellitas doradas */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "0.6rem", marginBottom: "1.5rem" }}>
          <div style={{ height: "1px", width: "3rem", background: `linear-gradient(to right, transparent, ${AU})` }}/>
          <span style={{ color: AU, fontSize: "0.55rem", letterSpacing: "0.4em" }}>★ ★ ★ ★ ★</span>
          <div style={{ height: "1px", width: "3rem", background: `linear-gradient(to left, transparent, ${AU})` }}/>
        </div>

        {/* NOMBRE — 7rem, el corazón del póster */}
        <h1 style={{
          fontFamily: headingFont,
          fontSize: "7rem",
          fontWeight: 700,
          color: "#ffffff",
          margin: 0,
          lineHeight: 0.88,
          letterSpacing: "0.02em",
          textShadow: `0 4px 60px rgba(0,0,0,0.8), 0 2px 0 rgba(0,0,0,0.5)`,
        }}>
          {name}
        </h1>

        {/* Línea dorada separadora */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "0.75rem", margin: "2rem 0 1.25rem" }}>
          <div style={{ flex: 1, maxWidth: "6rem", height: "1.5px", background: `linear-gradient(to right, transparent, ${AU})` }}/>
          <span style={{ color: AU, fontSize: "0.65rem", letterSpacing: "0.3em" }}>◆ ◆ ◆</span>
          <div style={{ flex: 1, maxWidth: "6rem", height: "1.5px", background: `linear-gradient(to left, transparent, ${AU})` }}/>
        </div>

        {/* Tagline */}
        {tagline && (
          <p style={{
            fontFamily: bodyFont, fontStyle: "italic",
            fontSize: "1.1rem", color: "rgba(255,255,255,0.82)",
            margin: 0, letterSpacing: "0.08em",
            textShadow: "0 1px 8px rgba(0,0,0,0.5)",
          }}>
            {tagline}
          </p>
        )}

        {/* Welcome message en caja */}
        {showWelcomeMessage && welcomeMessage && (
          <div style={{
            margin: "1.75rem auto 0",
            padding: "1.1rem 2rem",
            maxWidth: "28rem",
            border: "1px solid rgba(255,255,255,0.2)",
            borderTop: "2px solid rgba(201,169,110,0.5)",
            borderBottom: "2px solid rgba(201,169,110,0.5)",
          }}>
            <p style={{
              fontFamily: bodyFont, fontStyle: "italic",
              fontSize: "0.88rem", color: "rgba(255,255,255,0.65)",
              lineHeight: 1.95, margin: 0,
            }}>
              {welcomeMessage}
            </p>
          </div>
        )}

        {/* Chef message */}
        {showChefMessage && chefMessage && (
          <p style={{
            fontFamily: bodyFont, fontStyle: "italic",
            fontSize: "0.82rem", color: "rgba(255,255,255,0.48)",
            lineHeight: 2, maxWidth: "28rem",
            margin: "1.25rem auto 0",
          }}>
            {chefMessage}
          </p>
        )}
      </div>

      {/* ── BANDA VERDE DE BIENVENIDA ───────────────────────── */}
      <div style={{
        background: `linear-gradient(to right, ${G}, ${G2} 30%, ${G2} 70%, ${G})`,
        padding: "0.95rem 4rem",
        textAlign: "center",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: "1.5rem",
      }}>
        <div style={{ height: "1px", flex: 1, background: `linear-gradient(to right, transparent, rgba(255,255,255,0.4))` }}/>
        <p style={{
          fontFamily: bodyFont, fontStyle: "italic",
          fontSize: "0.82rem", color: "rgba(255,255,255,0.92)",
          margin: 0, letterSpacing: "0.05em", whiteSpace: "nowrap",
        }}>
          Cucina è amore — benvenuti alla nostra tavola
        </p>
        <div style={{ height: "1px", flex: 1, background: `linear-gradient(to left, transparent, rgba(255,255,255,0.4))` }}/>
      </div>

    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// CABECERA DE CATEGORÍA — bloque visual enorme, como capítulo de libro
// ─────────────────────────────────────────────────────────────────────────────

function CategoryChapter({
  index, label, title, description, headingFont, bodyFont,
}: {
  index: number; label: string; title: string; description?: string;
  headingFont: string; bodyFont: string;
}) {
  const isEven = index % 2 === 0;

  return (
    <div style={{ margin: "0 -4rem" }}>

      {/* Banda de etiqueta — alterna verde y rojo */}
      <div style={{
        background: isEven
          ? `linear-gradient(to right, ${G}, ${G2} 30%, ${G2} 70%, ${G})`
          : `linear-gradient(to right, ${R}, ${R2} 30%, ${R2} 70%, ${R})`,
        padding: "0.85rem 6rem",
        display: "flex", alignItems: "center", justifyContent: "center", gap: "1.25rem",
      }}>
        <div style={{ height: "1px", flex: 1, background: "rgba(255,255,255,0.35)" }}/>
        <span style={{
          fontFamily: bodyFont, fontSize: "0.62rem", fontWeight: 800,
          letterSpacing: "0.65em", textTransform: "uppercase",
          color: "#ffffff", whiteSpace: "nowrap",
        }}>
          {label}
        </span>
        <div style={{ height: "1px", flex: 1, background: "rgba(255,255,255,0.35)" }}/>
      </div>

      {/* Nombre de categoría — gigante */}
      <div style={{
        textAlign: "center",
        padding: "2.5rem 2rem 1rem",
        background: CR,
      }}>
        <h2 style={{
          fontFamily: headingFont,
          fontSize: "5.5rem",
          fontWeight: 300,
          fontStyle: "italic",
          color: IN,
          margin: 0,
          lineHeight: 0.95,
          letterSpacing: "-0.025em",
        }}>
          {title}
        </h2>

        {description && (
          <p style={{
            fontFamily: bodyFont, fontStyle: "italic",
            fontSize: "0.85rem", color: IN, opacity: 0.45,
            margin: "1rem 0 0", lineHeight: 1.8, maxWidth: "24rem",
            marginLeft: "auto", marginRight: "auto",
          }}>
            {description}
          </p>
        )}

        {/* Minibandera italiana bajo el título */}
        <div style={{ display: "flex", justifyContent: "center", gap: "0", margin: "1.75rem auto 0", width: "5rem", height: "3px" }}>
          <div style={{ flex: 1, background: G }} />
          <div style={{ flex: 1, background: "#f0ebe0" }} />
          <div style={{ flex: 1, background: R }} />
        </div>
      </div>

    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// SEPARADOR ENTRE CATEGORÍAS — ramo decorativo SVG
// ─────────────────────────────────────────────────────────────────────────────

function BranchDivider() {
  return (
    <div aria-hidden style={{ textAlign: "center", padding: "2.5rem 0", margin: "0 -4rem", background: CR }}>
      <svg width="420" height="48" viewBox="0 0 420 48" xmlns="http://www.w3.org/2000/svg"
        style={{ display: "inline-block" }}>

        {/* Línea base */}
        <line x1="0" y1="24" x2="420" y2="24" stroke={AU} strokeWidth="0.8" opacity="0.4"/>

        {/* Rama izquierda */}
        <path d="M 10 24 C 50 22 90 18 140 22 C 165 23 180 24 195 24"
          stroke={G} strokeWidth="1.8" fill="none" opacity="0.75"/>
        {/* Hojas izquierda */}
        {[35, 65, 95, 125, 158].map((x, i) => (
          <g key={i}>
            <ellipse cx={x} cy={22 - i * 0.3} rx={12 - i} ry={3.5 - i * 0.2}
              transform={`rotate(-8 ${x} ${22 - i * 0.3})`} fill={G} opacity={0.7 - i * 0.08}/>
            <ellipse cx={x + 3} cy={26 + i * 0.3} rx={11 - i} ry={3 - i * 0.15}
              transform={`rotate(8 ${x + 3} ${26 + i * 0.3})`} fill={G} opacity={0.65 - i * 0.08}/>
          </g>
        ))}

        {/* Ornamento central */}
        <circle cx="210" cy="24" r="10" fill={R}/>
        <circle cx="210" cy="24" r="6.5" fill={AU}/>
        <circle cx="210" cy="24" r="3.5" fill={R}/>
        <circle cx="210" cy="24" r="1.5" fill="#fff" opacity="0.8"/>
        <circle cx="192" cy="24" r="3" fill={AU} opacity="0.7"/>
        <circle cx="228" cy="24" r="3" fill={AU} opacity="0.7"/>

        {/* Rama derecha — espejo */}
        <path d="M 410 24 C 370 22 330 18 280 22 C 255 23 240 24 225 24"
          stroke={G} strokeWidth="1.8" fill="none" opacity="0.75"/>
        {[385, 355, 325, 295, 262].map((x, i) => (
          <g key={i}>
            <ellipse cx={x} cy={22 - i * 0.3} rx={12 - i} ry={3.5 - i * 0.2}
              transform={`rotate(8 ${x} ${22 - i * 0.3})`} fill={G} opacity={0.7 - i * 0.08}/>
            <ellipse cx={x - 3} cy={26 + i * 0.3} rx={11 - i} ry={3 - i * 0.15}
              transform={`rotate(-8 ${x - 3} ${26 + i * 0.3})`} fill={G} opacity={0.65 - i * 0.08}/>
          </g>
        ))}

        {/* Tomates decorativos */}
        <circle cx="60"  cy="14" r="6" fill={R} opacity="0.55"/>
        <circle cx="60"  cy="14" r="3.5" fill={R2} opacity="0.6"/>
        <path d="M 58 8 Q 60 5 62 8" stroke={G} strokeWidth="1.2" fill="none" opacity="0.7"/>

        <circle cx="360" cy="14" r="6" fill={R} opacity="0.55"/>
        <circle cx="360" cy="14" r="3.5" fill={R2} opacity="0.6"/>
        <path d="M 358 8 Q 360 5 362 8" stroke={G} strokeWidth="1.2" fill="none" opacity="0.7"/>

      </svg>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// ÍTEM DE MENÚ — póster físico: espacio generoso, nada de lista HTML
// ─────────────────────────────────────────────────────────────────────────────

function MenuItem({
  name, description, price, currency,
  featured, allergens, image,
  showPrice, showDescription, showAllergens,
  categoryFont, bodyFont, priceFont,
  isLast,
}: {
  name: string; description?: string; price?: number; currency?: string;
  featured?: boolean; allergens?: Allergen[]; image?: string;
  showPrice: boolean; showDescription: boolean; showAllergens: boolean;
  categoryFont: string; bodyFont: string; priceFont: string;
  isLast: boolean;
}) {
  return (
    <div>
      <div style={{
        display: "flex", alignItems: "baseline",
        gap: "1rem", padding: "1.6rem 0",
      }}>

        {/* Imagen (si existe) */}
        {image && (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={image} alt={name} style={{
            width: "5.5rem", height: "5.5rem", objectFit: "cover",
            borderRadius: "2px", flexShrink: 0,
            border: `1.5px solid ${R}22`,
            alignSelf: "flex-start",
          }}/>
        )}

        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ display: "flex", alignItems: "baseline", gap: "0.8rem" }}>

            {/* Punto decorativo featured */}
            {featured && (
              <span style={{ color: R, fontSize: "0.45rem", flexShrink: 0, lineHeight: 1, position: "relative", top: "-0.1em" }}>✦</span>
            )}

            {/* Nombre */}
            <span style={{
              fontFamily: categoryFont, fontSize: "1.32rem",
              fontWeight: featured ? 600 : 400, color: IN,
              letterSpacing: "0.01em", lineHeight: 1.2, flex: 1,
            }}>
              {name}
            </span>

            {/* Puntos líder */}
            <div style={{
              flex: "0 1 4rem", borderBottom: `1px dotted ${IN}30`,
              marginBottom: "0.3rem", minWidth: "1.5rem",
            }}/>

            {/* Precio */}
            {showPrice && price != null && (
              <span style={{
                fontFamily: priceFont, fontSize: "1.05rem",
                fontWeight: 600, fontStyle: "italic",
                color: R, whiteSpace: "nowrap", flexShrink: 0,
              }}>
                {formatPrice(price, currency)}
              </span>
            )}
          </div>

          {/* Descripción */}
          {showDescription && description && (
            <p style={{
              fontFamily: bodyFont, fontStyle: "italic",
              fontSize: "0.83rem", color: IN, opacity: 0.5,
              margin: "0.45rem 0 0", lineHeight: 1.85,
              paddingLeft: featured ? "1.1rem" : "0",
            }}>
              {description}
            </p>
          )}

          {/* Alérgenos */}
          {showAllergens && allergens && allergens.length > 0 && (
            <AllergenBadges allergens={allergens} fontSize="0.56rem" opacity={0.38} marginTop="0.3rem"/>
          )}
        </div>
      </div>

      {/* Separador entre ítems */}
      {!isLast && (
        <div style={{
          height: "1px",
          background: `linear-gradient(to right, transparent, ${R}28 15%, ${R}22 85%, transparent)`,
        }}/>
      )}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// COMPONENTE PRINCIPAL
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
      style={{ color: IN, fontFamily: typo.bodyFont, minHeight: "100%", position: "relative" }}
    >

      {/* ── Marco de póster ──────────────────────────────────────────────── */}
      <PosterFrame />

      {/* ── Ornamentos en las 4 esquinas del documento ───────────────────── */}
      <div style={{ position: "absolute", top: "21px",    left: "21px",    zIndex: 15, pointerEvents: "none" }}><CornerOrnament /></div>
      <div style={{ position: "absolute", top: "21px",    right: "21px",   zIndex: 15, pointerEvents: "none" }}><CornerOrnament flipX /></div>
      <div style={{ position: "absolute", bottom: "21px", left: "21px",    zIndex: 15, pointerEvents: "none" }}><CornerOrnament flipY /></div>
      <div style={{ position: "absolute", bottom: "21px", right: "21px",   zIndex: 15, pointerEvents: "none" }}><CornerOrnament flipX flipY /></div>

      {/* ── Contenido principal ──────────────────────────────────────────── */}
      <div style={{ position: "relative", zIndex: 1, margin: "21px" }}>

        {/* ── Cabecera tipo póster ────────────────────────────────────────── */}
        <PosterHero
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

        {/* ── Categorías ──────────────────────────────────────────────────── */}
        <div style={{ background: CR, padding: "0 4rem 5rem" }}>
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

                {/* Separador entre categorías (no en la primera) */}
                {idx > 0 && <BranchDivider />}

                {/* Cabecera de categoría */}
                <CategoryChapter
                  index={idx}
                  label={catLabel}
                  title={t(cat.name, lang)}
                  description={catDesc}
                  headingFont={typo.categoryFont}
                  bodyFont={typo.bodyFont}
                />

                {/* Lista de ítems */}
                <div style={{ marginTop: "1rem" }}>
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
                      showAllergens={true}
                      categoryFont={typo.categoryFont}
                      bodyFont={typo.bodyFont}
                      priceFont={typo.priceFont}
                      isLast={itemIdx === items.length - 1}
                    />
                  ))}
                </div>

              </section>
            );
          })}
        </div>

        {/* ── Pie de página ───────────────────────────────────────────────── */}
        {(restaurantInfo.address || restaurantInfo.phone ||
          restaurantInfo.website || restaurantInfo.socialLinks?.instagram) && (
          <div style={{
            background: `linear-gradient(to right, ${G}, ${G2} 30%, ${G2} 70%, ${G})`,
            padding: "1.5rem 4rem",
            textAlign: "center",
            display: "flex", flexDirection: "column", gap: "0.6rem",
          }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "0.75rem" }}>
              <div style={{ height: "1px", flex: 1, background: "rgba(255,255,255,0.3)" }}/>
              <span style={{ color: AU, fontSize: "0.5rem", letterSpacing: "0.4em" }}>✦ ✦ ✦</span>
              <div style={{ height: "1px", flex: 1, background: "rgba(255,255,255,0.3)" }}/>
            </div>
            <p style={{
              fontFamily: typo.bodyFont, fontStyle: "italic",
              fontSize: "0.72rem", color: "rgba(255,255,255,0.75)",
              margin: 0, letterSpacing: "0.04em", lineHeight: 2,
            }}>
              {[
                restaurantInfo.address,
                restaurantInfo.phone,
                restaurantInfo.website,
                restaurantInfo.socialLinks?.instagram,
              ].filter(Boolean).join("  ·  ")}
            </p>
          </div>
        )}

        {/* ── Banda tricolor inferior ─────────────────────────────────────── */}
        <div>
          <div style={{ height: "28px", background: `linear-gradient(to right, ${R}, ${R2}, ${R})` }}/>
          <div style={{ height: "12px", background: "#f0ebe0" }}/>
          <div style={{ height: "28px", background: `linear-gradient(to right, ${G}, ${G2}, ${G})` }}/>
        </div>

      </div>
    </BackgroundLayer>
  );
}
