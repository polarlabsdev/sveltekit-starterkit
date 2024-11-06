import adapter from '@sveltejs/adapter-node';
import preprocess from 'svelte-preprocess';
import { dirname } from 'path';
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
			prependData: `@use 'sass:color'; @use '${sassPath}/partials/_variables.scss'; @use '${sassPath}/partials/_mixins.scss';`
		},
		postcss: true
	}),

	onwarn: (warning, handler) => {
		// suppress warnings on `vite dev` and `vite build`; but even without this, things still work
		if (warning.code === 'a11y-click-events-have-key-events') return;
		if (warning.code === 'a11y-no-static-element-interactions') return;
		if (warning.code === 'a11y-no-noninteractive-element-interactions') return;
		handler(warning);
	},

	kit: {
		adapter: adapter()
	}
};

export default config;
