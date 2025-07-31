export function dateToAdminString(
	date: string,
	includeTime = false
): string {
	if (!date) return '';

	const d = new Date(date);
	const month = String(d.getMonth() + 1).padStart(2, '0');
	const day = String(d.getDate()).padStart(2, '0');
	const year = String(d.getFullYear()).slice(-2);

	let formattedDate = `${month}/${day}/${year}`;

	if (includeTime) {
		let hours = d.getHours();
		const minutes = String(d.getMinutes()).padStart(2, '0');
		const ampm = hours >= 12 ? 'PM' : 'AM';
		hours = hours % 12 || 12;

		formattedDate += ` ${hours}:${minutes} ${ampm}`;
	}

	return formattedDate;
}
