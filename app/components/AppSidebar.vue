<script setup lang="ts">
import type { SidebarProps } from "@/components/ui/sidebar";

import NavMain from "@/components/NavMain.vue";
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarRail } from "@/components/ui/sidebar";

import { Search } from "lucide-vue-next";
const { user, clear: clearSession } = useUserSession();

const props = withDefaults(defineProps<SidebarProps>(), {
    collapsible: "icon",
});
const runtimeConfig = useRuntimeConfig();
const version = runtimeConfig.public.version;

// This is sample data.
const data = {
    navMain: [
        {
            title: "Apps",
            url: "search",
            icon: Search,
            isActive: true,
            items: [],
        },
    ],
};
</script>

<template>
    <Sidebar v-bind="props">
        <SidebarHeader>
            <SidebarMenu>
                <SidebarMenuItem>
                    <SidebarMenuButton size="lg" as-child>
                        <a href="/">
                            <div class="flex aspect-square size-8 items-center justify-center rounded-lg">
                                <img src="/images/homelense.png" />
                            </div>
                            <div class="flex flex-col gap-0.5 leading-none">
                                <span class="font-semibold">Homelense</span>
                                <span class="">{{ version }}</span>
                            </div>
                        </a>
                    </SidebarMenuButton>
                </SidebarMenuItem>
            </SidebarMenu>
        </SidebarHeader>
        <SidebarContent>
            <NavMain :items="data.navMain" />
        </SidebarContent>
        <SidebarFooter>
            <NavUser />
        </SidebarFooter>
        <SidebarRail />
    </Sidebar>
</template>
