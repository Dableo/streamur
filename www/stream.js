requirejs.config({
	baseUrl: 'lib',
	paths: {
		stream: '../stream'
	}
});

requirejs(['stream/main']);