import type { PlaywrightTestConfig } from '@playwright/test';

const config: PlaywrightTestConfig = {
	webServer: {
		command: 'npm run build && npm run preview',
		port: 4173
	},
	testDir: 'tests-browser',
	testMatch: /(.+\.)?(test|spec)\.[jt]s/
};

export default config;
