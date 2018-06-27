module.exports = {
	moduleFileExtensions: [
		'js',
		'jsx',
		'json',
		'vue',
	],
	transform: {
		'^.+\\.vue$': 'vue-jest',
		'^.+\\.jsx?$': 'babel-jest',
	},
	collectCoverageFrom: [
		'src/**/*.{js,jsx,vue}',
		'!**/tests/**',
	],
	moduleNameMapper: {
		'^@/(.*)$': '<rootDir>/src/$1',
	},
	testMatch: [
		'<rootDir>/(tests/unit/**/*.spec.(js|jsx|ts|tsx)|**/__tests__/*.(js|jsx|ts|tsx))',
	],
};
