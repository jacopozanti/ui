import { Checkbox, Label } from "@jacopozanti/ui";

export default function Demo() {
	return (
		<div className="flex items-center gap-2">
			<Checkbox id="terms" defaultChecked />
			<Label htmlFor="terms">Accept terms and conditions</Label>
		</div>
	);
}
