"use server";

import * as cheerio from "cheerio";

export type AuditResult = {
  success: boolean;
  error?: string;
  data?: {
    score: number;
    url: string;
    checks: {
      name: string;
      status: "pass" | "fail" | "warn";
      value: string;
      description: string;
    }[];
  };
};

export async function scrapeUrl(url: string): Promise<AuditResult> {
  try {
    // Basic URL validation
    if (!url.startsWith("http")) {
      url = `https://${url}`;
    }
    
    const response = await fetch(url, {
      next: { revalidate: 0 },
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
      }
    });

    if (!response.ok) {
      throw new Error(`Cloud not reach the URL: ${response.statusText}`);
    }

    const html = await response.text();
    const $ = cheerio.load(html);

    const title = $("title").text().trim();
    const h1 = $("h1").first().text().trim();
    const metaDescription = $('meta[name="description"]').attr("content")?.trim() || "";
    const images = $("img");
    const totalImages = images.length;
    const imagesWithAlt = images.filter((_, el) => !!$(el).attr("alt")).length;

    const checks: AuditResult["data"]["checks"] = [
      {
        name: "Title Tag",
        status: title.length > 0 ? (title.length >= 30 && title.length <= 60 ? "pass" : "warn") : "fail",
        value: title || "Missing Title",
        description: "Ideal length is 30-60 characters for search rankings."
      },
      {
        name: "H1 Header",
        status: h1.length > 0 ? "pass" : "fail",
        value: h1 || "Missing H1 Tag",
        description: "The primary header helps search engines understand the page's topic."
      },
      {
        name: "Meta Description",
        status: metaDescription.length > 0 ? (metaDescription.length >= 120 && metaDescription.length <= 160 ? "pass" : "warn") : "fail",
        value: metaDescription || "Missing Meta Description",
        description: "Ideal length is 120-160 characters for better CTR."
      },
      {
        name: "Image Accessibility",
        status: totalImages === 0 ? "pass" : (imagesWithAlt / totalImages >= 0.8 ? "pass" : "fail"),
        value: `${imagesWithAlt}/${totalImages} images have alt text`,
        description: "Alt tags allow search engines and screen readers to 'see' images."
      },
    ];

    const passCount = checks.filter(c => c.status === "pass").length;
    const warnCount = checks.filter(c => c.status === "warn").length;
    const score = Math.round(((passCount * 1) + (warnCount * 0.5)) / checks.length * 100);

    return {
      success: true,
      data: {
        score,
        url,
        checks
      }
    };
  } catch (error: any) {
    return {
      success: false,
      error: error.message || "An unexpected error occurred while scanning."
    };
  }
}
