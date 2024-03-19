<script lang="ts">
	import ResponsiveHelper from '$lib/components/ResponsiveHelper.svelte';
	import type { PageData } from './$types';
	import { PUBLIC_TEST_KEY } from '$env/static/public';

	export let data: PageData;
</script>

<svelte:head>
	<title>Home</title>
	<meta name="description" content="Svelte demo app" />
</svelte:head>

<section>
	<div class="margin">
		<ResponsiveHelper />

		<h1>{data.page.title}</h1>
		<h2>{data.page.title}</h2>
		<h3>{data.page.title}</h3>
		<h4>{data.page.title}</h4>
		<h5>{data.page.title}</h5>

		<blockquote>
			"This is a wonderful quote showing the value of the test public key:
			<strong>{PUBLIC_TEST_KEY}</strong>"
		</blockquote>

		<p>Some <a href="." class="bold uppercase">text</a> to demo some font sizes for paragraphs</p>
		<p class="caption text-secondary">Some text to demo some font sizes for paragraphs</p>
		<p class="footnote">Some text to demo some font sizes for paragraphs</p>

		<hr />

		<div class="row">
			<div class="col-xxs-12 col-sm-6 col-md-4 col-lg-3 col-xxl-2">
				<div class="box background-primary"></div>
			</div>

			<div class="col-xxs-12 col-sm-6 col-md-4 col-lg-3 col-xxl-2">
				<p>Some text to describe the image</p>
			</div>
		</div>
	</div>
</section>

<style lang="scss">
	.box {
		width: 100%;
		height: 5rem;
		margin: 5px 0;
		transition: all 0.3s ease;

		&:hover {
			background: $secondary;
		}
	}
</style>
