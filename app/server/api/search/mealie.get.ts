import { fetchJson, getSearchQuery, logSearchError, requireSearchSession } from "../../utils/search";
import type { SearchResult } from "../../utils/search";

type MealieSearchResponse = {
  items?: {
    id: number;
    name: string;
    slug: string;
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
    const data = await fetchJson<MealieSearchResponse>(
      `${config.search_mealie_api_url}/api/recipes?search=${encodeURIComponent(searchTerm)}`,
      {
        headers: {
          Authorization: `Bearer ${config.search_mealie_api_token}`,
        },
      },
    );

    return (data.items ?? []).map((item) => ({
      id: item.id,
      title: item.name,
      link: `${config.search_mealie_api_url}/g/home/r/${item.slug}`,
    }));
  } catch (error) {
    logSearchError("Mealie", error);
    return [];
  }
});
