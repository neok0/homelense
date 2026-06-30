import { fetchJson, getSearchQuery, logSearchError, requireSearchSession } from "../../utils/search";
import type { SearchResult } from "../../utils/search";

type JellyfinSearchResponse = {
  Items?: {
    Id: string;
    Name: string;
    Type: string;
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
    const data = await fetchJson<JellyfinSearchResponse>(
      `${config.search_jellyfin_api_url}/Items?SearchTerm=${encodeURIComponent(searchTerm)}&recursive=true`,
      {
        headers: {
          Authorization: `MediaBrowser Token=${config.search_jellyfin_api_token}`,
        },
      },
    );

    return (data.Items ?? []).map((item) => ({
      id: item.Id,
      title: `(${item.Type}) ${item.Name}`,
      link: `${config.search_jellyfin_api_url}/web/#/details?id=${item.Id}`,
    }));
  } catch (error) {
    logSearchError("Jellyfin", error);
    return [];
  }
});
