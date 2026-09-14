import { Button, ButtonGroup, ButtonGroupSeparator } from "@jacopozanti/ui";

export default function Demo() {
	return (
		<ButtonGroup>
			<Button variant="outline">Copy</Button>
			<ButtonGroupSeparator />
			<Button variant="outline">Paste</Button>
			<ButtonGroupSeparator />
			<Button variant="outline">Cut</Button>
		</ButtonGroup>
	);
}
