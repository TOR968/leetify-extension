import { BindPluginSettings, callable } from '@steambrew/client';

export const PLUGIN_NAME = 'leetify-extension';

interface SettingsProps {
	leetifyApiKey: string;
}

export let PluginSettings: SettingsProps = BindPluginSettings();

export const readSettingsApiKey = () => {
	try {
		const value = (PluginSettings as unknown as { leetifyApiKey?: string } | undefined)?.leetifyApiKey;
		return typeof value === 'string' ? value : '';
	} catch (e) {
		console.warn('Leetify Extension: Failed to read from PluginSettings', e);
		return '';
	}
};

export const writeSettingsApiKey = async (value: string) => {
	// Method 1: Try Backend Storage (Robust)
	try {
		const saveApiKey = callable<[{ key: string }], boolean>('save_api_key');
		await saveApiKey({ key: value });
	} catch (backendError) {
		console.error('Leetify [Settings]: Backend save failed:', backendError);
	}

	// Method 2: Try PluginSettings (Standard)
	try {
		const settings = PluginSettings as unknown as { leetifyApiKey?: string } | undefined;
		if (settings) {
			try {
				settings.leetifyApiKey = value;
				return true;
			} catch (assignmentError) {
				return false;
			}
		}
		return false;
	} catch (e) {
		console.warn('Leetify [Settings]: PluginSettings write failed (non-critical, using localStorage/backend).', e);
		return false;
	}
};
