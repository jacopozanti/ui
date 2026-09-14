import {
	Combobox,
	ComboboxContent,
	ComboboxEmpty,
	ComboboxInput,
	ComboboxItem,
	ComboboxList,
} from "@jacopozanti/ui";

const bases = ["Base UI", "Radix", "React Aria", "Ark UI", "Headless UI"];

export default function Demo() {
	return (
		<Combobox items={bases}>
			<ComboboxInput placeholder="Pick a primitive library…" className="max-w-sm" />
			<ComboboxContent>
				<ComboboxEmpty>No library found.</ComboboxEmpty>
				<ComboboxList>
					{(item: string) => (
						<ComboboxItem key={item} value={item}>
							{item}
						</ComboboxItem>
					)}
				</ComboboxList>
			</ComboboxContent>
		</Combobox>
	);
}
