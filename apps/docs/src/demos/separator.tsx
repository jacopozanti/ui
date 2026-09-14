import { Separator } from "@jacopozanti/ui";

export default function Demo() {
	return (
		<div className="text-sm">
			<div className="font-medium">@jacopozanti/ui</div>
			<div className="text-muted-foreground">Base UI + Tailwind</div>
			<Separator className="my-3" />
			<div className="flex h-5 items-center gap-3">
				<span>Docs</span>
				<Separator orientation="vertical" />
				<span>Source</span>
				<Separator orientation="vertical" />
				<span>npm</span>
			</div>
		</div>
	);
}
