const API_BASE = "https://publishos-eosin.vercel.app/api/db";

export type BlogPost = {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  category?: string;
  published_at: string;
  cover_image?: string;
  status: "draft" | "published";
};

export type PressRelease = {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  published_at: string;
  source?: string;
  status: "draft" | "published";
};

export type NewsletterIssue = {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  issue_number?: number;
  published_at: string;
  status: "draft" | "published";
};

export type FaqItem = {
  id: string;
  category: string;
  question: string;
  answer: string;
  order?: number;
  status: "draft" | "published";
};

async function fetchCollection<T>(name: string): Promise<T[]> {
  try {
    const res = await fetch(`${API_BASE}/${name}`, { cache: "no-store" });
    if (!res.ok) return [];
    const data = await res.json();
    return Array.isArray(data) ? data : [];
  } catch {
    return [];
  }
}

export const getBlogPosts = () => fetchCollection<BlogPost>("abrahams_blog");
export const getPressReleases = () => fetchCollection<PressRelease>("abrahams_press");
export const getNewsletters = () => fetchCollection<NewsletterIssue>("abrahams_newsletters");
export const getFaqs = () => fetchCollection<FaqItem>("abrahams_faqs");

export type Enquiry = {
  id: string;
  source: string;
  name?: string;
  email: string;
  phone?: string;
  service?: string;
  case?: string;
  submitted_at: string;
};

export async function submitEnquiry(payload: Omit<Enquiry, "id" | "submitted_at">): Promise<boolean> {
  try {
    const res = await fetch("/api/lead", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: payload.name,
        email: payload.email,
        phone: payload.phone,
        source: payload.source,
        service: payload.service,
        serviceLine: payload.service,
        subject: payload.service ? `Enquiry: ${payload.service}` : "Website enquiry",
        message: payload.case,
        pageUrl: typeof window !== "undefined" ? window.location.href : "",
      }),
    });
    return res.ok;
  } catch {
    return false;
  }
}

export async function subscribeToNewsletter(
  email: string,
  opts: { firstName?: string; lastName?: string } = {}
): Promise<boolean> {
  const orgId = process.env.NEXT_PUBLIC_SALESHUB_NEWSLETTER_ORG_ID;

  // Always keep a backup copy in our own collection so we don't lose signups.
  const mirror = async () => {
    try {
      const existing = await fetchCollection<{ id: string; email: string; subscribed_at: string }>(
        "abrahams_newsletter_subscribers"
      );
      if (existing.some(s => s.email.toLowerCase() === email.toLowerCase())) return;
      const updated = [
        ...existing,
        { id: crypto.randomUUID(), email, subscribed_at: new Date().toISOString(), ...opts },
      ];
      await fetch(`${API_BASE}/abrahams_newsletter_subscribers`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updated),
      });
    } catch {}
  };

  if (!orgId) {
    await mirror();
    return true;
  }

  try {
    const res = await fetch(
      `https://app.saleshubcloud.com/api/public/newsletter-signup/${orgId}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, firstName: opts.firstName ?? "", lastName: opts.lastName ?? "" }),
      }
    );
    await mirror();
    return res.ok;
  } catch {
    await mirror();
    return false;
  }
}

export function formatDate(iso: string): string {
  try {
    return new Date(iso).toLocaleDateString("en-GB", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  } catch {
    return iso;
  }
}
