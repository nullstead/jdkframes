import { 
    PutObjectCommand, 
    DeleteObjectCommand, 
    ListObjectsV2Command 
  } from '@aws-sdk/client-s3';
  import s3Client, { S3_BUCKET_NAME } from '../config/s3Config.js';
  import { randomUUID } from 'crypto';
  
  export const uploadImage = async (file) => {
    const fileExtension = file.originalname.split('.').pop();
    const key = `${randomUUID()}.${fileExtension}`;
    
    const params = {
      Bucket: S3_BUCKET_NAME,
      Key: key,
      Body: file.buffer,
      ContentType: file.mimetype
    };
  
    await s3Client.send(new PutObjectCommand(params));
    
    return {
      Key: key,
      Location: `https://${S3_BUCKET_NAME}.s3.amazonaws.com/${key}`
    };
  };
  
  export const deleteImage = async (key) => {
    const params = {
      Bucket: S3_BUCKET_NAME,
      Key: key
    };
  
    return s3Client.send(new DeleteObjectCommand(params));
  };
  
  export const listImages = async () => {
    const params = {
      Bucket: S3_BUCKET_NAME,
    };
  
    const data = await s3Client.send(new ListObjectsV2Command(params));
    
    return data.Contents?.map(item => ({
      key: item.Key,
      lastModified: item.LastModified,
      size: item.Size,
      url: `https://${S3_BUCKET_NAME}.s3.amazonaws.com/${item.Key}`
    })) || [];
  };