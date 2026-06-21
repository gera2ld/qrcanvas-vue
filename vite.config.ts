import { defineConfig } from "vite";

export default defineConfig({
  build: {
    lib: {
      entry: "src/index.ts",
      name: "qrcanvas.vue",
      formats: ["cjs", "es", "iife"],
      fileName: (format) => {
        if (format === "es") return "qrcanvas-vue.esm.js";
        if (format === "cjs") return "qrcanvas-vue.common.js";
        return "qrcanvas-vue.js";
      },
    },
    rollupOptions: {
      external: ["vue", "qrcanvas"],
      output: {
        globals: {
          vue: "Vue",
          qrcanvas: "qrcanvas",
        },
      },
    },
  },
});
