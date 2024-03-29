<script setup lang="ts">
    const router = useRouter();
    const timeoutBack = ref<number>(30);
    setInterval(() => {
        timeoutBack.value--;
        if (timeoutBack.value === 0)
            router.push("/");
    }, 1000);
</script>

<template>
    <main p="x4 y10" text="center white">
        <div text-4xl>
            <div i-carbon-warning inline-block />
        </div>
        <RouterView />
        <div>
            <button btn text-sm m="3 t8" @click="router.back()">
                Back ({{ timeoutBack }})
            </button>
        </div>
    </main>
</template>
