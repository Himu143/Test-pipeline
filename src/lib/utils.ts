import { clsx, type ClassValue } from 'clsx';
import { format } from 'date-fns';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type WithoutChild<T> = T extends { child?: any } ? Omit<T, 'child'> : T;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type WithoutChildren<T> = T extends { children?: any } ? Omit<T, 'children'> : T;
export type WithoutChildrenOrChild<T> = WithoutChildren<WithoutChild<T>>;
export type WithElementRef<T, U extends HTMLElement = HTMLElement> = T & { ref?: U | null };

export function slugify(text: string) {
	return text
		.toString()
		.toLowerCase()
		.trim()
		.replace(/\s+/g, '-') // Replace spaces with -
		.replace(/[^\w\-]+/g, '') // Remove all non-word chars
		.replace(/\-\-+/g, '-') // Replace multiple - with single -
		.replace(/^-+/, '') // Trim - from start
		.replace(/-+$/, ''); // Trim - from end
}

export function trainingBookmarkId(slug: string) {
	return `training--${slug}`;
}

export function getTrainingPropertyLocale(
	currengLang: string,
	propertyName: string,
	training: Record<string, any>
) {
	if (currengLang == 'es') {
		const trainingEs = training.translations.find((item) => item.languages_code == 'es-ES');
		if (trainingEs) {
			return trainingEs[propertyName];
		} else {
			return training[propertyName];
		}
	} else return training[propertyName];
}

export function getResourceCategoryLocale(
	currengLang: string,
	propertyName: string,
	category: Record<string, any>
) {
	if (currengLang == 'es') {
		const categoryES = category.translations.find((item) => item.languages_code == 'es-ES');
		if (categoryES) {
			return categoryES[propertyName];
		} else {
			return category[propertyName];
		}
	} else return category[propertyName];
}

export function getExtaranlResourceCategoryLocale(
	currengLang: string,
	propertyName: string,
	category: Record<string, any>
) {
	if (currengLang == 'es') {
		const categoryES = category.translations.find((item) => item.languages_code == 'es-ES');
		if (categoryES) {
			return categoryES[propertyName];
		} else {
			return category[propertyName];
		}
	} else return category[propertyName];
}

export function formatDate(dateString: string): string {
	return format(new Date(dateString), 'dd MMM, yyyy');
}

export function getNamedAvatar(name?: string | null): string {
	const safe = (name ?? '').toString().trim();
	if (!safe) return '?';

	return safe
		.split(/\s+/)
		.slice(0, 2)
		.map((word) => (word ? word.charAt(0).toUpperCase() : ''))
		.join('');
}
