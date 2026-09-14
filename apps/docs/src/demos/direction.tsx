import { Button, ButtonGroup, DirectionProvider, Input } from "@jacopozanti/ui";

export default function Demo() {
	// Every component reads the direction from context: flip it and the layout,
	// the icons and the logical paddings follow.
	return (
		<DirectionProvider direction="rtl">
			<div dir="rtl" className="flex w-full max-w-sm flex-col gap-3">
				<Input placeholder="بحث…" />
				<ButtonGroup>
					<Button variant="outline">واحد</Button>
					<Button variant="outline">اثنان</Button>
				</ButtonGroup>
			</div>
		</DirectionProvider>
	);
}
