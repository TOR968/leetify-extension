import { callable } from '@steambrew/client';

export interface PluginSettings {
	openExternal: boolean;
}

const DEFAULT_SETTINGS: PluginSettings = {
	openExternal: false,
};

const GetSettingsRpc = callable<[], string>('GetSettings');
const SaveSettingsRpc = callable<[{ settings_json: string }], string>('SaveSettings');

let cachedSettings: PluginSettings = { ...DEFAULT_SETTINGS };

export async function initSettings(): Promise<void> {
	try {
		const raw = await GetSettingsRpc();
		if (!raw) return;
		const parsed = JSON.parse(raw);
		if (parsed && typeof parsed === 'object') {
			cachedSettings = { ...DEFAULT_SETTINGS, ...parsed };
		}
	} catch (e) {
		console.error('[Leetify] Failed to load settings:', e);
	}
}

export function getSettings(): PluginSettings {
	return cachedSettings;
}

export async function saveSettings(settings: PluginSettings): Promise<boolean> {
	const previous = cachedSettings;
	cachedSettings = settings;
	try {
		const res = await SaveSettingsRpc({ settings_json: JSON.stringify(settings) });
		if (res === '0') {
			console.error('[Leetify] Backend failed to save settings');
			cachedSettings = previous;
			return false;
		}
		return true;
	} catch (e) {
		console.error('[Leetify] Failed to save settings:', e);
		cachedSettings = previous;
		return false;
	}
}
