import { defineConfig } from "vite"
import react from "@vitejs/plugin-react-swc"
import framer from "vite-plugin-framer"
import mkcert from "vite-plugin-mkcert"

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react(), framer(), mkcert()],
    build: {
        target: "es2015",
        outDir: "dist",
        lib: {
            entry: "src/main.tsx",
            formats: ["es"]
        }
    },
    server: {
        https: true,
        port: 5173,
        host: true,
        cors: true,
        headers: {
            "Access-Control-Allow-Origin": "*"
        }
    }
})
