import { S3Client } from '@aws-sdk/client-s3';
import dotenv from 'dotenv';

dotenv.config();

// Configure S3 client
const s3Client = new S3Client({
  region: process.env.AwsRegion || 'us-east-1',
  credentials: {
    accessKeyId: process.env.AwsAccessKeyID,
    secretAccessKey: process.env.AwsSecretAccessKey
  }
});

export const S3_BUCKET_NAME = process.env.AwsS3BucketName;
export default s3Client;