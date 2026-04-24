"use client";

import {
  Document,
  Page,
  Text,
  View,
  Image as PDFImage,
  StyleSheet,
  Font,
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
  page: {
    backgroundColor: "#0d0006",
    padding: 40,
    fontFamily: "Helvetica",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 28,
    gap: 20,
    borderBottom: "1px solid #A3005C40",
    paddingBottom: 20,
  },
  logoImg: {
    width: 80,
    height: 80,
    objectFit: "contain",
    borderRadius: 8,
    backgroundColor: "#ffffff10",
    padding: 6,
  },
  headerText: { flex: 1 },
  tagline: { fontSize: 9, color: "#A3005C", letterSpacing: 2, marginBottom: 6, textTransform: "uppercase" },
  overallScore: { fontSize: 48, fontFamily: "Helvetica-Bold", color: "#ff1f7e", lineHeight: 1 },
  overallSub: { fontSize: 18, color: "#ffffff40" },
  firstImpression: { fontSize: 10, color: "#ffffff80", marginTop: 6, lineHeight: 1.5 },
  sectionTitle: { fontSize: 8, color: "#A3005C", letterSpacing: 2, textTransform: "uppercase", marginBottom: 10 },
  grid: { flexDirection: "row", flexWrap: "wrap", gap: 10, marginBottom: 16 },
  card: {
    width: "47%",
    backgroundColor: "#ffffff08",
    borderRadius: 8,
    padding: 12,
    border: "1px solid #A3005C30",
  },
  cardHeader: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 6 },
  cardLabel: { fontSize: 8, color: "#ffffff70" },
  cardScore: { fontSize: 16, fontFamily: "Helvetica-Bold", color: "#ff1f7e" },
  barTrack: { height: 3, backgroundColor: "#ffffff15", borderRadius: 2, marginBottom: 6 },
  barFill: { height: 3, borderRadius: 2, backgroundColor: "#A3005C" },
  cardAssessment: { fontSize: 8, color: "#ffffff50", lineHeight: 1.4 },
  improvementsCard: {
    backgroundColor: "#ffffff08",
    borderRadius: 8,
    padding: 14,
    border: "1px solid #A3005C30",
    marginBottom: 16,
  },
  improvRow: { flexDirection: "row", gap: 10, marginBottom: 8, alignItems: "flex-start" },
  improvNum: {
    width: 18, height: 18,
    backgroundColor: "#A3005C",
    borderRadius: 9,
    fontSize: 8,
    fontFamily: "Helvetica-Bold",
    color: "#ffffff",
    textAlign: "center",
    paddingTop: 4,
    flexShrink: 0,
  },
  improvText: { fontSize: 9, color: "#ffffff70", lineHeight: 1.5, flex: 1 },
  summaryCard: {
    backgroundColor: "#ffffff08",
    borderRadius: 8,
    padding: 14,
    border: "1px solid #A3005C30",
    marginBottom: 16,
  },
  summaryText: { fontSize: 9, color: "#ffffff60", lineHeight: 1.5 },
  footer: { marginTop: 10, borderTop: "1px solid #A3005C20", paddingTop: 10, flexDirection: "row", justifyContent: "space-between" },
  footerText: { fontSize: 7, color: "#ffffff30" },
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
            <Text style={styles.tagline}>Logo Review Report · QIS Studio</Text>
            <Text style={styles.overallScore}>
              {review.overall_score}
              <Text style={styles.overallSub}>/10</Text>
            </Text>
            <Text style={styles.firstImpression}>{review.first_impression}</Text>
          </View>
        </View>

        {/* Dimension scores */}
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

        {/* Key Issues */}
        <Text style={styles.sectionTitle}>Key Issues</Text>
        <View style={styles.improvementsCard}>
          {review.top_issues.map((item, i) => (
            <View key={i} style={styles.improvRow}>
              <Text style={styles.improvNum}>{i + 1}</Text>
              <Text style={styles.improvText}>{item}</Text>
            </View>
          ))}
        </View>

        {/* Summary */}
        <Text style={styles.sectionTitle}>Summary</Text>
        <View style={styles.summaryCard}>
          <Text style={styles.summaryText}>{review.summary}</Text>
        </View>

        {/* Footer */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>Generated by QIS Studio Logo Review</Text>
          <Text style={styles.footerText}>{new Date().toLocaleDateString()}</Text>
        </View>
      </Page>
    </Document>
  );
}
