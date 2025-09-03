#!/usr/bin/env node

/// <reference types="node" />

import { readFileSync, writeFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const rootDir = join(__dirname, '..');

interface PackageJson {
	version: string;
	[key: string]: any;
}

interface PluginJson {
	version: string;
	[key: string]: any;
}

function syncVersion(newVersion: string = '1.0.0'): void {
	if (!newVersion) {
		console.error('Error: Version argument is required');
		process.exit(1);
	}

	try {
		// Update package.json
		const packagePath: string = join(rootDir, 'package.json');
		const packageJson: PackageJson = JSON.parse(readFileSync(packagePath, 'utf8'));
		packageJson.version = newVersion;
		writeFileSync(packagePath, JSON.stringify(packageJson, null, 2) + '\n');
		console.log(`✓ Updated package.json to version ${newVersion}`);

		// Update plugin.json
		const pluginPath: string = join(rootDir, 'plugin.json');
		const pluginJson: PluginJson = JSON.parse(readFileSync(pluginPath, 'utf8'));
		pluginJson.version = newVersion;
		writeFileSync(pluginPath, JSON.stringify(pluginJson, null, '\t') + '\n');
		console.log(`✓ Updated plugin.json to version ${newVersion}`);

		console.log(`✅ Version synchronization complete: ${newVersion}`);
	} catch (error: any) {
		console.error('Error syncing version:', error.message);
		process.exit(1);
	}
}

// Run if called directly
if (import.meta.url.startsWith('file:') && process.argv[1] === fileURLToPath(import.meta.url)) {
	// Get version from command line argument
	const newVersion: string = process.argv[2];
	syncVersion(newVersion);
}
