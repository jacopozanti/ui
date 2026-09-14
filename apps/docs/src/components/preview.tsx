import type { ComponentType } from "react";

/** The frame a live demo sits in: centred, padded, on a faint surface. */
export function Preview({ component: Demo }: { component: ComponentType }) {
	return (
		<div className="flex min-h-[220px] items-center justify-center rounded-lg border bg-preview p-8">
			<Demo />
		</div>
	);
}
