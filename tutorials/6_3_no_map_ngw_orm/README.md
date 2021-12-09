# 4.1. No map. NgwOrm

**Attention this tutorial is dedicated to a library that is at an early stage of development!**

## Theory

The [@nextgis/ngw-orm](https://github.com/nextgis/nextgis_frontend/tree/master/packages/ngw-orm) is specially designed for the development of large client or server TypeScript solutions in the in which NGW data management takes place.

This library allows you to synchronize typescript classes with NGW resources and convert resources to classes back.

```typescript
// model.ts

import { PolygonLayer, NgwResource, Column } from "@nextgis/ngw-orm";

@NgwResource({
  type: "vector_layer",
  display_name: "My Layer",
})
export default class MyLayer extends PolygonLayer {
  @Column({
    display_name: "Layer name",
    datatype: "STRING",
  })
  name!: string;
}

// view.ts

import { Connection } from "@nextgis/ngw-orm";
import MyLayer from "./model";

const connection = await Connection.connect({
  baseUrl,
  auth: {
    login,
    password,
  },
});
const [resource, created] = await connection.getOrCreateResource(Plot, {
  parent: 0,
});

// script.ts

import path from 'path';
import fs from 'fs';
import { Connection, BaseResource } from '@nextgis/ngw-orm';

const Resource = await connection.receiveResource(resource);
try {
    const name = nameOfClass;
    const ts = Resource.toTypescript(Resource, { name });

    fs.writeFileSync(path.join(out, name + ".ts"), ts.model);
    fs.writeFileSync(path.join(out, "I" + name + ".ts"), ts.interface);

} catch (er) {
  // console.log(er);
}
```

## Practice

- Figure out the example.
- Run the script and create layers based on the model in the [https://sandbox.nextgis.com](https://sandbox.nextgis.com) or in your own NGW instance.
- Change model (uncomment lines in bottom of [Model.ts](./src/Model.ts) file) and run example again.
- Dig into the library [code](https://github.com/nextgis/nextgis_frontend/blob/master/packages/ngw-orm/src/repository/VectorLayer.ts#L146) and look for any other checks, use them. 🤓 Make PR with new checks, why not.
- 🤓 Generate Class and Interface *.ts files for the NGW resource.

To run this example, you need to execute these commands in the terminal

```bash
npm i
npm start
```

Look for the script output in the terminal.

[LAUNCH](https://githubbox.com/nextgis/ngf-tutorial/tree/master/tutorials/6_3_no_map_ngw_orm) in the `codesandbox.io`.

[BACK TO CONTENT](../../README.md)
