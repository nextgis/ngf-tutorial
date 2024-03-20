# 6.1. No map. NgwConnector

## Theory

The [@nextgis/ngw-connector](https://github.com/nextgis/nextgis_frontend/tree/master/packages/ngw-connector) library is created to simplify interaction with the [NextGIS Web REST API](https://docs.nextgis.com/docs_ngweb_dev/doc/developer/toc.html).

The library is responsible for generating the correct requests to the NGW API, performing authorization, caching, managing the queue of requests, making requests cancellable, handling errors and much more.

When creating connectors with the same baseUrl and user credentials (if present), the same instance will be used:

```javascript
const connector1 = new NgwConnector({ baseUrl: "https://demo.nextgis.com" });
const connector2 = new NgwConnector({ baseUrl: "https://demo.nextgis.com" });

console.log(connector1.id === connector2.id); // true
```

### Make request

The [apiRequest](https://code-api.nextgis.com/classes/ngw_connector.default.html#apiRequest) is general NGW api request call method.

The basic scheme of using the library for making requests:

```txt
connector.apiRequest([api-request-name], [Params], [RequestOptions])
```

But with shortcut methods, the order is different!

```txt
connector.get([api-request-name], [RequestOptions], [Params])
```

- [api-request-name](#api-request-names) - allowed request name in NGW router;
- [Params](https://code-api.nextgis.com/interfaces/ngw_connector.Params.html) - query params;
- [RequestOptions](https://code-api.nextgis.com/interfaces/ngw_connector.RequestOptions.html) - options for managing the request.

```javascript
const connector = new NgwConnector({ baseUrl, auth: { login, password } });
connector
  .apiRequest(
    "resource.item",
    {
      id: 4011,
    },
    { cache: true, method: "GET" }
  )
  .then((resp) => {
    console.log(resp);
  });
```

Use [makeQuery](https://code-api.nextgis.com/classes/ngw_connector.default.html#makeQuery) to make a low-level URL request call method.

```javascript
connector.makeQuery("/api/component/auth/current_user").then((resp) => {});
```

#### Shortcut request methods

- get
- put
- post
- patch
- delete

```javascript
connector.get("resource.item", null, { id }).then((resp) => {});
```

### Helper methods for interacting with resources

Very often, when working on a project or when developing others libraries, you need to interact with NGW resources.

The following methods are used:

- [getResource](https://code-api.nextgis.com/classes/_nextgis_ngw_connector.default.html)
- [getResourceOrFail](https://code-api.nextgis.com/classes/_nextgis_ngw_connector.default.html#getResourceIdOrFail)
- [getResourceChildren](https://code-api.nextgis.com/classes/_nextgis_ngw_connector.default.html#getResourceChildren)
- [getResourceId](https://code-api.nextgis.com/classes/_nextgis_ngw_connector.default.html#getResourceChildren)
- [getResourceIdOrFail](https://code-api.nextgis.com/classes/_nextgis_ngw_connector.default.html#getResourceChildren)
- [getResourceParent](https://code-api.nextgis.com/classes/_nextgis_ngw_connector.default.html#getResourceChildren)
- [updateResource](https://code-api.nextgis.com/classes/_nextgis_ngw_connector.default.html#getResourceChildren)
- [deleteResource](https://code-api.nextgis.com/classes/_nextgis_ngw_connector.default.html#getResourceChildren)

When you receive the resource for the first time, it will be cached so that another time there will be no request to the server.

```javascript
connector.getResource(6246).then(() => {
  // No request is sent here
  connector.getResource(6246);
});
```

If you send multiple identical requests, only one request to the server will be executed, and the response will be returned to all requested functions:

```javascript
Promise.all([connector.getResource(6246), connector.getResource(6246)]).then(
  ([resp1, resp2]) => {
    console.log(resp1 === resp2); // true
  }
);
```

### Auth methods

If your web application is running on the same domain with NGW, authorization will be performed via cookies.

If domain is different, you will need to set user credentials.

- [login](https://code-api.nextgis.com/classes/_nextgis_ngw_connector.default.html#getResourceChildren) - connect to NGW with user `login` and `password`;
- [logout](https://code-api.nextgis.com/classes/_nextgis_ngw_connector.default.html#getResourceChildren) - clear credentials, disconnect connections, clear cache;
- [getUserInfo](https://code-api.nextgis.com/classes/_nextgis_ngw_connector.default.html#getResourceChildren) - find out who you are;
- [getAuthorizationHeaders](https://code-api.nextgis.com/classes/_nextgis_ngw_connector.default.html#getAuthorizationHeaders) - help you make requests yourself.

```javascript
const connector = new NgwConnector({
  baseUrl: "https://demo.nextgis.com",
  auth: { login, password },
});
connector.connect().then(() => {
  connector.logout();
  connector.login({ login, password }).then(() => {
    connector.getUserInfo().then((user) => {
      console.log(user);
    });
  });
});
```

You can subscribe to `login` and `logout` events:

```javascript
connector.emitter.on("login", (user) => console.log(user));
connector.emitter.on("logout", () => console.log());
```

---

The `NgwConnector` is part of other libraries.

It can be passed as a parameter in `NgwMap`:

```javascript
const connector = new NgwConnector({ baseUrl });
NgwMap.create({ connector });
```

Or you can extract the created `connector` from the `NgwMap`:

```javascript
const ngwMap = new NgwMap({ baseUrl });
const connector = ngwMap.connector;
```

---

The library can be used both in the browser and in the Node.js environment.

### API request names

Api request names are available in the Swagger API panel <https://demo.nextgis.com/doc/api#>

### More examples

- [ngw-connector_create](https://codepen.io/rendrom/pen/wvdmapq)
- [auth](https://code.nextgis.com/ngw-connector-examples-auth)
- [edit-vector-layer-fields](https://code.nextgis.com/ngw-connector-examples-edit-vector-layer-fields)
- [resource-table](https://code.nextgis.com/ngw-connector-examples-resource-table)
- [search-resources](https://code.nextgis.com/ngw-connector-examples-search-resources)

## Practice

Figure out the example, run it in the Node.js locally or on `codesandbox.io`.

Rewrite the example so that:

- if the layer already exists, it needs to be cleared and filled with new data.
- all points were created in one request;

To run this example, you need to execute these commands in the terminal:

```bash
npm i
npm start
```

Look for the script output in the terminal.

[LAUNCH](https://githubbox.com/nextgis/ngf-tutorial/tree/master/tutorials/6_1_vno_map_ngw_connector) in the `codesandbox.io`.

[BACK TO CONTENT](../../README.md)
