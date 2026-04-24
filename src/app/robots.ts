import type { MetadataRoute } from "next";

// Explicitly allow AI crawlers so Abrahams content can be cited by
// ChatGPT, Google AI Overviews, Perplexity, Claude, Bing Copilot etc.
// Also keep the /api/ directory crawl-free.
const AI_BOTS = [
  "GPTBot",            // OpenAI / ChatGPT
  "OAI-SearchBot",     // ChatGPT search
  "ChatGPT-User",      // ChatGPT "browse" actions
  "ClaudeBot",         // Anthropic Claude
  "Claude-Web",        // Claude legacy
  "Claude-SearchBot",  // Claude search
  "PerplexityBot",     // Perplexity
  "Google-Extended",   // Google Gemini / AI Overviews training
  "Applebot-Extended", // Apple Intelligence
  "CCBot",             // Common Crawl
  "Bytespider",        // TikTok / Bytedance AI
  "Meta-ExternalAgent",// Meta AI
  "FacebookBot",       // Meta LLaMA / training
  "Amazonbot",         // Alexa / Rufus
  "DuckAssistBot",     // DuckDuckGo AI
];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: "*", allow: "/", disallow: ["/api/", "/abrahams/"] },
      ...AI_BOTS.map(bot => ({ userAgent: bot, allow: "/" })),
    ],
    sitemap: "https://abrahamssolicitors.co.uk/sitemap.xml",
    host: "https://abrahamssolicitors.co.uk",
  };
}
