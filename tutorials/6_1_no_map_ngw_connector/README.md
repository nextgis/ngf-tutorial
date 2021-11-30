# 4.1. No map. NgwConnector

## Theory

The [@nextgis/new-connector](https://github.com/nextgis/nextgis_frontend/tree/master/packages/new-connector) library is created to simplify interaction with the [NextGIS Web REST API](https://docs.nextgis.ru/docs_ngweb_dev/doc/developer/toc.html).

The library takes responsibility for generating the correct requests to the NGW API, performing authorization, caching, managing the queue of requests, making requests cancellable, handling errors and much more.

When creating connectors with the same baseUrl and user credentials (if present), the same instance will be used

```javascript
const connector1 = new NgwConnector({ baseUrl: "https://demo.nextgis.com" });
const connector2 = new NgwConnector({ baseUrl: "https://demo.nextgis.com" });

console.log(connector1.id === connector2.id); // true
```

### Make request

The [apiRequest](https://code-api.nextgis.com/classes/ngw_connector.default.html#apiRequest) is general ngw api request call method.

The basic scheme of using the library for making requests.

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

The following methods have been added for this purpose:

- [getResource](https://code-api.nextgis.com/classes/ngw_connector.default.html#getResource)
- [getResourceOrFail](https://code-api.nextgis.com/classes/ngw_connector.default.html#getResourceOrFail)
- [getResourceChildren](https://code-api.nextgis.com/classes/ngw_connector.default.html#getResourceChildren)
- [getResourceId](https://code-api.nextgis.com/classes/ngw_connector.default.html#getResourceId)
- [getResourceIdOrFail](https://code-api.nextgis.com/classes/ngw_connector.default.html#getResourceIdOrFail)
- [getResourceParent](https://code-api.nextgis.com/classes/ngw_connector.default.html#getResourceParent)
- [updateResource](https://code-api.nextgis.com/classes/ngw_connector.default.html#updateResource)
- [deleteResource](https://code-api.nextgis.com/classes/ngw_connector.default.html#deleteResource)

When you receive the resource for the first time, it will be cached so that another time there will be no request to the server.

```javascript
connector.getResource(2011).then(() => {
  // No request is sent here
  connector.getResource(2011);
});
```

If you send multiple identical requests, only one request to the server will be executed, and the response will return to all requested functions

```javascript
Promise.all([connector.getResource(2011), connector.getResource(2011)]).then(
  ([resp1, resp2]) => {
    console.log(resp1 === resp2); // true
  }
);
```

### Auth methods

If your web application is running on the same domain with NGW, authorization will be performed via cookies.

But on another domain, you will need to set user credentials.

- [login](https://code-api.nextgis.com/classes/ngw_connector.default.html#login) - connect to NGW with user `login` and `password`;
- [logout](https://code-api.nextgis.com/classes/ngw_connector.default.html#logout) - clear credentials, disconnect connections, clear cache;
- [getUserInfo](https://code-api.nextgis.com/classes/ngw_connector.default.html#getUserInfo) - to know who are you now;
- [getAuthorizationHeaders](https://code-api.nextgis.com/classes/ngw_connector.default.html#getAuthorizationHeaders) - to help you make requests yourself.

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

You can subscribe to `login` and `logout` events

```javascript
connector.emitter.on("login", (user) => console.log(user));
connector.emitter.on("logout", () => console.log());
```

---

The `NgwConnector` is part of other libraries.

In `NgwMap` it can be passed as a parameter

```javascript
const connector = new NgwConnector({ baseUrl });
NgwMap.create({ connector });
```

Or you can extract the created `connector` from the `NgwMap`

```javascript
const ngwMap = new NgwMap({ baseUrl });
const connector = ngwMap.connector;
```

---

The library can be used both in the browser and in the Node.js environment.

### API request names

<details>
  <summary>expand</summary>

| request name                      | url                                                   | arguments        |
| --------------------------------- | ----------------------------------------------------- | ---------------- |
| auth.current_user                 | /api/component/auth/current_user                      |                  |
| auth.group.collection             | /api/component/auth/group/                            |                  |
| auth.group.create                 | /auth/group/create                                    |                  |
| auth.group.delete                 | /auth/group/{0}/delete                                | id               |
| auth.group.edit                   | /auth/group/{0}/edit                                  | id               |
| auth.group.item                   | /api/component/auth/group/{0}                         | id               |
| auth.login_cookies                | /api/component/auth/login                             |                  |
| auth.logout_cookies               | /api/component/auth/logout                            |                  |
| auth.profile                      | /api/component/auth/profile                           |                  |
| auth.register                     | /api/component/auth/register                          |                  |
| auth.user.collection              | /api/component/auth/user/                             |                  |
| auth.user.create                  | /auth/user/create                                     |                  |
| auth.user.delete                  | /auth/user/{0}/delete                                 | id               |
| auth.user.edit                    | /auth/user/{0}/edit                                   | id               |
| auth.user.item                    | /api/component/auth/user/{0}                          | id               |
| collector.resource.read           | /collector/resource/{0}/read                          | id               |
| collector.resource.users          | /collector/resource/{0}/users                         | id               |
| collector.settings                | /api/component/collector/settings                     |                  |
| collector.settings.users          | /collector/user                                       |                  |
| collector.user                    | /collector/user/{0}                                   | user_id          |
| feature_attachment.collection     | /api/resource/{0}/feature/{1}/attachment/             | id,fid           |
| feature_attachment.download       | /api/resource/{0}/feature/{1}/attachment/{2}/download | id,fid,aid       |
| feature_attachment.image          | /api/resource/{0}/feature/{1}/attachment/{2}/image    | id,fid,aid       |
| feature_attachment.item           | /api/resource/{0}/feature/{1}/attachment/{2}          | id,fid,aid       |
| feature_layer.feature.browse      | /resource/{0}/feature/                                | id               |
| feature_layer.feature.collection  | /api/resource/{0}/feature/                            | id               |
| feature_layer.feature.count       | /api/resource/{0}/feature_count                       | id               |
| feature_layer.feature.item        | /api/resource/{0}/feature/{1}                         | id,fid           |
| feature_layer.feature.item_extent | /api/resource/{0}/feature/{1}/extent                  | id,fid           |
| feature_layer.feature.show        | /resource/{0}/feature/{1}                             | id,feature_id    |
| feature_layer.feature.update      | /resource/{0}/feature/{1}/update                      | id,feature_id    |
| feature_layer.field               | /resource/{0}/field/                                  | id               |
| feature_layer.geojson             | /api/resource/{0}/geojson                             | id               |
| feature_layer.identify            | /api/feature_layer/identify                           |                  |
| feature_layer.mvt                 | /api/component/feature_layer/mvt                      |                  |
| feature_layer.store               | /api/resource/{0}/store/                              | id               |
| feature_layer.store.item          | /resource/{0}/store/{1}                               | id,feature_id    |
| file_upload.collection            | /api/component/file_upload/                           |                  |
| file_upload.item                  | /api/component/file_upload/{0}                        | id               |
| file_upload.upload                | /api/component/file_upload/upload                     |                  |
| formbuilder.formbuilder_form_ngfp | /api/resource/{0}/ngfp                                | id               |
| layer.extent                      | /api/resource/{0}/extent                              | id               |
| postgis.connection.inspect        | /api/resource/{0}/inspect/                            | id               |
| postgis.connection.inspect.table  | /api/resource/{0}/inspect/{1}/                        | id,table_name    |
| pyramid.company_logo              | /api/component/pyramid/company_logo                   |                  |
| pyramid.control_panel             | /control-panel                                        |                  |
| pyramid.control_panel.sysinfo     | /control-panel/sysinfo                                |                  |
| pyramid.cors                      | /api/component/pyramid/cors                           |                  |
| pyramid.custom_css                | /api/component/pyramid/custom_css                     |                  |
| pyramid.estimate_storage          | /api/component/pyramid/estimate_storage               |                  |
| pyramid.healthcheck               | /api/component/pyramid/healthcheck                    |                  |
| pyramid.home_path                 | /api/component/pyramid/home_path                      |                  |
| pyramid.kind_of_data              | /api/component/pyramid/kind_of_data                   |                  |
| pyramid.locdata                   | /api/component/pyramid/locdata/{0}/{1}                | component,locale |
| pyramid.logo                      | /api/component/pyramid/logo                           |                  |
| pyramid.pkg_version               | /api/component/pyramid/pkg_version                    |                  |
| pyramid.route                     | /api/component/pyramid/route                          |                  |
| pyramid.settings                  | /api/component/pyramid/settings                       |                  |
| pyramid.statistics                | /api/component/pyramid/statistics                     |                  |
| pyramid.storage                   | /api/component/pyramid/storage                        |                  |
| pyramid.system_name               | /api/component/pyramid/system_name                    |                  |
| qgis.style_qml                    | /api/resource/{0}/qml                                 | id               |
| render.image                      | /api/component/render/image                           |                  |
| render.legend                     | /api/resource/{0}/legend                              | id               |
| render.tile                       | /api/component/render/tile                            |                  |
| render.tile_cache.seed_status     | /api/resource/{0}/tile_cache/seed_status              | id               |
| resource.collection               | /api/resource/                                        |                  |
| resource.create                   | /resource/{0}/create                                  | id               |
| resource.delete                   | /resource/{0}/delete                                  | id               |
| resource.export                   | /api/resource/{0}/export                              | id               |
| resource.file_download            | /api/resource/{0}/file/{1}                            | id,name          |
| resource.item                     | /api/resource/{0}                                     | id               |
| resource.json                     | /resource/{0}/json                                    | id               |
| resource.permission               | /api/resource/{0}/permission                          | id               |
| resource.permission.explain       | /api/resource/{0}/permission/explain                  | id               |
| resource.preview                  | /api/resource/{0}/preview.png                         | id               |
| resource.quota                    | /api/resource/quota                                   |                  |
| resource.resource_export          | /api/component/resource/resource_export               |                  |
| resource.schema                   | /resource/schema                                      |                  |
| resource.search                   | /api/resource/search/                                 |                  |
| resource.show                     | /resource/{0}                                         | id               |
| resource.tree                     | /resource/{0}/tree                                    | id               |
| resource.update                   | /resource/{0}/update                                  | id               |
| resource.volume                   | /api/resource/{0}/volume                              | id               |
| resource.widget                   | /resource/widget                                      |                  |
| spatial_ref_sys.collection        | /api/component/spatial_ref_sys/                       |                  |
| spatial_ref_sys.convert           | /api/component/spatial_ref_sys/convert                |                  |
| spatial_ref_sys.geom_area         | /api/component/spatial_ref_sys/{0}/geom_area          | id               |
| spatial_ref_sys.geom_length       | /api/component/spatial_ref_sys/{0}/geom_length        | id               |
| spatial_ref_sys.geom_transform    | /api/component/spatial_ref_sys/{0}/geom_transform     | id               |
| spatial_ref_sys.get               | /api/component/spatial_ref_sys/{0}                    | id               |
| srs.create                        | /srs/create                                           |                  |
| srs.delete                        | /srs/{0}/delete                                       | id               |
| srs.edit                          | /srs/{0}/edit                                         | id               |
| tmsclient.connection.layers       | /api/component/tmsclient/{0}/layers/                  | id               |
| tracker.export_to_gpx             | /tracker/gpx                                          |                  |
| tracker.get.stops                 | /tracker/stops                                        |                  |
| tracker.get_amd_static_url        | /tracker/amd/static/url/                              |                  |
| tracker.get_device_types          | /tracker/device_types                                 |                  |
| tracker.get_full_tracks           | /tracker/tracks/full                                  |                  |
| tracker.get_last_activity_tracker | /tracker/activity/last                                |                  |
| tracker.get_short_tracks          | /tracker/tracks/short                                 |                  |
| tracker.get_tracker_last_points   | /tracker/last/points                                  |                  |
| tracker.get_tracker_lines         | /tracker/lines                                        |                  |
| tracker.get_tracker_points        | /tracker/points                                       |                  |
| tracker.get_trackers              | /tracker/trackers/tree                                |                  |
| tracker.receive_packet            | /tracker/{0}/receive                                  | unique_id        |
| tracker.reports                   | /tracker/reports/                                     |                  |
| tracker.reports.build             | /tracker/report/build/                                |                  |
| tracker.settings                  | /api/component/tracker/settings                       |                  |
| vector_layer.dataset              | /api/component/vector_layer/dataset                   |                  |
| webmap.annotation.collection      | /api/resource/{0}/annotation/                         | id               |
| webmap.annotation.item            | /api/resource/{0}/annotation/{1}                      | id,annotation_id |
| webmap.display                    | /resource/{0}/display                                 | id               |
| webmap.display.tiny               | /resource/{0}/display/tiny                            | id               |
| webmap.settings                   | /api/component/webmap/settings                        |                  |
| wfsserver.wfs                     | /api/resource/{0}/wfs                                 | id               |
| wmsserver.wms                     | /api/resource/{0}/wms                                 | id               |

</details>

### More examples

[ngw-connector_create](https://codepen.io/rendrom/pen/wvdmapq)
[auth](https://code.nextgis.com/ngw-connector-examples-auth)
[edit-vector-layer-fields](https://code.nextgis.com/ngw-connector-examples-edit-vector-layer-fields)
[resource-table](https://code.nextgis.com/ngw-connector-examples-resource-table)
[search-resources](https://code.nextgis.com/ngw-connector-examples-search-resources)

## Practice

Figure out the example, run it in the Node.js locally or on `codesandbox.io `.

Rewrite the example so that:

- if the layer already exists, it needs to be cleared and filled with new data.
- all points were created in one request;


To run this example, you need to execute these commands in the terminal

```bash
npm i
npm start
```

Look for the script output in the terminal.

[LAUNCH](https://githubbox.com/nextgis/ngf-tutorial/tree/master/tutorials/6_1_vno_map_ngw_connector) in the `codesandbox.io`.

[BACK TO CONTENT](../../README.md)
