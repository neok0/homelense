// TODO: does not work yet
async function loginToTinyTinyRSS(ttrss_url: string, ttrss_user: string, ttrss_password: string) {
  const response = await fetch(`${ttrss_url}/api`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      op: "login",
      user: ttrss_user,
      password: ttrss_password,
    }),
  });

  const data = await response.json();
  if (!data.content?.session_id) throw new Error("Failed to login");

  return data.content.session_id;
}

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig();

  if (config.public.use_oauth) {
    const { user } = await requireUserSession(event);
  }
  const query = getQuery(event);
  const sessionId = await loginToTinyTinyRSS(
    config.search_ttrss_url,
    config.search_ttrss_user,
    config.search_ttrss_password,
  );
  const payload = {
    op: "getHeadlines",
    sid: sessionId,
    feed_id: -4, // -4 for all articles, or a specific feed ID
    search: query.q, // search string
    show_content: true, // optional: include article content
    limit: 20, // limit results
    searchMode: "all_feeds",
  };
  return fetch(`${config.search_ttrss_url}/api/`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return response.json();
    })
    .then((data) => {
      const results = data.content.map((article: { id: number; title: string; link: string }) => ({
        id: article.id,
        title: article.title,
        link: article.title,
      }));
      return results;
    })
    .catch((error) => {
      return [];
    });
});
