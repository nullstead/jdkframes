import { 
    PutObjectCommand, 
    DeleteObjectCommand, 
    ListObjectsV2Command 
  } from '@aws-sdk/client-s3';
  import s3Client, { S3_BUCKET_NAME } from '../config/s3Config.js';
  import { randomUUID } from 'crypto';
  import pgClient from '../config/pgConfig.js'
  
  export const uploadImage = async (file, description) => {
    const fileExtension = file.originalname.split('.').pop();
    const key = `${randomUUID()}.${fileExtension}`;
    
    const params = {
      Bucket: S3_BUCKET_NAME,
      Key: key,
      Body: file.buffer,
      ContentType: file.mimetype
    };

    const Key = key;
    const Location = `https://${S3_BUCKET_NAME}.s3.amazonaws.com/${key}`;
  
    await s3Client.send(new PutObjectCommand(params));

    await pgClient.query(
            `INSERT INTO images(key, url, description, added_at) VALUES($1, $2, $3, CURRENT_TIMESTAMP) RETURNING *`,
            [key, Location, description]
          );
    
    return {
      Key,
      Location 
    };
  };

  
  export const deleteImage = async (key) => {
    const params = {
      Bucket: S3_BUCKET_NAME,
      Key: key
    };
  
    return s3Client.send(new DeleteObjectCommand(params));
  };


  //get objects by their meta data from DB
  export const getImages = async () => {

    const db_data = await pgClient.query("SELECT * FROM images");

    return db_data.rows;

  }
  
  //get objects directly from S3
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