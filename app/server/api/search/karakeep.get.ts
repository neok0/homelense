export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig();

  if (config.public.use_oauth) {
    const { user } = await requireUserSession(event);
  }
  const query: Record<string, any> = getQuery(event);
  return fetch(`${config.search_karakeep_api_url}/api/v1/bookmarks/search?q=${encodeURIComponent(query.q)}`, {
    headers: {
      Authorization: `Bearer ${config.search_karakeep_api_token}`,
    },
  })
    .then((response) => {
      if (!response.ok) {
        console.log("something went wrong");
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return response.json();
    })
    .then((data) => {
      const results = data.bookmarks.map(
        (item: { id: number; name: string; slug: string; content: { url: string; title: string } }) => ({
          id: item.id,
          title: item.content.title,
          link: item.content.url,
        }),
      );
      return results;
    })
    .catch((error) => {
      console.log(error);
      return [];
    });
});
