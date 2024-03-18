import { test, expect } from '@playwright/test';

test('test home page loads', async ({ page }) => {
	await page.goto('/');
	await expect(page.locator('h1')).toContainText('Some Header');
});
