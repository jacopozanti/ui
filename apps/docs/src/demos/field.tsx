import {
	Field,
	FieldDescription,
	FieldLabel,
	Input,
} from "@jacopozanti/ui";

export default function Demo() {
	return (
		<Field className="w-full max-w-sm">
			<FieldLabel htmlFor="package">Package name</FieldLabel>
			<Input id="package" defaultValue="@jacopozanti/ui" />
			<FieldDescription>Scoped packages need a public access flag.</FieldDescription>
		</Field>
	);
}
