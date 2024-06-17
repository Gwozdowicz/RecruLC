import { S3Client } from '@aws-sdk/client-s3';
import { Upload } from '@aws-sdk/lib-storage';
import fs from 'fs';

export const uploadFile = async (
  s3Client: S3Client,
  bucketName: string,
  filePath: string,
  s3Key: string,
) => {
  console.log(
    `Uploading file: ${filePath} to bucket: ${bucketName} as ${s3Key}`,
  );
  try {
    const fileStream = fs.createReadStream(filePath);
    const uploadParams = {
      Bucket: bucketName,
      Key: s3Key,
      Body: fileStream,
    };
    const upload = new Upload({ client: s3Client, params: uploadParams });
    await upload.done();
    console.log('File uploaded successfully');
  } catch (err) {
    console.error('Error uploading file:', err);
  }
};
