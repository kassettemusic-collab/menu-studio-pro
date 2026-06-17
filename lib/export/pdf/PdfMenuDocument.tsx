// @react-pdf/renderer runs in a Web Worker — no DOM APIs here.
// All styles are via StyleSheet.create; no Tailwind or CSS modules.

import {
  Document,
  Page,
  Text,
  View,
  Image,
  StyleSheet,
  Font,
} from "@react-pdf/renderer";
import type { Project } from "@/types/project";
import type { Category } from "@/types/menu";
import { t } from "@/utils/translation";
import { formatPrice } from "@/utils/price";
import { ALLERGENS_META } from "@/constants/allergens";

// ── Fonts ───────────────────────────────────────────────────────────────────
// Register Google Fonts so they're embedded in the PDF.

Font.register({
  family: "Inter",
  fonts: [
    {
      src: "https://fonts.gstatic.com/s/inter/v13/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuLyfAZ9hiJ-Ek-_EeA.woff",
      fontWeight: 400,
    },
    {
      src: "https://fonts.gstatic.com/s/inter/v13/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuI6fAZ9hiJ-Ek-_EeA.woff",
      fontWeight: 600,
    },
    {
      src: "https://fonts.gstatic.com/s/inter/v13/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuFuYAZ9hiJ-Ek-_EeA.woff",
      fontWeight: 700,
    },
  ],
});

Font.register({
  family: "Playfair",
  fonts: [
    {
      src: "https://fonts.gstatic.com/s/playfairdisplay/v30/nuFvD-vYSZviVYUb_rj3ij__anPXJzDwcbmjWBN2PKdFvXDTbtXK-F2qC0s.woff",
      fontWeight: 400,
    },
    {
      src: "https://fonts.gstatic.com/s/playfairdisplay/v30/nuFvD-vYSZviVYUb_rj3ij__anPXJzDwcbmjWBN2PKd3vXDTbtXK-F2qC0s.woff",
      fontWeight: 700,
    },
  ],
});

// Hyphenation disabled — clean word wrapping
Font.registerHyphenationCallback((word) => [word]);

// ── Styles ──────────────────────────────────────────────────────────────────

function makeStyles(accentColor: string) {
  return StyleSheet.create({
    page: {
      fontFamily: "Inter",
      fontSize: 10,
      color: "#1c1917",
      backgroundColor: "#ffffff",
      paddingTop: 48,
      paddingBottom: 48,
      paddingHorizontal: 52,
    },

    // ── Header
    header: {
      marginBottom: 28,
      alignItems: "center",
    },
    logo: {
      width: 72,
      height: 72,
      objectFit: "contain",
      marginBottom: 10,
    },
    restaurantName: {
      fontFamily: "Playfair",
      fontSize: 22,
      fontWeight: 700,
      color: "#1c1917",
      textAlign: "center",
      letterSpacing: 0.5,
    },
    tagline: {
      fontSize: 8,
      color: accentColor,
      textAlign: "center",
      letterSpacing: 1.5,
      textTransform: "uppercase",
      marginTop: 4,
    },
    welcomeMessage: {
      fontSize: 9,
      color: "#78716c",
      textAlign: "center",
      fontStyle: "italic",
      marginTop: 6,
      maxWidth: 280,
    },
    headerRule: {
      height: 1,
      backgroundColor: accentColor,
      width: 32,
      marginTop: 14,
    },

    // ── Category
    categorySection: {
      marginBottom: 20,
    },
    categoryHeader: {
      flexDirection: "row",
      alignItems: "center",
      marginBottom: 10,
      gap: 8,
    },
    categoryRule: {
      height: 0.5,
      backgroundColor: "#e7e5e4",
      flex: 1,
    },
    categoryName: {
      fontFamily: "Playfair",
      fontSize: 10,
      fontWeight: 700,
      color: accentColor,
      textTransform: "uppercase",
      letterSpacing: 1.5,
    },
    categoryDescription: {
      fontSize: 8,
      color: "#a8a29e",
      fontStyle: "italic",
      marginBottom: 8,
      textAlign: "center",
    },

    // ── Item
    item: {
      marginBottom: 9,
    },
    itemRow: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "flex-start",
      gap: 8,
    },
    itemName: {
      fontSize: 10,
      fontWeight: 600,
      color: "#1c1917",
      flex: 1,
    },
    itemPrice: {
      fontSize: 10,
      fontWeight: 600,
      color: accentColor,
      flexShrink: 0,
    },
    itemDescription: {
      fontSize: 8,
      color: "#78716c",
      marginTop: 2,
      lineHeight: 1.5,
    },
    allergenRow: {
      flexDirection: "row",
      flexWrap: "wrap",
      gap: 3,
      marginTop: 3,
    },
    allergenBadge: {
      fontSize: 7,
      color: "#a8a29e",
      borderWidth: 0.5,
      borderColor: "#e7e5e4",
      borderRadius: 2,
      paddingHorizontal: 3,
      paddingVertical: 1,
    },

    // ── Footer
    footer: {
      marginTop: 28,
      paddingTop: 10,
      borderTopWidth: 0.5,
      borderTopColor: "#e7e5e4",
      flexDirection: "row",
      justifyContent: "center",
      flexWrap: "wrap",
      gap: 16,
    },
    footerText: {
      fontSize: 7.5,
      color: "#a8a29e",
    },
  });
}

// ── Props ───────────────────────────────────────────────────────────────────

export interface PdfMenuDocumentProps {
  project: Project;
  categories: Category[];
  lang: string;
  showLogo: boolean;
  showFooter: boolean;
}

// ── Component ────────────────────────────────────────────────────────────────

export function PdfMenuDocument({
  project,
  categories,
  lang,
  showLogo,
  showFooter,
}: PdfMenuDocumentProps) {
  const { restaurantInfo, branding } = project;
  const accentColor = branding?.primaryColor ?? "#c9a96e";
  const styles = makeStyles(accentColor);

  const logo = branding?.logo;
  const renderLogo = showLogo && !!logo;
  const renderName = branding?.showRestaurantName ?? true;

  const visible = categories
    .filter((c) => c.visible)
    .sort((a, b) => a.sortOrder - b.sortOrder);

  const hasFooter =
    showFooter &&
    (!!restaurantInfo.address || !!restaurantInfo.phone || !!restaurantInfo.website);

  return (
    <Document
      title={restaurantInfo.name}
      author={restaurantInfo.name}
      creator="Menu Studio Pro"
    >
      <Page size="A4" style={styles.page}>

        {/* ── Header */}
        <View style={styles.header}>
          {renderLogo && (
            <Image src={logo} style={styles.logo} />
          )}
          {renderName && (
            <Text style={styles.restaurantName}>{restaurantInfo.name}</Text>
          )}
          {restaurantInfo.tagline && (
            <Text style={styles.tagline}>{restaurantInfo.tagline}</Text>
          )}
          {branding?.welcomeMessage?.[lang] && (
            <Text style={styles.welcomeMessage}>
              {branding.welcomeMessage[lang]}
            </Text>
          )}
          <View style={styles.headerRule} />
        </View>

        {/* ── Categories */}
        {visible.map((cat) => {
          const items = cat.items
            .filter((i) => i.available)
            .sort((a, b) => a.sortOrder - b.sortOrder);

          if (items.length === 0) return null;

          return (
            <View key={cat.id} style={styles.categorySection}>
              {/* Category heading */}
              <View style={styles.categoryHeader}>
                <View style={styles.categoryRule} />
                <Text style={styles.categoryName}>{t(cat.name, lang)}</Text>
                <View style={styles.categoryRule} />
              </View>

              {cat.description?.[lang] && (
                <Text style={styles.categoryDescription}>
                  {t(cat.description, lang)}
                </Text>
              )}

              {/* Items */}
              {items.map((item) => (
                <View key={item.id} style={styles.item}>
                  <View style={styles.itemRow}>
                    <Text style={styles.itemName}>{t(item.name, lang)}</Text>
                    <Text style={styles.itemPrice}>
                      {formatPrice(item.price, item.currency)}
                    </Text>
                  </View>

                  {item.description[lang] && (
                    <Text style={styles.itemDescription}>
                      {t(item.description, lang)}
                    </Text>
                  )}

                  {item.allergens.contains.length > 0 && (
                    <View style={styles.allergenRow}>
                      {item.allergens.contains.map((a) => (
                        <Text key={a} style={styles.allergenBadge}>
                          {ALLERGENS_META[a].icon} {ALLERGENS_META[a].label}
                        </Text>
                      ))}
                    </View>
                  )}
                </View>
              ))}
            </View>
          );
        })}

        {/* ── Footer */}
        {hasFooter && (
          <View style={styles.footer}>
            {restaurantInfo.address && (
              <Text style={styles.footerText}>{restaurantInfo.address}</Text>
            )}
            {restaurantInfo.phone && (
              <Text style={styles.footerText}>{restaurantInfo.phone}</Text>
            )}
            {restaurantInfo.website && (
              <Text style={styles.footerText}>{restaurantInfo.website}</Text>
            )}
          </View>
        )}

      </Page>
    </Document>
  );
}
