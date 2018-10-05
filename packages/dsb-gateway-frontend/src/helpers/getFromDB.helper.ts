import low from "lowdb";

interface IGetFromDBHelper {
  key: string;
  db: low;
}

const getFromDBHelper = (
  key: IGetFromDBHelper["key"],
  db: IGetFromDBHelper["db"]
) => db.read().__wrapped__[key];

export { getFromDBHelper };
