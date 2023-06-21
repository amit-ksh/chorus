import { NextApiRequest, NextApiResponse } from 'next';
import path from 'path';
import multer from 'multer';
import { createRouter } from 'next-connect';
import DatauriParser from 'datauri/parser';

import cloudinary from '../../../lib/cloudinary';
import prisma from '../../../lib/prisma';
import { validateRoute } from '../../../lib/auth';

// disable body parser
export const config = {
  api: {
    bodyParser: false,
  },
};

// create image
const createImage = async (img, name) => {
  // create a neew Data URI parser
  const parser = new DatauriParser();

  const base64Image = parser.format(
    path.extname(img.originalname).toString(),
    img.buffer
  );
  const uploadedImageResponse = await cloudinary.uploader.upload(
    base64Image.content,
    { public_id: name, resource_type: 'image' }
  );
  return uploadedImageResponse;
};

const router = createRouter<NextApiRequest, NextApiResponse>();

router
  .use(multer().any())
  .post(validateRoute)
  .all(
    async (
      req: NextApiRequest & { files: Array<any> },
      res: NextApiResponse
    ) => {
      // get parsed image from multer
      const image = req.files.filter((file) => file.fieldname === 'image')[0];

      const { id, type } = req.body;
      try {
        // // saving image
        const uploadedImage = await createImage(image, id);
        const imageUrl = uploadedImage.url;

        await prisma[type].update({
          where: { id: id },
          data: {
            image: imageUrl,
          },
        });

        return res.status(200).json({
          message: 'Profile image changed successfully',
          image: imageUrl,
        });
      } catch (error) {
        res.status(500).json({ error, data: null });
      }
    }
  );

export default router.handler({
  onError: (err: any, req, res) => {
    console.error(err.stack);
    res.status(err.statusCode || 500).end(err.message);
  },
});
