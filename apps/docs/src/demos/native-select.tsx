import { NativeSelect, NativeSelectOption } from "@jacopozanti/ui";

export default function Demo() {
	return (
		<NativeSelect className="w-[220px]" defaultValue="neutral">
			<NativeSelectOption value="neutral">Neutral</NativeSelectOption>
			<NativeSelectOption value="zinc">Zinc</NativeSelectOption>
			<NativeSelectOption value="stone">Stone</NativeSelectOption>
		</NativeSelect>
	);
}
