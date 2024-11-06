<script lang="ts">
	import type { MouseEventHandler } from 'svelte/elements';
	import Button from '../Button.svelte';
	import RenderHtml from '../RenderHtml.svelte';

	export let title: string;
	export let body: string;
	export let button: {
		text: string;
		icon: string;
		onClick?: MouseEventHandler<HTMLDivElement>;
		linkUrl?: string;
	};
	export let image: {
		src: string;
		alt: string;
	};
</script>

<header class="hero nav-adjust">
	<div class="margin">
		<div class="row center-xxs middle-sm between-sm">
			<div class="col-xxs-12 col-sm-6 col-md-5 last-xxs first-sm start-xxs">
				<h1><RenderHtml htmlString={title} /></h1>
				<p><RenderHtml htmlString={body} /></p>

				<Button
					buttonText={button.text}
					iconName={button.icon}
					buttonSize="lg"
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
