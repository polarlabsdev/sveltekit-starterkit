import adapter from '@sveltejs/adapter-node';
import preprocess from 'svelte-preprocess';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';

const filePath = dirname(fileURLToPath(import.meta.url));
const sassPath = `${filePath}/src/lib/styles`;

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://kit.svelte.dev/docs/integrations#preprocessors
	// for more information about preprocessors
	preprocess: preprocess({
		scss: {
			// adding this line to our scripts makes sure our variables and
			// mixins are available in svelte page scss style tags 
			prependData: `@import '${sassPath}/partials/_variables.scss'; @import '${sassPath}/partials/_mixins.scss';`
		},
		postcss: true
	}),

	kit: {
		adapter: adapter()
	}
};

export default config;
