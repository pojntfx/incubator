import low from "lowdb";

interface IGetAllFromDBHelper {
  db: low;
}

const getAllFromDBHelper = async (db: IGetAllFromDBHelper["db"]) =>
  await db.read().__wrapped__;

export { getAllFromDBHelper };
