import {
	Button,
	Popover,
	PopoverContent,
	PopoverDescription,
	PopoverTitle,
	PopoverTrigger,
} from "@jacopozanti/ui";

export default function Demo() {
	return (
		<Popover>
			<PopoverTrigger render={<Button variant="outline" />}>Open popover</PopoverTrigger>
			<PopoverContent className="w-72">
				<PopoverTitle>Dimensions</PopoverTitle>
				<PopoverDescription>Set the size of the preview frame.</PopoverDescription>
			</PopoverContent>
		</Popover>
	);
}
