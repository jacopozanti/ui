import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import { Button } from "@/components/ui/button";

describe("Button", () => {
	it("renders a native button carrying the slot marker", () => {
		render(<Button>Save</Button>);

		const button = screen.getByRole("button", { name: "Save" });
		expect(button.tagName).toBe("BUTTON");
		expect(button.getAttribute("data-slot")).toBe("button");
	});

	it("applies the default variant and size", () => {
		render(<Button>Save</Button>);

		const classes = screen.getByRole("button", { name: "Save" }).classList;
		expect([...classes]).toContain("bg-primary");
		expect([...classes]).toContain("h-9");
	});

	it("merges a caller class over the variant class", () => {
		// Compare whole class tokens: a substring check would match the
		// `bg-primary/80` inside `hover:bg-primary/80`, which is a different
		// utility and is meant to survive.
		render(<Button className="bg-muted">Save</Button>);

		const classes = screen.getByRole("button", { name: "Save" }).classList;
		expect([...classes]).toContain("bg-muted");
		expect([...classes]).not.toContain("bg-primary");
	});

	it("calls onClick, and stops doing so when disabled", async () => {
		const onClick = vi.fn();
		const user = userEvent.setup();
		const { rerender } = render(<Button onClick={onClick}>Save</Button>);

		await user.click(screen.getByRole("button", { name: "Save" }));
		expect(onClick).toHaveBeenCalledTimes(1);

		rerender(
			<Button disabled onClick={onClick}>
				Save
			</Button>,
		);
		await user.click(screen.getByRole("button", { name: "Save" }));
		expect(onClick).toHaveBeenCalledTimes(1);
	});
});
