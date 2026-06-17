namespace JSX {
	interface IntrinsicElements {
		[elemName: string]: any;
	}
}

var Millennium: {
	findElement: (doc: Document, selector: string) => Promise<any>;
};
