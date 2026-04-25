export interface BusinessInfo {
  brandName: string;
  businessCategory: string;
  typeOfBusiness: string;
  industry: string;
  targetAudience: string;
  hasWebsite: boolean;
  logoAcrossPlatforms: boolean;
  hasLogoVariety: boolean;
  uploadedIconVersion: boolean | null;
}

export interface DimensionScore {
  score: number;
  assessment: string;
}

export type LogoType =
  | "Lettermark"
  | "Wordmark"
  | "Pictorial Mark"
  | "Abstract Mark"
  | "Mascot"
  | "Combination Mark"
  | "Emblem";

export interface LogoReview {
  overall_score: number;
  first_impression: string;
  logo_type: LogoType;
  logo_type_reasoning: string;
  color_psychology: string;
  dimensions: {
    simplicity_memorability: DimensionScore;
    color_palette: DimensionScore;
    typography: DimensionScore;
    scalability: DimensionScore;
    versatility: DimensionScore;
    industry_fit: DimensionScore;
  };
}
