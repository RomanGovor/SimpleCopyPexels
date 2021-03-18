module.exports = {
  extends: ['airbnb-typescript-prettier'],
  rules: {
    'no-param-reassign': 0,
    '@typescript-eslint/no-use-before-define': 0,
    'react-hooks/exhaustive-deps': 'off',
    'import/no-cycle': 'off',
    'jsx-a11y/anchor-is-valid': 'off',
    'jsx-a11y/no-noninteractive-element-interactions': 'off',
    'jsx-a11y/click-events-have-key-events': 'off',
    'react/jsx-props-no-spreading': 'off',
    'jsx-a11y/interactive-supports-focus': 'off',
    'jsx-a11y/no-static-element-interactions': 'off',
    'jsx-a11y/mouse-events-have-key-events': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    'react/destructuring-assignment': 'off'
},
  env: {
    "browser": true,
  },
  parser: "@typescript-eslint/parser"
};
