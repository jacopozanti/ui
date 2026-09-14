import { ScrollArea } from "@jacopozanti/ui";

export default function Demo() {
	return (
		<ScrollArea className="h-40 w-full max-w-xs rounded-md border p-3">
			<div className="flex flex-col gap-2 text-sm">
				{Array.from({ length: 20 }, (_, i) => (
					<div key={i}>Item {i + 1}</div>
				))}
			</div>
		</ScrollArea>
	);
}
