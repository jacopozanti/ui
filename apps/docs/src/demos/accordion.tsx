import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "@jacopozanti/ui";

export default function Demo() {
	return (
		<Accordion className="w-full max-w-md">
			<AccordionItem value="what">
				<AccordionTrigger>What is this?</AccordionTrigger>
				<AccordionContent>
					A personal component library, built on Base UI and Tailwind v4.
				</AccordionContent>
			</AccordionItem>
			<AccordionItem value="why">
				<AccordionTrigger>Why a package and not a registry?</AccordionTrigger>
				<AccordionContent>
					One place to fix a bug, and every project gets the fix on update.
				</AccordionContent>
			</AccordionItem>
		</Accordion>
	);
}
