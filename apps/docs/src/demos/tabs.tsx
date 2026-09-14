import { Tabs, TabsContent, TabsList, TabsTrigger } from "@jacopozanti/ui";

export default function Demo() {
	return (
		<Tabs defaultValue="preview" className="w-full max-w-md">
			<TabsList>
				<TabsTrigger value="preview">Preview</TabsTrigger>
				<TabsTrigger value="code">Code</TabsTrigger>
			</TabsList>
			<TabsContent value="preview" className="pt-3 text-sm text-muted-foreground">
				What the component looks like.
			</TabsContent>
			<TabsContent value="code" className="pt-3 text-sm text-muted-foreground">
				What it takes to get there.
			</TabsContent>
		</Tabs>
	);
}
