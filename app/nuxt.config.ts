import tailwindcss from "@tailwindcss/vite";

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2024-11-01",
  devtools: { enabled: true },
  modules: ["@nuxt/icon", "shadcn-nuxt", "@nuxtjs/color-mode", "nuxt-auth-utils"],
  css: ["~/assets/css/tailwind.css"],
  vite: {
    plugins: [tailwindcss()],
  },
  colorMode: { classSuffix: "" },
  shadcn: {
    /**
     * Prefix for all the imported component
     */
    prefix: "",
    /**
     * Directory that the component lives in.
     * @default "./components/ui"
     */
    componentDir: "./components/ui",
  },
  runtimeConfig: {
    search_paperless_ngx_api_url: process.env.NUXT_SEARCH_PAPERLESS_NGX_API_URL,
    search_paperless_ngx_api_token: process.env.NUXT_SEARCH_PAPERLESS_NGX_API_TOKEN,
    search_ttrss_api_url: process.env.NUXT_SEARCH_TTRSS_API_URL,
    search_ttrss_api_user: process.env.NUXT_SEARCH_TTRSS_API_USER,
    search_ttrss_api_password: process.env.NUXT_SEARCH_TTRSS_API_PASSWORD,
    search_mealie_api_url: process.env.NUXT_SEARCH_MEALIE_API_URL,
    search_mealie_api_token: process.env.NUXT_SEARCH_MEALIE_API_TOKEN,
    search_karakeep_api_url: process.env.NUXT_SEARCH_KARAKEEP_API_URL,
    search_karakeep_api_token: process.env.NUXT_SEARCH_KARAKEEP_API_TOKEN,
    search_gitea_api_url: process.env.NUXT_SEARCH_GITEA_API_URL,
    search_gitea_api_token: process.env.NUXT_SEARCH_GITEA_API_TOKEN,
    search_jellyfin_api_url: process.env.NUXT_SEARCH_JELLYFIN_API_URL,
    search_jellyfin_api_token: process.env.NUXT_SEARCH_JELLYFIN_API_TOKEN,
    search_notion_api_token: process.env.NUXT_SEARCH_NOTION_API_TOKEN,
    search_custom_api_url: process.env.NUXT_SEARCH_CUSTOM_API_URL,
    search_custom_api_token: process.env.NUXT_SEARCH_CUSTOM_API_TOKEN,
    search_custom_api_token_header: process.env.NUXT_SEARCH_CUSTOM_API_HEADER,
    search_custom_item_id_field: "id",
    search_custom_item_title_field: "title",
    search_custom_item_link_field: "link",
    public: {
      version: process.env.NUXT_PUBLIC_VERSION,
      search_plugin_paperless_ngx_enabled: process.env.NUXT_PUBLIC_SEARCH_PLUGIN_PAPERLESS_NGX_ENABLED || false,
      search_plugin_paperless_ngx_weight: process.env.NUXT_PUBLIC_SEARCH_PLUGIN_PAPERLESS_NGX_WEIGHT || 0,
      search_plugin_ttrss_enabled: process.env.NUXT_PUBLIC_SEARCH_PLUGIN_TTRSS_ENABLED || false,
      search_plugin_ttrss_weight: process.env.NUXT_PUBLIC_SEARCH_PLUGIN_TTRSS_WEIGHT || 0,
      search_plugin_mealie_enabled: process.env.NUXT_PUBLIC_SEARCH_PLUGIN_MEALIE_ENABLED || false,
      search_plugin_mealie_weight: process.env.NUXT_PUBLIC_SEARCH_PLUGIN_MEALIE_WEIGHT || 0,
      search_plugin_karakeep_enabled: process.env.NUXT_PUBLIC_SEARCH_PLUGIN_KARAKEEP_ENABLED || false,
      search_plugin_karakeep_weight: process.env.NUXT_PUBLIC_SEARCH_PLUGIN_KARAKEEP_WEIGHT || 0,
      search_plugin_gitea_enabled: process.env.NUXT_PUBLIC_SEARCH_PLUGIN_GITEA_ENABLED || false,
      search_plugin_gitea_weight: process.env.NUXT_PUBLIC_SEARCH_PLUGIN_GITEA_WEIGHT || 0,
      search_plugin_jellyfin_enabled: process.env.NUXT_PUBLIC_SEARCH_PLUGIN_JELLYFIN_ENABLED || false,
      search_plugin_jellyfin_weight: process.env.NUXT_PUBLIC_SEARCH_PLUGIN_JELLYFIN_WEIGHT || 0,
      search_plugin_notion_enabled: process.env.NUXT_PUBLIC_SEARCH_PLUGIN_NOTION_ENABLED || false,
      search_plugin_notion_weight: process.env.NUXT_PUBLIC_SEARCH_PLUGIN_NOTION_WEIGHT || 0,
      search_plugin_custom_enabled: process.env.NUXT_PUBLIC_SEARCH_PLUGIN_CUSTOM_ENABLED || false,
      use_oauth: process.env.NUXT_PUBLIC_USE_OAUTH,
      use_oauth_provider_name: process.env.NUXT_PUBLIC_USE_OAUTH_PROVIDER_NAME,
    },
  },
});
