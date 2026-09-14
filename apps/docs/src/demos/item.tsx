import {
	Item,
	ItemContent,
	ItemDescription,
	ItemMedia,
	ItemTitle,
} from "@jacopozanti/ui";
import { PackageIcon } from "lucide-react";

export default function Demo() {
	return (
		<Item className="w-full max-w-md" variant="outline">
			<ItemMedia>
				<PackageIcon />
			</ItemMedia>
			<ItemContent>
				<ItemTitle>@jacopozanti/ui</ItemTitle>
				<ItemDescription>49 components on Base UI.</ItemDescription>
			</ItemContent>
		</Item>
	);
}
