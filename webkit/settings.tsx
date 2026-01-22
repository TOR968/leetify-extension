import { BindPluginSettings } from '@steambrew/webkit';

interface SettingsProps {
	leetifyApiKey: string;
}

export let PluginSettings: SettingsProps = BindPluginSettings();
