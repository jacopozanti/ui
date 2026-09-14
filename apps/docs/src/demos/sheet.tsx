import {
	Button,
	Sheet,
	SheetContent,
	SheetDescription,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
} from "@jacopozanti/ui";

export default function Demo() {
	return (
		<Sheet>
			<SheetTrigger render={<Button variant="outline" />}>Open sheet</SheetTrigger>
			<SheetContent>
				<SheetHeader>
					<SheetTitle>Settings</SheetTitle>
					<SheetDescription>Changes apply to this project only.</SheetDescription>
				</SheetHeader>
			</SheetContent>
		</Sheet>
	);
}
