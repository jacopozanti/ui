import { Input } from "@jacopozanti/ui";

export default function Demo() {
	return (
		<div className="flex w-full max-w-sm flex-col gap-3">
			<Input placeholder="Email" type="email" />
			<Input placeholder="Disabled" disabled />
		</div>
	);
}
