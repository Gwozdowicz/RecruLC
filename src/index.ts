import { program } from 'commander';
import { S3Client, ListObjectsV2Command, PutObjectCommand, DeleteObjectsCommand, ListBucketsCommand } from '@aws-sdk/client-s3';
import { Upload } from '@aws-sdk/lib-storage';
import fs from 'fs';

// vars and clients
const REGION = 'eu-west-1'; // Update to your region
const s3Client = new S3Client({
    region: REGION  });
  



// program init
program
  .version('1.0.0')
  .description('S3 CLI to manage S3 buckets');

// task 1
program
  .command('list-files <bucketName> [prefix]')
  .description('List all files in an S3 bucket with an optional prefix')
  .action(async (bucketName: string, prefix?: string) => {
    console.log(`Listing files in bucket: ${bucketName} with prefix: ${prefix || ''}`);
    try {
      const params = { Bucket: bucketName, Prefix: prefix || '' };
      const data = await s3Client.send(new ListObjectsV2Command(params));
      data.Contents?.forEach(file => console.log(file.Key));
    } catch (err) {
      console.error('Error listing files:', err);
    }
  });

// task 2
program
  .command('upload-file <bucketName> <filePath> <s3Key>')
  .description('Upload a local file to a defined location in the bucket')
  .action(async (bucketName: string, filePath: string, s3Key: string) => {
    console.log(`Uploading file: ${filePath} to bucket: ${bucketName} as ${s3Key}`);
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
  });

program.parse(process.argv);



