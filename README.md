# RecruLC

## How to Run the Code

### 1. Install Dependencies

Before running any tasks, make sure to install the required dependencies:

```sh
npm install
```

Remeber to set Your AWS profile correctly

### 2. Set up environment

Create .env file in project root (package.json level)

provide Your region
```typescript
eg. REGION=eu-central-1

```
- for this task purpose, region should be set to eu-west-1


### 3. Tasks

#### Task 1: List All Files in an S3 Bucket

To list all files in the `developer-task` bucket within the `a-wing/` prefix, run:

```sh
npm run start -- list-files developer-task a-wing/
```

#### Task 2: Upload a Local File to a Defined Location in the Bucket

To upload a local file to the `developer-task` bucket under the `a-wing/` prefix, run:

```sh
npm run start -- upload-file developer-task path-to-file a-wing/gwozdowiczTestFile.txt
```

Replace `path-to-file` with the actual path to the local file you want to upload.

#### Task 3: List Files Matching a Regex in a Prefix

To list files in the `developer-task` bucket under the `a-wing/` prefix that match a specific regex pattern (e.g., all `.txt` files), run:

```sh
npm run start -- list-files-filtered developer-task insert-regexp-here a-wing/  
```
example regexp: '.*\.txt$'

#### Task 4: Delete Files Matching a Regex from a Bucket

To delete all files in the `developer-task` bucket under the `a-wing/` prefix that contain `TestFile.txt` in their name, run:

```sh
npm run start -- delete-files developer-task insert-regexp-here a-wing/
```
example regexp: '.*TestFile\.txt$'

## Notes

- Ensure that you have the appropriate AWS credentials configured and that your IAM user or role has the necessary permissions to perform the listed actions on the S3 bucket.
