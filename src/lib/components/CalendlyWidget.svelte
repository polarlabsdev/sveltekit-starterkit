<script lang="ts">
	import { browser } from '$app/environment';
	import { env } from '$env/dynamic/public';
</script>

<div
	class="calendly-inline-widget shadow"
	data-url={`${env.PUBLIC_CALENDLY_URL}&hide_event_type_details=1`}
></div>

{#if browser}
	<script
		type="text/javascript"
		src="https://assets.calendly.com/assets/external/widget.js"
		async
	></script>
{/if}

<style lang="scss">
	.calendly-inline-widget {
		min-width: 290px;
		height: 600px;
		border-radius: variables.$global-border-radius;
		overflow: hidden;

		@media screen and (min-width: variables.$xl-screen) {
			height: 720px;
			box-shadow: none !important;
		}
	}
</style>
