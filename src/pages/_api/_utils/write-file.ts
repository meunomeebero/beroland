import { NextApiRequest } from "next";
import { Formidable } from "formidable";
import fs from 'fs';

export const writeFile = async (req: NextApiRequest, imageName: string) => {
  return new Promise<string>((resolve, reject) => {
    const form = new Formidable();

    form.parse(req, async (err, _, files) => {
      if (err) {
        reject(err);
      }

      const imageFile = files.image[0];

      if (!imageFile) {
        reject(new Error('Invalid or missing image file'));
      }

      // Specify the path where you want to save the image
      const imagePath = `/tmp/${imageName}`;

      // Create a read stream using the file's filepath
      const readStream = fs.createReadStream(imageFile.filepath);
      const writeStream = fs.createWriteStream(imagePath);

      readStream.pipe(writeStream);

      writeStream.on('finish', () => {
        resolve(imagePath);
      });

      writeStream.on('error', () => {
        reject(new Error('Error writing the image file' ));
      });
    });
  })
};
