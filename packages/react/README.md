*Use of this software is subject to important terms and conditions as set forth in the License file*

# React App Scaffold

## Description

This repo contains a scaffold to help developers build [apps for Zendesk products](https://developer.zendesk.com/apps/docs/apps-v2/getting_started).

## Getting Started

### Dependencies

- [Node.js](https://nodejs.org/en/) >= 18.12.1
- [Ruby](https://www.ruby-lang.org/) = 2.6.x

### Setup

1. Clone or fork this repo
2. Change (`cd`) into the `app_scaffolds/packages/react` directory
3. Run `pnpm install`

To run your app locally in Zendesk, you need the latest [Zendesk CLI](https://github.com/zendesk/zcli).

### Running locally

To serve the app to your Zendesk instance with `?zcli_apps=true`, follow the steps below based on your environment:

#### Development Environment

1. Open a new terminal and run the command:

```
pnpm run dev
```

2. Open another terminal in the `app_scaffolds/packages/react` directory and run:

```
pnpm run start
```

> **Note:** Running the `pnpm run dev` command enables Hot Module Replacement (HMR), which allows you to see the changes you make to your code immediately without having to manually refresh the page. This greatly enhances the development experience.

#### Production Environment

1. Open a new terminal and run the command:

```
pnpm run build
```

2. Open another terminal in the `app_scaffolds/packages/react` directory and run:

```
pnpm run start:prod
```

## But why?

The App Scaffold includes many features to help you maintain and scale your app. Some of the features provided by the App Scaffold are listed below. However, you don't need prior experience in any of these to be able to use the scaffold successfully.

- [ECMAScript](https://esbuild.github.io/content-types/#javascript) (ES2022)

  Vite supports the latest ECMAScript standards, including ES2022. This allows you to use modern JavaScript features such as class static initialization blocks, private instance methods and fields, the `at` method for arrays, public instance fields, top-level `await`, `Object.hasOwn`, and many more. Vite uses ESBuild for [fast transpilation](https://esbuild.github.io/) and Rollup for efficient module bundling and performance optimization. ESBuild ensures compatibility with the latest ECMAScript features for an enhanced development experience.

- [Zendesk Garden](https://garden.zendesk.com/) React UI components

  Collection of React components optimized for Zendesk products, designed to handle a range of user input devices and support right-to-left layouts, with subtle animations for enhanced user experience.

- [Vite](https://vitejs.dev/) with Rollup under the hood

  Vite leverages Rollup as its underlying bundler for fast, efficient module bundling and serving of your web application. It enhances development speed with lightning-fast hot module replacement (HMR) and optimized build performance.

- [PostCSS](https://postcss.org/) stylesheets

  PostCSS transforms your stylesheets using JavaScript plugins, supporting CSS linting, variables, mixins, future syntax transpilation, and image inlining among other features, seamlessly integrated into Vite for enhanced CSS development workflow.

- [Optimized Build](https://vitejs.dev/guide/build.html)

  Vite provides optimized production builds with features like code splitting, tree shaking, and pre-bundling, ensuring fast and efficient deployment of your application.

- [Vitest](https://github.com/vitejs/vitest) JavaScript testing framework

  Vitest, built for Vite, is used for unit and integration testing of your application. It integrates seamlessly with Vite's testing ecosystem, offering efficient and reliable test coverage for your codebase.

## Folder structure

The folder and file structure of the App Scaffold is as follows:

| Name                           | Description                                                                                  |
| :----------------------------- | :------------------------------------------------------------------------------------------- |
| [`.github/`](#.github)         | The folder to store PULL_REQUEST_TEMPLATE.md, ISSUE_TEMPLATE.md and CONTRIBUTING.md, etc     |
| [`dist/`](#dist)               | The folder in which vite packages the built version of your app                              |
| [`spec/`](#spec)               | The folder in which all of your test files live                                              |
| [`src/`](#src)                 | The folder in which all of your source JavaScript, CSS, templates and translation files live |
| [`rollup/`](#src)              | static-copy-plugin and translations-loader-plugin to support i18n in the application         |
| [`vite.config.js`](#vite)      | Configuration file for vite                                                                  |
| [`package.json`](#packagejson) | Configuration file for Project metadata, dependencies and build scripts                      |

#### dist

The dist directory is created when you run the app building scripts. You will need to package this folder when submitting your app to the Zendesk Apps Marketplace. It is also the folder you will have to serve when using [ZCLI](https://developer.zendesk.com/documentation/apps/app-developer-guide/zcli/). It includes your app's manifest.json file, an assets folder with all your compiled JavaScript and CSS as well as HTML and images.

#### spec

The spec directory is where all your tests and test helpers live. Tests are not required to submit/upload your app to Zendesk and your test files are not included in your app's package; however, it is good practice to write tests to document functionality and prevent bugs.

#### src

The src directory is where your raw source code lives. The App Scaffold includes different directories for JavaScript, stylesheets, templates, images, and translations. Most of your additions will be in here (and spec, of course!).

#### vite.config.js

`vite.config.js` is the configuration file for [Vite](https://vitejs.dev/). Vite is a fast build tool that leverages ESBuild for transpilation and Rollup for bundling. This file includes configurations for building, testing, and other customizations.

- You can modify ESBuild settings directly within this file to adjust transpilation options. For more information, see the [Vite documentation on ESBuild](https://vitejs.dev/config/#esbuild).

- **Static Copy Plugin**: This plugin is used to copy static assets to the `dist` directory during the build process.
- **Translations Loader Plugin**: This plugin processes translation files at build time, converting `.json` translation files to JavaScript objects for the app.

#### package.json

package.json is the configuration file for [pnpm](https://pnpm.io/), which is a package manager for JavaScript. This file includes information about your project and its dependencies. For more information on how to configure this file, see [pnpm package.json](https://pnpm.io/package_json).

### I18n

The I18n (internationalization) module in `/src/lib/i18n.js` provides a `t` method to look up translations based on a key. For more information, see [Using the I18n module](https://github.com/zendesk/app_scaffolds/blob/master/packages/react/doc/i18n.md).

## Parameters and Settings

If you need to test your app with a `parameters` section in `dist/manifest.json`, foreman might crash with a message like:

> Would have prompted for a value interactively, but zcli is not listening to keyboard input.

To resolve this problem, set default values for parameters or create a `settings.yml` file in the root directory of your app scaffold-based project, and populate it with your parameter names and test values. For example, using a parameters section like:

```json
{
  "parameters": [
    {
      "name": "myParameter"
    }
  ]
}
```

create a `settings.yml` containing:

```yaml
myParameter: 'some value!'
```

## Testing

The App Scaffold is currently setup for testing with [Vitetest](https://vitest.dev/). To run specs, open a new terminal and run

```
pnpm run test
```

Specs live under the `spec` directory.

## Deploying

To check that your app will pass the server-side validation check, run

```
zcli apps:validate dist
```

If validation is successful, you can upload the app into your Zendesk account by running

```
zcli apps:create dist
```

To update your app after it has been created in your account, run

```
zcli apps:update dist
```

Or, to create a zip archive for manual upload, run

```
zcli apps:package dist
```

taking note of the created filename.

For more information on the Zendesk CLI please see the [documentation](https://developer.zendesk.com/documentation/apps/app-developer-guide/zcli/).

## Contribute

- Put up a PR into the master branch.
- CC and get a +1 from @zendesk/wattle.

## Bugs

Submit Issues via [GitHub](https://github.com/zendesk/app_scaffolds/issues/new) or email support@zendesk.com.

## Useful Links

Links to maintaining team, confluence pages, Datadog dashboard, Kibana logs, etc

- https://developer.zendesk.com/
- https://github.com/zendesk/zendesk_apps_tools
- https://esbuild.github.io/
- https://vitejs.dev/
- https://developer.zendesk.com/documentation/apps/build-an-app/using-react-in-a-support-app/

## Copyright and license

Copyright 2018 Zendesk

Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except in compliance with the License.

You may obtain a copy of the License at
http://www.apache.org/licenses/LICENSE-2.0
Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the specific language governing permissions and limitations under the License.
