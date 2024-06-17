import { S3Client, ListObjectsV2Command } from '@aws-sdk/client-s3';

export const listFilesFiltered = async (s3Client: S3Client, bucketName: string, regex: string, prefix?: string) => {
  console.log(`Listing files in bucket: ${bucketName} with regex: ${regex} and prefix: ${prefix || ''}`);
  try {
    const pattern = new RegExp(regex);
    const params = { Bucket: bucketName, Prefix: prefix || '' };
    const data = await s3Client.send(new ListObjectsV2Command(params));
    data.Contents?.forEach(file => {
      if (pattern.test(file.Key as string)) {
        console.log(file.Key);
      }
    });
  } catch (err) {
    console.error('Error listing filtered files:', err);
  }
};