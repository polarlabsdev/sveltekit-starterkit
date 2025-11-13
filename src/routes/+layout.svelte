<script lang="ts">
	import 'remixicon/fonts/remixicon.css';

	let { children } = $props();
</script>

<main>
	{@render children()}
</main>

<style lang="scss" global>
	// Even though in most cases we use the CSS module paradigm, we still need to use global styles for some things
	// for when HTML comes back from the rich text editor on the API side. Some things are also just used by
	// every single portion of the site so it makes sense to have them here.
	@use 'base/normalize';
	@use 'ui/typography';
	@use 'layout/common';
</style>
