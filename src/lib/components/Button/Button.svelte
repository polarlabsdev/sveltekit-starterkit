<script lang="ts">
	import type { MouseEventHandler } from 'svelte/elements';

	type ButtonProps = {
		buttonText: string;
		iconName?: string;
		iconOnly?: boolean;
		fullWidth?: boolean;
		fullWidthMobile?: boolean;
		buttonSize?: string;
		initialClass?: string;
		onClick?: MouseEventHandler<HTMLDivElement>;
		linkUrl?: string;
		openLinkNewTab?: boolean;
	};

	let {
		buttonText,
		iconName = '',
		iconOnly = false,
		fullWidth = false,
		fullWidthMobile = false,
		buttonSize = '',
		initialClass = '',
		onClick,
		linkUrl,
		openLinkNewTab = false
	}: ButtonProps = $props();
</script>

<a href={linkUrl} target={openLinkNewTab ? '_blank' : '_self'}>
	<div
		class="button primary {initialClass} {buttonSize}"
		class:icon-button={iconOnly}
		class:block-button={fullWidth}
		class:block-button-mobile={fullWidthMobile}
		onclick={onClick}
	>
		{#if iconName}
			<i class={iconName}></i>
		{/if}

		{#if !iconOnly}
			<span>{buttonText}</span>
		{/if}
	</div>
</a>

<style lang="scss" src="./button.scss"></style>
