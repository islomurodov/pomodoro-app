<template>
    <nav w-full flex items-center justify-between border-b class="border-gray-700/20" px-2 py-3 relative>
        <RouterLink to="/">
            <div flex items-center space-x-1 text-lg font-bold>
                <font-awesome-icon icon="fa-solid fa-circle-check" text-2xl /><span>Pomodoro App</span>
            </div>
        </RouterLink>
        <div>
            <slot name="modal" />
        </div>
        <div bg-white h-0.5 rounded absolute bottom-0 left-0 />
    </nav>
</template>
