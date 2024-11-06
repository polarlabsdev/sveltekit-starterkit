export type BlogPostType = {
	title: string;
	slug?: string;
	summary?: string;
	body?: string;
	image: {
		src: string;
		alt: string;
	};
	tags: TagType[];
	readTime?: string;
	publishDate: Date;
	suggestedPosts?: BlogPostType[];
};

export type TagType = {
	name: string;
	slug: string;
	color?: string;
};
