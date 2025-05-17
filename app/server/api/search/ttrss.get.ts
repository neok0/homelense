export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig();

  if (config.public.use_oauth) {
    const { user } = await requireUserSession(event);
  }

  const query = getQuery(event);
  const searchTerm = query.q;

  if (!searchTerm) {
    return [];
  }

  try {
    // Step 1: Login to get session ID (unless using a permanent one)
    const loginResponse = await fetch(`${config.search_ttrss_api_url}/api/`, {
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

    const loginData = await loginResponse.json();
    const sessionId = loginData.content.session_id;

    if (!sessionId) {
      throw new Error("Failed to get TT-RSS session ID");
    }

    // Step 2: Search for articles
    const searchResponse = await fetch(`${config.search_ttrss_api_url}/api/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        op: "getHeadlines",
        sid: sessionId,
        feed_id: -4, // Special feed ID for all articles
        search: searchTerm,
        search_mode: "all_feeds",
        limit: 25,
        show_content: false,
      }),
    });

    const searchData = await searchResponse.json();

    const results = searchData.content.map((item: any) => ({
      id: item.id,
      title: item.title,
      link: item.link,
    }));

    return results;
  } catch (error) {
    console.error("TT-RSS search failed:", error);
    return [];
  }
});
