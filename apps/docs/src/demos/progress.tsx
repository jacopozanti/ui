import { useState } from "react";
import { Button, Progress } from "@jacopozanti/ui";

const steps = [12, 38, 62, 91, 100];

export default function Demo() {
	const [value, setValue] = useState(62);

	return (
		<div className="flex w-full max-w-sm flex-col items-center gap-4">
			<Progress value={value} className="w-full" />
			<Button
				variant="outline"
				size="sm"
				onClick={() => setValue((v) => steps[(steps.indexOf(v) + 1) % steps.length])}
			>
				Advance to {steps[(steps.indexOf(value) + 1) % steps.length]}%
			</Button>
		</div>
	);
}
