import {
	Button,
	Drawer,
	DrawerContent,
	DrawerDescription,
	DrawerHeader,
	DrawerTitle,
	DrawerTrigger,
} from "@jacopozanti/ui";

export default function Demo() {
	return (
		<Drawer>
			<DrawerTrigger render={<Button variant="outline" />}>Open drawer</DrawerTrigger>
			<DrawerContent>
				<DrawerHeader>
					<DrawerTitle>Filters</DrawerTitle>
					<DrawerDescription>Drag the handle to dismiss.</DrawerDescription>
				</DrawerHeader>
			</DrawerContent>
		</Drawer>
	);
}
