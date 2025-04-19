export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig();

  if (config.public.use_oauth) {
    const { user } = await requireUserSession(event);
  }

  const query: Record<string, any> = getQuery(event);
  const url = config.search_custom_api_url.replace("%s", encodeURIComponent(query.q));
  const headers = {
    [config.search_custom_api_token_header]: config.search_custom_api_token,
  };
  return fetch(`${url}`, {
    headers,
  })
    .then((response) => {
      if (!response.ok) {
        console.log("something went wrong");
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return response.json();
    })
    .then((data) => {
      const results = data.data.map((item: Record<string, any>) => ({
        id: item[config.search_custom_item_id_field],
        title: item[config.search_custom_item_title_field],
        link: item[config.search_custom_item_link_field],
      }));
      return results;
    })
    .catch((error) => {
      console.log(error);
      return [];
    });
});
