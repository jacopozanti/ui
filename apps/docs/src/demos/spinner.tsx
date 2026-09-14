import { Button, Spinner } from "@jacopozanti/ui";

export default function Demo() {
	return (
		<div className="flex items-center gap-4">
			<Spinner />
			<Button disabled>
				<Spinner />
				Saving…
			</Button>
		</div>
	);
}
