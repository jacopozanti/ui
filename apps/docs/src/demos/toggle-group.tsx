import { ToggleGroup, ToggleGroupItem } from "@jacopozanti/ui";
import { AlignCenterIcon, AlignLeftIcon, AlignRightIcon } from "lucide-react";

export default function Demo() {
	return (
		<ToggleGroup defaultValue={["left"]}>
			<ToggleGroupItem value="left" aria-label="Align left">
				<AlignLeftIcon />
			</ToggleGroupItem>
			<ToggleGroupItem value="center" aria-label="Align center">
				<AlignCenterIcon />
			</ToggleGroupItem>
			<ToggleGroupItem value="right" aria-label="Align right">
				<AlignRightIcon />
			</ToggleGroupItem>
		</ToggleGroup>
	);
}
