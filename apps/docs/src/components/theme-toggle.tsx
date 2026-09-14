import { MoonIcon, SunIcon } from "lucide-react";
import { useEffect, useState } from "react";

/**
 * Flips the `dark` class the library's `@custom-variant dark` keys off, and
 * remembers the choice. The initial class is set by an inline script in the
 * document head (see __root.tsx) so there is no flash before hydration; this
 * component only reads back what that script decided.
 */
export function ThemeToggle() {
	const [dark, setDark] = useState(false);

	useEffect(() => {
		setDark(document.documentElement.classList.contains("dark"));
	}, []);

	function toggle() {
		const next = !dark;
		setDark(next);
		document.documentElement.classList.toggle("dark", next);
		try {
			localStorage.setItem("theme", next ? "dark" : "light");
		} catch {
			// Private mode, or storage disabled: the toggle still works for this
			// page, it just will not be remembered.
		}
	}

	return (
		<button
			type="button"
			onClick={toggle}
			aria-label="Toggle dark mode"
			className="inline-flex size-8 items-center justify-center rounded-md border text-muted-foreground transition hover:bg-muted hover:text-foreground"
		>
			<SunIcon className="size-4 dark:hidden" />
			<MoonIcon className="hidden size-4 dark:block" />
		</button>
	);
}
