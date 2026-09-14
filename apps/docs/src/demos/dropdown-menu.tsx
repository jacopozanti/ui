import {
	Button,
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuShortcut,
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
				</DropdownMenuGroup>
				<DropdownMenuSeparator />
				<DropdownMenuItem variant="destructive">Sign out</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
