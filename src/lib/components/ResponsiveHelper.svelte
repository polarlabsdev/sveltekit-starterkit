<script lang="ts">
	let pageWidth = $state(0);
	let htmlElem: HTMLElement | undefined = $state();

	$effect(() => {
		htmlElem = document.getElementsByTagName('html')[0];
	});

	// make sure these match your scss variables!
	let pageSize = $derived.by(() => {
		if (pageWidth >= 2500) {
			return 'xxl-screen';
		} else if (pageWidth >= 1920) {
			return 'xl-screen';
		} else if (pageWidth >= 1600) {
			return 'lg-screen';
		} else if (pageWidth >= 1150) {
			return 'md-screen';
		} else if (pageWidth >= 768) {
			return 'sm-screen';
		} else if (pageWidth >= 400) {
			return 'xs-screen';
		} else {
			return 'xxs-screen';
		}
	});

	let htmlFontSize = $derived.by(() => {
		if (htmlElem && pageWidth) {
			return getComputedStyle(htmlElem).getPropertyValue('font-size');
		}
	});
</script>

<svelte:window bind:innerWidth={pageWidth} />

<p class="lg-text">{pageWidth} - {pageSize} - REM multiplier: {htmlFontSize}</p>
