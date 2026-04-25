// Vercel "Ignore Build Step" hook.
// Run by Vercel before every build. If we exit 0, the build is SKIPPED.
// If we exit 1, the build proceeds.
//
// Skip rule: image-only commits (the bot's auto-pushed generated images)
// don't trigger a build. The next non-image commit picks them up in a
// single deploy along with any code changes.
//
// Reference: https://vercel.com/docs/projects/overview#ignored-build-step

const { execSync } = require("node:child_process");

const previousSha = process.env.VERCEL_GIT_PREVIOUS_SHA || "HEAD~1";
const message = process.env.VERCEL_GIT_COMMIT_MESSAGE || "";
const ref = process.env.VERCEL_GIT_COMMIT_REF || "main";

// Always build for non-main branches (preview deploys are usually
// intentional manual triggers we want to see).
if (ref !== "main") {
  console.log(`✅ Build: branch=${ref} (not main)`);
  process.exit(1);
}

// Get the list of files changed since the last deployed commit.
let changedFiles;
try {
  changedFiles = execSync(`git diff --name-only ${previousSha} HEAD`, {
    encoding: "utf8",
    stdio: ["pipe", "pipe", "ignore"],
  })
    .split("\n")
    .map(s => s.trim())
    .filter(Boolean);
} catch {
  // No previous SHA on first deploy, or git error. Build to be safe.
  console.log("✅ Build: cannot diff (first deploy / git error)");
  process.exit(1);
}

if (changedFiles.length === 0) {
  // Empty commit — build it (often a manual trigger).
  console.log("✅ Build: empty commit");
  process.exit(1);
}

const IMAGE_RE = /\.(webp|png|jpg|jpeg|gif|avif|svg)$/i;
const IMAGE_PATHS = ["public/generated/", "public/placeholders/", "public/images/"];

const isImageFile = (f) =>
  IMAGE_RE.test(f) || IMAGE_PATHS.some(p => f.startsWith(p));

const allImages = changedFiles.every(isImageFile);

// Image-only commits with bot-style messages get skipped.
const looksLikeBotCommit = /^chore:\s+(add|update|generate)\s+(generated\s+)?image/i.test(message);

if (allImages && looksLikeBotCommit) {
  console.log(`⏭️  Skip: image-only bot commit (${changedFiles.length} files)`);
  console.log(`   message: ${message.slice(0, 80)}`);
  process.exit(0);
}

// Anything else — build.
console.log(`✅ Build: ${changedFiles.length} changed file(s) include non-image or non-bot commit`);
process.exit(1);
