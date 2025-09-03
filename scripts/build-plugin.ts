#!/usr/bin/env tsx

import { execSync } from 'child_process';
import { existsSync, mkdirSync, rmSync, cpSync, createWriteStream } from 'fs';
import { join } from 'path';
import { createRequire } from 'module';

const require = createRequire(import.meta.url);
const archiver = require('archiver');

const version = process.argv[2];
if (!version) {
	console.error('Version is required as first argument');
	process.exit(1);
}

const rootDir = process.cwd();
const releaseDir = join(rootDir, 'release');
const zipName = `leetify-extension-v${version}.zip`;

console.log(`Building plugin version ${version}...`);

async function buildPlugin() {
	try {
		// Clean up any existing release directory
		if (existsSync(releaseDir)) {
			rmSync(releaseDir, { recursive: true, force: true });
		}

		// Create release directory
		mkdirSync(releaseDir, { recursive: true });

		// Copy necessary files and directories
		const filesToCopy = [
			{ src: '.millennium', dest: '.millennium' },
			{ src: 'backend', dest: 'backend' },
			{ src: 'plugin.json', dest: 'plugin.json' },
			{ src: 'requirements.txt', dest: 'requirements.txt' },
			{ src: 'README.md', dest: 'README.md' },
		];

		// Check if LICENSE file exists and add it if it does
		if (existsSync(join(rootDir, 'LICENSE'))) {
			filesToCopy.push({ src: 'LICENSE', dest: 'LICENSE' });
		}

		// Copy styles if they exist
		if (existsSync(join(rootDir, 'styles'))) {
			mkdirSync(join(releaseDir, 'static'), { recursive: true });
			cpSync(join(rootDir, 'styles'), join(releaseDir, 'static'), { recursive: true });
		}

		// Copy all files
		for (const { src, dest } of filesToCopy) {
			const srcPath = join(rootDir, src);
			const destPath = join(releaseDir, dest);

			if (existsSync(srcPath)) {
				cpSync(srcPath, destPath, { recursive: true });
				console.log(`Copied ${src} to release directory`);
			} else {
				console.warn(`Warning: ${src} does not exist, skipping...`);
			}
		}

		// Generate Git metadata
		console.log('Generating Git metadata...');
		try {
			const commitId = execSync('git rev-parse HEAD', { encoding: 'utf8' }).trim();
			const pluginId = execSync('git rev-list --max-parents=0 HEAD', { encoding: 'utf8' }).trim();

			const metadata = {
				id: pluginId,
				commitId: commitId,
			};

			const metadataPath = join(releaseDir, 'metadata.json');

			// Write metadata.json to release directory
			require('fs').writeFileSync(metadataPath, JSON.stringify(metadata, null, 2));
			console.log('Generated metadata.json with Git information');
		} catch (error) {
			console.warn('Warning: Could not generate Git metadata:', error);
		}

		// Create zip file using archiver for cross-platform compatibility
		console.log('Creating zip file...');
		const zipPath = join(rootDir, zipName);
		const output = createWriteStream(zipPath);
		const archive = archiver('zip', { zlib: { level: 9 } });

		// Listen for archive events
		archive.on('error', (err: any) => {
			throw err;
		});

		output.on('close', () => {
			console.log(`✅ Successfully created ${zipName}`);
			// Clean up release directory
			rmSync(releaseDir, { recursive: true, force: true });
		});

		// Pipe archive data to the file
		archive.pipe(output);

		// Add all files from release directory to archive
		archive.directory(releaseDir, false);

		// Finalize the archive
		await archive.finalize();
	} catch (error) {
		console.error('❌ Build failed:', error);

		// Clean up on error
		if (existsSync(releaseDir)) {
			rmSync(releaseDir, { recursive: true, force: true });
		}

		process.exit(1);
	}
}

// Run the build
buildPlugin().catch((error) => {
	console.error('❌ Build failed:', error);
	process.exit(1);
});
