import { env as publicEnv } from '$env/dynamic/public';

// stole this from intellisense
export type SvelteFetch = (
	input: URL | RequestInfo,
	init?: RequestInit | undefined
) => Promise<Response>;

type APIFetchParams = {
	path: string;
	params?: URLSearchParams;
	svelteFetch?: SvelteFetch;
	baseUrl?: string; // this is optional in case we want to use a different base URL, or .env isn't set (e.g. for testing)
};

type APIFetchResult<T> = { data: T | undefined; error?: { message: string; status: number } };

export type APIListBaseType<T> = { next: number; previous: number; count: number; results: T[] };

// We don't fail this function directly by throwing errors because Sveltekit
// sometimes seems to shut down completely if it encounters an error on the server.
// Can't seem to reproduce manually, so just making sure all errors are handled instead.
// When using this function, check for errorMessage then handle with the sveltekit error function.
export const apiFetch = async <T>({
	path,
	params,
	svelteFetch,
	baseUrl = publicEnv.PUBLIC_API_URL
}: APIFetchParams): Promise<APIFetchResult<T>> => {
	const fetchFunc = svelteFetch ?? fetch;
	let data: APIFetchResult<T>['data'];
	let error: APIFetchResult<T>['error'];

	try {
		let apiUrl = `${baseUrl}${path}`;

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
		error = { message: e.message ?? 'Something went wrong calling the API', status: 500 };
	}

	return { data, error };
};
