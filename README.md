# Utopia Components

This is just my personal knowledge storage on how to reuse some popular UI libraries like Radix UI, React Aria, ZagJS, .etc. The idea comes from [shadcn/ui](https://ui.shadcn.com) on how to reuse components, and most of `radix/*` components are just copied directly from it.

This is built with [Turborepo](https://turbo.build/repo) - a high-performance build system for JavaScript and TypeScript codebases.

### Useful Commands

- `pnpm build` - Build all packages, including the Storybook site
- `pnpm dev` - Run all packages locally and preview with Storybook
- `pnpm lint` - Lint all packages
- `pnpm changeset` - Generate a changeset
- `pnpm clean` - Clean up all `node_modules` and `dist` folders (runs each package's clean script)

## Apps & Packages

This Turborepo includes the following packages and applications:

- `apps/docs`: Component documentation site with Storybook
- `common`: Shared utility packages and configurations
- `radix`: Radix UI components
- `react-aria`: React Aria components - coming soon...
- `zag`: ZagJS components - coming soon...

Each package and app is 100% [TypeScript](https://www.typescriptlang.org/). Workspaces enables us to "hoist" dependencies that are shared between packages to the root `package.json`. This means smaller `node_modules` folders and a better local dev experience. To install a dependency for the entire monorepo, use the `-w` workspaces flag with `pnpm add`.

### Compilation

To make the core library code work across all browsers, we need to compile the raw TypeScript and React code to plain JavaScript. We can accomplish this with `tsup`, which uses `esbuild` to greatly improve performance.

Running `pnpm build` from the root of the Turborepo will run the `build` command defined in each package's `package.json` file. Turborepo runs each `build` in parallel and caches & hashes the output to speed up future builds.

Example for `@utopia/radix-button`, the `build` command is the following:

```bash
tsup src/index.ts --format esm,cjs --dts --external react
```

`tsup` compiles `src/index.ts`, which exports all of the components in the that package, into both ES Modules and CommonJS formats as well as their TypeScript types. The `package.json` for `@utopia/radix-button` then instructs the consumer to select the correct format:

```json:button/package.json
{
  "name": "@utopia/radix-button",
  "version": "0.0.0",
  "main": "./dist/index.js",
  "module": "./dist/index.mjs",
  "types": "./dist/index.d.ts",
  "sideEffects": false,
}
```

Run `pnpm build` to confirm compilation is working correctly. You should see a folder `radix/button/dist` which contains the compiled output.

```bash
button
└── dist
    ├── index.d.ts  <-- Types
    ├── index.js    <-- CommonJS version
    └── index.mjs   <-- ES Modules version
```
