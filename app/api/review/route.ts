import { NextRequest, NextResponse } from "next/server";
import { anthropic } from "@/lib/claude";
import { buildReviewPrompt } from "@/lib/prompt";
import { LogoReview, BusinessInfo } from "@/lib/types";

export const runtime = "nodejs";
export const maxDuration = 60;

const ALLOWED_TYPES = ["image/png", "image/jpeg", "image/webp", "image/gif"];
const MAX_SIZE = 5 * 1024 * 1024;

type AllowedMediaType = "image/png" | "image/jpeg" | "image/webp" | "image/gif";

export async function POST(req: NextRequest) {
  const formData = await req.formData();
  const file = formData.get("logo") as File | null;

  if (!file) {
    return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
  }

  if (!ALLOWED_TYPES.includes(file.type)) {
    return NextResponse.json(
      { error: "Unsupported file type. Please upload PNG, JPG, or SVG." },
      { status: 415 }
    );
  }

  if (file.size > MAX_SIZE) {
    return NextResponse.json(
      { error: "File too large. Maximum size is 5MB." },
      { status: 413 }
    );
  }

  const businessInfo: BusinessInfo = {
    brandName: formData.get("brandName") as string,
    businessCategory: formData.get("businessCategory") as string,
    typeOfBusiness: formData.get("typeOfBusiness") as string,
    industry: formData.get("industry") as string,
    targetAudience: formData.get("targetAudience") as string,
    hasWebsite: formData.get("hasWebsite") === "true",
    logoAcrossPlatforms: formData.get("logoAcrossPlatforms") === "true",
    hasLogoVariety: formData.get("hasLogoVariety") === "true",
    uploadedIconVersion: formData.get("uploadedIconVersion") === "null"
      ? null
      : formData.get("uploadedIconVersion") === "true",
  };

  const arrayBuffer = await file.arrayBuffer();
  const base64 = Buffer.from(arrayBuffer).toString("base64");
  const mediaType = file.type as AllowedMediaType;

  try {
    const response = await anthropic.messages.create({
      model: "claude-sonnet-4-6",
      max_tokens: 2048,
      messages: [
        {
          role: "user",
          content: [
            {
              type: "image",
              source: { type: "base64", media_type: mediaType, data: base64 },
            },
            { type: "text", text: buildReviewPrompt(businessInfo) },
          ],
        },
      ],
    });

    const textBlock = response.content.find((b) => b.type === "text");
    if (!textBlock || textBlock.type !== "text") throw new Error("No text response");

    const raw = textBlock.text.replace(/```json\n?/g, "").replace(/```\n?/g, "").trim();
    const review: LogoReview = JSON.parse(raw);
    return NextResponse.json({ review });
  } catch (err) {
    console.error("Review error:", err);
    return NextResponse.json({ error: "Failed to analyze logo. Please try again." }, { status: 500 });
  }
}
