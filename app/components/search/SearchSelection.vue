<script lang="ts" setup>
import type { DropdownMenuCheckboxItemProps } from "reka-ui";
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

type Checked = DropdownMenuCheckboxItemProps["modelValue"];

defineProps<{
    endpoints: {
        title: string;
        url: string;
        icon: string;
        selected: boolean;
        isActive?: boolean;
    }[];
}>();
</script>

<template>
    <DropdownMenu>
        <DropdownMenuTrigger as-child>
            <Button variant="outline"> Apps </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent class="w-56">
            <DropdownMenuLabel>Apps</DropdownMenuLabel>
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
