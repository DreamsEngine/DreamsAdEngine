import { defineConfig, loadEnv } from "vite";
import { resolve } from "node:path";

export default ({ mode }) => {
	process.env = { ...process.env, ...loadEnv(mode, process.cwd()) };

	return defineConfig({
		build: {
			lib: {
				entry: resolve(__dirname, "src/main.ts"),
				name: "DreamsAdEngine",
				fileName: "dreams-ad-engine",
				formats: ["es"],
			},
			rollupOptions: {
				external: [],
				output: {
					assetFileNames: "dreams-ad-engine.[ext]",
				},
			},
			cssCodeSplit: false,
			chunkSizeWarningLimit: 1000,
		},
	});
};
