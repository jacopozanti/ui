import { Avatar, AvatarFallback, AvatarGroup, AvatarImage } from "@jacopozanti/ui";

export default function Demo() {
	return (
		<div className="flex items-center gap-6">
			<Avatar>
				<AvatarImage src="https://github.com/jacopozanti.png" alt="Jacopo Zanti" />
				<AvatarFallback>JZ</AvatarFallback>
			</Avatar>
			<AvatarGroup>
				{["JZ", "AB", "CD"].map((initials) => (
					<Avatar key={initials}>
						<AvatarFallback>{initials}</AvatarFallback>
					</Avatar>
				))}
			</AvatarGroup>
		</div>
	);
}
