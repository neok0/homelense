<script setup lang="ts">
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ExternalLink } from "lucide-vue-next";
defineProps<{
    data: {
        id: number;
        title: string;
        link: string;
    }[];
}>();
</script>

<template>
    <Table v-if="data.length > 0">
        <TableCaption>Total hits found {{ data.length }}</TableCaption>
        <TableHeader>
            <TableRow>
                <TableHead>Value</TableHead>
                <TableHead>Link</TableHead>
            </TableRow>
        </TableHeader>
        <TableBody>
            <TableRow v-for="item in data" :key="item.id">
                <TableCell class="whitespace-normal break-words text-sm">{{ item.title }}</TableCell>
                <TableCell
                    ><LinkWithIcon :to="item.link" target="_blank" label="View" :icon="ExternalLink"
                /></TableCell>
            </TableRow>
        </TableBody>
    </Table>
    <p v-else>No results found.</p>
</template>
