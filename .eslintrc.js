// https://eslint.org/docs/user-guide/configuring

module.exports = {
   root: true,
   parser: 'babel-eslint',
   parserOptions: {
      sourceType: 'module'
   },
   env: {
      browser: true
   },
   extends: 'airbnb-base',
   // required to lint *.vue files
   plugins: ['html'],
   // check if imports actually resolve
   settings: {
      'import/resolver': {
         webpack: {
            config: 'build/webpack.base.conf.js'
         }
      }
   },
   // add your custom rules here
   rules: {
      // don't require .vue extension when importing
      'import/extensions': [
         'error',
         'always',
         {
            js: 'never',
            vue: 'never'
         }
      ],
      // allow optionalDependencies
      'import/no-extraneous-dependencies': [
         'error',
         {
            optionalDependencies: ['test/unit/index.js']
         }
      ],
      'func-names': 0,
      'prefer-arrow-callback': 0,
      indent: 0,
      'no-console': 0,
      'space-before-function-paren': 0,
      'no-tabs': 0,
      'no-proto': 0,
      'no-prototype-builtins': 0,
      'no-trailing-spaces': 0,
      'comma-dangle': 0,
      'arrow-parens': 0,
      'no-mixed-operators': 0,
      'prefer-const': 0,
      'no-param-reassign': 0,
      'arrow-body-style': 0,
      'object-curly-spacing': 0,
      'import/prefer-default-export': 0,
      semi: 0,
      'no-return-assign': 0,
      'consistent-return': 0,
      'no-unused-expressions': 0,
      'class-methods-use-this': 0,
      'no-plusplus': 0,
      'prefer-destructuring': 0,
      'object-curly-newline': 0,
      'function-paren-newline': 0,
      // allow debugger during development
      'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0
   }
};
