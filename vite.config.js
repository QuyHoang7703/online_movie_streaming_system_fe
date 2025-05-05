/* eslint-disable no-undef */
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
      "@components": path.resolve(__dirname, "src/components"),
      "@libs": path.resolve(__dirname, "src/libs"),
      "@pages": path.resolve(__dirname, "src/pages"),
      "@hooks": path.resolve(__dirname, "src/hooks"),
      "@context": path.resolve(__dirname, "src/context"),
      "@configs": path.resolve(__dirname, "src/configs"),
      "@routes": path.resolve(__dirname, "src/routes"),
      "@redux": path.resolve(__dirname, "src/redux"),
      "@service": path.resolve(__dirname, "src/service"),
      "@consts": path.resolve(__dirname, "src/consts"),
      "@styles": path.resolve(__dirname, "src/styles"),
      "@configuration": path.resolve(__dirname, "src/configuration"),
    },
  },
});
