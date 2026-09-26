import {
	Button,
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuShortcut,
	DropdownMenuSub,
	DropdownMenuSubContent,
	DropdownMenuSubTrigger,
	DropdownMenuTrigger,
} from "@jacopozanti/ui";

export default function Demo() {
	return (
		<DropdownMenu>
			<DropdownMenuTrigger render={<Button variant="outline" />}>
				Open menu
			</DropdownMenuTrigger>
			<DropdownMenuContent className="w-48">
				{/* Base UI requires a group around its label: `DropdownMenuLabel` is
				    `Menu.GroupLabel`, and it throws without one. */}
				<DropdownMenuGroup>
					<DropdownMenuLabel>Account</DropdownMenuLabel>
					<DropdownMenuSeparator />
					<DropdownMenuItem>
						Profile
						<DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
					</DropdownMenuItem>
					<DropdownMenuItem>Settings</DropdownMenuItem>
					<DropdownMenuSub>
						<DropdownMenuSubTrigger>Theme</DropdownMenuSubTrigger>
						<DropdownMenuSubContent>
							<DropdownMenuItem>Light</DropdownMenuItem>
							<DropdownMenuItem>Dark</DropdownMenuItem>
							<DropdownMenuItem>System</DropdownMenuItem>
						</DropdownMenuSubContent>
					</DropdownMenuSub>
				</DropdownMenuGroup>
				<DropdownMenuSeparator />
				<DropdownMenuItem variant="destructive">Sign out</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
