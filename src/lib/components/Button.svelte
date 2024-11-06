<script lang="ts">
	import type { MouseEventHandler } from 'svelte/elements';

	export let buttonText: string;
	export let iconName: string = '';
	export let iconOnly: boolean = false;
	export let fullWidth: boolean = false;
	export let fullWidthMobile: boolean = false;
	export let buttonSize: string = '';
	export let initialClass: string = '';
	export let onClick: MouseEventHandler<HTMLDivElement> | undefined = undefined;
	export let linkUrl: string | undefined = undefined;
	export let openLinkNewTab: boolean = false;
</script>

<a href={linkUrl} target={openLinkNewTab ? '_blank' : '_self'}>
	<div
		class="button primary {initialClass} {buttonSize}"
		class:icon-button={iconOnly}
		class:block-button={fullWidth}
		class:block-button-mobile={fullWidthMobile}
		on:click={onClick}
	>
		{#if iconName}
			<i class={iconName}></i>
		{/if}

		{#if !iconOnly}
			<span>{buttonText}</span>
		{/if}
	</div>
</a>
