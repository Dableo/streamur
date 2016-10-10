requirejs.config({
	baseUrl: 'lib',
	paths: {
		stream: '../stream',
		d3: "https://d3js.org/d3.v4.min"
	}
});

requirejs(['stream/main']);