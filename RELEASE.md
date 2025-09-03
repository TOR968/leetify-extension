# Release Guide

This document explains how to create and manage releases for the Leetify Extension plugin.

## 📋 Overview

The project supports two types of releases:

1. **Automated Releases** - Using GitHub Actions and semantic-release
2. **Manual Releases** - Using local scripts for more control

## 🤖 Automated Releases (Recommended)

### Prerequisites

-   Repository must be hosted on GitHub
-   `GITHUB_TOKEN` secret must be configured in repository settings
-   All changes committed to `main` or `master` branch

### How it Works

1. **Commit Messages**: Use [Conventional Commits](https://www.conventionalcommits.org/) format:

    ```
    feat: add new Leetify integration feature
    fix: resolve profile loading issue
    docs: update installation instructions
    chore: update dependencies
    ```

2. **Automatic Triggering**: Releases are triggered automatically when:

    - Commits are pushed to `main`/`master` branch
    - Commit messages follow conventional format
    - Changes affect code (not just documentation)

3. **Version Bumping**: Semantic-release automatically determines version based on commit types:
    - `fix:` → Patch release (1.0.0 → 1.0.1)
    - `feat:` → Minor release (1.0.0 → 1.1.0)
    - `BREAKING CHANGE:` → Major release (1.0.0 → 2.0.0)

### Setting Up Automated Releases

1. **Configure GitHub Secrets**:

    - Go to your repository → Settings → Secrets and variables → Actions
    - Add `GITHUB_TOKEN` (usually automatically available)

2. **Make a Release Commit**:

    ````bash
    git add .
    git commit -m "feat: add Leetify profile integration"
    git push origin main
    ```

    ````

3. **Monitor Release**:
    - Check Actions tab in GitHub for release progress
    - Release will appear in Releases section when complete

## 🔧 Manual Releases

### Prerequisites

-   Node.js 18+ with pnpm installed
-   Python 3.7+ with pip
-   Git repository with clean working directory

### Creating a Manual Release

1. **Install Dependencies**:

    ```bash
    pnpm install
    pip install -r requirements.txt
    ```

2. **Run Release Script**:
    ````bash
    # Patch release (1.0.0 → 1.0.1)\n   pnpm run release patch\n   \n   # Minor release (1.0.0 → 1.1.0)\n   pnpm run release minor\n   \n   # Major release (1.0.0 → 2.0.0)\n   pnpm run release major\n   ```\n\n3. **Push Changes**:\n   ```bash\n   git push origin main\n   git push origin v<version>\n   ```\n\n4. **Create GitHub Release**:\n   - Go to GitHub → Releases → \"Create a new release\"\n   - Select the tag created by the script\n   - Upload the generated ZIP file from `build/` directory\n   - Add release notes\n\n### Available Scripts\n\n```bash\n# Build plugin package\npnpm run build-plugin\n\n# Create manual release\npnpm run release <patch|minor|major>\n\n# Sync versions between files\npnpm run sync-version <version>\n\n# Development build\npnpm run dev\n\n# Production build\npnpm run build\n```\n\n## 📦 Release Artifacts\n\nEach release creates:\n- **ZIP Package**: `leetify-extension-v<version>.zip`\n- **Updated Files**: `package.json`, `plugin.json`, `CHANGELOG.md`\n- **Git Tag**: `v<version>`\n- **GitHub Release**: With ZIP attachment and release notes\n\n### Package Contents\n```\nleetify-extension-v1.0.0.zip\n├── frontend/          # React frontend components\n├── webkit/           # Steam webkit integration\n├── backend/          # Python backend logic\n├── styles/           # CSS styles\n├── dist/            # Built assets (if exists)\n├── package.json     # Node.js package configuration\n├── plugin.json      # Millennium plugin configuration\n├── requirements.txt # Python dependencies\n├── README.md        # Installation and usage guide\n└── LICENSE          # License file\n```\n\n## 🔄 Version Management\n\n### Version Synchronization\nThe release system automatically keeps versions synchronized across:\n- `package.json` - Node.js package version\n- `plugin.json` - Millennium plugin version\n\n### Version Scheme\nFollows [Semantic Versioning](https://semver.org/):\n- **MAJOR** (X.0.0): Breaking changes, incompatible API changes\n- **MINOR** (0.X.0): New features, backwards compatible\n- **PATCH** (0.0.X): Bug fixes, backwards compatible\n\n## 🚀 Deployment Process\n\n### For Plugin Users\n1. Download latest release ZIP from GitHub Releases\n2. Extract to Steam plugins directory\n3. Enable plugin in Millennium settings\n4. Restart Steam\n\n### For Developers\n1. Clone repository\n2. Install dependencies\n3. Make changes\n4. Create release (automated or manual)\n5. Users download and install\n\n## 🛠️ Troubleshooting\n\n### Common Issues\n\n**Build Fails**:\n```bash\n# Clear cache and reinstall\npnpm clean-install\npip install --upgrade -r requirements.txt\n```\n\n**Version Sync Issues**:\n```bash\n# Manually sync versions\npnpm run sync-version 1.2.3\n```\n\n**Git Tag Conflicts**:\n```bash\n# Delete local tag\ngit tag -d v1.0.0\n\n# Delete remote tag\ngit push origin :refs/tags/v1.0.0\n```\n\n**Release Workflow Fails**:\n- Check GitHub Actions logs\n- Verify secrets are configured\n- Ensure commit messages follow conventional format\n- Check for merge conflicts\n\n### Debug Mode\n```bash\n# Enable verbose logging\nexport DEBUG=semantic-release:*\npnpm run release patch\n```\n\n## 📋 Release Checklist\n\n### Before Release\n- [ ] All tests pass\n- [ ] Documentation is updated\n- [ ] CHANGELOG.md reflects changes\n- [ ] Version compatibility verified\n- [ ] No uncommitted changes\n\n### During Release\n- [ ] Choose appropriate version bump\n- [ ] Verify build completes successfully\n- [ ] Check generated ZIP contains all files\n- [ ] Validate plugin.json and package.json versions match\n\n### After Release\n- [ ] GitHub release created successfully\n- [ ] ZIP file uploaded to release\n- [ ] Release notes are accurate\n- [ ] Installation instructions updated if needed\n- [ ] Community notified (if applicable)\n\n## 🔗 Related Links\n\n- [Conventional Commits](https://www.conventionalcommits.org/)\n- [Semantic Versioning](https://semver.org/)\n- [GitHub Actions Documentation](https://docs.github.com/en/actions)\n- [Millennium Plugin Documentation](https://docs.steambrew.app/developers/plugins/learn)\n\n---\n\n**Note**: This release system is designed specifically for Millennium plugins and follows the framework's conventions and requirements.
    ````
