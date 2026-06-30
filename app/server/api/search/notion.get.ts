import { fetchJson, getSearchQuery, logSearchError, requireSearchSession } from "../../utils/search";
import type { SearchResult } from "../../utils/search";

type NotionSearchResponse = {
  results?: {
    id: string;
    url: string;
    properties?: {
      title?: {
        title?: {
          plain_text?: string;
        }[];
      };
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
    const data = await fetchJson<NotionSearchResponse>("https://api.notion.com/v1/search", {
      headers: {
        Authorization: `Bearer ${config.search_notion_api_token}`,
        "Notion-Version": "2022-06-28",
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify({
        query: searchTerm,
        filter: {
          value: "page",
          property: "object",
        },
        sort: {
          direction: "ascending",
          timestamp: "last_edited_time",
        },
      }),
    });

    return (data.results ?? []).map((item) => ({
      id: item.id,
      title: item.properties?.title?.title?.[0]?.plain_text || "Untitled",
      link: item.url,
    }));
  } catch (error) {
    logSearchError("Notion", error);
    return [];
  }
});
