const startDatabase = (dbFilePath, low, FileSync) => {
  const adapter = new FileSync(dbFilePath);
  const db = low(adapter);

  db.defaults({ lastFetchFromDSBDate: new Date() }).write();

  return db;
};

export { startDatabase };
