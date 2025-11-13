import adapter from '@sveltejs/adapter-node';
import { sveltePreprocess } from 'svelte-preprocess';

const ignoredWarningKeywords = ['a11y_', 'css_unused_selector', 'many-dependencies'];

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://kit.svelte.dev/docs/integrations#preprocessors
	// for more information about preprocessors
	preprocess: sveltePreprocess({
		postcss: true
	}),

	onwarn: (warning, handler) => {
		// suppress warnings on `vite dev` and `vite build`; but even without this, things still work
		for (const keyword of ignoredWarningKeywords) {
			if (warning.code.includes(keyword)) return;
		}

		handler(warning);
	},

	kit: {
		adapter: adapter()
	}
};

export default config;
