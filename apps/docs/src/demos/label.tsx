import { Input, Label } from "@jacopozanti/ui";

export default function Demo() {
	return (
		<div className="flex w-full max-w-sm flex-col gap-2">
			<Label htmlFor="email">Email</Label>
			<Input id="email" placeholder="you@example.com" />
		</div>
	);
}
