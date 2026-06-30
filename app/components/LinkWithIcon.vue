<template>
    <a
        :href="to"
        :target="target"
        rel="noopener noreferrer"
        class="inline-flex items-center gap-2 px-3 py-1.5 text-sm border border-gray-300 rounded-lg hover:bg-gray-100 transition-colors"
    >
        <component :is="icon" class="w-4 h-4" />
        <span>{{ label }}</span>
    </a>
</template>

<script setup lang="ts">
import type { Component } from "vue";

defineProps<{
    to: string;
    label: string;
    icon: Component;
    target?: "_blank" | "_self";
}>();
</script>
