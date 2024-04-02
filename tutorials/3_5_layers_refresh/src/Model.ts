import { PolygonLayer, NgwResource, Column } from "@nextgis/ngw-orm";

@NgwResource({
  type: "vector_layer",
  display_name: "Plot",
})
export default class Plot extends PolygonLayer {
  @Column({
    display_name: "Region",
    datatype: "STRING",
    label_field: true,
  })
  REG!: string;

  @Column({
    display_name: "Municipal area",
    datatype: "STRING",
  })
  MUN!: string;

  @Column({
    display_name: "Forestry",
    datatype: "STRING",
  })
  LES!: string;

  @Column({
    display_name: "District",
    datatype: "STRING",
  })
  DIST!: string;

  @Column({
    display_name: "Forest quarter number",
    datatype: "STRING",
  })
  KV!: string;

  @Column({
    display_name: "Plot number",
    datatype: "REAL",
  })
  PLOT_NUM!: number;
}
