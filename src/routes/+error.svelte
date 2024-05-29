<script lang="ts">
	import { page } from '$app/stores';
	import ErrorFullScreen from '$lib/components/ErrorFullScreen.svelte';
	let message: string;
	let icon: string;
	if ($page.status == 404) {
		message = 'Page not found, please double check the URL';
		icon = 'ri-file-search-fill';
	}
</script>

<ErrorFullScreen {message} {icon} />
