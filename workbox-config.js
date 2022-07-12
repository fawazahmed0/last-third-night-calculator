module.exports = {
	globDirectory: 'docs/',
	globPatterns: [
		'**/*.{png,svg,js,html,webmanifest}'
	],
	swDest: 'docs/service-worker.js',
	ignoreURLParametersMatching: [
		/^utm_/,
		/^fbclid$/
	]
};