const getImageNames = async (
  imagesPath,
  endpoint,
  dirReader,
  fileStatisticsGetter
) =>
  await dirReader(imagesPath).then(fileNames =>
    Promise.all(
      fileNames.map(async imageName => ({
        url: `${endpoint}/img/${imageName}`,
        fileName: imageName,
        lastUpdate: await fileStatisticsGetter(imagesPath + imageName).then(
          stats => stats.mtime
        )
      }))
    )
  );

export { getImageNames };
