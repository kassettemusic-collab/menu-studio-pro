"use client";

import { SocialLinks } from "./SocialLinks";
import type { RestaurantInfo } from "@/types/project";

interface FooterSectionProps {
  restaurantInfo: RestaurantInfo;
  /**
   * "steakhouse" — gold rules, ★★★ ornament, all contact fields inline with · separator
   * "beach-club" — teal wave rules, instagram pill above, remaining contact below
   */
  variant: "steakhouse" | "beach-club";
  /** Primary accent color (GOLD or TEAL). */
  accentColor: string;
  /** Text color. */
  textColor: string;
  /** Body font stack. */
  font: string;
}

/** Horizontal gradient rule that fades at edges. */
function AccentRule({ color, opacity = 0.3 }: { color: string; opacity?: number }) {
  return (
    <div
      style={{
        height: "1.5px",
        width: "100%",
        background: `linear-gradient(to right, transparent, ${color} 15%, ${color} 85%, transparent)`,
        opacity,
      }}
    />
  );
}

export function FooterSection({
  restaurantInfo,
  variant,
  accentColor,
  textColor,
  font,
}: FooterSectionProps) {
  const { address, phone, website, socialLinks } = restaurantInfo;
  const instagram = socialLinks?.instagram;

  const hasContent = !!(address || phone || website || instagram);
  if (!hasContent) return null;

  const isSteakhouse = variant === "steakhouse";

  if (isSteakhouse) {
    // ── Steakhouse: gold rules + ★★★ + all contact inline ──────────────────
    const contactFields = [address, phone, website, instagram].filter(Boolean) as string[];

    return (
      <footer
        style={{
          borderTop: `1px solid ${accentColor}15`,
          padding: "2rem 3.5rem 3rem",
          textAlign: "center",
        }}
      >
        {/* ★★★ ornament */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "1rem",
            marginBottom: "1.25rem",
          }}
        >
          <div
            style={{
              flex: 1,
              height: "1px",
              background: `linear-gradient(to right, transparent, ${accentColor}30)`,
            }}
          />
          <span style={{ color: accentColor, fontSize: "0.45rem", opacity: 0.5, letterSpacing: "0.3em" }}>
            ★ ★ ★
          </span>
          <div
            style={{
              flex: 1,
              height: "1px",
              background: `linear-gradient(to left, transparent, ${accentColor}30)`,
            }}
          />
        </div>

        {/* Contact fields with · separator */}
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            gap: "0.25rem 0",
            fontSize: "0.68rem",
            fontFamily: font,
            color: textColor,
            opacity: 0.35,
            letterSpacing: "0.04em",
          }}
        >
          {contactFields.map((detail, i, arr) => (
            <span key={i} style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
              {detail}
              {i < arr.length - 1 && (
                <span style={{ color: accentColor, opacity: 0.4, margin: "0 0.25rem" }}>·</span>
              )}
            </span>
          ))}
        </div>

        {/* Bottom bar */}
        <div
          style={{
            height: "1.5px",
            background: `linear-gradient(to right, transparent, ${accentColor} 30%, ${accentColor} 70%, transparent)`,
            marginTop: "1.75rem",
            opacity: 0.25,
          }}
        />
      </footer>
    );
  }

  // ── BeachClub: wave rules + instagram pill + contact below ────────────────
  const contactFields = [address, phone, website].filter(Boolean) as string[];

  return (
    <footer
      style={{
        borderTop: `1px solid ${accentColor}18`,
        padding: "2rem 3rem 3rem",
      }}
    >
      <AccentRule color={accentColor} opacity={0.2} />

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "0.85rem",
          marginTop: "1.75rem",
        }}
      >
        <SocialLinks instagram={instagram} accentColor={accentColor} font={font} />

        {contactFields.length > 0 && (
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "center",
              gap: "0.1rem 0",
              fontSize: "0.65rem",
              fontFamily: font,
              color: textColor,
              opacity: 0.35,
              letterSpacing: "0.06em",
              textAlign: "center",
            }}
          >
            {contactFields.map((detail, i, arr) => (
              <span key={i} style={{ display: "flex", alignItems: "center", gap: "0.6rem" }}>
                {detail}
                {i < arr.length - 1 && (
                  <span style={{ color: accentColor, opacity: 0.5 }}>·</span>
                )}
              </span>
            ))}
          </div>
        )}
      </div>

      <div style={{ marginTop: "1.75rem" }}>
        <AccentRule color={accentColor} opacity={0.15} />
      </div>
    </footer>
  );
}
