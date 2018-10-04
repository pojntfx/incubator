const enableCORS = async res =>
  res.setHeader("Access-Control-Allow-Origin", "*");

export { enableCORS };
