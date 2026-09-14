import {
	Button,
	Collapsible,
	CollapsibleContent,
	CollapsibleTrigger,
} from "@jacopozanti/ui";

export default function Demo() {
	return (
		<Collapsible className="w-full max-w-md">
			<CollapsibleTrigger render={<Button variant="outline" size="sm" />}>
				Toggle details
			</CollapsibleTrigger>
			<CollapsibleContent className="pt-2 text-sm text-muted-foreground">
				Hidden until you ask for it.
			</CollapsibleContent>
		</Collapsible>
	);
}
