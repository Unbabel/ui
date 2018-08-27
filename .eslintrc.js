// http://eslint.org/docs/user-guide/configuring

module.exports = {
  root: true,
  extends: 'airbnb-base',
  'plugins': [
    'vue',
  ],
  'parser': 'vue-eslint-parser',
  'parserOptions': {
    'parser': 'babel-eslint',
  },
  // check if imports actually resolve
  'settings': {
    'import/resolver': {
      'webpack': {
        'config': 'webpack.config.js'
      }
    }
  },
  // add your custom rules here
  'rules': {
    'indent': ['error', 'tab'],
    'no-tabs': ['off'],
    // don't require .vue extension when importing
    'import/extensions': ['error', 'always', {
      'js': 'never',
      'vue': 'never'
    }],
    'brace-style': ['error', 'stroustrup'],
    'arrow-body-style': ['error', 'always'],
    // allow debugger during development
    'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0
  }
}
