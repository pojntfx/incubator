const getImageNames = async (imagesPath, dirReader, fileStatisticsGetter) =>
  await dirReader(imagesPath).then(fileNames =>
    Promise.all(
      fileNames.map(async imageName => ({
        path: imageName,
        lastUpdate: await fileStatisticsGetter(imagesPath + imageName).then(
          stats => stats.mtime
        )
      }))
    )
  );

export { getImageNames };
