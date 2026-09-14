import {
	Table,
	TableBody,
	TableCaption,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@jacopozanti/ui";

const rows = [
	{ id: "INV-001", status: "Paid", total: "€250.00" },
	{ id: "INV-002", status: "Pending", total: "€150.00" },
	{ id: "INV-003", status: "Unpaid", total: "€350.00" },
];

export default function Demo() {
	return (
		<Table className="max-w-md">
			<TableCaption>Recent invoices.</TableCaption>
			<TableHeader>
				<TableRow>
					<TableHead>Invoice</TableHead>
					<TableHead>Status</TableHead>
					<TableHead className="text-right">Total</TableHead>
				</TableRow>
			</TableHeader>
			<TableBody>
				{rows.map((row) => (
					<TableRow key={row.id}>
						<TableCell className="font-medium">{row.id}</TableCell>
						<TableCell>{row.status}</TableCell>
						<TableCell className="text-right">{row.total}</TableCell>
					</TableRow>
				))}
			</TableBody>
		</Table>
	);
}
