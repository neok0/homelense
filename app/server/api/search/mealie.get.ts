export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig();

  if (config.public.use_oauth) {
    const { user } = await requireUserSession(event);
  }
  const query: Record<string, any> = getQuery(event);
  return fetch(`${config.search_mealie_api_url}/api/recipes?search=${encodeURIComponent(query.q)}`, {
    headers: {
      Authorization: `Bearer ${config.search_mealie_api_token}`,
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
      const results = data.items.map((item: { id: number; name: string; slug: string }) => ({
        id: item.id,
        title: item.name,
        link: `${config.search_mealie_api_url}/g/home/r/${item.slug}`,
      }));
      return results;
    })
    .catch((error) => {
      console.log(error);
      return [];
    });
});
