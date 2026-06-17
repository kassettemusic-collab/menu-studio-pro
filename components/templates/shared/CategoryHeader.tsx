"use client";

// ── Types ─────────────────────────────────────────────────────────────────────

export type CategoryHeaderVariant = "minimal" | "elegant" | "italian";

export interface CategoryHeaderProps {
  title: string;
  description?: string;
  styleVariant: CategoryHeaderVariant;
  accentColor: string;
  textColor: string;
  headingFont: string;
  bodyFont: string;
}

// ── Variant: minimal ──────────────────────────────────────────────────────────
// Left-border accent bar, large light serif, subtitle in small caps.
// Used by BeachClub and clean/airy templates.

function MinimalHeader({ title, description, accentColor, textColor, headingFont, bodyFont }: Omit<CategoryHeaderProps, "styleVariant">) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "0.3rem",
        paddingLeft: "1.1rem",
        borderLeft: `3px solid ${accentColor}`,
        marginBottom: "1.75rem",
      }}
    >
      <h2
        style={{
          fontFamily: headingFont,
          fontSize: "2rem",
          fontWeight: 300,
          color: textColor,
          margin: 0,
          letterSpacing: "0.04em",
          lineHeight: 1.05,
        }}
      >
        {title}
      </h2>
      {description && (
        <span
          style={{
            fontFamily: bodyFont,
            fontSize: "0.65rem",
            fontWeight: 500,
            color: accentColor,
            letterSpacing: "0.22em",
            textTransform: "uppercase",
            opacity: 0.75,
          }}
        >
          {description}
        </span>
      )}
    </div>
  );
}

// ── Variant: elegant ──────────────────────────────────────────────────────────
// Double horizontal rules framing a bold uppercase serif title.
// Inspired by classic French brasserie and British chophouse menus.
// Used by Steakhouse and dark/luxe templates.

function ElegantHeader({ title, description, accentColor, textColor, headingFont, bodyFont }: Omit<CategoryHeaderProps, "styleVariant">) {
  return (
    <div style={{ marginBottom: "1.75rem" }}>
      {/* Top rule pair */}
      <div style={{ display: "flex", flexDirection: "column", gap: "3px", marginBottom: "1rem" }}>
        <div style={{ height: "1px", background: `linear-gradient(to right, transparent, ${accentColor}50, transparent)` }} />
        <div style={{ height: "0.5px", background: `linear-gradient(to right, transparent, ${accentColor}28, transparent)` }} />
      </div>

      {/* Label + title block */}
      <div style={{ textAlign: "center" }}>
        <span
          style={{
            display: "block",
            fontFamily: bodyFont,
            fontSize: "0.58rem",
            letterSpacing: "0.35em",
            textTransform: "uppercase",
            color: accentColor,
            opacity: 0.65,
            marginBottom: "0.45rem",
          }}
        >
          — selezione —
        </span>

        <h2
          style={{
            fontFamily: headingFont,
            fontSize: "1.85rem",
            fontWeight: 700,
            color: textColor,
            margin: 0,
            letterSpacing: "0.05em",
            lineHeight: 1,
            textTransform: "uppercase",
          }}
        >
          {title}
        </h2>

        {description && (
          <p
            style={{
              fontFamily: `"Libre Baskerville", Georgia, serif`,
              fontStyle: "italic",
              fontSize: "0.76rem",
              color: accentColor,
              opacity: 0.6,
              margin: "0.45rem 0 0",
              letterSpacing: "0.03em",
            }}
          >
            {description}
          </p>
        )}
      </div>

      {/* Bottom rule pair */}
      <div style={{ display: "flex", flexDirection: "column", gap: "3px", marginTop: "1rem" }}>
        <div style={{ height: "0.5px", background: `linear-gradient(to right, transparent, ${accentColor}28, transparent)` }} />
        <div style={{ height: "1px", background: `linear-gradient(to right, transparent, ${accentColor}50, transparent)` }} />
      </div>
    </div>
  );
}

// ── Variant: italian ──────────────────────────────────────────────────────────
// Centered composition with micro-label rule, large italic serif name,
// optional description, and a diamond ornament.
// Used by PizzaTrattoria and traditional Italian templates.

function ItalianHeader({ title, description, accentColor, textColor, headingFont, bodyFont }: Omit<CategoryHeaderProps, "styleVariant">) {
  return (
    <div style={{ textAlign: "center", marginBottom: "2rem" }}>
      {/* Micro rule with uppercase label */}
      <div style={{ display: "flex", alignItems: "center", gap: "0.85rem", marginBottom: "0.65rem" }}>
        <div style={{ flex: 1, height: "1px", backgroundColor: accentColor, opacity: 0.22 }} />
        <span
          style={{
            fontFamily: bodyFont,
            fontSize: "0.58rem",
            letterSpacing: "0.32em",
            textTransform: "uppercase",
            color: accentColor,
            fontWeight: 600,
            whiteSpace: "nowrap",
            opacity: 0.75,
          }}
        >
          {title}
        </span>
        <div style={{ flex: 1, height: "1px", backgroundColor: accentColor, opacity: 0.22 }} />
      </div>

      {/* Large italic serif title */}
      <h2
        style={{
          fontFamily: headingFont,
          fontSize: "2rem",
          fontWeight: 400,
          fontStyle: "italic",
          letterSpacing: "0.04em",
          color: accentColor,
          margin: 0,
          lineHeight: 1,
        }}
      >
        {title}
      </h2>

      {/* Description */}
      {description && (
        <p
          style={{
            fontFamily: bodyFont,
            fontStyle: "italic",
            fontSize: "0.76rem",
            color: textColor,
            opacity: 0.42,
            margin: "0.4rem 0 0",
            letterSpacing: "0.03em",
          }}
        >
          {description}
        </p>
      )}

      {/* Diamond ornament */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "0.4rem",
          marginTop: "0.75rem",
        }}
      >
        <div style={{ height: "0.5px", width: "1.5rem", backgroundColor: accentColor, opacity: 0.25 }} />
        <span style={{ color: accentColor, fontSize: "0.38rem", opacity: 0.5 }}>◆</span>
        <div style={{ height: "0.5px", width: "1.5rem", backgroundColor: accentColor, opacity: 0.25 }} />
      </div>
    </div>
  );
}

// ── Public component ──────────────────────────────────────────────────────────

export function CategoryHeader({ styleVariant, ...rest }: CategoryHeaderProps) {
  switch (styleVariant) {
    case "elegant":
      return <ElegantHeader {...rest} />;
    case "italian":
      return <ItalianHeader {...rest} />;
    case "minimal":
    default:
      return <MinimalHeader {...rest} />;
  }
}
