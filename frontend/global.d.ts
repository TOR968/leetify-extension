import 'react';

declare global {
	namespace JSX {
		interface IntrinsicElements {
			[key: string]: any;
		}
	}
}
