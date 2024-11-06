import { sentrySvelteKit } from '@sentry/sveltekit';
import { sveltekit } from '@sveltejs/kit/vite';
import { sitemapPlugin } from 'sveltekit-sitemap';
import { defineConfig } from 'vitest/config';
import { loadEnv } from 'vite';

export default defineConfig(({ mode }) => {
	// Load env file based on `mode` in the current working directory.
	// Set the third parameter to '' to load all env regardless of the `VITE_` prefix.
	const env = loadEnv(mode, process.cwd(), '');

	return {
		plugins: [
			sentrySvelteKit({
				sourceMapsUploadOptions: {
					org: env.SENTRY_ORG,
					project: env.SENTRY_PROJECT
				}
			}),
			sveltekit(),
			sitemapPlugin()
		],
		test: {
			include: ['src/**/*.{test,spec}.{js,ts}']
		}
	};
});
