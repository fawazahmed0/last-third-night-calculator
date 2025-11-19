module.exports = {
	globDirectory: 'dist/',
	globPatterns: [
		'**/*.{png,svg,js,html,webmanifest}'
	],
	swDest: 'dist/service-worker.js',
	ignoreURLParametersMatching: [
		/^utm_/,
		/^fbclid$/
	]
};