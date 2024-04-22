import type { PageServerLoad } from './$types';
import { env } from '$env/dynamic/private';

export const load: PageServerLoad = async () => {
	console.log(env.SECRET_TEST_KEY);

	return {
		page: {
			title: "Look at me I'm Mr. Header-seeks!"
		}
	};
};
