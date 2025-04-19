<script setup lang="ts">
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
const config = useRuntimeConfig();

const { user, loggedIn } = useUserSession();
</script>

<template>
    <div class="w-full h-screen flex items-center justify-center">
        <Card class="mx-auto max-w-sm">
            <CardHeader>
                <CardTitle class="text-2xl"> Login </CardTitle>
                <CardDescription> Use Authentication Provider </CardDescription>
            </CardHeader>
            <CardContent>
                <div class="grid gap-4">
                    <Button variant="outline" class="w-full"
                        ><a :href="`/auth/${config.public.use_oauth_provider_name}`">
                            Login with {{ config.public.use_oauth_provider_name }}
                        </a></Button
                    >
                </div>
            </CardContent>
        </Card>
    </div>
</template>
