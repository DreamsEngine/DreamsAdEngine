import { defineConfig, loadEnv } from "vite";
import { resolve } from "node:path";

export default ({ mode }) => {
	process.env = { ...process.env, ...loadEnv(mode, process.cwd()) };

	if (process.env.LIB_ENTRY && process.env.LIB_ENTRY !== "server") {
		throw new Error(
			`Invalid LIB_ENTRY: "${process.env.LIB_ENTRY}". Expected "server" or undefined.`,
		);
	}

	const isServerBuild = process.env.LIB_ENTRY === "server";

	return defineConfig({
		build: {
			emptyOutDir: !isServerBuild,
			lib: {
				entry: resolve(
					import.meta.dirname,
					isServerBuild ? "src/server.ts" : "src/main.ts",
				),
				fileName: isServerBuild
					? "dreams-ad-engine-server"
					: "dreams-ad-engine",
				formats: ["es"],
			},
			rollupOptions: {
				output: {
					assetFileNames: "dreams-ad-engine.[ext]",
				},
			},
			cssCodeSplit: false,
			chunkSizeWarningLimit: 1000,
		},
	});
};
