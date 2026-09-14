import { CheckIcon, CopyIcon } from "lucide-react";
import { useState } from "react";

/**
 * Pre-highlighted markup from the generator. The source is passed separately
 * because the copy button needs the text, not the HTML.
 */
export function CodeBlock({
	html,
	source,
	className = "",
}: {
	html: string;
	source?: string;
	className?: string;
}) {
	const [copied, setCopied] = useState(false);

	return (
		<div className={`group relative overflow-hidden rounded-lg border ${className}`}>
			{source && (
				<button
					type="button"
					aria-label={copied ? "Copied" : "Copy code"}
					onClick={() => {
						navigator.clipboard.writeText(source);
						setCopied(true);
						setTimeout(() => setCopied(false), 1500);
					}}
					className="absolute top-2 right-2 z-10 rounded-md border bg-background/80 p-1.5 text-muted-foreground opacity-0 backdrop-blur transition group-hover:opacity-100 hover:text-foreground focus-visible:opacity-100"
				>
					{copied ? <CheckIcon className="size-3.5" /> : <CopyIcon className="size-3.5" />}
				</button>
			)}
			{/* The HTML is Shiki's, produced at build time from files in this repo. */}
			<div dangerouslySetInnerHTML={{ __html: html }} />
		</div>
	);
}
