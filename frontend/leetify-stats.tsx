/// <reference path="./declarations.d.ts" />
import { useEffect, useState } from 'react';
import { PluginSettings } from '../webkit/settings';
const leetifyBadgeBase64 =
	'data:image/png;base64,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';

type LeetifyStatsProps = {
	steamId: string;
};

type LeetifyExtendedProfile = {
	winrate: number;
	total_matches: number;
	first_match_date?: string;
	bans?: unknown[];
	ranks: {
		leetify: number;
		premier?: number | null;
		faceit?: number | null;
		faceit_elo?: number | null;
		wingman?: number | null;
		renown?: number | null;
	};
	rating: {
		aim: number;
		positioning: number;
		utility: number;
		clutch: number;
		opening: number;
		ct_leetify: number;
		t_leetify: number;
	};
	stats?: Record<string, number>;
	recent_matches?: Array<{
		id: string;
		finished_at?: string;
		data_source?: string;
		outcome: 'win' | 'loss' | 'tie';
		map_name?: string;
		score?: [number, number];
	}>;
};

const STATS_STYLE = `
.leetify-stats-container {
	background-color: rgba(0, 0, 0, 0.5);
	border: 1px solid rgba(0, 0, 0, 0.2);
	border-radius: 5px;
	padding: 10px;
	margin-bottom: 10px;
	color: #8F98A0;
	font-family: "Motiva Sans", Sans-serif;
}

.leetify-header {
	display: flex;
	align-items: center;
	justify-content: space-between;
	gap: 8px;
	margin-bottom: 12px;
}

.leetify-ranks {
	display: flex;
	align-items: center;
	gap: 6px;
	flex-wrap: wrap;
}

.leetify-header-right {
	display: flex;
	align-items: center;
	gap: 8px;
}

.leetify-rank-card {
	display: flex;
	flex-direction: column;
	gap: 2px;
	padding: 6px 8px;
	border-radius: 6px;
	background: rgba(0, 0, 0, 0.3);
	border: 1px solid rgba(255, 255, 255, 0.08);
}

.leetify-rank-card.premier .leetify-value {
	color: #66c0f4;
}

.leetify-rank-card.premier .leetify-label {
	color: #66c0f4;
}

.leetify-label {
	font-size: 10px;
	text-transform: uppercase;
	letter-spacing: 0.5px;
	color: #8F98A0;
}

.leetify-value {
	font-size: 16px;
	color: #ffffff;
	font-weight: 600;
	display: flex;
	align-items: center;
	gap: 6px;
}

.leetify-faceit-level {
	width: 18px;
	height: 18px;
	border-radius: 50%;
	border: 2px solid #ff8a00;
	color: #ff8a00;
	display: inline-flex;
	align-items: center;
	justify-content: center;
	font-size: 10px;
	font-weight: 700;
	background: rgba(255, 138, 0, 0.1);
}

.leetify-section {
	margin-top: 12px;
	border-top: 1px solid rgba(255, 255, 255, 0.08);
	padding-top: 10px;
}

.leetify-section-title {
	font-size: 12px;
	text-transform: uppercase;
	letter-spacing: 0.6px;
	color: #8F98A0;
	margin-bottom: 8px;
}

.leetify-grid {
	display: grid;
	grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
	gap: 8px;
}

.leetify-stat-card {
	display: flex;
	flex-direction: column;
	gap: 2px;
	background: rgba(0, 0, 0, 0.25);
	padding: 8px;
	border-radius: 6px;
}

.leetify-stat-value {
	font-size: 16px;
	color: #66c0f4;
	font-weight: 600;
}

.leetify-stat-value.white {
	color: #ffffff;
}

.leetify-details {
	margin-top: 12px;
	border-top: 1px solid rgba(255, 255, 255, 0.08);
	padding-top: 10px;
}

.leetify-summary {
	display: flex;
	align-items: center;
	justify-content: space-between;
	gap: 8px;
	margin-bottom: 8px;
}

.leetify-summary-caret {
	font-size: 12px;
	color: #8F98A0;
	transition: transform 0.2s ease;
}

details[open] .leetify-summary-caret {
	transform: rotate(180deg);
}

.leetify-details summary {
	list-style: none;
	cursor: pointer;
}

.leetify-details summary::-webkit-details-marker {
	display: none;
}

.leetify-match-grid {
	display: grid;
	grid-template-columns: repeat(auto-fit, minmax(170px, 1fr));
	gap: 8px;
}

.leetify-match-card {
	padding: 8px;
	border-radius: 8px;
	display: flex;
	flex-direction: column;
	gap: 4px;
	border: 1px solid transparent;
}

.leetify-match-card.win {
	background: rgba(40, 167, 69, 0.15);
	border-color: rgba(40, 167, 69, 0.4);
}

.leetify-match-card.loss {
	background: rgba(220, 53, 69, 0.15);
	border-color: rgba(220, 53, 69, 0.4);
}

.leetify-match-card.tie {
	background: rgba(255, 193, 7, 0.15);
	border-color: rgba(255, 193, 7, 0.4);
}

.leetify-match-meta {
	font-size: 11px;
	color: #8F98A0;
	text-transform: uppercase;
	letter-spacing: 0.4px;
}

.leetify-match-score {
	font-size: 16px;
	color: #ffffff;
	font-weight: 600;
}

.leetify-match-date {
	font-size: 11px;
	color: #8F98A0;
}
`;

function ensureStatsStyles(doc: Document) {
	if (doc.getElementById('leetify-stats-style')) return;
	const style = doc.createElement('style');
	style.id = 'leetify-stats-style';
	style.textContent = STATS_STYLE;
	doc.head?.appendChild(style);
}

const PLUGIN_NAME = 'leetify-extension';

export function LeetifyStats({ steamId }: LeetifyStatsProps) {
	const [fullProfile, setFullProfile] = useState<LeetifyExtendedProfile | null>(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(false);
	const [statsUnavailable, setStatsUnavailable] = useState(false);
	const [backendApiKey, setBackendApiKey] = useState('');

	useEffect(() => {
		ensureStatsStyles(document);
	}, []);

	useEffect(() => {
		Millennium.callServerMethod(PLUGIN_NAME, 'read_api_key')
			.then((key) => {
				const normalized = typeof key === 'string' ? key.trim() : '';
				if (!normalized) return;
				setBackendApiKey(normalized);
				if (!localStorage.getItem('leetifyApiKey')) {
					localStorage.setItem('leetifyApiKey', normalized);
				}
			})
			.catch((err) => console.error('Leetify [Stats]: Failed to read from backend:', err));
	}, []);

	const envApiKey = (import.meta as ImportMeta).env?.LEETIFY_API_KEY ?? '';
	let settingsApiKey = '';
	try {
		const value = (PluginSettings as unknown as { leetifyApiKey?: string } | undefined)?.leetifyApiKey;
		settingsApiKey = typeof value === 'string' ? value : '';
	} catch {
		settingsApiKey = '';
	}

	const localApiKey = localStorage.getItem('leetifyApiKey');

	if (!settingsApiKey && !localApiKey && !backendApiKey && !envApiKey) {
		console.info('Leetify: API key missing in settings, localStorage, and env');
	}
	const apiKey = (settingsApiKey || localApiKey || backendApiKey || envApiKey || '').trim();

	useEffect(() => {
		if (!steamId) return;
		setLoading(true);
		setError(false);
		setStatsUnavailable(false);
		const headers: Record<string, string> = {};
		if (apiKey) {
			headers.Authorization = `Bearer ${apiKey}`;
			headers._leetify_key = apiKey;
		}
		fetch(`https://api-public.cs-prod.leetify.com/v3/profile?steam64_id=${steamId}`, Object.keys(headers).length ? { headers } : undefined)
			.then(async (res) => {
				if (res.status === 404) {
					setFullProfile(null);
					setStatsUnavailable(true);
					return null;
				}
				if (!res.ok) throw new Error('Failed to fetch leetify general data');
				return res.json();
			})
			.then((payload) => {
				if (!payload) return;
				const payloadMessage = typeof payload === 'object' && payload !== null ? (payload as { message?: string }).message : null;
				const textPayload = typeof payload === 'string' ? payload : payloadMessage;
				if (typeof textPayload === 'string' && textPayload.toLowerCase().includes('not found')) {
					setFullProfile(null);
					setStatsUnavailable(true);
					return;
				}
				setFullProfile(payload as LeetifyExtendedProfile);
			})
			.catch(() => {
				setFullProfile(null);
				setError(true);
			})
			.finally(() => {
				setLoading(false);
			});
	}, [apiKey, steamId]);

	if (loading) {
		return (
			<div className="leetify-stats-container">
				<div className="leetify-header">
					<div className="leetify-label">Leetify Stats</div>
				</div>
				<div style={{ padding: '10px', textAlign: 'center', color: '#8F98A0' }}>Loading...</div>
			</div>
		);
	}

	if (error) {
		return (
			<div className="leetify-stats-container">
				<div className="leetify-header">
					<div className="leetify-label">Leetify Stats</div>
				</div>
				<div style={{ padding: '10px', textAlign: 'center', color: '#d9534f' }}>Failed to load data</div>
			</div>
		);
	}

	if (!fullProfile) {
		return (
			<div className="leetify-stats-container">
				<div className="leetify-header">
					<div className="leetify-label">Leetify Stats</div>
				</div>
				<div style={{ padding: '10px', textAlign: 'center', color: '#ebdb34' }}>
					{statsUnavailable ? 'Statistics are not available for this user.' : 'Player not found on Leetify'}
				</div>
			</div>
		);
	}

	const toNumber = (value: unknown) => (typeof value === 'number' && Number.isFinite(value) ? value : null);
	const formatFixed = (value: number, decimals = 2) => value.toFixed(decimals);
	const formatPercent = (value: number, decimals = 0) => `${value.toFixed(decimals)}%`;
	const formatScore = (score?: [number, number]) => (Array.isArray(score) && score.length === 2 ? `${score[0]}-${score[1]}` : '-');
	const formatDate = (value?: string) => {
		if (!value) return '-';
		const parsed = new Date(value);
		if (Number.isNaN(parsed.getTime())) return '-';
		return parsed.toLocaleString();
	};

	const timeSinceFirstMatch = (() => {
		if (!fullProfile.first_match_date) return null;
		const date = new Date(fullProfile.first_match_date);
		if (Number.isNaN(date.getTime())) return null;
		const diff = Date.now() - date.getTime();
		if (diff < 0) return null;
		const totalDays = Math.floor(diff / (1000 * 60 * 60 * 24));
		const years = Math.floor(totalDays / 365);
		const days = totalDays % 365;
		return { years, days };
	})();

	const ranks = fullProfile.ranks ?? { leetify: 0 };
	const faceitElo = toNumber(ranks.faceit_elo);
	const faceitLevel = toNumber(ranks.faceit);

	const rankItems = [
		{
			key: 'leetify',
			label: 'LEETIFY',
			value: formatFixed(ranks.leetify, 2),
		},
		toNumber(ranks.premier) !== null
			? {
					key: 'premier',
					label: 'PREMIER',
					value: `${Math.round(ranks.premier as number)}`,
				}
			: null,
		faceitLevel !== null
			? {
					key: 'faceit',
					label: 'FACEIT',
					value: `${Math.round(faceitLevel)}`,
					level: faceitLevel,
				}
			: null,
		faceitElo !== null
			? {
					key: 'faceit-elo',
					label: 'FACEIT ELO',
					value: `${Math.round(faceitElo)}`,
				}
			: null,
		toNumber(ranks.wingman) !== null
			? {
					key: 'wingman',
					label: 'WINGMAN',
					value: `${Math.round(ranks.wingman as number)}`,
				}
			: null,
		toNumber(ranks.renown) !== null
			? {
					key: 'renown',
					label: 'RENOWN',
					value: `${Math.round(ranks.renown as number)}`,
				}
			: null,
	].filter(Boolean) as Array<{ key: string; label: string; value: string; level?: number | null }>;

	const generalStats = [
		{
			key: 'winrate',
			label: 'WINRATE',
			value: formatPercent(fullProfile.winrate * 100, 0),
		},
		{
			key: 'total_matches',
			label: 'TOTAL MATCHES',
			value: `${fullProfile.total_matches}`,
		},
		{
			key: 'first_match_date',
			label: 'DAYS FROM FIRST MATCH',
			value: timeSinceFirstMatch !== null ? `${timeSinceFirstMatch.years}y ${timeSinceFirstMatch.days}d` : '-',
		},
		{
			key: 'bans',
			label: 'BANS',
			value: `${Array.isArray(fullProfile.bans) ? fullProfile.bans.length : 0}`,
		},
	];

	const leetifyStats = [
		{
			key: 'aim',
			label: 'AIM',
			value: `${Math.round(fullProfile.rating.aim)}`,
		},
		{
			key: 'positioning',
			label: 'POSITIONING',
			value: `${Math.round(fullProfile.rating.positioning)}`,
		},
		{
			key: 'utility',
			label: 'UTILITY',
			value: `${Math.round(fullProfile.rating.utility)}`,
		},
		{
			key: 'clutch',
			label: 'CLUTCH',
			value: formatFixed(fullProfile.rating.clutch * 100, 2),
		},
		{
			key: 'opening',
			label: 'OPENING',
			value: formatFixed(fullProfile.rating.opening * 100, 2),
		},
		{
			key: 'ct_leetify',
			label: 'CT',
			value: formatFixed(fullProfile.rating.ct_leetify * 100, 2),
		},
		{
			key: 't_leetify',
			label: 'T',
			value: formatFixed(fullProfile.rating.t_leetify * 100, 2),
		},
	];

	const additionalStatsConfig = [
		{ key: 'accuracy_enemy_spotted', label: 'ACCURACY ENEMY SPOTTED' },
		{ key: 'accuracy_head', label: 'ACCURACY HEAD' },
		{ key: 'counter_strafing_good_shots_ratio', label: 'COUNTER STRAFING GOOD SHOTS RATIO' },
		{ key: 'ct_opening_aggression_success_rate', label: 'CT OPENING AGGRESSION SUCCESS RATE' },
		{ key: 'ct_opening_duel_success_percentage', label: 'CT OPENING DUEL SUCCESS PERCENTAGE' },
		{ key: 'flashbang_hit_foe_avg_duration', label: 'FLASHBANG HIT FOE AVG DURATION' },
		{ key: 'flashbang_hit_foe_per_flashbang', label: 'FLASHBANG HIT FOE PER FLASHBANG' },
		{ key: 'flashbang_hit_friend_per_flashbang', label: 'FLASHBANG HIT FRIEND PER FLASHBANG' },
		{ key: 'flashbang_leading_to_kill', label: 'FLASHBANG LEADING TO KILL' },
		{ key: 'flashbang_thrown', label: 'FLASHBANG THROWN' },
		{ key: 'he_foes_damage_avg', label: 'HE FOES DAMAGE AVG' },
		{ key: 'he_friends_damage_avg', label: 'HE FRIENDS DAMAGE AVG' },
		{ key: 'preaim', label: 'PREAIM' },
		{ key: 'reaction_time_ms', label: 'REACTION TIME MS' },
		{ key: 'spray_accuracy', label: 'SPRAY ACCURACY' },
		{ key: 't_opening_aggression_success_rate', label: 'T OPENING AGGRESSION SUCCESS RATE' },
		{ key: 't_opening_duel_success_percentage', label: 'T OPENING DUEL SUCCESS PERCENTAGE' },
		{ key: 'traded_deaths_success_percentage', label: 'TRADED DEATHS SUCCESS PERCENTAGE' },
		{ key: 'trade_kill_opportunities_per_round', label: 'TRADE KILL OPPORTUNITIES PER ROUND' },
		{ key: 'trade_kills_success_percentage', label: 'TRADE KILLS SUCCESS PERCENTAGE' },
		{ key: 'utility_on_death_avg', label: 'UTILITY ON DEATH AVG' },
	];

	const additionalStats =
		fullProfile.stats && typeof fullProfile.stats === 'object'
			? additionalStatsConfig.flatMap((item) => {
					const value = fullProfile.stats?.[item.key];
					if (typeof value !== 'number') return [];
					return [{ label: item.label, value: formatFixed(value, 2) }];
				})
			: [];

	const recentMatches = (fullProfile.recent_matches ?? []).slice(0, 12);

	return (
		<div className="leetify-stats-container">
			<div className="leetify-header">
				<div className="leetify-ranks">
					{rankItems.map((item) => {
						const isFaceit = item.key === 'faceit';
						return (
							<div className={`leetify-rank-card ${item.key === 'premier' ? 'premier' : ''}`} key={item.key}>
								<div className="leetify-label">{item.label}</div>
								<div className="leetify-value">
									{!isFaceit && <span>{item.value}</span>}
									{isFaceit && item.level !== null && item.level !== undefined && <span className="leetify-faceit-level">{item.level}</span>}
									{!isFaceit && item.level !== null && item.level !== undefined && <span className="leetify-faceit-level">{item.level}</span>}
								</div>
							</div>
						);
					})}
				</div>
				<div className="leetify-header-right">
					<a href="https://leetify.com" target="_blank" rel="noreferrer" title="Data Provided by Leetify" style={{ display: 'flex' }}>
						<img src={leetifyBadgeBase64} alt="Data Provided by Leetify" style={{ height: '42px', opacity: 0.8 }} />
					</a>
				</div>
			</div>
			<details className="leetify-details" open>
				<summary className="leetify-summary">
					<span className="leetify-section-title">GENERAL STATS</span>
					<span className="leetify-summary-caret">^</span>
				</summary>
				<div className="leetify-grid">
					{generalStats.map((item) => (
						<div className="leetify-stat-card" key={item.key}>
							<div className="leetify-label">{item.label}</div>
							<div className="leetify-stat-value white">{item.value}</div>
						</div>
					))}
				</div>
			</details>
			<details className="leetify-details" open>
				<summary className="leetify-summary">
					<span className="leetify-section-title">LEETIFY STATS</span>
					<span className="leetify-summary-caret">^</span>
				</summary>
				<div className="leetify-grid">
					{leetifyStats.map((item) => (
						<div className="leetify-stat-card" key={item.key}>
							<div className="leetify-label">{item.label}</div>
							<div className="leetify-stat-value">{item.value}</div>
						</div>
					))}
				</div>
			</details>
			<details className="leetify-details">
				<summary className="leetify-summary">
					<span className="leetify-section-title">ADDITIONAL STATS</span>
					<span className="leetify-summary-caret">^</span>
				</summary>
				<div className="leetify-grid">
					{additionalStats.map((item) => (
						<div className="leetify-stat-card" key={item.label}>
							<div className="leetify-label">{item.label}</div>
							<div className="leetify-stat-value">{item.value}</div>
						</div>
					))}
				</div>
			</details>
			{recentMatches.length > 0 && (
				<details className="leetify-details" open>
					<summary className="leetify-summary">
						<span className="leetify-section-title">RECENT MATCHES</span>
						<span className="leetify-summary-caret">^</span>
					</summary>
					<div className="leetify-match-grid">
						{recentMatches.map((match) => (
							<div className={`leetify-match-card ${match.outcome}`} key={match.id}>
								<div className="leetify-label">{match.map_name ?? '-'}</div>
								<div className="leetify-match-score">{formatScore(match.score)}</div>
								<div className="leetify-match-meta">{match.data_source ?? '-'}</div>
								<div className="leetify-match-date">{formatDate(match.finished_at)}</div>
							</div>
						))}
					</div>
				</details>
			)}
		</div>
	);
}
