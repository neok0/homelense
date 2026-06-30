import { fetchJson, getSearchQuery, logSearchError, requireSearchSession } from "../../utils/search";
import type { SearchResult } from "../../utils/search";

type PaperlessSearchResponse = {
  results?: {
    id: number;
    title: string;
  }[];
};

export default defineEventHandler(async (event): Promise<SearchResult[]> => {
  const config = useRuntimeConfig();
  await requireSearchSession(event);

  const searchTerm = getSearchQuery(event);
  if (!searchTerm) {
    return [];
  }

  try {
    const data = await fetchJson<PaperlessSearchResponse>(
      `${config.search_paperless_ngx_api_url}/api/documents/?query=${encodeURIComponent(searchTerm)}`,
      {
        headers: {
          Authorization: `Token ${config.search_paperless_ngx_api_token}`,
        },
      },
    );

    return (data.results ?? []).map((item) => ({
      id: item.id,
      title: item.title,
      link: `${config.search_paperless_ngx_api_url}/api/documents/${item.id}/preview/`,
    }));
  } catch (error) {
    logSearchError("Paperless-ngx", error);
    return [];
  }
});
