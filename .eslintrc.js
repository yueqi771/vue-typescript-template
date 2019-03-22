module.exports = {
  root: true,
  env: {
    node: true
  },
  'extends': [
    'plugin:vue/essential',
    '@vue/standard',
    '@vue/typescript'
  ],
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
	"no-tabs": "off",
	"semi": 0,
	"space-before-function-paren": 0,
	"indent": ["error", "tab"],
	"no-mixed-spaces-and-tab": "smart-tabs"
  },
  parserOptions: {
    parser: '@typescript-eslint/parser'
  }
}
