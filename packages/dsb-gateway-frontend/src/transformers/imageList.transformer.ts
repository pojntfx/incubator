interface IRawImage {
  url: string;
  fileName: string;
  lastUpdate: string;
}

const imageListTransformer = (rawList: IRawImage[]) =>
  rawList.map(({ url, fileName, lastUpdate }) => ({
    src: url,
    alt: fileName,
    lastUpdate
  }));

export { imageListTransformer };
