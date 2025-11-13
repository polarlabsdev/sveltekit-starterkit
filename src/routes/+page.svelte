<script lang="ts">
	import type { PageData } from './$types';
	import { env } from '$env/dynamic/public';

	// shadcn-svelte components
	import Button from '$lib/components/ui/button/button.svelte';
	import Input from '$lib/components/ui/input/input.svelte';
	import Label from '$lib/components/ui/label/label.svelte';
	import * as Select from '$lib/components/ui/select';
	import Checkbox from '$lib/components/ui/checkbox/checkbox.svelte';
	import * as RadioGroup from '$lib/components/ui/radio-group';
	import * as Card from '$lib/components/ui/card';
	import Badge from '$lib/components/ui/badge/badge.svelte';
	import * as Alert from '$lib/components/ui/alert';
	import Skeleton from '$lib/components/ui/skeleton/skeleton.svelte';
	import Separator from '$lib/components/ui/separator/separator.svelte';
	import Toggle from '$lib/components/ui/toggle/toggle.svelte';

	// Custom components
	import ThemeToggle from '$lib/components/ThemeToggle.svelte';

	export let data: PageData;
	const { page } = data;

	// Form state
	let searchValue = '';
	let selectedSort = 'recent';
	let checkboxValue = false;
	let radioValue = 'option1';
	let togglePressed = false;

	const sortOptions = [
		{ value: 'recent', label: 'Most Recent' },
		{ value: 'oldest', label: 'Oldest' },
		{ value: 'name', label: 'Name A-Z' }
	];
</script>

<svelte:head>
	<title>Home</title>
	<meta name="description" content="Svelte demo app" />
</svelte:head>

<div class="test-css"><i class="ri-css3-line"></i> This is styled with actual CSS</div>

<div class="container py-8 space-y-10">
	<!-- Hero Section -->
	<section class="text-center space-y-6 mt-16">
		<div class="space-y-4">
			<h1 class="display-1">SvelteKit Starter Kit</h1>
			<p class="text-lead max-w-3xl mx-auto">
				A comprehensive demonstration of Tailwind CSS 4, shadcn-svelte components, and typography
				systems. This starter kit showcases everything you need to build modern web applications.
			</p>
		</div>

		<div class="flex items-center justify-center gap-4">
			<Button href="https://svelte.dev" target="_blank">
				<i class="ri-external-link-line"></i>
				Get Started
			</Button>
			<Button variant="outline" href="https://github.com">
				<i class="ri-github-line"></i>
				View Source
			</Button>
			<ThemeToggle />
		</div>
	</section>

	<!-- API Data Demo -->
	<section>
		<Card.Root class="max-w-2xl mx-auto gap-4">
			<Card.Header>
				<Card.Title>API Integration Example</Card.Title>
				<Card.Description>Demonstrating server-side data loading with SvelteKit</Card.Description>
			</Card.Header>
			<Card.Content>
				{#await page}
					<div class="flex items-center justify-center py-8">
						<Skeleton class="h-4 w-3/4" />
					</div>
				{:then pageData}
					<blockquote class="border-l-4 border-primary pl-4 italic">
						"{pageData.fact}"
					</blockquote>
					<p class="text-small text-muted-foreground mt-4">
						Random cat fact from catfact.ninja API
					</p>
				{:catch}
					<Alert.Root>
						<i class="ri-error-warning-line text-destructive"></i>
						<Alert.Title>Error</Alert.Title>
						<Alert.Description>Unable to load cat fact</Alert.Description>
					</Alert.Root>
				{/await}
			</Card.Content>
		</Card.Root>
	</section>

	<!-- Typography Showcase -->
	<section>
		<h2>Typography System</h2>
		<div class="grid md:grid-cols-2 gap-8 mt-8">
			<div class="space-y-6">
				<div>
					<h3>Display Variants</h3>
					<div class="space-y-4">
						<h1 class="display-1">Display 1</h1>
						<h2 class="display-2">Display 2</h2>
						<h3 class="display-3">Display 3</h3>
						<h4 class="display-4">Display 4</h4>
					</div>
				</div>

				<div>
					<h3>Headings</h3>
					<div class="space-y-2">
						<h1>Heading 1</h1>
						<h2>Heading 2</h2>
						<h3>Heading 3</h3>
						<h4>Heading 4</h4>
						<h5>Heading 5</h5>
						<h6>Heading 6</h6>
					</div>
				</div>
			</div>

			<div class="space-y-6">
				<div>
					<h3>Text Variants</h3>
					<div class="space-y-4">
						<p class="text-lead">
							Lead text for important introductions and summaries that need emphasis.
						</p>
						<p>
							Regular paragraph text with proper line height and spacing for optimal readability.
						</p>
						<p class="text-large">Large text for highlighted content.</p>
						<p class="text-small">Small text for secondary information.</p>
						<p class="text-muted">Muted text for less important details.</p>
						<p class="text-subtle">Subtle text for metadata and captions.</p>
					</div>
				</div>

				<div>
					<h3>Emphasis & Links</h3>
					<p>
						This paragraph contains <strong>bold text</strong>, <em>italic text</em>,
						<a href="https://example.com">styled links</a>, and <code>inline code</code>.
					</p>
				</div>
			</div>
		</div>

		<Separator class="my-8" />

		<div class="grid md:grid-cols-2 gap-8">
			<div>
				<h3>Lists</h3>
				<ul class="mt-4">
					<li>Unordered list item one</li>
					<li>Unordered list item two</li>
					<li>Unordered list item three</li>
				</ul>

				<ol class="mt-4">
					<li>Ordered list item one</li>
					<li>Ordered list item two</li>
					<li>Ordered list item three</li>
				</ol>
			</div>

			<div>
				<h3>Code Blocks</h3>
				<pre class="mt-4"><code
						>const greeting = 'Hello, World!';
console.log(greeting);</code
					></pre>
			</div>
		</div>
	</section>

	<!-- Color Palette -->
	<section>
		<h2>Color System</h2>
		<div class="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
			<!-- Primary Colors -->
			<Card.Root>
				<Card.Header>
					<Card.Title class="text-base">Primary</Card.Title>
				</Card.Header>
				<Card.Content class="space-y-3">
					<div class="flex items-center gap-2">
						<div class="w-6 h-6 rounded bg-primary"></div>
						<span class="text-small">Primary</span>
					</div>
					<div class="flex items-center gap-2">
						<div class="w-6 h-6 rounded bg-primary-foreground border"></div>
						<span class="text-small">Primary Foreground</span>
					</div>
				</Card.Content>
			</Card.Root>

			<!-- Secondary Colors -->
			<Card.Root>
				<Card.Header>
					<Card.Title class="text-base">Secondary</Card.Title>
				</Card.Header>
				<Card.Content class="space-y-3">
					<div class="flex items-center gap-2">
						<div class="w-6 h-6 rounded bg-secondary"></div>
						<span class="text-small">Secondary</span>
					</div>
					<div class="flex items-center gap-2">
						<div class="w-6 h-6 rounded bg-muted"></div>
						<span class="text-small">Muted</span>
					</div>
					<div class="flex items-center gap-2">
						<div class="w-6 h-6 rounded bg-accent"></div>
						<span class="text-small">Accent</span>
					</div>
				</Card.Content>
			</Card.Root>

			<!-- Semantic Colors -->
			<Card.Root>
				<Card.Header>
					<Card.Title class="text-base">Semantic</Card.Title>
				</Card.Header>
				<Card.Content class="space-y-3">
					<div class="flex items-center gap-2">
						<div class="w-6 h-6 rounded bg-destructive"></div>
						<span class="text-small">Destructive</span>
					</div>
					<div class="flex items-center gap-2">
						<div class="w-6 h-6 rounded bg-success"></div>
						<span class="text-small">Success</span>
					</div>
					<div class="flex items-center gap-2">
						<div class="w-6 h-6 rounded bg-warning"></div>
						<span class="text-small">Warning</span>
					</div>
					<div class="flex items-center gap-2">
						<div class="w-6 h-6 rounded bg-info"></div>
						<span class="text-small">Info</span>
					</div>
				</Card.Content>
			</Card.Root>

			<!-- Chart Colors -->
			<Card.Root>
				<Card.Header>
					<Card.Title class="text-base">Charts</Card.Title>
				</Card.Header>
				<Card.Content class="space-y-3">
					<div class="flex items-center gap-2">
						<div class="w-6 h-6 rounded bg-chart-1"></div>
						<span class="text-small">Chart 1</span>
					</div>
					<div class="flex items-center gap-2">
						<div class="w-6 h-6 rounded bg-chart-2"></div>
						<span class="text-small">Chart 2</span>
					</div>
					<div class="flex items-center gap-2">
						<div class="w-6 h-6 rounded bg-chart-3"></div>
						<span class="text-small">Chart 3</span>
					</div>
					<div class="flex items-center gap-2">
						<div class="w-6 h-6 rounded bg-chart-4"></div>
						<span class="text-small">Chart 4</span>
					</div>
				</Card.Content>
			</Card.Root>
		</div>
	</section>

	<!-- Components Gallery -->
	<section>
		<h2>Component Gallery</h2>

		<!-- Buttons -->
		<div class="mt-8">
			<h3>Buttons</h3>
			<div class="flex flex-wrap gap-4 mt-4">
				<Button>
					<i class="ri-star-fill"></i>
					Primary
				</Button>
				<Button variant="secondary">
					<i class="ri-heart-line"></i>
					Secondary
				</Button>
				<Button variant="outline">
					<i class="ri-bookmark-line"></i>
					Outline
				</Button>
				<Button variant="ghost">
					<i class="ri-eye-line"></i>
					Ghost
				</Button>
				<Button variant="destructive">
					<i class="ri-delete-bin-line"></i>
					Destructive
				</Button>
			</div>

			<div class="flex flex-wrap gap-4 mt-4">
				<Button size="sm">Small</Button>
				<Button size="default">Default</Button>
				<Button size="lg">Large</Button>
				<Button size="icon">
					<i class="ri-settings-line"></i>
				</Button>
			</div>
		</div>

		<Separator class="my-8" />

		<!-- Form Controls -->
		<div>
			<h3>Form Controls</h3>
			<div class="grid md:grid-cols-2 gap-8 mt-6">
				<div class="space-y-6">
					<div class="space-y-2">
						<Label for="search">Search Input</Label>
						<Input id="search" placeholder="Enter search term..." bind:value={searchValue} />
					</div>

					<div class="space-y-2">
						<Label>Select Dropdown</Label>
						<Select.Root type="single" bind:value={selectedSort}>
							<Select.Trigger>
								<span
									>{sortOptions.find((opt) => opt.value === selectedSort)?.label ||
										'Choose an option'}</span
								>
							</Select.Trigger>
							<Select.Content>
								{#each sortOptions as option (option.value)}
									<Select.Item value={option.value}>{option.label}</Select.Item>
								{/each}
							</Select.Content>
						</Select.Root>
					</div>

					<div class="flex items-center space-x-2">
						<Checkbox id="checkbox" bind:checked={checkboxValue} />
						<Label for="checkbox">Accept terms and conditions</Label>
					</div>
				</div>

				<div class="space-y-6">
					<div class="space-y-3">
						<Label>Radio Group</Label>
						<RadioGroup.Root bind:value={radioValue}>
							<div class="flex items-center space-x-2">
								<RadioGroup.Item value="option1" id="option1" />
								<Label for="option1">Option 1</Label>
							</div>
							<div class="flex items-center space-x-2">
								<RadioGroup.Item value="option2" id="option2" />
								<Label for="option2">Option 2</Label>
							</div>
							<div class="flex items-center space-x-2">
								<RadioGroup.Item value="option3" id="option3" />
								<Label for="option3">Option 3</Label>
							</div>
						</RadioGroup.Root>
					</div>

					<div class="space-y-2">
						<Label>Toggle Button</Label>
						<Toggle bind:pressed={togglePressed}>
							<i class="ri-bold"></i>
							{togglePressed ? 'Bold On' : 'Bold Off'}
						</Toggle>
					</div>
				</div>
			</div>
		</div>

		<Separator class="my-8" />

		<!-- Cards & Badges -->
		<div>
			<h3>Cards & Badges</h3>
			<div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
				<Card.Root class="gap-4">
					<Card.Header>
						<div class="flex justify-between items-start">
							<Card.Title>Feature Card</Card.Title>
							<Badge>New</Badge>
						</div>
						<Card.Description>This is a description of the feature</Card.Description>
					</Card.Header>
					<Card.Content>
						<p>Additional content goes here with proper spacing and typography.</p>
					</Card.Content>
					<Card.Footer>
						<Button size="sm">Learn More</Button>
					</Card.Footer>
				</Card.Root>

				<Card.Root class="gap-4">
					<Card.Header>
						<Card.Title>Badge Showcase</Card.Title>
					</Card.Header>
					<Card.Content class="space-y-4">
						<div class="flex flex-wrap gap-2">
							<Badge>Default</Badge>
							<Badge variant="secondary">Secondary</Badge>
							<Badge variant="outline">Outline</Badge>
							<Badge variant="destructive">Destructive</Badge>
						</div>
					</Card.Content>
				</Card.Root>

				<Card.Root class="gap-4">
					<Card.Header>
						<Card.Title>Interactive Card</Card.Title>
					</Card.Header>
					<Card.Content>
						<p class="text-small">Click the button to see an alert.</p>
					</Card.Content>
					<Card.Footer>
						<Button size="sm" variant="outline" onclick={() => alert('Hello from SvelteKit!')}>
							<i class="ri-cursor-line"></i>
							Click Me
						</Button>
					</Card.Footer>
				</Card.Root>
			</div>
		</div>

		<Separator class="my-8" />

		<!-- Alerts -->
		<div>
			<h3>Alert Components</h3>
			<div class="grid gap-4 mt-6">
				<Alert.Root>
					<i class="ri-information-line"></i>
					<div>
						<Alert.Title>Information</Alert.Title>
						<Alert.Description>
							This is an informational alert with helpful context.
						</Alert.Description>
					</div>
				</Alert.Root>

				<Alert.Root variant="destructive">
					<i class="ri-error-warning-line"></i>
					<div>
						<Alert.Title>Error</Alert.Title>
						<Alert.Description>Something went wrong. Please try again later.</Alert.Description>
					</div>
				</Alert.Root>
			</div>
		</div>
	</section>

	<!-- Icons Showcase -->
	<section>
		<h2>RemixIcon Gallery</h2>
		<p class="text-muted-foreground mt-2">
			Icons from <a
				href="https://remixicon.com/"
				target="_blank"
				class="text-primary hover:underline">RemixIcon</a
			>
			- copy any icon class and use with <code>&lt;i class="icon-name"&gt;&lt;/i&gt;</code>
		</p>

		<div class="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-6 mt-8">
			{#each ['ri-home-line', 'ri-user-line', 'ri-settings-line', 'ri-search-line', 'ri-heart-line', 'ri-star-line', 'ri-bookmark-line', 'ri-share-line', 'ri-download-line', 'ri-upload-line', 'ri-edit-line', 'ri-delete-bin-line', 'ri-eye-line', 'ri-lock-line', 'ri-mail-line', 'ri-phone-line'] as icon (icon)}
				<div
					class="flex flex-col items-center gap-2 p-4 rounded-lg border hover:bg-muted/50 transition-colors"
				>
					<i class="{icon} text-2xl"></i>
					<span class="text-xs text-muted-foreground text-center font-mono">{icon}</span>
				</div>
			{/each}
		</div>

		<div class="mt-8">
			<h4>Icon Sizes</h4>
			<div class="flex items-center gap-6 mt-4">
				<div class="flex flex-col items-center gap-2">
					<i class="ri-star-fill text-xs"></i>
					<span class="text-xs text-muted-foreground">xs</span>
				</div>
				<div class="flex flex-col items-center gap-2">
					<i class="ri-star-fill text-sm"></i>
					<span class="text-xs text-muted-foreground">sm</span>
				</div>
				<div class="flex flex-col items-center gap-2">
					<i class="ri-star-fill text-base"></i>
					<span class="text-xs text-muted-foreground">base</span>
				</div>
				<div class="flex flex-col items-center gap-2">
					<i class="ri-star-fill text-lg"></i>
					<span class="text-xs text-muted-foreground">lg</span>
				</div>
				<div class="flex flex-col items-center gap-2">
					<i class="ri-star-fill text-xl"></i>
					<span class="text-xs text-muted-foreground">xl</span>
				</div>
				<div class="flex flex-col items-center gap-2">
					<i class="ri-star-fill text-2xl"></i>
					<span class="text-xs text-muted-foreground">2xl</span>
				</div>
				<div class="flex flex-col items-center gap-2">
					<i class="ri-star-fill text-3xl"></i>
					<span class="text-xs text-muted-foreground">3xl</span>
				</div>
			</div>
		</div>
	</section>

	<!-- Layout & Responsiveness -->
	<section>
		<h2>Layout & Responsiveness</h2>
		<div class="mt-8 space-y-8">
			<div>
				<h3>Container System</h3>
				<Card.Root class="mt-4">
					<Card.Content>
						<p class="text-small text-muted-foreground">
							This content is within a container with automatic centering and responsive padding.
							The container has a max-width of {'{--breakpoint-xl}'} (80rem / 1280px) and responsive
							padding.
						</p>
					</Card.Content>
				</Card.Root>
			</div>

			<div>
				<h3>Responsive Grid</h3>
				<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-4">
					{#each Array(8), i (i)}
						<Card.Root>
							<Card.Content class="text-center">
								<div
									class="w-full h-16 bg-linear-to-r from-primary/20 to-primary/5 rounded flex items-center justify-center"
								>
									<span class="text-small font-medium">Item {i + 1}</span>
								</div>
							</Card.Content>
						</Card.Root>
					{/each}
				</div>
				<p class="text-small text-muted-foreground mt-4">
					This grid responds: 1 column on mobile, 2 on small screens, 4 on large screens.
				</p>
			</div>

			<div>
				<h3>Breakpoint Reference</h3>
				<div class="grid sm:grid-cols-2 gap-4 mt-4">
					<Card.Root>
						<Card.Header>
							<Card.Title class="text-base">Breakpoints</Card.Title>
						</Card.Header>
						<Card.Content class="space-y-2 text-small">
							<div class="flex justify-between">
								<span>xs:</span>
								<span class="font-mono">420px</span>
							</div>
							<div class="flex justify-between">
								<span>sm:</span>
								<span class="font-mono">640px</span>
							</div>
							<div class="flex justify-between">
								<span>md:</span>
								<span class="font-mono">768px</span>
							</div>
							<div class="flex justify-between">
								<span>lg:</span>
								<span class="font-mono">1024px</span>
							</div>
							<div class="flex justify-between">
								<span>xl:</span>
								<span class="font-mono">1280px</span>
							</div>
							<div class="flex justify-between">
								<span>2xl:</span>
								<span class="font-mono">1536px</span>
							</div>
						</Card.Content>
					</Card.Root>

					<Card.Root>
						<Card.Header>
							<Card.Title class="text-base">Current Breakpoint</Card.Title>
						</Card.Header>
						<Card.Content class="text-small">
							<div class="space-y-2">
								<div class="block xs:hidden">📱 &lt; xs (420px)</div>
								<div class="hidden xs:block sm:hidden">📱 xs (420px+)</div>
								<div class="hidden sm:block md:hidden">📱 sm (640px+)</div>
								<div class="hidden md:block lg:hidden">💻 md (768px+)</div>
								<div class="hidden lg:block xl:hidden">💻 lg (1024px+)</div>
								<div class="hidden xl:block 2xl:hidden">🖥️ xl (1280px+)</div>
								<div class="hidden 2xl:block">🖥️ 2xl (1536px+)</div>
							</div>
						</Card.Content>
					</Card.Root>
				</div>
			</div>
		</div>
	</section>

	<!-- Environment Variables Demo -->
	<section>
		<h2>Environment Configuration</h2>
		<Card.Root class="mt-6">
			<Card.Header>
				<Card.Title>Public Environment Variables</Card.Title>
				<Card.Description>Demonstrating environment variable usage in SvelteKit</Card.Description>
			</Card.Header>
			<Card.Content>
				<div class="p-4 bg-muted rounded-lg">
					<p class="text-small">
						<strong>PUBLIC_API_URL:</strong>
						<code class="ml-2">{env.PUBLIC_API_URL || 'Not set'}</code>
					</p>
				</div>
				<p class="text-small text-muted-foreground mt-4">
					This API URL is used for fetching cat facts. Set in your <code>.env</code> file:
					<code>PUBLIC_API_URL=https://catfact.ninja</code>
				</p>
			</Card.Content>
		</Card.Root>
	</section>
</div>

<style lang="postcss" src="./page.css"></style>
