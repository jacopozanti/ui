import { fileURLToPath } from "node:url";
import { defineConfig } from "vitest/config";

export default defineConfig({
	// Vite does not read tsconfig `paths`, so the "@/..." imports the shadcn CLI
	// writes have to be mapped here too.
	resolve: {
		alias: {
			"@": fileURLToPath(new URL("./src", import.meta.url)),
		},
	},
	test: {
		environment: "jsdom",
		setupFiles: ["./tests/setup.ts"],
		include: ["tests/**/*.test.tsx", "tests/**/*.test.ts"],
	},
});
