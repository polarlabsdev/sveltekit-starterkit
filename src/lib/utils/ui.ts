// https://www.okupter.com/blog/svelte-debounce
/* eslint-disable @typescript-eslint/no-unsafe-function-type */
export const debounce = (callback: Function, wait = 1200) => {
	let timeout: ReturnType<typeof setTimeout>;

	return (...args: any[]) => {
		clearTimeout(timeout);
		timeout = setTimeout(() => callback(...args), wait);
	};
};
