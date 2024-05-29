<script lang="ts">
	import ResponsiveHelper from '$lib/components/ResponsiveHelper.svelte';
	import type { PageData } from './$types';
	import { env } from '$env/dynamic/public';
	import LoadingIcon from '$lib/components/LoadingIcon.svelte';
	import Button from '$lib/components/Button.svelte';
	import RenderHtml from '$lib/components/RenderHtml.svelte';
	import TextInput from '$lib/components/Inputs/TextInput.svelte';
	import DropdownInput, {
		type SortOption,
		type SortValue
	} from '$lib/components/Inputs/DropdownInput.svelte';
	import ToggleInput, {
		type ToggleOption,
		type ToggleValues
	} from '$lib/components/Inputs/ToggleInput.svelte';

	export let data: PageData;

	const { page } = data;

	let searchVal: string = '';
	let sortVal: SortValue = '-created';
	let toggleVals: ToggleValues = [];

	let sortOptions: SortOption[] = [
		{
			value: '-created',
			displayText: 'Most Recent'
		},
		{
			value: 'created',
			displayText: 'Oldest'
		}
	];

	const toggleOptions: ToggleOption[] = [
		{
			displayText: 'Option 1',
			value: 'value1',
			color: 'primary'
		},
		{
			displayText: 'Option 2',
			value: 'value2',
			color: 'secondary'
		},
		{
			displayText: 'Option 3',
			value: 'value3',
			color: 'tertiary'
		}
	];
</script>

<svelte:head>
	<title>Home</title>
	<meta name="description" content="Svelte demo app" />
</svelte:head>

<section>
	<div class="margin">
		<ResponsiveHelper />

		{#await page}
			<LoadingIcon />
		{:then page}
			<h1>{page.title}</h1>
			<h2>{page.title}</h2>
			<h3>{page.title}</h3>
			<h4>{page.title}</h4>
			<h5>{page.title}</h5>
		{:catch}
			<p>Unable to load cat titles</p>
		{/await}

		<blockquote>
			"This is a wonderful quote showing the value of the test public key (set in your .env):
			<strong>{env.PUBLIC_TEST_KEY}</strong>"
		</blockquote>

		<p>Some <a href="." class="bold uppercase">text</a> to demo some font sizes for paragraphs</p>
		<p>
			<RenderHtml
				htmlString="<strong>This one is rendering HTML as if from your CMS</strong>, just be careful with this one <i>even though we use a sanitize lib</i>"
			/>
		</p>
		<p class="caption text-secondary">Some text to demo some font sizes for paragraphs</p>
		<p class="footnote">Some text to demo some font sizes for paragraphs</p>

		<Button
			buttonText="Read Post"
			buttonSize="sm"
			initialClass="secondary"
			iconName="ri-book-read-fill"
			linkUrl="https://unsplash.com/s/photos/cute-cat"
			openLinkNewTab={true}
		/>

		<Button
			buttonText="Bigger Button!"
			buttonSize="lg"
			initialClass="secondary"
			iconName="ri-book-read-fill"
			linkUrl="https://unsplash.com/s/photos/cute-cat"
			openLinkNewTab={true}
		/>

		<Button
			buttonText="I get bigger on mobile!"
			fullWidthMobile={true}
			onClick={() => alert('you can put js in me too!')}
		/>

		<hr />

		<p>
			Here's some icons! You can paste any i tag from
			<a href="https://remixicon.com/" target="_blank">https://remixicon.com/ </a>
		</p>

		<div class="row text-tertiary">
			<div class="col-xxs-6 col-sm-4 col-md-2">
				<i class="ri-menu-search-line icon-xs"></i>
			</div>
			<div class="col-xxs-6 col-sm-4 col-md-2">
				<i class="ri-star-fill icon-sm"></i>
			</div>
			<div class="col-xxs-6 col-sm-4 col-md-2">
				<i class="ri-settings-5-line icon-md"></i>
			</div>
			<div class="col-xxs-6 col-sm-4 col-md-2">
				<i class="ri-upload-cloud-line icon-lg"></i>
			</div>
			<div class="col-xxs-6 col-sm-4 col-md-2">
				<i class="ri-login-circle-fill icon-xl"></i>
			</div>
			<div class="col-xxs-6 col-sm-4 col-md-2">
				<i class="ri-zoom-in-line icon-lg"></i>
			</div>
		</div>

		<hr />

		<div class="row center-xxs">
			<div class="col-xxs-12 col-sm-8 col-md-6 start-xxs">
				<h3>Example Inputs</h3>

				<TextInput
					name="search"
					label="Search"
					bind:value={searchVal}
					iconName="ri-search-line"
					placeholder="Enter Search Here..."
					onChange={() => console.log(searchVal)}
				/>

				<p>searchVal: {searchVal}</p>

				<DropdownInput
					name="sort"
					label="Sort By"
					options={sortOptions}
					bind:value={sortVal}
					iconName="ri-arrow-down-s-line"
					onChange={() => console.log(sortVal)}
				/>

				<p>sortVal: {sortVal}</p>

				<ToggleInput
					name="show-tags"
					label="Show Tags"
					options={toggleOptions}
					bind:selected={toggleVals}
					onClick={() => console.log(toggleVals)}
				/>

				<p>toggleVals: {toggleVals}</p>
			</div>
		</div>

		<hr />

		<div class="row">
			<div class="col-xxs-12 col-sm-3">
				<div class="box background-primary"></div>
			</div>

			<div class="col-xxs-12 col-sm-3">
				<div class="box background-primary"></div>
			</div>

			<div class="col-xxs-12 col-sm-3">
				<p>Some text to describe the image</p>
			</div>
		</div>
	</div>
</section>

<style lang="scss" src="./page.scss"></style>
