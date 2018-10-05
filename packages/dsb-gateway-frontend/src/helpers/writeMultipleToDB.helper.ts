import low from "lowdb";

interface IWriteMutlipleToDBHelperParams {
  items: [string, any][];
  db: low;
}

const writeMultipleToDBHelper = async (
  items: IWriteMutlipleToDBHelperParams["items"],
  db: IWriteMutlipleToDBHelperParams["db"]
) => await items.map(([key, value]) => db.set(key, value).write());

export { writeMultipleToDBHelper };
