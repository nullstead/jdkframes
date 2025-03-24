import { uploadImage, deleteImage, listImages } from '../models/imageModel.js';

export const uploadImageController = async (req, res, next) => {
  
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    console.log(req.file, req.body.title, req.body.description);

    // const result = await uploadImage(req.file);
    // res.status(201).json({ 
    //   message: 'Image uploaded successfully', 
    //   imageUrl: result.Location,
    //   key: result.Key
    // });

  } catch (error) {
    next(error);
  }
};



export const deleteImageController = async (req, res, next) => {

  try {
    const { key } = req.params;
    
    if (!key) {
      return res.status(400).json({ error: 'Image key is required' });
    }

    await deleteImage(key);
    res.status(200).json({ message: 'Image deleted successfully' });
  } catch (error) {
    next(error);
  }

};



export const listImagesController = async (req, res, next) => {

  try {
    const images = await listImages();
    res.render('gallery/index', { images });
  } catch (error) {
    next(error);
  }

};