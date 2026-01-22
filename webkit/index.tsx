import { bootLeetifyProfileButton } from '../frontend/leetify';

export default async function WebkitMain() {
	await bootLeetifyProfileButton();

	let lastHref = window.location.href;
	let scheduled = false;
	console.info('Leetify: Webkit main initialized', lastHref);

	const scheduleBoot = () => {
		if (scheduled) return;
		scheduled = true;
		setTimeout(async () => {
			scheduled = false;
			if (window.location.href !== lastHref) {
				console.info('Leetify: Detected navigation', window.location.href);
				lastHref = window.location.href;
			}
			await bootLeetifyProfileButton();
		}, 200);
	};

	const observer = new MutationObserver(() => {
		console.info('Leetify: DOM mutation detected');
		scheduleBoot();
	});

	if (document.body) {
		observer.observe(document.body, { childList: true, subtree: true });
	} else {
		setTimeout(() => {
			if (document.body) {
				observer.observe(document.body, { childList: true, subtree: true });
			}
		}, 200);
	}

	window.addEventListener('popstate', scheduleBoot);
	window.addEventListener('hashchange', scheduleBoot);
}
