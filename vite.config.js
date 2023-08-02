const react = require("@vitejs/plugin-react");
const { defineConfig } = require("vite");
const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = defineConfig({
  plugins: [
    react(),
  ],
  server: {
    proxy: {
      "/login.php": {
        target: "http://localhost", // Cambia la dirección a la ubicación de tu servidor Xampp
        changeOrigin: true,
        middleware: createProxyMiddleware({
          target: "http://localhost",
          changeOrigin: true,
        }),
      },
    },
  },
});
