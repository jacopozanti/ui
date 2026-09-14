import { Button, Tooltip, TooltipContent, TooltipTrigger } from "@jacopozanti/ui";

export default function Demo() {
	return (
		<Tooltip>
			<TooltipTrigger render={<Button variant="outline" />}>Hover me</TooltipTrigger>
			<TooltipContent>Published to npm 3 days ago</TooltipContent>
		</Tooltip>
	);
}
