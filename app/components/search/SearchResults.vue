<script lang="ts" setup>
import SearchResultsTable from "@/components/search/SearchResultsTable.vue";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";

import { ref, watch } from "vue";

const props = defineProps<{
    q: string;
    expanded: boolean;
    showEmpty: boolean;
    endpoint: {
        title: string;
        url: string;
        selected: boolean;
        icon: string;
    };
}>();

const isExpanded = ref(true);
// When the parent toggles "expandAll", this prop changes
watch(
    () => props.expanded,
    (val) => {
        isExpanded.value = val;
    },
);

const q = ref(props.q);
const { status, data } = await useFetch(props.endpoint.url, { query: { q: q }, lazy: true });

// toggle to show empty results or not
const showResults = ref(props.showEmpty);
</script>

<template v-if="endpoint.isSearched && showEmpty">
    <div class="grid auto-rows-min gap-4 md:grid-cols-1">
        <div class="rounded-xl bg-muted/50 p-4 shadow hover:bg-muted transition-colors">
            <Collapsible v-model:open="isExpanded">
                <CollapsibleTrigger>
                    <div class="flex items-center gap-2 font-semibold text-lg">
                        <img :src="endpoint.icon" class="h-6 w-6 rounded-sm" />
                        <div class="font-semibold text-lg">{{ endpoint.title }}</div>
                    </div>
                </CollapsibleTrigger>
                <CollapsibleContent>
                    <div
                        v-if="status === 'pending'"
                        class="aspect-video h-32 md:h-32 lg:h-54 w-full rounded-xl bg-muted/50"
                    />
                    <SearchResultsTable :data="data" v-else></SearchResultsTable>
                </CollapsibleContent>
            </Collapsible>
        </div>
    </div>
</template>
