<script lang="ts">
	import DOMPurify from 'isomorphic-dompurify';
	export let htmlString: string;
</script>

<!-- eslint-disable -->
{@html DOMPurify.sanitize(htmlString)}
