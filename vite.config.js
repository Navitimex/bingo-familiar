import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  //base: "/bingo-familiar/", //Cuando esto esta comentado, el proyecto solo sirve de forma local
  plugins: [react()],
});
