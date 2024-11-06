import type { RO_Sitemap } from 'sveltekit-sitemap';

export const sitemap = (<const>{
   "/": false
}) satisfies RO_Sitemap

export type Sitemap = typeof sitemap
