export interface BusinessInfo {
  brandName: string;
  businessCategory: string;
  typeOfBusiness: string;
  industry: string;
  targetAudience: string;
  hasWebsite: boolean;
  logoAcrossPlatforms: boolean;
}

export interface DimensionScore {
  score: number;
  assessment: string;
}

export interface LogoReview {
  overall_score: number;
  first_impression: string;
  dimensions: {
    simplicity_memorability: DimensionScore;
    color_palette: DimensionScore;
    typography: DimensionScore;
    scalability: DimensionScore;
    versatility: DimensionScore;
    industry_fit: DimensionScore;
  };
  top_issues: [string, string, string];
  summary: string;
}
