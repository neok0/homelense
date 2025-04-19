<script setup lang="ts">
const { user, loggedIn } = useUserSession();
</script>

<template>
    <div class="flex flex-1 flex-col gap-4 p-4 pt-0">
        <div class="w-full gap-1">
            <h1 class="text-2xl font-bold tracking-tight" v-if="loggedIn">Welcome back {{ user.name }}!</h1>
            <h1 class="text-2xl font-bold tracking-tight" v-else>Welcome back!</h1>
            <p class="text-muted-foreground">Select your App on the left</p>
        </div>
    </div>
</template>
