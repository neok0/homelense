export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig();

  if (config.public.use_oauth) {
    const { user } = await requireUserSession(event);
  }
  const query: Record<string, any> = getQuery(event);
  return fetch(`${config.search_paperless_ngx_api_url}/api/documents/?query=${encodeURIComponent(query.q)}`, {
    headers: {
      Authorization: `Token ${config.search_paperless_ngx_api_token}`,
    },
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return response.json();
    })
    .then((data) => {
      const results = data.results.map((item: { id: number; title: string }) => ({
        id: item.id,
        title: item.title,
        link: `${config.search_paperless_ngx_api_url}/api/documents/${item.id}/preview/`,
      }));
      return results;
    })
    .catch((error) => {
      return [];
    });
});
