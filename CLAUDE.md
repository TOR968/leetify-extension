# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

A [Millennium](https://steambrew.app/) plugin that injects a Leetify profile button into Steam community profile pages. It runs inside the Steam client using the Millennium framework.

## Commands

```bash
bun install           # install dependencies
bun run dev           # build for development (one-shot)
bun run watch         # rebuild on file changes
bun run build         # production build
```

There are no automated tests.

## Architecture

The plugin has two active execution contexts:

**`frontend/index.tsx`** — Millennium plugin entrypoint. Registers the plugin via `definePlugin` from `@steambrew/client`, then sets up CDP (Chrome DevTools Protocol) injection into the Steam community browser. This is the only file that does real work.

**`frontend/inject.ts`** — Contains `leetifyInjectMain()`, a self-contained vanilla JS function that runs in the community browser via `Runtime.evaluate`. Exported as `INJECTION_CODE` string using `leetifyInjectMain.toString()`. Must have zero imports and no references to outer-scope variables — everything it needs is inside the function body.

**`webkit/index.tsx`** — Stub only. Required by the build system but does nothing.

**`backend/main.lua`** — Minimal Lua backend required by `plugin.json` (`backendType: "lua"`). Just signals `millennium.ready()`.

## Why CDP instead of webkit injection

In Millennium v3.2.0+, the webkit bundle runs in the Steam main UI (`steamloopback.host`), **not** in the community browser (`steamcommunity.com`). The community browser is a separate CEF process with no Millennium injection. CDP (`window.MILLENNIUM_API.ChromeDevToolsProtocol`) from the frontend context is the only way to reach it.

## CDP injection flow

1. `Target.setDiscoverTargets` — enables target discovery
2. Listen on `Target.targetCreated` / `Target.targetInfoChanged` — detect profile URLs matching `/steamcommunity\.com\/(id|profiles)\//`
3. 200ms debounce per `targetId` — prevents double-injection from rapid duplicate events while allowing re-injection on refresh/navigation
4. `Target.attachToTarget` → `Runtime.evaluate` with `INJECTION_CODE` — injects button into community browser's main world

## Key details

- SteamID resolution order (inside `leetifyInjectMain`): `g_rgProfileData.steamid64` / `.steamid` → `data-miniprofile` attribute → Steam profile XML fetch (`/?xml=1`)
- Do **not** use `g_steamID` — that is the logged-in user's ID, not the viewed profile
- The button links to `https://leetify.com/public/profile/{steamId64}`
- Styles injected as `<style id="leetify-extension-style">` (idempotent guard prevents duplicates)
- `plugin.json` version must stay in sync with `package.json`; `scripts/sync-version.ts` does this
- `plugin.json` must include `"webkitApiVersion": "2.0.0"` — without it Millennium does not load the webkit bundle at all
- Build tool is `millennium-ttc` from `@steambrew/ttc`
