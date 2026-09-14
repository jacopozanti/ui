import {
	NavigationMenu,
	NavigationMenuContent,
	NavigationMenuItem,
	NavigationMenuLink,
	NavigationMenuList,
	NavigationMenuTrigger,
} from "@jacopozanti/ui";

export default function Demo() {
	return (
		<NavigationMenu>
			<NavigationMenuList>
				<NavigationMenuItem>
					<NavigationMenuTrigger>Library</NavigationMenuTrigger>
					<NavigationMenuContent>
						<div className="flex w-64 flex-col gap-1">
							<NavigationMenuLink href="/components/button">Components</NavigationMenuLink>
							<NavigationMenuLink href="/tokens">Design tokens</NavigationMenuLink>
						</div>
					</NavigationMenuContent>
				</NavigationMenuItem>
				<NavigationMenuItem>
					<NavigationMenuLink href="https://github.com/jacopozanti/ui">
						GitHub
					</NavigationMenuLink>
				</NavigationMenuItem>
			</NavigationMenuList>
		</NavigationMenu>
	);
}
