import { fetchJson, getSearchQuery, logSearchError, requireSearchSession } from "../../utils/search";
import type { SearchResult } from "../../utils/search";

type TtrssLoginResponse = {
  content?: {
    session_id?: string;
  };
};

type TtrssHeadlineResponse = {
  content?: {
    id: number;
    title: string;
    link: string;
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
    const loginData = await fetchJson<TtrssLoginResponse>(`${config.search_ttrss_api_url}/api/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        op: "login",
        user: config.search_ttrss_api_user,
        password: config.search_ttrss_api_password,
      }),
    });

    const sessionId = loginData.content?.session_id;
    if (!sessionId) {
      throw new Error("Failed to get TT-RSS session ID");
    }

    const searchData = await fetchJson<TtrssHeadlineResponse>(`${config.search_ttrss_api_url}/api/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        op: "getHeadlines",
        sid: sessionId,
        feed_id: -4,
        search: searchTerm,
        search_mode: "all_feeds",
        limit: 25,
        show_content: false,
      }),
    });

    return (searchData.content ?? []).map((item) => ({
      id: item.id,
      title: item.title,
      link: item.link,
    }));
  } catch (error) {
    logSearchError("TT-RSS", error);
    return [];
  }
});
