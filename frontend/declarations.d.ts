namespace JSX {
	interface IntrinsicElements {
		[elemName: string]: any;
	}
}

interface ImportMetaEnv {
	LEETIFY_API_KEY?: string;
}

interface ImportMeta {
	env?: ImportMetaEnv;
}

var Millennium: {
	callServerMethod: (pluginName: string, methodName: string, ...params: any[]) => Promise<any>;
	findElement: (doc: Document, selector: string) => Promise<any>;
};

declare module '*.svg' {
	const content: string;
	export default content;
}

declare module '*.png' {
	const content: string;
	export default content;
}
