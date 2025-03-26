import { uploadImage, deleteImage, getImages, listImages } from '../models/imageModel.js';
import pgClient from '../config/pgConfig.js'

export const uploadImageController = async (req, res, next) => {
  
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    //console.log(req.file, req.body.description);

    const result = await uploadImage(req.file, req.body.description);
      res.status(201).json({ 
        message: 'Image uploaded successfully', 
        imageUrl: result.Location,
        key: result.Key
    });

  } catch (error) {
    next(error);
  }
};



export const deleteImageController = async (req, res, next) => {

  const { key } = req.params;
  
  try {
    
    const result = await pgClient.query("DELETE FROM images WHERE key = $1", [key]);

    //console.log(result);

    if(result.rowCount === 0){
      return res.status(400).json({ error: 'Image not found!' });
    }

    await deleteImage(key);

    res.status(200).json({ message: 'Image deleted successfully' });

  } catch (error) {
    next(error);
  }

};


export const getImagesController = async (req, res, next) => {

  try {

    const result = await getImages();

    const images = result;

    //console.log(images)
    
    res.render('gallery/index', { images });

  } catch(error) {
    next(error);
  }
}


// export const listImagesController = async (req, res, next) => {

//   try {
//     const images = await listImages();
//     res.render('gallery/index', { images });
//   } catch (error) {
//     next(error);
//   }

// };