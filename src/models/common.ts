import {
  NullableDate,
  NullableString,
  NullableNumber,
  NullableBollen,
} from "@/types/types";

export class Common {
  public id: NullableNumber = undefined;

  public created_date: NullableDate = undefined;

  public created_by: NullableNumber = undefined;

  public delete:   NullableBollen = undefined;

  public deleted_by: NullableNumber = undefined;

  public deleted_date: NullableDate = undefined;

  public modified_by: NullableNumber = undefined;

  public modified_date: NullableDate = undefined;

  public _table_name: NullableString = undefined;
}
