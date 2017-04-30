// http://eslint.org/docs/user-guide/configuring

module.exports = {
    root: true,
    parser: 'babel-eslint',
    parserOptions: {
        sourceType: 'module'
    },
    env: {
        "browser": true,
        "node": true,
        "es6": true
    },
    // https://github.com/feross/standard/blob/master/RULES.md#javascript-standard-style
    extends: 'standard',
    // required to lint *.vue files
    plugins: [
        'html'
    ],
    // add your custom rules here
    'rules': {
        // allow paren-less arrow functions
        'arrow-parens': 0,
        // allow async-await
        'generator-star-spacing': 0,
        // allow debugger during development
        'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0,
        'indent': ["error", 4, { "VariableDeclarator": { "var": 2, "let": 2, "const": 3 } }],
        "space-before-function-paren": ["error", { "anonymous": "always", "named": "never", "asyncArrow": "never" }],
        'no-multi-str': "off", //不允许多行字符串
        'eol-last': ["error", "never"] //否在文件最后多加一行新的空行
    }
}