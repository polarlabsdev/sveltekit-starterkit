<script lang="ts">
	import { setMode, mode } from 'mode-watcher';
	import Button from './ui/button/button.svelte';

	function handleModeChange() {
		if (mode.current === 'light') {
			setMode('dark');
		} else {
			setMode('light');
		}
	}
</script>

<Button variant="outline" size="icon" onclick={handleModeChange}>
	{#if mode.current === 'dark'}
		<i class="ri-moon-line"></i>
	{:else}
		<i class="ri-sun-line"></i>
	{/if}
	<span class="sr-only">Toggle theme</span>
</Button>
