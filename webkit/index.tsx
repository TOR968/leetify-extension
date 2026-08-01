import { callable } from '@steambrew/webkit';
import { leetifyInjectMain } from './inject';

const PROFILE_HOST_PATTERN = /(^|\.)steamcommunity\.com$/;
const PROFILE_PATH_PATTERN = /^\/(id|profiles)\//;

const GetSettingsRpc = callable<[], string>('GetSettings');

async function readSettings(): Promise<{ openExternal: boolean }> {
	const defaults = { openExternal: false };
	try {
		const raw = await GetSettingsRpc();
		if (raw) {
			const parsed = JSON.parse(raw);
			if (parsed && typeof parsed === 'object') return { ...defaults, ...parsed };
		}
	} catch (e) {
		console.error('[Leetify] webkit settings read failed:', e);
	}
	return defaults;
}

export default async function WebkitMain() {
	if (!PROFILE_HOST_PATTERN.test(location.hostname)) return;
	if (!PROFILE_PATH_PATTERN.test(location.pathname)) return;
	const { openExternal } = await readSettings();
	leetifyInjectMain(openExternal);
}
