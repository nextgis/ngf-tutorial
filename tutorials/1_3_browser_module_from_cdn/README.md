# 1.3. Install from CDN

## Theory

THe modern way to import the library in the browser is to put it directly into the html code of the page. This is not supported by older browsers.

### unpkg

```html
<script type="module">
  import NgwMap from "https://unpkg.com/@nextgis/[package]@[version]/lib/[package].esm-browser.prod.js";
</script>
```

We recommend linking to a specific `[version]` number that you can update manually.
This will help you to avoid problems that may occur when updating libraries.

## Practice

To run this example, you need to execute these commands in the terminal:

```bash
npm i
npm start
```

Open [http://localhost:8080](http://localhost:8080).

If you open the file index.html in the console instead, the work of the example will not be complete. Requests to NGW will fail due to CORS limitations. Server `https://demo.nextgis.com` is configured to receive requests from `http://localhost:8080` and `http://127.0.0.1:5500`.

This example is also available [here](https://code.nextgis.com/demo-examples-ngw-webmap)

[LAUNCH](https://githubbox.com/nextgis/ngf-tutorial/tree/master/tutorials/1_3_browser_module_from_cdn) in the `codesandbox.io`.

[BACK TO CONTENT](../../README.md)
