<script setup lang="ts">
    import { Tab, TabGroup, TabList, TabPanel, TabPanels } from "@headlessui/vue";
    import { useSettings } from "~/stores/settings";

    const store = useSettings();

    const activeTab = ref<0 | 1 | 2>(0);
    const currentPomodoro = ref<number>(0);
    const isRunning = ref<boolean>(false);

    function onTimerEnd(name: "pomodoro" | "short-break" | "long-break"): void {
        if (!name)
            return;

        if (name !== "pomodoro") {
            activeTab.value = 0;
            return;
        }

        currentPomodoro.value++;
        activeTab.value = currentPomodoro.value && currentPomodoro.value % store.longBreakInterval === 0 ? 2 : 1;
    }

    function LongBreakInterval(value: any) {
        store.longBreakInterval = Number(value);
    }

    function started(val: boolean): void {
        isRunning.value = val;
    }

    defineOptions({
        name: "IndexPage",
    });
</script>

<template>
    <main h-screen flex justify-center text-center text-white duration-800 ease :class="[activeTab === 0 ? 'bg-primary-red' : activeTab === 1 ? 'bg-primary-cyan' : 'bg-primary-blue']">
        <div mx-auto max-w-xl w-full space-y-9 mt-3>
            <header>
                <AppNav>
                    <template #modal>
                        <AppModal @long-break-interval="LongBreakInterval" />
                    </template>
                </AppNav>
            </header>
            <div mx-auto max-w-lg w-full space-y-5 px-2>
                <div rounded-lg class="bg-white/10" p-10 w-full mx-auto shadow-lg relative>
                    <h1 duration-200 font-bold text-2xl md:text-3xl absolute class="left-1/2 -translate-1/2 text-gray-200/80" mt-5 :class="[isRunning ? 'opacity-100 visible' : 'opacity-0 invisible']">
                        {{ ['Pomodoro', 'Short Break', 'Long Break'][activeTab] }}
                    </h1>
                    <TabGroup :selected-index="activeTab">
                        <TabList font-semibold flex items-center space-x-7 text-base justify-center duration-200 :class="[!isRunning ? 'visible' : 'opacity-0 invisible']">
                            <Tab v-slot="{ selected }" as="template">
                                <button
                                    rounded px-4 py-2 text-white active:translate-y-1
                                    :class="{ 'bg-gray-600/50 font-bold': selected, '': !selected }" @click="activeTab = 0"
                                >
                                    Pomo<span sm:inline-block hidden>doro</span>
                                </button>
                            </Tab>
                            <Tab v-slot="{ selected }" as="template">
                                <button
                                    rounded px-4 py-2 text-white active:translate-y-1
                                    :class="{ 'bg-gray-600/50 font-bold': selected, '': !selected }" @click="activeTab = 1"
                                >
                                    Short <span sm:inline-block hidden>break</span>
                                </button>
                            </Tab>
                            <Tab v-slot="{ selected }" as="template">
                                <button
                                    rounded px-4 py-2 text-white active:translate-y-1
                                    :class="{ 'bg-gray-600/50 font-bold': selected, '': !selected }" @click="activeTab = 2"
                                >
                                    Long <span sm:inline-block hidden>break</span>
                                </button>
                            </Tab>
                        </TabList>
                        <TabPanels mt-5>
                            <TabPanel>
                                <AppTimer :time="store.pomodoro" :auto-start-pomodoros="store.autoStartPomodoros" @end="onTimerEnd('pomodoro')" @started="started" />
                            </TabPanel>
                            <TabPanel>
                                <AppTimer :time="store.shortBreak" :auto-start-breaks="store.autoStartBreaks" @end="onTimerEnd('short-break')" @started="started">
                                    <button text-3xl md:text-4xl text-white absolute right-2 md:right-9 @click="onTimerEnd('short-break')">
                                        <font-awesome-icon icon="fa-solid fa-forward-step" text-white />
                                    </button>
                                </AppTimer>
                            </TabPanel>
                            <TabPanel>
                                <AppTimer :time="store.longBreak" :auto-start-breaks="store.autoStartBreaks" @end="onTimerEnd('long-break')" @started="started">
                                    <button text-3xl md:text-4xl text-white absolute right-2 md:right-9 @click="onTimerEnd('long-break')">
                                        <font-awesome-icon icon="fa-solid fa-forward-step" text-white />
                                    </button>
                                </AppTimer>
                            </TabPanel>
                        </TabPanels>
                    </TabGroup>
                </div>
            </div>
        </div>
    </main>
</template>

<route lang="yaml">
meta:
  layout: home
</route>
