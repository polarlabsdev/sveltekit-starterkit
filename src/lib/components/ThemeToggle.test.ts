import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/svelte';
import ThemeToggle from './ThemeToggle.svelte';

// Mock mode-watcher
vi.mock('mode-watcher', () => ({
	mode: { current: 'light' },
	setMode: vi.fn()
}));

describe('ThemeToggle component', () => {
	it('should render theme toggle button', () => {
		render(ThemeToggle);

		// Check that the button is rendered
		const button = screen.getByRole('button');
		expect(button).toBeInTheDocument();

		// Check that screen reader text is present
		const srText = screen.getByText('Toggle theme');
		expect(srText).toBeInTheDocument();
	});

	it('should display sun icon in light mode', () => {
		render(ThemeToggle);

		// Check that sun icon is present (ri-sun-line class)
		const sunIcon = document.querySelector('.ri-sun-line');
		expect(sunIcon).toBeInTheDocument();
	});
});
