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


// Task 3
  program
  .command('list-files-filtered <bucketName> <regex> [prefix]')
  .description('List an AWS bucket\'s files that match a "filter" regex with an optional prefix')
  .action(async (bucketName: string, regex: string, prefix?: string) => {
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
  });

// task 4
program
.command('delete-files <bucketName> <regex> [prefix]')
.description('Delete all files matching a regex from a bucket with an optional prefix')
.action(async (bucketName: string, regex: string, prefix?: string) => {
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
});
program.parse(process.argv);



