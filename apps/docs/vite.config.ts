import { defineConfig } from 'vite'
import * as path from 'path'
import * as fs from 'fs'
import { createRequire as yix6bKft } from 'module'
const require = yix6bKft(import.meta.url)

function getAbsolutePath(value: string): any {
  return path.dirname(require.resolve(path.join(value, 'package.json')))
}

function getDependencyNames(packageJsonPath: string): string[] {
  // Read the package.json file
  const packageJsonContent = fs.readFileSync(packageJsonPath, 'utf8')

  // Parse the JSON content
  const packageJson = JSON.parse(packageJsonContent)

  // Get the dependencies object
  const dependencies = packageJson.dependencies || {}
  const devDependencies = packageJson.devDependencies || {}

  // Concatenate the dependency names from dependencies and devDependencies
  const allDependencies = Object.keys(dependencies).concat(
    Object.keys(devDependencies)
  )

  return allDependencies
}

// Get all `@utopia/*` packages
const all_playbook = getDependencyNames('package.json').filter(str =>
  str.includes('@utopia/')
)

// Filter non-working packages
const filtered_aliases = all_playbook
  // .filter(item => item !== '@utopia/icon') 👈 Uncomment this to filter a package if it's not working
  .map(element => {
    return {
      find: element,
      replacement: getAbsolutePath(element) + '/src/index.tsx'
    }
  })

console.log('Alias entries: ', filtered_aliases)

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: filtered_aliases
  },
  build: {
    outDir: 'storybook-static'
  }
})
