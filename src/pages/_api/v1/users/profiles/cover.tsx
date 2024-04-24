import { NextApiRequest, NextApiResponse } from "next";
import { handleApiError } from "../../../_error";
import { api } from "../../../../../services/api";
import { UploadToBucketService } from "../../../_services/upload-to-bucker-service";
import { prismaClient } from "../../../_prisma";
import { writeFile } from "../../../_utils/write-file";

const uploadToBucketService = new UploadToBucketService();

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    switch (req.method) {
      case 'PATCH':
        const token = req.headers.authorization?.replace('Bearer ', '');
        const me = await api.getMe(token);

        if (!me) {
          return res.status(401).json({ error: 'Unauthorized' });
        }

        const path = await writeFile(req, `${me.id}-cover.png`);
        const url = await uploadToBucketService.execute(path, `${me.id}-cover.png`);

        console.log(url);

        await prismaClient.users.update({
          where: {
            id: me.id,
          },
          data: {
            coverURL: url,
          }
        });

        return res.status(200).json({ avatar: url });
      default:
        res.status(405).json({ error: 'Method not allowed' });
        break;
    }
  } catch (err) {
    handleApiError(err, res);
  }
}

export default handler;

export const config = {
  api: {
    bodyParser: false,
  }
}
