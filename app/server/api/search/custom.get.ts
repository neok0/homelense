import { fetchJson, getSearchQuery, logSearchError, requireSearchSession } from "../../utils/search";
import type { SearchResult } from "../../utils/search";

type CustomSearchResponse = {
  data?: Record<string, unknown>[];
};

function readStringField(item: Record<string, unknown>, field: string): string {
  const value = item[field];
  return typeof value === "string" || typeof value === "number" ? String(value) : "";
}

export default defineEventHandler(async (event): Promise<SearchResult[]> => {
  const config = useRuntimeConfig();
  await requireSearchSession(event);

  const searchTerm = getSearchQuery(event);
  if (!searchTerm) {
    return [];
  }

  try {
    const url = String(config.search_custom_api_url).replace("%s", encodeURIComponent(searchTerm));
    const tokenHeader = String(config.search_custom_api_token_header || "Authorization");
    const data = await fetchJson<CustomSearchResponse>(url, {
      headers: {
        [tokenHeader]: String(config.search_custom_api_token || ""),
      },
    });

    return (data.data ?? []).map((item) => ({
      id: readStringField(item, config.search_custom_item_id_field),
      title: readStringField(item, config.search_custom_item_title_field),
      link: readStringField(item, config.search_custom_item_link_field),
    }));
  } catch (error) {
    logSearchError("Custom", error);
    return [];
  }
});
