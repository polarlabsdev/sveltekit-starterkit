<script lang="ts">
	import type { MouseEventHandler } from 'svelte/elements';
	import Button from '../Button/Button.svelte';
	import RenderHtml from '../RenderHtml.svelte';

	type HeroProps = {
		title: string;
		body: string;
		button: {
			text: string;
			icon: string;
			onClick?: MouseEventHandler<HTMLDivElement>;
			linkUrl?: string;
		};
		image: {
			src: string;
			alt: string;
		};
		navAdjust?: boolean;
	};

	let { title, body, button, image, navAdjust = false }: HeroProps = $props();
</script>

<header class={['hero', navAdjust && 'nav-adjust']}>
	<div class="margin">
		<div class="row center-xxs middle-sm between-sm">
			<div class="col-xxs-12 col-sm-6 col-md-5 last-xxs first-sm start-xxs">
				<h1><RenderHtml htmlString={title} /></h1>
				<p><RenderHtml htmlString={body} /></p>

				<Button
					buttonText={button.text}
					iconName={button.icon}
					buttonSize="md"
					fullWidthMobile={true}
					onClick={button.onClick}
					linkUrl={button.linkUrl}
				/>
			</div>

			<div class="col-xxs-12 col-sm-6 col-md-6 first-xxs last-sm center-xxs">
				<img src={image.src} alt={image.alt} />
			</div>
		</div>
	</div>
</header>

<style lang="scss" src="./hero.scss"></style>
