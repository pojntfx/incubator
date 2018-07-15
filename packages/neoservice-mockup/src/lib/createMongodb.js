import mongoose from "mongoose";

export const createMongodb = async ({ host, port, userName, password }) =>
  userName === undefined || password === undefined
    ? mongoose.connect(`mongodb://${host}:${port}`)
    : mongoose.connect(`mongodb://${userName}:${password}@${host}:${port}`);
