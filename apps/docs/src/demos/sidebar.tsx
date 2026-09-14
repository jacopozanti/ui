import {
	Sidebar,
	SidebarContent,
	SidebarGroup,
	SidebarGroupContent,
	SidebarGroupLabel,
	SidebarInset,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
	SidebarProvider,
	SidebarTrigger,
} from "@jacopozanti/ui";
import { ComponentIcon, HomeIcon, PaletteIcon } from "lucide-react";

const items = [
	{ title: "Overview", icon: HomeIcon },
	{ title: "Components", icon: ComponentIcon },
	{ title: "Tokens", icon: PaletteIcon },
];

export default function Demo() {
	return (
		// Scoped to the preview box rather than the page: the sidebar is normally
		// a full-height app shell.
		<div className="relative h-72 w-full overflow-hidden rounded-lg border">
			<SidebarProvider className="min-h-full">
				<Sidebar className="absolute">
					<SidebarContent>
						<SidebarGroup>
							<SidebarGroupLabel>Docs</SidebarGroupLabel>
							<SidebarGroupContent>
								<SidebarMenu>
									{items.map((item) => (
										<SidebarMenuItem key={item.title}>
											<SidebarMenuButton>
												<item.icon />
												<span>{item.title}</span>
											</SidebarMenuButton>
										</SidebarMenuItem>
									))}
								</SidebarMenu>
							</SidebarGroupContent>
						</SidebarGroup>
					</SidebarContent>
				</Sidebar>
				<SidebarInset className="p-3">
					<SidebarTrigger />
				</SidebarInset>
			</SidebarProvider>
		</div>
	);
}
