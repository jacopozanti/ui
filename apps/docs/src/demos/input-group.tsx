import {
	InputGroup,
	InputGroupAddon,
	InputGroupInput,
	InputGroupText,
} from "@jacopozanti/ui";
import { SearchIcon } from "lucide-react";

export default function Demo() {
	return (
		<div className="flex w-full max-w-sm flex-col gap-3">
			<InputGroup>
				<InputGroupAddon>
					<SearchIcon />
				</InputGroupAddon>
				<InputGroupInput placeholder="Search components…" />
			</InputGroup>
			<InputGroup>
				<InputGroupInput placeholder="jz" />
				<InputGroupAddon align="inline-end">
					<InputGroupText>.land</InputGroupText>
				</InputGroupAddon>
			</InputGroup>
		</div>
	);
}
