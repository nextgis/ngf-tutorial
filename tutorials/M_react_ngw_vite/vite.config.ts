import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig({
  root: "src",
  plugins: [react()],
  server: {
    port: 8080,
    strictPort: true,
    host: "0.0.0.0",
  },
  build: {
    outDir: "../dist",
    emptyOutDir: true,
    sourcemap: true,
    target: "es2022",
  },
});
