<script lang="ts" setup>
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const props = defineProps<{
    endpoints: {
        title: string;
        url: string;
        icon: string;
        selected: boolean;
        isActive?: boolean;
    }[];
}>();

const allSelected = computed(() => props.endpoints.length > 0 && props.endpoints.every((endpoint) => endpoint.selected));

function toggleAll() {
    const selected = !allSelected.value;
    props.endpoints.forEach((endpoint) => {
        endpoint.selected = selected;
    });
}
</script>

<template>
    <DropdownMenu>
        <DropdownMenuTrigger as-child>
            <Button variant="outline"> Apps </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent class="w-56">
            <DropdownMenuLabel>Apps</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem @click="toggleAll">
                {{ allSelected ? "Unselect all" : "Select all" }}
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuCheckboxItem
                v-for="endpoint in endpoints"
                :key="endpoint.title"
                v-model:model-value="endpoint.selected"
                @select="
                    (event) => {
                        event.preventDefault();
                    }
                "
            >
                <div class="flex items-center gap-2">
                    <img :src="endpoint.icon" class="h-6 w-6 rounded-sm" />
                    <div class="text-sm">{{ endpoint.title }}</div>
                </div>
            </DropdownMenuCheckboxItem>
        </DropdownMenuContent>
    </DropdownMenu>
</template>
