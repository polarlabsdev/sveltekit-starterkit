import { env as publicEnv } from '$env/dynamic/public';
import * as Sentry from '@sentry/sveltekit';

export const getSentryOptions = ({ isBrowser = false }) => {
	// if anyone wants to figure out how to type this properly, god rest your soul 🧂
	const options: any = {
		dsn: publicEnv.PUBLIC_SENTRY_DSN,
		environment: publicEnv.PUBLIC_ENV_NAME?.startsWith('preview')
			? 'preview'
			: publicEnv.PUBLIC_ENV_NAME,
		tracesSampleRate: 0
	};

	if (publicEnv.PUBLIC_ENV_NAME === 'production') {
		options.tracesSampleRate = 0.33;
	}

	if (isBrowser) {
		options.replaysSessionSampleRate = 0;
		options.replaysOnErrorSampleRate = 1.0;
		options.integrations = [Sentry.replayIntegration()];
	}

	if (publicEnv.PUBLIC_SENTRY_RELEASE) {
		options.release = publicEnv.PUBLIC_SENTRY_RELEASE;
	}

	console.log(options);

	return options;
};
