import { dirname, join } from 'path'

function getAbsolutePath(value) {
  return dirname(require.resolve(join(value, 'package.json')))
}

const config = {
  stories: ['../stories/*.mdx', '../stories/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
  addons: [
    getAbsolutePath('@storybook/addon-links'),
    getAbsolutePath('@storybook/addon-essentials')
  ],
  framework: {
    name: getAbsolutePath('@storybook/react-vite'),
    options: {}
  },

  core: {
    disableTelemetry: true // 👈 Disables telemetry
  },

  docs: {
    //👇 See the table below for the list of supported options
    autodocs: 'tag',
    defaultName: 'Docs'
  }
}

export default config
