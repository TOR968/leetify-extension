import { callable } from '@steambrew/webkit';
import { leetifyInjectMain } from './inject';

const PROFILE_URL_PATTERN = /steamcommunity\.com\/(id|profiles)\//;

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
	if (!PROFILE_URL_PATTERN.test(location.href)) return;
	const { openExternal } = await readSettings();
	leetifyInjectMain(openExternal);
}
