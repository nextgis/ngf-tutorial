# 1.1. Install from CDN

## Theory

CDN services are used to embed a script into an HTML page.
This makes life easier for developers when creating simple GIS applications.

NextGIS Frontend libraries (NGF) are available via two CDN services: unpkg and jsdelivr

### unpkg

```html
<script src="https://unpkg.com/@nextgis/[package]"></script>
<script src="https://unpkg.com/@nextgis/[package]@[version]"></script>
<script src="https://unpkg.com/@nextgis/[package]@[version]/lib/[file]"></script>
```

### jsdelivr

```html
<script src="https://cdn.jsdelivr.net/npm/@nextgis/[package]"></script>
<script src="https://cdn.jsdelivr.net/npm/@nextgis/[package]@[version]/lib/[file]"></script>
```

`[file]` - `[package].[format].prod.js`

`[format]`:

- `global` - browser script
- `cjs` - node module
- `esm-browser` - browser module
- `esm-bundler` - module for bundler systems

### Common

We recommend linking to a specific `[version]` number that you can update manually.
This will help to avoid problems that may occur when updating libraries.

## Practice

To run this example, you need to execute these commands in the terminal

```bash
npm i
npm start
```

Afterwards open [http://localhost:8080](http://localhost:8080).

If you open the file index.html in the console instead, the work of the example will not be complete. Requests to NGW will fail due to CORS limitations. Server `https://demo.nextgis.com` is configured to receive requests from `http://localhost:8080` and `http://127.0.0.1:5500`.

This example is also available [here](https://code.nextgis.com/demo-examples-ngw-webmap)

[LAUNCH](https://githubbox.com/nextgis/ngf-tutorial/tree/master/tutorials/1_1_install_from_cdn) in the `codesandbox.io`.

[BACK TO CONTENT](../../README.md)
