import {
	ContextMenu,
	ContextMenuContent,
	ContextMenuItem,
	ContextMenuSeparator,
	ContextMenuTrigger,
} from "@jacopozanti/ui";

export default function Demo() {
	return (
		<ContextMenu>
			<ContextMenuTrigger className="flex h-28 w-full max-w-sm items-center justify-center rounded-lg border border-dashed text-sm text-muted-foreground">
				Right-click here
			</ContextMenuTrigger>
			<ContextMenuContent className="w-44">
				<ContextMenuItem>Back</ContextMenuItem>
				<ContextMenuItem>Reload</ContextMenuItem>
				<ContextMenuSeparator />
				<ContextMenuItem variant="destructive">Delete</ContextMenuItem>
			</ContextMenuContent>
		</ContextMenu>
	);
}
