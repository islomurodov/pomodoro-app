import { ViteSSG } from "vite-ssg";
import { setupLayouts } from "virtual:generated-layouts";
import Previewer from "virtual:vue-component-preview";
import { autoAnimatePlugin } from "@formkit/auto-animate/vue";
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { fas } from "@fortawesome/free-solid-svg-icons";
import App from "./App.vue";
import type { UserModule } from "./types";
import generatedRoutes from "~pages";

import "@unocss/reset/tailwind.css";
import "./styles/main.css";
import "uno.css";

const routes = setupLayouts(generatedRoutes);

library.add(fas);

export const createApp = ViteSSG(
    App,
    { routes, base: import.meta.env.BASE_URL },
    (ctx) => {
    // install all modules under `modules/`
        Object.values(import.meta.glob<{ install: UserModule }>("./modules/*.ts", { eager: true }))
            .forEach(i => i.install?.(ctx));
        ctx.app.use(Previewer);
        ctx.app.component("font-awesome-icon", FontAwesomeIcon);
        ctx.app.use(autoAnimatePlugin);
    },
);
