import { NextApiRequest, NextApiResponse } from "next";
import { ListS3FilesService } from "../../_services/list-s3-files-service";

export const listS3FilesService = new ListS3FilesService();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  switch (req.method) {
    case 'GET':
      const data = await listS3FilesService.execute();

      res.status(200).json(data);
      break;
    default:
      res.status(405).json({ error: 'Method not allowed' });
      break;
  }
}
