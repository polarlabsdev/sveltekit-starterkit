<script lang="ts">
	import CenterPage from './CenterPage.svelte';

	export let message: string = 'Error loading page, please refresh and try again';
	export let icon: string = 'ri-error-warning-fill';
</script>

<CenterPage>
	<i class="{icon} icon-xl text-tertiary"></i>
	<h3>{message}</h3>
</CenterPage>
