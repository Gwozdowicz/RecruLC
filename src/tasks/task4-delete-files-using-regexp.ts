import { S3Client, ListObjectsV2Command, DeleteObjectsCommand } from '@aws-sdk/client-s3';

export const deleteFiles = async (s3Client: S3Client, bucketName: string, regex: string, prefix?: string) => {
  console.log(`Deleting files in bucket: ${bucketName} with regex: ${regex} and prefix: ${prefix || ''}`);
  try {
    const pattern = new RegExp(regex);
    const params = { Bucket: bucketName, Prefix: prefix || '' };
    const data = await s3Client.send(new ListObjectsV2Command(params));
    const filesToDelete = data.Contents?.filter(file => pattern.test(file.Key as string)).map(file => ({ Key: file.Key })) ?? [];

    if (filesToDelete.length === 0) {
      console.log('No files matched the regex');
      return;
    }

    const deleteParams = {
      Bucket: bucketName,
      Delete: {
        Objects: filesToDelete,
        Quiet: false
      }
    };

    const deleteData = await s3Client.send(new DeleteObjectsCommand(deleteParams));
    console.log('Deleted files:', deleteData.Deleted?.map(file => file.Key).join(', '));
  } catch (err) {
    console.error('Error deleting files:', err);
  }
};
