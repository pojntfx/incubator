import { fetchDataFromDSB } from "./handlers/fetchDataFromDSB";

export default async () =>
  fetchDataFromDSB().then(() => "New Data has been fetched.");
