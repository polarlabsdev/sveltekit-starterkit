import { test, expect } from '@playwright/test';

test('home page displays main heading and Get Started button', async ({ page }) => {
	await page.goto('/');

	// Test that the main heading is visible
	await expect(page.locator('h1').filter({ hasText: 'SvelteKit Starter Kit' })).toBeVisible();

	// Test that the Get Started button is present and clickable
	const getStartedButton = page.getByRole('link', { name: /get started/i });
	await expect(getStartedButton).toBeVisible();
	await expect(getStartedButton).toHaveAttribute('href', 'https://svelte.dev');
});

test('home page loads cat fact from API', async ({ page }) => {
	await page.goto('/');

	// Wait for the API data to load and check that a cat fact appears
	const catFactCard = page.locator('text=API Integration Example').locator('..');
	await expect(catFactCard).toBeVisible();

	// Check that either the cat fact loaded or an error message is shown
	await expect(
		page.locator('blockquote').or(page.locator('text=Unable to load cat fact'))
	).toBeVisible();
});
