import { sequence } from '@sveltejs/kit/hooks';
import * as Sentry from '@sentry/sveltekit';
import type { Handle } from '@sveltejs/kit';
import { sitemapHook } from 'sveltekit-sitemap';
import { sitemap } from './sitemap';
// import type { BlogPostType } from '$lib/types/blog';
// import { apiFetch, getSentryOptions, type APIListBaseType } from '$lib/utils';
import { getSentryOptions } from '$lib/utils/sentry';
// import { mapPostsList } from '$lib/utils/stories';
import { env } from '$env/dynamic/private';

Sentry.init(getSentryOptions({ isBrowser: false }));

export const handle: Handle = sequence(
	Sentry.sentryHandle(),
	sitemapHook(sitemap, {
		// this is an example of how you could use a function to generate dynamic routes
		// getRoutes: async () => {
		// 	const posts = await getPosts();

		// 	return {
		// 		'/stories/[slug]': posts.map((post) => {
		// 			return {
		// 				path: `/stories/${post.slug}`,
		// 				lastMod: post.publishDate.toISOString()
		// 				// can't use this bit until the author fixes my issue: https://github.com/Joonel/sveltekit-sitemap/issues/6
		// 				// if they don't respond in the near future we'll fork the repo and fix it ourselves, looks like a 1 line change.
		// 				// image: {
		// 				// 	url: post.image.src,
		// 				// 	altText: post.image.alt
		// 				// }
		// 			};
		// 		})
		// 	};
		// },
		getRobots: async () => {
			return env.PUBLIC_ENV_NAME === 'production';
		}
	})
);

// Use in tandem with the example above:
// const getPosts = async (): Promise<BlogPostType[]> => {
// 	let posts: BlogPostType[] = [];

// 	const { data } = await apiFetch<APIListBaseType<any>>({
// 		path: '/blog/'
// 	});

// 	if (data) {
// 		posts = mapPostsList(data.results);
// 	}

// 	return posts;
// };
export const handleError = Sentry.handleErrorWithSentry();
