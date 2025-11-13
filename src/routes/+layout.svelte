<script lang="ts">
	import 'remixicon/fonts/remixicon.css';
	import '$lib/styles/tailwind.css';

	import { ModeWatcher } from 'mode-watcher';

	let { children } = $props();
</script>

<main>
	<ModeWatcher />
	{@render children()}
</main>
