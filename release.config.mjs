export default {
	branches: ['main', 'master'],
	plugins: [
		'@semantic-release/commit-analyzer',
		'@semantic-release/release-notes-generator',
		[
			'@semantic-release/changelog',
			{
				changelogFile: 'CHANGELOG.md',
			},
		],
		[
			'@semantic-release/exec',
			{
				prepareCmd: 'npx tsx scripts/sync-version.ts ${nextRelease.version}',
				publishCmd: 'npm run build && npx tsx scripts/build-plugin.ts ${nextRelease.version}',
			},
		],
		[
			'@semantic-release/github',
			{
				assets: [
					{
						path: 'leetify-extension-*.zip',
						label: 'Leetify Extension Plugin (${nextRelease.gitTag})',
					},
				],
			},
		],
		[
			'@semantic-release/git',
			{
				assets: ['package.json', 'plugin.json', 'CHANGELOG.md'],
				message: 'chore(release): ${nextRelease.version} [skip ci]\n\n${nextRelease.notes}',
			},
		],
	],
};
