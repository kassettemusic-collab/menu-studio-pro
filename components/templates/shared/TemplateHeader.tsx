"use client";

import type { Project } from "@/types/project";
import type { TemplateDesign } from "@/types/template";

export interface TemplateHeaderProps {
  project: Project;
  design: TemplateDesign;
  lang: string;
  /** Extra className/style applied to the outer wrapper */
  className?: string;
  style?: React.CSSProperties;
  /** Override styles for the restaurant name h1 */
  headingStyle?: React.CSSProperties;
  /** Alignment for the content: left | center | right */
  align?: "left" | "center" | "right";
  /** Render extra content below name/logo */
  children?: React.ReactNode;
}

/**
 * Renders the restaurant name and/or logo according to `branding` settings.
 * Falls back to showing the name when no logo is present.
 */
export function TemplateHeader({
  project,
  design,
  lang: _lang,
  className,
  style,
  headingStyle,
  align = "left",
  children,
}: TemplateHeaderProps) {
  const { restaurantInfo, branding } = project;
  const { fonts, colors } = design;

  const showLogo = branding?.showLogo ?? false;
  const showName = branding?.showRestaurantName ?? true;
  const logoPosition = branding?.logoPosition ?? "top";
  const logo = branding?.logo;

  // When no logo is provided always show the name regardless of showLogo
  const renderLogo = showLogo && !!logo;
  const renderName = showName || !renderLogo;

  const textAlign = align;

  // Logo + name layout direction based on logoPosition
  const isRow = logoPosition === "left";
  const logoAlignSelf = isRow ? "center" : textAlign === "center" ? "center" : "flex-start";

  return (
    <div className={className} style={style}>
      <div
        style={{
          display: "flex",
          flexDirection: isRow ? "row" : "column",
          alignItems: logoAlignSelf,
          gap: isRow ? "1rem" : "0.75rem",
          textAlign,
        }}
      >
        {renderLogo && (
          /* eslint-disable-next-line @next/next/no-img-element */
          <img
            src={logo}
            alt={`Logo ${restaurantInfo.name}`}
            style={{
              height: isRow ? "4rem" : "3.5rem",
              width: "auto",
              objectFit: "contain",
              flexShrink: 0,
            }}
          />
        )}

        {renderName && (
          <h1
            style={{
              fontFamily: fonts.heading,
              color: colors.text,
              margin: 0,
              lineHeight: 1.1,
              ...headingStyle,
            }}
          >
            {restaurantInfo.name}
          </h1>
        )}
      </div>

      {children}
    </div>
  );
}
