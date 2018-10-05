import low from "lowdb";

interface IWriteToDBHelperParams {
  key: string;
  value: any;
  db: low;
}

const writeToDBHelper = async (
  key: IWriteToDBHelperParams["key"],
  value: IWriteToDBHelperParams["value"],
  db: IWriteToDBHelperParams["db"]
) => await db.set(key, value).write();

export { writeToDBHelper };
