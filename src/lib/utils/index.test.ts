import { describe, it, expect } from 'vitest';
import { cn } from './index';

describe('cn utility function', () => {
	it('should merge classes correctly', () => {
		const result = cn('px-4', 'py-2', 'bg-blue-500');
		expect(result).toBe('px-4 py-2 bg-blue-500');
	});

	it('should handle conflicting Tailwind classes', () => {
		// twMerge should keep the last conflicting class
		const result = cn('px-4', 'px-6');
		expect(result).toBe('px-6');
	});

	it('should handle conditional classes', () => {
		const isActive = true;
		const result = cn('base-class', isActive && 'active-class');
		expect(result).toBe('base-class active-class');
	});

	it('should handle falsy values', () => {
		const result = cn('base-class', false, null, undefined, 'valid-class');
		expect(result).toBe('base-class valid-class');
	});
});
