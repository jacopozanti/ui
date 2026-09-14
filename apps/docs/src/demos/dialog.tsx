import {
	Button,
	Dialog,
	DialogClose,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@jacopozanti/ui";

export default function Demo() {
	return (
		<Dialog>
			<DialogTrigger render={<Button variant="outline" />}>Open dialog</DialogTrigger>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Publish package</DialogTitle>
					<DialogDescription>
						This runs the build and pushes a new version to npm.
					</DialogDescription>
				</DialogHeader>
				<DialogFooter>
					<DialogClose render={<Button variant="outline" />}>Cancel</DialogClose>
					<DialogClose render={<Button />}>Publish</DialogClose>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
}
