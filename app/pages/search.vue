<script setup lang="ts">
import { useRoute } from "vue-router";
import AppSidebar from "@/components/AppSidebar.vue";
import ThemeToggle from "@/components/ThemeToggle.vue";
import Search from "@/components/search/Search.vue";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";

definePageMeta({
    middleware: ["authenticated"],
});

const route = useRoute();
const q = computed(() => {
    return route.query.q;
});
const endpoints = computed(() => {
    const m = route.query.m;
    return Array.isArray(m) ? m : m ? [m] : [];
});
</script>

<template>
    <SidebarProvider>
        <AppSidebar />
        <SidebarInset>
            <header
                class="flex h-16 shrink-0 items-center justify-between gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12"
            >
                <div class="flex items-center gap-2 px-4">
                    <SidebarTrigger class="-ml-1" />
                    <Separator orientation="vertical" class="mr-2 h-4" />
                    <Breadcrumb>
                        <BreadcrumbList>
                            <BreadcrumbItem class="hidden md:block">
                                <BreadcrumbLink href="/"> Home </BreadcrumbLink>
                            </BreadcrumbItem>
                            <BreadcrumbSeparator class="hidden md:block" />
                            <BreadcrumbItem>
                                <BreadcrumbPage>Search</BreadcrumbPage>
                            </BreadcrumbItem>
                        </BreadcrumbList>
                    </Breadcrumb>
                </div>
                <div class="flex items-center gap-2 px-4">
                    <ThemeToggle></ThemeToggle>
                </div>
            </header>
            <Search :q="q" :endpoints="endpoints"></Search>
        </SidebarInset>
    </SidebarProvider>
</template>
