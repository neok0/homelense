import { createError, getQuery } from "h3";
import type { H3Event } from "h3";

export type SearchResult = {
  id: number | string;
  title: string;
  link: string;
};

export async function requireSearchSession(event: H3Event) {
  const config = useRuntimeConfig();

  if (config.public.use_oauth) {
    await requireUserSession(event);
  }
}

export function getSearchQuery(event: H3Event): string | null {
  const query = getQuery(event);
  const searchTerm = Array.isArray(query.q) ? query.q[0] : query.q;

  if (typeof searchTerm !== "string") {
    return null;
  }

  const trimmed = searchTerm.trim();
  return trimmed.length > 0 ? trimmed : null;
}

export async function fetchJson<T>(url: string, init?: RequestInit): Promise<T> {
  const response = await fetch(url, init);

  if (!response.ok) {
    throw createError({
      statusCode: response.status,
      statusMessage: `Upstream search request failed: ${response.statusText}`,
    });
  }

  return response.json() as Promise<T>;
}

export function logSearchError(service: string, error: unknown) {
  console.error(`${service} search failed:`, error);
}
