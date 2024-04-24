import { S3Client, ListObjectsCommand } from "@aws-sdk/client-s3";

export class ListS3FilesService {
  private readonly bucketName = "bero-bucket";
  private readonly s3 = new S3Client({ region: 'us-east-1' });
  private readonly prefix = "troll-thumbnails/";

  private getObjectUrl(key: string): string {
    return `https://${this.bucketName}.s3.amazonaws.com/${key}`;
  }

  public async execute() {
    const listObjectsCommand = new ListObjectsCommand({
      Bucket: this.bucketName,
      Prefix: this.prefix,
    });

    const objs = await this.s3.send(listObjectsCommand);

    const files = objs.Contents.map(obj => {
      if (obj.Key === this.prefix) return null;
      return this.getObjectUrl(obj.Key);
    });

    return files.filter(Boolean);
  }
}
