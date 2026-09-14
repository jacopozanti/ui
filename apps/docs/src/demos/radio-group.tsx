import { Label, RadioGroup, RadioGroupItem } from "@jacopozanti/ui";

export default function Demo() {
	return (
		<RadioGroup defaultValue="comfortable" className="flex flex-col gap-2">
			{["default", "comfortable", "compact"].map((value) => (
				<div key={value} className="flex items-center gap-2">
					<RadioGroupItem value={value} id={value} />
					<Label htmlFor={value} className="capitalize">
						{value}
					</Label>
				</div>
			))}
		</RadioGroup>
	);
}
