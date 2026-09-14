import { Kbd, KbdGroup } from "@jacopozanti/ui";

export default function Demo() {
	return (
		<div className="flex items-center gap-4 text-sm">
			<KbdGroup>
				<Kbd>⌘</Kbd>
				<Kbd>K</Kbd>
			</KbdGroup>
			<span className="text-muted-foreground">to search</span>
		</div>
	);
}
