import { Button, HoverCard, HoverCardContent, HoverCardTrigger } from "@jacopozanti/ui";

export default function Demo() {
	return (
		<HoverCard>
			<HoverCardTrigger render={<Button variant="link" />}>@jacopozanti</HoverCardTrigger>
			<HoverCardContent className="w-72 text-sm">
				Builds small, opinionated libraries and documents them properly.
			</HoverCardContent>
		</HoverCard>
	);
}
