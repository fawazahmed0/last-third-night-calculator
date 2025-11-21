module.exports = {
	globDirectory: 'docs/',
	globPatterns: [
		'**/*.{png,svg,js,html,webmanifest}'
	],
	globIgnores: [
		'form.html'
	],
	swDest: 'docs/service-worker.js',
	ignoreURLParametersMatching: [
		/^utm_/,
		/^fbclid$/
	]
};