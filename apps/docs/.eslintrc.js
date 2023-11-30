module.exports = {
  extends: ['custom/storybook'],
  rules: {
    '@typescript-eslint/no-misused-promises': [
      2,
      {
        checksVoidReturn: {
          attributes: false
        }
      }
    ]
  }
}
