"use client";

import {
  Document,
  Page,
  Text,
  View,
  Image as PDFImage,
  StyleSheet,
} from "@react-pdf/renderer";
import { LogoReview } from "@/lib/types";

const DIMENSION_LABELS: Record<string, string> = {
  simplicity_memorability: "Simplicity & Memorability",
  color_palette: "Color Palette",
  typography: "Typography",
  scalability: "Scalability",
  versatility: "Versatility",
  industry_fit: "Industry Fit",
};

const styles = StyleSheet.create({
  page: { backgroundColor: "#ffffff", padding: 48, fontFamily: "Helvetica" },
  header: { flexDirection: "row", alignItems: "flex-start", marginBottom: 28, gap: 20, borderBottom: "1px solid #e5e5e5", paddingBottom: 24 },
  logoImg: { width: 72, height: 72, objectFit: "contain", border: "1px solid #e5e5e5", padding: 6, backgroundColor: "#f9f9f9" },
  headerText: { flex: 1 },
  label: { fontSize: 7, color: "#999999", letterSpacing: 2, textTransform: "uppercase", marginBottom: 4 },
  overallScore: { fontSize: 52, fontFamily: "Helvetica-Bold", color: "#000000", lineHeight: 1 },
  overallSub: { fontSize: 20, color: "#cccccc", fontFamily: "Helvetica" },
  firstImpression: { fontSize: 9, color: "#555555", marginTop: 6, lineHeight: 1.5 },
  section: { marginBottom: 20, paddingBottom: 20, borderBottom: "1px solid #eeeeee" },
  sectionTitle: { fontSize: 7, color: "#999999", letterSpacing: 2, textTransform: "uppercase", marginBottom: 10 },
  logoTypeBadge: { border: "1px solid #000000", padding: "3 8", marginBottom: 6, alignSelf: "flex-start" },
  logoTypeText: { fontSize: 8, fontFamily: "Helvetica-Bold", letterSpacing: 1, textTransform: "uppercase" },
  logoTypeReasoning: { fontSize: 9, color: "#555555", lineHeight: 1.5 },
  colorPsychText: { fontSize: 9, color: "#555555", lineHeight: 1.5 },
  grid: { flexDirection: "row", flexWrap: "wrap", gap: 8 },
  card: { width: "47.5%", border: "1px solid #eeeeee", padding: 10 },
  cardHeader: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 5 },
  cardLabel: { fontSize: 7, color: "#999999", letterSpacing: 1, textTransform: "uppercase" },
  cardScore: { fontSize: 14, fontFamily: "Helvetica-Bold", color: "#000000" },
  barTrack: { height: 1, backgroundColor: "#eeeeee", marginBottom: 6 },
  barFill: { height: 1, backgroundColor: "#000000" },
  cardAssessment: { fontSize: 8, color: "#666666", lineHeight: 1.4 },
  footer: { marginTop: 16, paddingTop: 12, borderTop: "1px solid #eeeeee", flexDirection: "row", justifyContent: "space-between" },
  footerText: { fontSize: 7, color: "#bbbbbb" },
});

interface ReviewPDFProps {
  review: LogoReview;
  logoDataUrl: string;
}

export function ReviewPDF({ review, logoDataUrl }: ReviewPDFProps) {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Header */}
        <View style={styles.header}>
          <PDFImage src={logoDataUrl} style={styles.logoImg} />
          <View style={styles.headerText}>
            <Text style={styles.label}>Overall Score</Text>
            <Text style={styles.overallScore}>
              {review.overall_score}<Text style={styles.overallSub}>/10</Text>
            </Text>
            <Text style={styles.firstImpression}>{review.first_impression}</Text>
          </View>
        </View>

        {/* Logo Type */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Logo Type</Text>
          <View style={styles.logoTypeBadge}>
            <Text style={styles.logoTypeText}>{review.logo_type}</Text>
          </View>
          <Text style={styles.logoTypeReasoning}>{review.logo_type_reasoning}</Text>
        </View>

        {/* Color Psychology */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Color Psychology</Text>
          <Text style={styles.colorPsychText}>{review.color_psychology}</Text>
        </View>

        {/* Dimensions */}
        <Text style={styles.sectionTitle}>Design Dimensions</Text>
        <View style={styles.grid}>
          {(Object.keys(DIMENSION_LABELS) as Array<keyof LogoReview["dimensions"]>).map((key) => {
            const d = review.dimensions[key];
            return (
              <View key={key} style={styles.card}>
                <View style={styles.cardHeader}>
                  <Text style={styles.cardLabel}>{DIMENSION_LABELS[key]}</Text>
                  <Text style={styles.cardScore}>{d.score}/10</Text>
                </View>
                <View style={styles.barTrack}>
                  <View style={[styles.barFill, { width: `${d.score * 10}%` }]} />
                </View>
                <Text style={styles.cardAssessment}>{d.assessment}</Text>
              </View>
            );
          })}
        </View>

        {/* Footer */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>QIS Studio — Logo Review Report</Text>
          <Text style={styles.footerText}>{new Date().toLocaleDateString()}</Text>
        </View>
      </Page>
    </Document>
  );
}
