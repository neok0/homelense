export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig();

  if (config.public.use_oauth) {
    const { user } = await requireUserSession(event);
  }

  const query: Record<string, any> = getQuery(event);
  return fetch("https://api.notion.com/v1/search", {
    headers: {
      Authorization: `Bearer ${config.search_notion_api_token}`,
      "Notion-Version": "2022-06-28",
      "Content-Type": "application/json",
    },
    method: "POST",
    body: JSON.stringify({
      query: query.q,
      filter: {
        value: "page",
        property: "object",
      },
      sort: {
        direction: "ascending",
        timestamp: "last_edited_time",
      },
    }),
  })
    .then((response) => {
      if (!response.ok) {
        console.log("something went wrong");
        console.log(response.json());
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return response.json();
    })
    .then((data) => {
      const results = data.results.map(
        (item: { id: string; properties: { title: { title: { plain_text: string }[] } }; url: string }) => ({
          id: item.id,
          title: item.properties.title.title[0].plain_text,
          link: item.url,
        }),
      );
      return results;
    })
    .catch((error) => {
      console.log(error);
      return [];
    });
});
