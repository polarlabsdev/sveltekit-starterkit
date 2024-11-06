import type { PlaywrightTestConfig } from '@playwright/test';
import { devices } from '@playwright/test';

// https://playwright.dev/docs/test-configuration

const config: PlaywrightTestConfig = {
	webServer: {
		command: 'npm run build && npm run preview',
		port: 4173
	},
	projects: [
		{
			name: 'chromium',
			use: {
				...devices['Desktop Chrome']
			}
		},

		{
			name: 'firefox',
			use: { ...devices['Desktop Firefox'] }
		}
	],
	testDir: 'tests-browser',
	testMatch: /(.+\.)?(test|spec)\.[jt]s/,
	fullyParallel: true
};

export default config;
