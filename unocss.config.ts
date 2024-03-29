import {
    defineConfig,
    presetAttributify,
    presetIcons,
    presetTypography,
    presetUno,
    presetWebFonts,
    transformerDirectives,
    transformerVariantGroup,
} from "unocss";

export default defineConfig({
    shortcuts: [
        ["btn", "px-4 py-1 rounded inline-block bg-white text-black cursor-pointer disabled:cursor-default disabled:bg-gray-600 disabled:opacity-50"],
    ],
    theme: {
        colors: {
            primaryRed: "#BA4949",
            primaryCyan: "#38858A",
            primaryBlue: "#397097",
        },
    },
    presets: [
        presetUno(),
        presetAttributify(),
        presetIcons({
            scale: 1.2,
            warn: true,
        }),
        presetTypography(),
        presetWebFonts({
            fonts: {
                sans: "DM Sans",
                serif: "DM Serif Display",
                mono: "DM Mono",
            },
        }),
    ],
    transformers: [
        transformerDirectives(),
        transformerVariantGroup(),
    ],
    safelist: "prose prose-sm m-auto text-left".split(" "),
});
