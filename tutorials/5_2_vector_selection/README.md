# 4.1. Vector. Selection

## Theory

To set the appearance of the selected objects, the `selectedPaint` parameter is used, which is configured like `paint` ([5_1_vector_painting](../5_1_vector_painting)).

```javascript
NgwMap.create({
  paint: { color: "orange", opacity: 0.6 },
  selectedPaint: { color: "red", opacity: 0.9 },
});
```

### More examples

[vector-paint](https://code.nextgis.com/demo-examples-vector-selection)
[vector-hover-selection](https://code.nextgis.com/demo-examples-vector-hover-selection)

## Practice

To run this example, you need to execute these commands in the terminal

```bash
npm i
npm start
```

And then open [http://localhost:8080](http://localhost:8080).

[LAUNCH](https://githubbox.com/nextgis/ngf-tutorial/tree/master/tutorials/5_2_vector_selection) in the `codesandbox.io`.

[BACK TO CONTENT](../../README.md)
