<script setup lang="ts">
import SearchResults from "@/components/search/SearchResults.vue";
import { ref } from "vue";

const props = defineProps({
    q: String,
    endpoints: Array<String>,
});

const searchQuery = ref("");
const q = ref("");

const config = useRuntimeConfig();

const endpoints = reactive([
    {
        title: "Paperless-ngx",
        url: "/api/search/paperless-ngx",
        selected: true,
        isSearched: false,
        icon: "/images/icons/paperless-ngx.svg",
        enabled: config.public.search_plugin_paperless_ngx_enabled,
    },
    {
        title: "Mealie",
        url: "/api/search/mealie",
        selected: true,
        isSearched: false,
        icon: "/images/icons/mealie.svg",
        enabled: config.public.search_plugin_mealie_enabled,
    },
    {
        title: "Karakeep",
        url: "/api/search/karakeep",
        selected: true,
        isSearched: false,
        icon: "/images/icons/karakeep.svg",
        enabled: config.public.search_plugin_karakeep_enabled,
    },
    {
        title: "Gitea",
        url: "/api/search/gitea",
        selected: true,
        isSearched: false,
        icon: "/images/icons/gitea.svg",
        enabled: config.public.search_plugin_gitea_enabled,
    },
    {
        title: "Jellyfin",
        url: "/api/search/jellyfin",
        selected: true,
        isSearched: false,
        icon: "/images/icons/jellyfin.svg",
        enabled: config.public.search_plugin_jellyfin_enabled,
    },
    // {
    //     title: "TTRSS",
    //     url: "/api/search/ttrss",
    //     selected: true,
    //     isSearched: false,
    //     icon: "/images/icons/tiny-tiny-rss.png",
    //     enabled: config.public.search_plugin_ttrss_enabled,
    // },
]);

const enabledEndpoints = computed(() => endpoints.filter((endpoint) => endpoint.enabled));
const searchedEndpoints = computed(() => {
    return enabledEndpoints.value.filter((item) => item.isSearched);
});

function search() {
    if (!searchQuery.value.trim()) {
        return; // prevent empty searches
    }
    // this will make sure the SearchResults components are reloaded automatically
    q.value = searchQuery.value.trim();
    endpoints.forEach((item) => {
        // we need to reset the search bool on each new search to make sure only active ones are shown again
        item.isSearched = false;
    });
    endpoints.forEach((item) => {
        if (item.selected === true) {
            item.isSearched = true;
        }
    });
}

const expandAll = ref(false);

function toggleAll() {
    expandAll.value = !expandAll.value;
}

if (props.q) {
    if (props.endpoints && props.endpoints.length > 0) {
        // user specified endpoints via get parameter
        endpoints.forEach((endpoint) => {
            if (props.endpoints && props.endpoints.includes(endpoint.title.toLowerCase())) {
                endpoint.selected = true;
            } else {
                endpoint.selected = false;
            }
        });
    }
    // user specified search query via get parameter
    searchQuery.value = props.q;
    search();
}
</script>

<template>
    <div class="flex flex-1 flex-col gap-4 p-4 pt-0">
        <div class="flex flex-col md:flex-row w-full items-stretch md:items-center gap-2">
            <div class="flex w-full gap-2">
                <Input
                    id="search"
                    type="text"
                    autofocus
                    placeholder="Search..."
                    class="flex-1 w-full px-4 py-2"
                    v-model="searchQuery"
                    @keyup.enter="search"
                />
                <Button
                    class="rounded-md border px-4 py-2 shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
                    @click="search()"
                    :disabled="!searchQuery.trim()"
                >
                    Search
                </Button>
            </div>

            <div class="flex items-center gap-2 md:ml-4">
                <SearchSelection :endpoints="enabledEndpoints" />
                <SearchResultsOptions @toggleSearchResults="toggleAll()" />
            </div>
        </div>
        <SearchResults
            v-for="endpoint in searchedEndpoints"
            :key="endpoint.title + q"
            :endpoint="endpoint"
            :expanded="expandAll"
            :q="q"
        ></SearchResults>
    </div>
</template>
