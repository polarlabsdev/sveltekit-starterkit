import type { PageServerLoad } from './$types';
import { SECRET_TEST_KEY } from '$env/static/private';

export const load: PageServerLoad = async () => {
	console.log(SECRET_TEST_KEY);

	return {
		page: {
			title: "Look at me I'm Mr. Header-seeks!"
		}
	};
};
