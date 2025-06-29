import antfu from '@antfu/eslint-config'

export default antfu({
  type: 'lib',
  vue: true,
}, {
  rules: {
    'style/function-paren-newline': 'off',
  },
})
