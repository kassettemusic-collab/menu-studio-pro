"use client";

interface SocialLinksProps {
  instagram?: string;
  /** Accent color used for the pill border, icon, and text. */
  accentColor: string;
  /** Body font stack. */
  font: string;
}

/**
 * Renders the Instagram handle as a standalone pill badge.
 * Used by premium templates that give social links their own visual slot.
 */
export function SocialLinks({ instagram, accentColor, font }: SocialLinksProps) {
  if (!instagram) return null;

  return (
    <div
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: "0.5rem",
        background: `${accentColor}10`,
        border: `1px solid ${accentColor}20`,
        borderRadius: "20px",
        padding: "0.35rem 1rem",
      }}
    >
      <span style={{ fontSize: "0.7rem", color: accentColor, opacity: 0.6 }}>◈</span>
      <span
        style={{
          fontFamily: font,
          fontSize: "0.72rem",
          fontWeight: 500,
          color: accentColor,
          letterSpacing: "0.1em",
        }}
      >
        {instagram}
      </span>
    </div>
  );
}
