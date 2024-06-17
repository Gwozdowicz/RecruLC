import { program } from 'commander';
import { S3Client } from '@aws-sdk/client-s3';
import { listFiles } from './tasks/task1-list-files';
import { uploadFile } from './tasks/task2-upload-file';
import { listFilesFiltered } from './tasks/task3-find-files';
import { deleteFiles } from './tasks/task4-delete-files-using-regexp';

// import Region from CONFIG FILE
import { REGION } from './config';

// vars and clients
const s3Client = new S3Client({
    region: REGION  }); 

// CLI program initialization
program
  .version('1.0.0')
  .description('S3 CLI to manage S3 buckets');

// Task 1
program
  .command('list-files <bucketName> [prefix]')
  .description('List all files in an S3 bucket with an optional prefix')
  .action((bucketName: string, prefix?: string) => {
    listFiles(s3Client, bucketName, prefix);
  });

// Task 2
program
  .command('upload-file <bucketName> <filePath> <s3Key>')
  .description('Upload a local file to a defined location in the bucket')
  .action((bucketName: string, filePath: string, s3Key: string) => {
    uploadFile(s3Client, bucketName, filePath, s3Key);
  });

// Task 3
program
  .command('list-files-filtered <bucketName> <regex> [prefix]')
  .description('List an AWS bucket\'s files that match a "filter" regex with an optional prefix')
  .action((bucketName: string, regex: string, prefix?: string) => {
    listFilesFiltered(s3Client, bucketName, regex, prefix);
  });

// Task 4
program
  .command('delete-files <bucketName> <regex> [prefix]')
  .description('Delete all files matching a regex from a bucket with an optional prefix')
  .action((bucketName: string, regex: string, prefix?: string) => {
    deleteFiles(s3Client, bucketName, regex, prefix);
  });


// CLI program execute
program.parse(process.argv);