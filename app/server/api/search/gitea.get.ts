export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig();

  if (config.public.use_oauth) {
    const { user } = await requireUserSession(event);
  }

  const query: Record<string, any> = getQuery(event);
  return fetch(`${config.search_gitea_api_url}/api/v1/repos/search?q=${encodeURIComponent(query.q)}`, {
    headers: {
      Authorization: `token ${config.search_gitea_api_token}`,
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
      const results = data.data.map((item: { id: number; full_name: string; html_url: string }) => ({
        id: item.id,
        title: item.full_name,
        link: item.html_url,
      }));
      return results;
    })
    .catch((error) => {
      console.log(error);
      return [];
    });
});
