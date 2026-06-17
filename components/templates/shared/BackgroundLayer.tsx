"use client";

import type { CSSProperties, ReactNode } from "react";
import type { TemplateDesign } from "@/types/template";
import { buildBackgroundLayers } from "@/lib/texture-css";

interface Props {
  design: TemplateDesign;
  /** Extra styles forwarded to the root container (e.g. padding, minHeight). */
  style?: CSSProperties;
  children: ReactNode;
}

/**
 * Root wrapper for all template components.
 *
 * Renders three stacked layers:
 *   1. Root div  — solid background color + optional cover image
 *   2. Overlay   — repeating texture pattern (absolutely positioned, pointer-events none)
 *   3. Content   — template markup (position relative, z-index 1)
 *
 * When `design.background` is undefined or has no texture, the wrapper is a
 * single div with no extra DOM nodes.
 */
export function BackgroundLayer({ design, style, children }: Props) {
  const { rootStyle, overlayStyle } = buildBackgroundLayers(
    design.background,
    design.colors.background
  );

  const mergedRoot: CSSProperties = {
    ...rootStyle,
    ...style,
    // position:relative is required so the absolutely-positioned overlay
    // is clipped to this container and doesn't escape the template root.
    position: "relative",
  };

  return (
    <div style={mergedRoot}>
      {overlayStyle && (
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            inset: 0,
            zIndex: 0,
            pointerEvents: "none",
            ...overlayStyle,
          }}
        />
      )}
      {/* Content sits above the overlay */}
      <div style={{ position: "relative", zIndex: 1 }}>
        {children}
      </div>
    </div>
  );
}
