const webpack = require('webpack');

module.exports = {
	webpack: (config, { dev, vendor }) => {
		config.resolve.extensions = [
			'.js',
			'.json',
		];

		config.entry = {
			'scripts/background': './scripts/background.js',
		};

		return config
	},

	copyIgnore: [
		'**/*.js',
		'**/*.json',
	],
};
