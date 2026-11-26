/**
 * Checks the answer-engine referrer classifier.  Run: npx tsx scripts/verify-ai-referrers.ts
 *
 * There is no test runner in this repo, so this is a standalone script rather
 * than a suite. It earns its place because the matching is easy to get subtly
 * wrong in two directions, and both would be invisible in production:
 *
 *   - too loose: a suffix match on "chatgpt.com" that is not anchored on a dot
 *     boundary also matches "evilchatgpt.com", so a lookalike domain could
 *     launder itself into the firm's attribution data.
 *   - too greedy: bing.com serves both Bing search and Copilot. Classifying the
 *     whole host as Copilot would quietly reassign Bing organic traffic.
 */
import { classifyAiReferrer } from "../src/lib/gclid";

const HOST = "www.abrahamssolicitors.co.uk";

const CASES: ReadonlyArray<readonly [string, string | null]> = [
  ["https://chatgpt.com/", "chatgpt"],
  ["https://chat.openai.com/c/abc", "chatgpt"],
  ["https://www.perplexity.ai/search?q=x", "perplexity"],
  ["https://perplexity.ai/", "perplexity"],
  ["https://gemini.google.com/app", "gemini"],
  ["https://copilot.microsoft.com/chats/1", "copilot"],
  ["https://claude.ai/chat/1", "claude"],
  // Copilot and Bing search share a host, separated only by path.
  ["https://www.bing.com/chat?q=solicitor", "copilot"],
  ["https://www.bing.com/search?q=solicitor", null],
  ["https://www.google.com/search?q=solicitor", null],
  // Lookalikes must not match.
  ["https://notchatgpt.com.evil.example/", null],
  ["https://evilchatgpt.com/", null],
  ["", null],
  ["not a url", null],
  // Same-origin navigation is not a referral.
  [`https://${HOST}/blog/`, null],
];

let failures = 0;
for (const [referrer, want] of CASES) {
  const got = classifyAiReferrer(referrer, HOST);
  const ok = got === want;
  if (!ok) failures++;
  console.log(`${ok ? "PASS" : "FAIL"}  ${JSON.stringify(referrer).padEnd(48)} -> ${String(got).padEnd(11)} (want ${want})`);
}
console.log(failures === 0 ? `\nALL ${CASES.length} PASS` : `\n${failures} FAILURE(S)`);
process.exit(failures === 0 ? 0 : 1);
