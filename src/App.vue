<script setup lang="ts">
    useHead({
        title: "Pomodoro",
        meta: [
            { name: "description", content: "A simple Pomodoro Timer app that works on a desktop & mobile browser. Pomodoro App will help you manage your time and let you focus on any tasks such as study, writing, or coding." },
        ],
        link: [
            {
                rel: "icon",
                type: "image/svg+xml",
                href: computed(() => preferredDark.value ? "/favicon-dark.svg" : "/favicon.svg"),
            },
        ],
    });
</script>

<template>
    <RouterView />
</template>
