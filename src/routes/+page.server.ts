import type { PageServerLoad } from './$types';
import { apiFetch, type SvelteFetch } from '$lib/utils';
import { error as handleError } from '@sveltejs/kit';

export const load: PageServerLoad = async ({ fetch, isDataRequest }) => {
	const page = getPageData(fetch);

	// This little trick makes the page wait for the API on first load, or show spinners
	// on subsequent loads. See the {await} block in +page.svelte
	return { page: isDataRequest ? page : await page };
};

const getPageData = async (fetch: SvelteFetch) => {
	const { data, error } = await apiFetch<any>({
		path: '/fact',
		svelteFetch: fetch,
		baseUrl: 'https://catfact.ninja'
	});

	if (error) {
		handleError(error.status, { message: error.message });
	} else if (data) {
		return mapHomePageData(data);
	} else {
		handleError(500, { message: 'No page data received' });
	}
};

const mapHomePageData = async (data: any) => {
	return { fact: data.fact };
};
