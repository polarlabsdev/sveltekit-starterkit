<script lang="ts">
	import { page } from '$app/state';
	import * as Card from '$lib/components/ui/card';
	import Button from '$lib/components/ui/button/button.svelte';

	let message: string;
	let icon: string;
	let title: string;

	if (page.status == 404) {
		title = 'Page Not Found';
		message =
			'The page you are looking for could not be found. Please check the URL or return to the homepage.';
		icon = 'ri-file-search-line';
	} else if (page.status >= 500) {
		title = 'Server Error';
		message =
			'Something went wrong on our end. Please try again later or contact support if the problem persists.';
		icon = 'ri-error-warning-line';
	} else {
		title = 'Error';
		message = 'An unexpected error occurred. Please try again.';
		icon = 'ri-alert-line';
	}
</script>

<svelte:head>
	<title>Error {page.status} - {title}</title>
</svelte:head>

<main class="container flex flex-col items-center justify-center min-h-screen py-8">
	<Card.Root class="max-w-lg w-full">
		<Card.Header class="text-center space-y-4">
			<div class="flex justify-center">
				<i class="{icon} text-6xl text-destructive"></i>
			</div>
			<div>
				<Card.Title class="text-2xl">Error {page.status}</Card.Title>
				<Card.Description class="text-lg font-semibold text-foreground mt-2"
					>{title}</Card.Description
				>
			</div>
		</Card.Header>
		<Card.Content class="text-center space-y-6">
			<p class="text-muted-foreground leading-relaxed">{message}</p>
			<div class="flex flex-col sm:flex-row gap-3 justify-center">
				<Button href="/" variant="default">
					<i class="ri-home-line"></i>
					Go Home
				</Button>
				<Button onclick={() => window.history.back()} variant="outline">
					<i class="ri-arrow-left-line"></i>
					Go Back
				</Button>
			</div>
		</Card.Content>
	</Card.Root>
</main>
