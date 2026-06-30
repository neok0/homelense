import { fetchJson, getSearchQuery, logSearchError, requireSearchSession } from "../../utils/search";
import type { SearchResult } from "../../utils/search";

type KarakeepSearchResponse = {
  bookmarks?: {
    id: number;
    content?: {
      url?: string;
      title?: string;
    };
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
    const data = await fetchJson<KarakeepSearchResponse>(
      `${config.search_karakeep_api_url}/api/v1/bookmarks/search?q=${encodeURIComponent(searchTerm)}`,
      {
        headers: {
          Authorization: `Bearer ${config.search_karakeep_api_token}`,
        },
      },
    );

    return (data.bookmarks ?? [])
      .filter((item) => item.content?.url && item.content.title)
      .map((item) => ({
        id: item.id,
        title: item.content!.title!,
        link: item.content!.url!,
      }));
  } catch (error) {
    logSearchError("Karakeep", error);
    return [];
  }
});
