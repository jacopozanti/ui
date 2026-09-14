import {
	Button,
	Empty,
	EmptyContent,
	EmptyDescription,
	EmptyHeader,
	EmptyMedia,
	EmptyTitle,
} from "@jacopozanti/ui";
import { InboxIcon } from "lucide-react";

export default function Demo() {
	return (
		<Empty className="w-full max-w-md">
			<EmptyHeader>
				<EmptyMedia variant="icon">
					<InboxIcon />
				</EmptyMedia>
				<EmptyTitle>No deployments</EmptyTitle>
				<EmptyDescription>Push to main and one shows up here.</EmptyDescription>
			</EmptyHeader>
			<EmptyContent>
				<Button size="sm">Read the guide</Button>
			</EmptyContent>
		</Empty>
	);
}
