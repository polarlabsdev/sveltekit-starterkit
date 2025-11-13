<script lang="ts">
	import CenterPage from './CenterPage.svelte';

	type ErrorFullScreenProps = {
		message?: string;
		icon?: string;
	};

	let {
		message = 'Error loading page, please refresh and try again',
		icon = 'ri-error-warning-fill'
	}: ErrorFullScreenProps = $props();
</script>

<CenterPage>
	<i class="{icon} icon-xl text-tertiary"></i>
	<h3>{message}</h3>
</CenterPage>
