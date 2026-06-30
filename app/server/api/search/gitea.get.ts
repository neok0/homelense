import { fetchJson, getSearchQuery, logSearchError, requireSearchSession } from "../../utils/search";
import type { SearchResult } from "../../utils/search";

type GiteaSearchResponse = {
  data?: {
    id: number;
    full_name: string;
    html_url: string;
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
    const data = await fetchJson<GiteaSearchResponse>(
      `${config.search_gitea_api_url}/api/v1/repos/search?q=${encodeURIComponent(searchTerm)}`,
      {
        headers: {
          Authorization: `token ${config.search_gitea_api_token}`,
        },
      },
    );

    return (data.data ?? []).map((item) => ({
      id: item.id,
      title: item.full_name,
      link: item.html_url,
    }));
  } catch (error) {
    logSearchError("Gitea", error);
    return [];
  }
});
