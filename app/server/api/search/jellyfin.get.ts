export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig();

  if (config.public.use_oauth) {
    const { user } = await requireUserSession(event);
  }
  const query: Record<string, any> = getQuery(event);
  return fetch(`${config.search_jellyfin_api_url}/Items?SearchTerm=${encodeURIComponent(query.q)}&recursive=true`, {
    headers: {
      Authorization: `MediaBrowser Token=${config.search_jellyfin_api_token}`,
    },
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return response.json();
    })
    .then((data) => {
      const results = data.Items.map((item: { Id: number; Name: string; Type: string }) => ({
        id: item.Id,
        title: `(${item.Type}) ${item.Name}`,
        link: `${config.search_jellyfin_api_url}/web/#/details?id=${item.Id}`,
      }));
      return results;
    })
    .catch((error) => {
      console.error("Jellyfin API search error:", error);
      return [];
    });
});
