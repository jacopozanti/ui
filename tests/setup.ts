import { cleanup } from "@testing-library/react";
import { afterEach } from "vitest";

afterEach(() => {
	cleanup();
});

// ---- jsdom polyfills required by the table and Base UI ----

if (typeof window.matchMedia !== "function") {
	window.matchMedia = ((query: string) => ({
		matches: false,
		media: query,
		onchange: null,
		addListener: () => {},
		removeListener: () => {},
		addEventListener: () => {},
		removeEventListener: () => {},
		dispatchEvent: () => false,
	})) as unknown as typeof window.matchMedia;
}

if (!("ResizeObserver" in globalThis)) {
	class ResizeObserverStub {
		observe() {}
		unobserve() {}
		disconnect() {}
	}
	(globalThis as Record<string, unknown>).ResizeObserver = ResizeObserverStub;
}

if (typeof Element.prototype.scrollIntoView !== "function") {
	Element.prototype.scrollIntoView = () => {};
}
