<script lang="ts" setup>
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const props = defineProps<{
    showEmpty: boolean;
}>();
</script>

<template>
    <DropdownMenu>
        <DropdownMenuTrigger as-child>
            <Button variant="outline"> View </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent class="w-56">
            <DropdownMenuLabel>View</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem @click="$emit('toggleSearchResults')">
                <span>Collaps all</span>
            </DropdownMenuItem>
            <DropdownMenuItem @click="$emit('toggleSearchResultsShowEmpty')">
                <span v-if="props.showEmpty">Hide Empty</span>
                <span v-else>Show Empty</span>
            </DropdownMenuItem>
        </DropdownMenuContent>
    </DropdownMenu>
</template>
