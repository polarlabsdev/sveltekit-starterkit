import { env as publicEnv } from '$env/dynamic/public';
import * as Sentry from '@sentry/sveltekit';

// stole this from intellisense
export type SvelteFetch = (
	input: URL | RequestInfo,
	init?: RequestInit | undefined
) => Promise<Response>;

type APIFetchParams = {
	path: string;
	baseUrl?: string;
	params?: URLSearchParams;
	svelteFetch?: SvelteFetch;
};

type APIFetchResult<T> = {
	data: T | undefined;
	error?: {
		message: string;
		status: number;
	};
};

export type APIListBaseType<T> = {
	next: number;
	previous: number;
	count: number;
	results: T[];
};

// We don't fail this function directly by throwing errors because Sveltekit
// sometimes seems to shut down completely if it encounters an error on the server.
// Can't seem to reproduce manually, so just making sure all errors are handled instead.
// When using this function, check for errorMessage then handle with the sveltekit error function.
export const apiFetch = async <T>({
	path,
	baseUrl,
	params,
	svelteFetch
}: APIFetchParams): Promise<APIFetchResult<T>> => {
	const fetchFunc = svelteFetch ?? fetch;
	const apiBaseUrl = baseUrl ?? publicEnv.PUBLIC_API_URL;

	let data: APIFetchResult<T>['data'];
	let error: APIFetchResult<T>['error'];

	try {
		let apiUrl = `${apiBaseUrl}${path}`;

		if (params && params.size > 0) {
			apiUrl += `?${params}`;
		}

		console.log(`Querying API endpoint: ${apiUrl}`);

		const response = await fetchFunc(apiUrl);

		if (!response.ok) {
			error = {
				message: `API request failed with status code ${response.status}`,
				status: response.status
			};
			console.log('ERROR CAUGHT:');
			console.log(error);
		}

		data = await response.json();
	} catch (e: any) {
		// 2024 and we still can't catch specific errors in JS or even rely on Error type
		console.log('ERROR CAUGHT:');
		console.log(e);
		error = {
			message: e.message ?? 'Something went wrong calling the API',
			status: 500
		};
	}

	return { data, error };
};

// https://www.okupter.com/blog/svelte-debounce
/* eslint-disable @typescript-eslint/ban-types */
export const debounce = (callback: Function, wait = 1200) => {
	let timeout: ReturnType<typeof setTimeout>;

	return (...args: any[]) => {
		clearTimeout(timeout);
		timeout = setTimeout(() => callback(...args), wait);
	};
};

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
