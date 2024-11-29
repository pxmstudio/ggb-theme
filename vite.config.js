import { defineConfig } from "vite";
import ts from "vite-plugin-ts";
import tailwindcss from "tailwindcss";
import autoprefixer from "autoprefixer";

export default defineConfig({
  css: {
    postcss: {
      plugins: [tailwindcss(), autoprefixer()],
    },
  },
  plugins: [ts()],
  build: {
    outDir: "./theme/assets",
    emptyOutDir: false,
    rollupOptions: {
      input: {
        main: "./src/main.ts",
        nav: "./src/nav.ts",
        "category-picker": "./src/category-picker.ts",
        "collections-slider": "./src/collections-slider.ts",
        swiper: "./src/swiper.ts",
        faqs: "./src/faqs.ts",
      },
      output: {
        entryFileNames: "[name].js",
        chunkFileNames: "[name].js",
        assetFileNames: "[name].[ext]",
      },
    },
  },
});
