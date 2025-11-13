import { handleErrorWithSentry } from '@sentry/sveltekit';
import * as Sentry from '@sentry/sveltekit';
import { getSentryOptions } from '$lib/utils/sentry';

Sentry.init(getSentryOptions({ isBrowser: true }));

// If you have a custom error handler, pass it to `handleErrorWithSentry`
export const handleError = handleErrorWithSentry();
