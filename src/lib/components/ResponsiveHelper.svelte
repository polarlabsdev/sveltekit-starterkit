<script lang="ts">
	import { onMount } from 'svelte';

	let pageWidth!: number;
	let pageSize: string = 'xxs-screen';
	let htmlElem: HTMLElement;
	let htmlFontSize: CSSStyleValue | undefined;

	onMount(() => {
		htmlElem = document.getElementsByTagName('html')[0];
	});

	// make sure these match your scss variables!
	$: {
		if (pageWidth >= 2500) {
			pageSize = 'xxl-screen';
		} else if (pageWidth >= 1920) {
			pageSize = 'xl-screen';
		} else if (pageWidth >= 1600) {
			pageSize = 'lg-screen';
		} else if (pageWidth >= 1150) {
			pageSize = 'md-screen';
		} else if (pageWidth >= 768) {
			pageSize = 'sm-screen';
		} else if (pageWidth >= 400) {
			pageSize = 'xs-screen';
		} else {
			pageSize = 'xxs-screen';
		}
	}

	$: {
		if (htmlElem && pageWidth) {
			htmlFontSize = htmlElem.computedStyleMap().get('font-size');
		}
	}
</script>

<svelte:window bind:innerWidth={pageWidth} />

<p class="lg-text">{pageWidth} - {pageSize} - REM multiplier: {htmlFontSize}</p>
