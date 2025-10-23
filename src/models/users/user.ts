import { Helper } from "@/db_pool/helpers";
import { Common } from "../common";
import { NullableString, NullableBollen, NullableNumber } from "@/types/types";

class User extends Common {
  public username: NullableString;
  public salt: NullableString = undefined;
  public hashpass: NullableString = undefined;
  public id_role: NullableNumber = undefined;
  public role_name: NullableString = undefined;
  public isadmin: NullableBollen = undefined;

  constructor(modal?: any) {
    super();
    if (modal) {
      Helper.shallowCopy(modal, this);
    }
  }
}

export default User;
