import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // GitHub Pages serves this from /3d-portfolio/; the workflow sets VITE_BASE. Elsewhere it stays "/".
  base: process.env.VITE_BASE || "/",
  
});
