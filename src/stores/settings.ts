import { acceptHMRUpdate, defineStore } from "pinia";

export const useSettings = defineStore("store", () => {
    const pomodoro = ref<number>(1500);
    const shortBreak = ref<number>(300);
    const longBreak = ref<number>(900);
    const longBreakInterval = ref<number>(4);
    const autoStartBreaks = ref<boolean>(false);
    const autoStartPomodoros = ref<boolean>(false);
    return { pomodoro, shortBreak, longBreak, longBreakInterval, autoStartBreaks, autoStartPomodoros };
});

if (import.meta.hot)
    import.meta.hot.accept(acceptHMRUpdate(useSettings, import.meta.hot));
