import { defineConfig, loadEnv } from "vite";
import { resolve } from "node:path";

// https://vitejs.dev/config/
export default ({ mode }) => {
	process.env = { ...process.env, ...loadEnv(mode, process.cwd()) };

	return defineConfig({
		base: process.env.VITE_NORA_ENV === "production" ? "./" : "./",
		build: {
			rollupOptions: {
				input: {
					main: resolve(__dirname, "index.html"),
				},
				output: {
					manualChunks: undefined,
					assetFileNames: "dreams-ad-engine.[ext]",
					entryFileNames: "dreams-ad-engine.js",
					chunkFileNames: "dreams-ad-engine.js",
				},
			},
			cssCodeSplit: false,
			chunkSizeWarningLimit: 1000,
		},
	});
};
