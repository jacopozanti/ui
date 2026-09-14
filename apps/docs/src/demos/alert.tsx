import { Alert, AlertDescription, AlertTitle } from "@jacopozanti/ui";
import { TriangleAlertIcon } from "lucide-react";

export default function Demo() {
	return (
		<div className="flex w-full max-w-md flex-col gap-3">
			<Alert>
				<AlertTitle>Heads up</AlertTitle>
				<AlertDescription>Your trial ends in three days.</AlertDescription>
			</Alert>
			<Alert variant="destructive">
				<TriangleAlertIcon />
				<AlertTitle>Build failed</AlertTitle>
				<AlertDescription>Two tests did not pass.</AlertDescription>
			</Alert>
		</div>
	);
}
