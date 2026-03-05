// ── Types ─────────────────────────────────────────────────────────────────

export interface IgPost {
  id: string;
  caption?: string;
  media_url: string;
  thumbnail_url?: string; // for VIDEO type
  permalink: string;
  like_count?: number;
  comments_count?: number;
  timestamp: string;
  media_type: "IMAGE" | "VIDEO" | "CAROUSEL_ALBUM";
}

interface IgApiResponse {
  data: IgPost[];
  paging?: {
    cursors: { before: string; after: string };
    next?: string;
  };
  error?: { message: string; type: string; code: number };
}

// ── Fetch recent posts ────────────────────────────────────────────────────

export async function getInstagramPosts(limit = 6): Promise<IgPost[]> {
  const token = process.env.INSTAGRAM_ACCESS_TOKEN;

  if (!token) {
    console.warn("[Instagram] INSTAGRAM_ACCESS_TOKEN not set — using fallback.");
    return [];
  }

  const fields =
    "id,caption,media_url,thumbnail_url,permalink,like_count,comments_count,timestamp,media_type";

  // Try Instagram Graph API endpoint first (works with IGAAT tokens)
  const url = `https://graph.instagram.com/v21.0/me/media?fields=${fields}&limit=${limit}&access_token=${token}`;

  try {
    const res = await fetch(url, {
      next: { revalidate: 3600 }, // cache for 1 hour (matches short-lived token lifespan)
    });

    const data: IgApiResponse = await res.json();

    if (data.error) {
      console.error("[Instagram] API error:", data.error.message);
      return [];
    }

    return data.data ?? [];
  } catch (err) {
    console.error("[Instagram] Fetch failed:", err);
    return [];
  }
}

// ── Long-lived token exchange (call once from CLI/script) ─────────────────
// Usage: provide your Meta App ID and App Secret from developers.facebook.com
// Then run this and save the returned token in .env.local as INSTAGRAM_ACCESS_TOKEN.
// Long-lived tokens last 60 days. Refresh before expiry by calling it again with
// the long-lived token as the short-lived one (the API allows this within 60 days).

export async function exchangeForLongLivedToken(
  shortLivedToken: string,
  appId: string,
  appSecret: string
): Promise<{ access_token: string; token_type: string; expires_in: number }> {
  const url = `https://graph.instagram.com/access_token?grant_type=ig_exchange_token&client_id=${appId}&client_secret=${appSecret}&access_token=${shortLivedToken}`;
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Token exchange failed: ${res.status}`);
  return res.json();
}
