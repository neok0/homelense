import { fetchJson, getSearchQuery, logSearchError, requireSearchSession } from "../../utils/search";
import type { SearchResult } from "../../utils/search";

type ProwlarrSearchResult = {
  guid?: string;
  title?: string;
  infoUrl?: string;
  downloadUrl?: string;
  categories?: {
    name?: string;
  }[];
};

export default defineEventHandler(async (event): Promise<SearchResult[]> => {
  const config = useRuntimeConfig();
  await requireSearchSession(event);

  const searchTerm = getSearchQuery(event);
  if (!searchTerm || !config.search_prowlarr_api_url) {
    return [];
  }

  try {
    const baseUrl = `${String(config.search_prowlarr_api_url).replace(/\/+$/, "")}/`;
    const searchUrl = new URL("api/v1/search", baseUrl);
    searchUrl.search = new URLSearchParams({
      query: searchTerm,
      type: "search",
      limit: "50",
    }).toString();

    const data = await fetchJson<ProwlarrSearchResult[]>(searchUrl.toString(), {
      headers: {
        "X-Api-Key": String(config.search_prowlarr_api_token || ""),
      },
    });

    return (Array.isArray(data) ? data : [])
      .filter((item) => item.title && (item.infoUrl || item.guid || item.downloadUrl))
      .map((item) => {
        const categoryNames = (item.categories ?? [])
          .map((category) => category.name?.trim())
          .filter((name): name is string => Boolean(name));

        return {
          id: item.guid || item.infoUrl || item.downloadUrl || item.title || "prowlarr-result",
          title: `${categoryNames.length > 0 ? `[${categoryNames.join(", ")}] ` : ""}${item.title || "Untitled"}`,
          link: item.infoUrl || item.guid || item.downloadUrl || "",
        };
      });
  } catch (error) {
    logSearchError("Prowlarr", error);
    return [];
  }
});
