import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import * as ui from "@/index";
import {
	Alert,
	AlertTitle,
	Badge,
	Card,
	CardContent,
	CardHeader,
	CardTitle,
	Input,
	Label,
	Separator,
	Tabs,
	TabsList,
	TabsContent,
	TabsTrigger,
} from "@/index";

describe("package surface", () => {
	it("exports every symbol as a defined value", () => {
		// `export *` is silent when a module re-exports something that does not
		// exist, so assert the barrel actually resolves.
		const undefinedExports = Object.entries(ui)
			.filter(([, value]) => value === undefined)
			.map(([name]) => name);

		expect(undefinedExports).toEqual([]);
		expect(Object.keys(ui).length).toBeGreaterThan(200);
	});

	it("exports cn, and it merges conflicting utilities", () => {
		expect(ui.cn("p-2", "p-4")).toBe("p-4");
	});

	it("renders a representative set without a provider", () => {
		render(
			<Card>
				<CardHeader>
					<CardTitle>Profile</CardTitle>
				</CardHeader>
				<CardContent>
					<Label htmlFor="name">Name</Label>
					<Input id="name" defaultValue="Jacopo" />
					<Separator />
					<Badge>New</Badge>
					<Alert>
						<AlertTitle>Saved</AlertTitle>
					</Alert>
					<Tabs defaultValue="one">
						<TabsList>
							<TabsTrigger value="one">One</TabsTrigger>
						</TabsList>
						<TabsContent value="one">First panel</TabsContent>
					</Tabs>
				</CardContent>
			</Card>,
		);

		expect(screen.getByText("Profile")).toBeDefined();
		expect(screen.getByLabelText("Name")).toHaveProperty("value", "Jacopo");
		expect(screen.getByRole("tab", { name: "One" })).toBeDefined();
		expect(screen.getByText("First panel")).toBeDefined();
	});
});
