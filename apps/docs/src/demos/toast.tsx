import { Button, Toaster, useToastManager } from "@jacopozanti/ui";

function TriggerButton() {
	const manager = useToastManager();
	return (
		<Button
			variant="outline"
			onClick={() =>
				manager.add({
					title: "Published",
					description: "@jacopozanti/ui@0.1.0 is on npm.",
				})
			}
		>
			Show toast
		</Button>
	);
}

export default function Demo() {
	// The provider owns the queue; anything under it can push with the hook.
	return (
		<Toaster>
			<TriggerButton />
		</Toaster>
	);
}
