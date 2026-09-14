import {
	Button,
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@jacopozanti/ui";

export default function Demo() {
	return (
		<Card className="w-full max-w-sm">
			<CardHeader>
				<CardTitle>Deploy</CardTitle>
				<CardDescription>Ship the current branch to production.</CardDescription>
			</CardHeader>
			<CardContent className="text-sm text-muted-foreground">
				Builds run on every push. The last one finished 4 minutes ago.
			</CardContent>
			<CardFooter>
				<Button>Deploy now</Button>
			</CardFooter>
		</Card>
	);
}
