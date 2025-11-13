<script lang="ts">
	import DOMPurify from 'isomorphic-dompurify';

	let { htmlString } = $props();
</script>

<!-- eslint-disable -->
{@html DOMPurify.sanitize(htmlString)}
