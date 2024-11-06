import type { BlogPostType, TagType } from '$lib/types/blog';
import hljs from 'highlight.js/lib/core';
import dockerfile from 'highlight.js/lib/languages/dockerfile';
import json from 'highlight.js/lib/languages/json';
import python from 'highlight.js/lib/languages/python';
import css from 'highlight.js/lib/languages/css';
import scss from 'highlight.js/lib/languages/scss';
import bash from 'highlight.js/lib/languages/bash';
import typescript from 'highlight.js/lib/languages/typescript';
import javascript from 'highlight.js/lib/languages/javascript';
import yaml from 'highlight.js/lib/languages/yaml';
import dart from 'highlight.js/lib/languages/dart';

export const initCodeStyling = () => {
	hljs.registerLanguage('dockerfile', dockerfile);
	hljs.registerLanguage('json', json);
	hljs.registerLanguage('python', python);
	hljs.registerLanguage('css', css);
	hljs.registerLanguage('scss', scss);
	hljs.registerLanguage('bash', bash);
	hljs.registerLanguage('typescript', typescript);
	hljs.registerLanguage('javascript', javascript);
	hljs.registerLanguage('yaml', yaml);
	hljs.registerLanguage('dart', dart);

	hljs.highlightAll();
};

// we haven't typed API responses in full at this point, so any it is
export const mapTags = (tagsResponse: any[]): TagType[] => {
	return tagsResponse.map((tag: any) => {
		return {
			name: tag.name,
			slug: tag.slug,
			color: tag.color
		};
	});
};

export const mapPostsList = (postsResponse: any[]): BlogPostType[] => {
	return postsResponse.map((post: any) => {
		return {
			title: post.name,
			summary: post.summary,
			image: {
				src: post.thumbnail,
				alt: `Polar Labs - ${post.name}`
			},
			tags: mapTags(post.tags),
			readTime: post.read_time,
			slug: post.slug,
			publishDate: new Date(post.created)
		};
	});
};
