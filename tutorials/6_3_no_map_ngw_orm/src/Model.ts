import { PolygonLayer, NgwResource, Column } from "@nextgis/ngw-orm";

@NgwResource({
  type: "vector_layer",
  display_name: "Лесосеки",
})
export default class Plot extends PolygonLayer {
  @Column({
    display_name: "Субъект РФ",
    datatype: "STRING",
  })
  REG!: string;

  @Column({
    display_name: "Муниципальный район",
    datatype: "STRING",
  })
  MUN!: string;

  @Column({
    display_name: "Лесничество",
    datatype: "STRING",
  })
  LES!: string;

  @Column({
    display_name: "Участковое лесничество",
    datatype: "STRING",
  })
  UCH_LES!: string;

  @Column({
    display_name: "Участок",
    datatype: "STRING",
  })
  UCHASTOK!: string;

  @Column({
    display_name: "Урочище (дача)",
    datatype: "STRING",
  })
  UROCH!: string;

  @Column({
    display_name: "Номер лесного квартала",
    datatype: "STRING",
  })
  KV!: string;

  @Column({
    display_name: "Номер(а) лесотаксационных выделов",
    datatype: "STRING",
  })
  VD!: string;

  @Column({
    display_name: "Номер лесосеки",
    datatype: "REAL",
  })
  NOM_LESKEY!: number;

  @Column({
    display_name: "№ договора аренды",
    datatype: "STRING",
  })
  NOM_DOG!: string;

  @Column({
    display_name: "Номер лесной декларации",
    datatype: "STRING",
  })
  DECL_NOM!: string;

  @Column({
    display_name: "Дата начала действия лесной декларации",
    datatype: "DATE",
  })
  DECL_BEGIN!: Date;

  @Column({
    display_name: "Дата окончания действия лесной декларации",
    datatype: "DATE",
  })
  DECL_END!: Date;

  @Column({
    display_name: "Дата окончания лесной декларации с учетом продления",
    datatype: "DATE",
  })
  DECL_END_LONG!: Date;

  @Column({
    display_name: "Дата начала разработки",
    datatype: "DATE",
  })
  DATE!: Date;

  @Column({
    display_name: "Год разработки",
    datatype: "STRING",
  })
  YEAR_DEV!: string;

  @Column({
    display_name: "Вид рубки",
    datatype: "STRING",
  })
  TYPE_RUB!: string;

  @Column({
    display_name: "Форма рубки",
    datatype: "STRING",
  })
  FORMA_RUB!: string;

  @Column({
    display_name: "Площадь лесосеки общая, га",
    datatype: "REAL",
  })
  AREA_PLAN!: number;

  @Column({
    display_name: "Площадь эксплуатационная, га",
    datatype: "REAL",
    grid_visibility: false,
  })
  AREA_OPER!: number;

  @Column({
    display_name: "Вырубаемая древесная порода",
    datatype: "STRING",
    grid_visibility: true,
  })
  PORODA!: string;

  @Column({
    display_name: "Хозяйство",
    datatype: "STRING",
  })
  FARM!: string;

  @Column({
    display_name: "Состав насаждения",
    datatype: "STRING",
  })
  COMPOSITION!: string;

  @Column({
    display_name: "Декларируемый объем заготовки, кбм",
    datatype: "REAL",
  })
  VOLUME!: number;

  @Column({
    display_name: "Фактический объем вырубленной древесины, кбм",
    datatype: "REAL",
  })
  VOLUME_REA!: number;

  @Column({
    display_name: "Подрядчик на заготовке",
    datatype: "STRING",
  })
  CONTRACTOR!: string;

  @Column({
    display_name: "Отвод произвел Ф.И.О.",
    datatype: "STRING",
  })
  SENDER_NAM!: string;

  @Column({
    display_name: "Проектируемый тип лесовосстановительного мероприятия",
    datatype: "STRING",
  })
  TYPE_MER!: string;

  @Column({
    display_name: "Номер и дата акта осмотра мест рубок",
    datatype: "STRING",
  })
  NOM_DATE_RUB!: string;

  @Column({
    display_name: "Тип леса",
    datatype: "STRING",
  })
  TYPE_LES!: string;

  @Column({
    display_name: "Основная порода подроста",
    datatype: "STRING",
  })
  MAIN_PORODA!: string;

  @Column({
    display_name: "Количество сохраненного подроста шт/га",
    datatype: "STRING",
  })
  QUANT_PODROST!: string;

  @Column({
    display_name:
      "Фактический (назначенный) тип лесовосстановительного мероприятия",
    datatype: "STRING",
  })
  FACT_TYPE_MER!: string;

  @Column({
    display_name: "Год проведения лесовосстановления",
    datatype: "INTEGER",
  })
  YEAR_MER!: number;

}
