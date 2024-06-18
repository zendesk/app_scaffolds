# ReactJS Scaffold Proposal

## Purpose

The primary objective of this React scaffold is to leverage the latest React version to enhance the developer experience by phasing out class components in favor of exhaustive use of hooks—a pivotal feature in React, especially with the upcoming hooks in React 19. This scaffold is designed to closely align with React's evolving best practices and features, thereby simplifying the transition for developers and promoting modern React paradigms. Additionally, the scaffold aims to provide a fast and efficient development experience by leveraging Hot Module Replacement (HMR) for instant feedback during development.

```
   This is not a final version, any changes suggestions are more than welcome!
```

## Advantages of Moving from Webpack to Vite

1. **Faster Build Times**:

   - Vite provides significantly faster cold starts and hot module replacement (HMR) due to its modern architecture that leverages native ES modules. This results in a more efficient and responsive development experience compared to Webpack's slower bundling process.

2. **Improved Developer Experience**:

   - The use of Vite's dev server offers instant feedback during development, enhancing productivity. The scaffold leverages modern React practices, emphasizing hooks over class components, aligning with the latest React trends and upcoming features in React 19.

3. **Simplified Configuration**:

   - Vite requires less configuration out-of-the-box, making it easier to set up and maintain. This reduces the overhead for developers, allowing them to focus more on application logic rather than build tooling.

4. **Efficient Static Asset Handling**:

   - Vite includes built-in support for static asset handling, which simplifies the process of managing images, stylesheets, and other static files. This reduces the need for custom loaders and plugins that were necessary in Webpack.

5. **Enhanced Build Performance**:

   - Vite's use of Rollup for production builds ensures optimized output with efficient tree-shaking and code-splitting, resulting in smaller and faster-loading bundles. This is particularly beneficial for performance-critical applications.

6. **Plugin Ecosystem**:

   - Vite has a growing ecosystem of plugins that are designed to be simpler and more performant. This ecosystem supports a wide range of functionalities, from legacy compatibility to advanced optimizations, enhancing the scaffold's flexibility and capabilities.

7. **Modern Features and Practices**:
   - By incorporating Vite, the scaffold is better positioned to adopt modern JavaScript and TypeScript features, improving code quality and maintainability. The integration with TypeScript and JSX is seamless, supporting advanced type-checking and transpilation.
   - **JSX and CSS Support**: Vite supports JSX and CSS out-of-the-box, including the latest CSS features. This simplifies the setup process and ensures that developers can take advantage of modern styling techniques without additional configuration.

## Comparison of Previous Scaffold and New Proposal

| Feature                                 | Current (New Proposal)                                                                                                                     | Previous                                            |
| --------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------ | --------------------------------------------------- |
| **HMR**                                 | Now we support a better development experience with HMR.                                                                                   | Not supported                                       |
| **Translations**                        | Supported with the rollup/translations-loader-plugin                                                                                       | Supported through webpack/translation-loader plugin |
| **Testing**                             | Vitest setup included, except for the helper functions (can be added if needed)                                                            | Jest setup for unit and integration testing         |
| **Functional Components**               | Suited for a better use of hooks and modern React paradigms                                                                                | Class components and some use of hooks              |
| **Preprocess CSS**                      | Supported out of the box with Vite                                                                                                         | Supported with PostCSS                              |
| **Build Tool**                          | Vite (faster, less configuration)                                                                                                          | Webpack (slower, more configuration)                |
| **Static Asset Handling**               | Efficient static asset handling with Vite                                                                                                  | Managed with custom loaders in Webpack              |
| **Developer Experience**                | Enhanced with instant feedback and faster build times                                                                                      | Slower build times, less responsive                 |
| **Configuration**                       | Simplified configuration with Vite                                                                                                         | More complex configuration with Webpack             |
| **Production Build**                    | Rollup for optimized output, tree-shaking, and code-splitting                                                                              | Webpack for module bundling                         |
| **Plugin Ecosystem**                    | Modern and growing ecosystem with Vite                                                                                                     | Established ecosystem with Webpack                  |
| **JSX and CSS Support**                 | Out-of-the-box support in Vite                                                                                                             | Managed with custom loaders in Webpack              |
| **TypeScript Support**                  | Seamless integration considered                                                                                                            | Not mentioned                                       |
| **Development and Production Workflow** | Requires running the app in dev mode (`src`) for HMR and building for production (`dist`) for submission and validation with ZCLI commands | Single mode, run the generated app directly locally |

## Build Process

We are enhancing our build process by incorporating [Vite](https://vitejs.dev/), a modern build tool that is faster, lighter, and better suited for our needs than Webpack. Key customizations in our build process include:

- **Translation Loader Plugin**: Implements the same logic as the existing scaffold loader.
- **Static File Generation Plugin**: Adds a custom plugin for static file generation, capable of modifying files on-the-fly.

Other processes like TypeScript, JSX, CSS, and more are supported out-of-the-box by Vite.

## Structure

The project structure is designed to be intuitive and familiar for developers, including the normal entry point (index.html) inside src and the app that will contain our core application that can handle multiple locations, and the zendesk requirement files translations and the manifest.json. Addition to this there is the rollup folder that will contain some of the build process that mimics the behavior for the previous scaffold.

```
rollup
│
│ static-copy-plugin
│ tranlsation-loader-plugin
│
src
│   app
│   │
│   │───locations
│   │	│
│   │   │ Modal
│   │   │ TicketSideBar
│	 │
│   │───contexts
│   │   │
│   │   │ ClientPovider
│   │   │ TranslationProvider
│   │
│   │───hooks
│   │   │
│   │   │ useClient
│   │   │ useI18n
│
└───translations
│   │ en.json
│   │ ...
│   │
|___assets
│   │logo.png
│   │...
│
│ manifest.json
│ index.html
```

**Key Points**:

- `index.html` serves as the entry point. This design decision, aligned with common practices and discussions with team members, helps simplify scenarios involving multiple locations or modal instances.
- We have integrated two contexts: one for translations and another for the ZAF client, to enhance reusability and avoid props drilling.

# Running the App

To run the scaffold locally, follow these steps:

## Development Environment

```bash
pnpm install
pnpm run dev
```

In another terminal, start the server with:

```bash
zcli apps:server src
```

## Production Environment

First, build the app:

```bash
pnpm run build
```

Then, in another terminal, start the server with:

```bash
zcli apps:server dist
```

## Considerations

The current setup fully exploits Hot Module Replacement (HMR) to provide a faster and better developer experience. This setup involves running the app in two stages/environments: one for development and one for production. This approach ensures instant feedback during development, significantly enhancing productivity. It also emphasizes the importance of modern development practices, making the overall development process more efficient.

## Missing Elements

- **Testing**: Integration of a testing framework is pending. This is crucial for ensuring the reliability and stability of the scaffold. Pretty simple using vitest and the common react testing libries.
- **Possible Use of TypeScript**: We are considering the possibility of using TypeScript for the scaffold. This decision will be influenced by our goals for type safety and development ease.
