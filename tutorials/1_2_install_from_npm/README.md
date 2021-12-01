# 1.2. Install from NPM

## Theory

Installing dependencies via npm is recommended when developing complex web applications using build systems such as webpack.

### Instal packages

```bash
npm i -S @nextgis/[package]
```

```bash
yarn add @nextgis/[package]
```

### Usage

Import the [package] in the project modules:

```javascript
import Package from '@nextgis/[package]';
// or
import { Component, utility } from '@nextgis/[package]';

const package = new Package(options);
```

## Practice

To run this example, you need to execute these commands in the terminal:

```bash
npm i
npm start
```

Open [http://localhost:8080](http://localhost:8080).

[LAUNCH](https://githubbox.com/nextgis/ngf-tutorial/tree/master/tutorials/1_2_install_from_npm) in the `codesandbox.io`.

[BACK TO CONTENT](../../README.md)
