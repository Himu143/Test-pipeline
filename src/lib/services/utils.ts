import { PUBLIC_RESOURCE_ASSET_URL } from '$env/static/public';

export function assestUrl(id: string) {
	return `${PUBLIC_RESOURCE_ASSET_URL}/${id}`;
}

export function debounce<T extends (...args: any[]) => void>(fn: T, delay: number = 300) {
	let timer: ReturnType<typeof setTimeout>;

	return (...args: Parameters<T>): void => {
		clearTimeout(timer);
		timer = setTimeout(() => fn(...args), delay);
	};
}
