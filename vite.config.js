import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  base: "https://sudoku.johnnysierra.com/",
  plugins: [react()],
  build: {
    outDir: "docs",
  },
});
