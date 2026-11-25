/**
 * Single source of truth for published review figures.
 *
 * WHY THIS EXISTS. These numbers were hardcoded in at least seven places and
 * drifted apart, in two different ways:
 *
 *   1. They went stale. Google was published as "63 reviews" across the site
 *      and in llms.txt; by 25 Nov 2026 it was 73. Before that it was published
 *      as "5.0 · 5-star rated" on 29 pages while the real figure was 4.7.
 *   2. They were MIS-ATTRIBUTED. /uk-spouse-visa/ and /uk-spouse-visa-from-us/
 *      both read "5.0 Google · 97 reviews" — an inflated rating, and Verified
 *      Reviews' review count credited to Google. Both pages linked nowhere, so
 *      nothing contradicted it on the page; the contradiction was only visible
 *      to a reader who checked the Google listing.
 *
 * The second kind is the dangerous one for an SRA-regulated firm: a rating
 * claim that the named source does not support.
 *
 * HOW TO UPDATE. Change the numbers here and nowhere else, and move
 * `verifiedOn` to the date you actually read them. Each entry carries the URL
 * the figure came from, so the claim is checkable rather than remembered.
 *
 * BETTER STILL, EVENTUALLY: Google's figure is already available live through
 * the Business Profile API (averageRating / totalReviewCount), and Verified
 * Reviews publishes its own in the certificate page's structured data. Reading
 * them at build time would end the drift for good. This module is the cheap
 * step that makes that a one-file change later.
 */

export type ReviewSource = {
  /** Platform name exactly as it should be shown to a reader. */
  platform: string;
  rating: number;
  count: number;
  /** Where the figure was read from. Published as the citation. */
  url: string;
  /** ISO date the figure was last read at source. */
  verifiedOn: string;
};

/**
 * Read from the Google Business Profile API on 25 Nov 2026:
 * averageRating 4.7, totalReviewCount 73 (was 63 on 19 Oct).
 */
export const GOOGLE_REVIEWS: ReviewSource = {
  platform: "Google",
  rating: 4.7,
  count: 73,
  url: "https://search.google.com/local/reviews?placeid=ChIJ8zDryFHne0gRkR-nvRs1aNE",
  verifiedOn: "2026-11-25",
};

/**
 * Read from the certificate page's structured data on 25 Nov 2026:
 * ratingValue 4.9, reviewCount 97. This is the figure most of the site quotes.
 */
export const VERIFIED_REVIEWS: ReviewSource = {
  platform: "Verified Reviews",
  rating: 4.9,
  count: 97,
  url: "https://www.verified-reviews.co.uk/reviews/abrahamssolicitors.co.uk",
  verifiedOn: "2026-11-25",
};

/**
 * Read from the listing on 19 Oct 2026: 4.8 from 22 (published as "5.0 · 19"
 * until then). The listing now refuses automated requests, so this could not
 * be re-read on 25 Nov — the date below is deliberately the last date it was
 * actually seen, not today. Check it by hand before leaning on it.
 */
export const REVIEWSOLICITORS: ReviewSource = {
  platform: "ReviewSolicitors",
  rating: 4.8,
  count: 22,
  url: "https://www.reviewsolicitors.co.uk/west-yorkshire/bradford/abrahams-yorkshire-limited",
  verifiedOn: "2026-10-19",
};

/** "4.9 from 97 reviews" */
export function ratingLine(s: ReviewSource): string {
  return `${s.rating} from ${s.count} reviews`;
}

/** "Verified Reviews 4.9 · 97 reviews" — use where the platform must be named. */
export function attributedLine(s: ReviewSource): string {
  return `${s.platform} ${s.rating} · ${s.count} reviews`;
}
