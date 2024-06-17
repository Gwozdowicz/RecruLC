import { S3Client, ListObjectsV2Command } from '@aws-sdk/client-s3';

export const listFiles = async (
  s3Client: S3Client,
  bucketName: string,
  prefix?: string,
) => {
  console.log(
    `Listing files in bucket: ${bucketName} with prefix: ${prefix || ''}`,
  );
  try {
    const params = { Bucket: bucketName, Prefix: prefix || '' };
    const data = await s3Client.send(new ListObjectsV2Command(params));
    data.Contents?.forEach((file) => console.log(file.Key));
  } catch (err) {
    console.error('Error listing files:', err);
  }
};
