const writeImages = async (images, dir, writeImage) =>
  images.map(async ({ imgSrc, amountOfPages }, index) => {
    await writeImage(imgSrc, dir, `${index}-page-1.jpg`);
    // For loops trigger an error in V8, hence this terrible syntax
    if (amountOfPages > 1) {
      await writeImage(
        imgSrc.replace("0.png", "1.png").replace("0.jpg", "1.jpg"),
        dir,
        `${index}-page-2.jpg`
      );
      if (amountOfPages > 3) {
        await writeImage(
          imgSrc.replace("0.png", "2.png").replace("0.jpg", "2.jpg"),
          dir,
          `${index}-page-3.jpg`
        );
      }
    }
  });

export { writeImages };
