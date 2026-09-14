import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@jacopozanti/ui";

export default function Demo() {
	return (
		<Select>
			<SelectTrigger className="w-[220px]">
				<SelectValue placeholder="Pick a base color" />
			</SelectTrigger>
			<SelectContent>
				<SelectItem value="neutral">Neutral</SelectItem>
				<SelectItem value="zinc">Zinc</SelectItem>
				<SelectItem value="stone">Stone</SelectItem>
			</SelectContent>
		</Select>
	);
}
