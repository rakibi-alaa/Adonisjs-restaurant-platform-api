'use strict'

/*
|--------------------------------------------------------------------------
| MediaService
|--------------------------------------------------------------------------
|
*/

const Helpers = use('Helpers');
const Media = use('App/Models/Media');
const Hash = use('Hash');

class MediaService {

  static async getMedias(modelInstance){
    const medias = await modelInstance.pictures().fetch();
    const paths = medias.rows.map(media => {
      return media.path
    })
    return paths;
  }

  static async getMedia(modelInstance){
    const medias = await modelInstance.pictures().fetch();
    return medias.rows[0].path;
  }

  static async storeMedia(picture,modelInstance,directory){

    const mediaDirectoryPath = 'uploads/' + directory;
    let mediaHashedName = await Hash.make('media'+ new Date().getTime());
    mediaHashedName = mediaHashedName.replace(/[\./]/g,'');

    let filenames = [];
    if(picture._files){
      picture._files.map(async (picture,index) => {
        const finalName  = mediaHashedName + index +'.'+ picture.subtype;
        filenames.push(finalName);

        await picture.move(Helpers.publicPath(mediaDirectoryPath),{
          name: finalName,
          overwrite: true
        });
      });
    }else {
      mediaHashedName = mediaHashedName +'.'+ picture.subtype;
      await picture.move(Helpers.publicPath(mediaDirectoryPath), {
        name: mediaHashedName,
        overwrite: true
      });
    }
    try{
      if(picture._files){
        filenames.map(async (file) =>{
          const media = new Media();
          media.path = mediaDirectoryPath+'/' +file;
          await media.mediable().associate(modelInstance);
        });
        return true;
      }else{
        const media = new Media();
        media.path = mediaDirectoryPath+'/' +mediaHashedName;
        await media.mediable().associate(modelInstance);
        return true;
      }

    }catch (e) {
      console.log(e);
      return false;
    }

  }

  static async UpdateMedia(picture,modelInstance,directory){
    let medias = await modelInstance.pictures().fetch();
    medias.rows.map( async (media) => {
      await media.deleteMedia();
      await media.delete();
    });

    const mediaDirectoryPath = 'uploads/' + directory;
    let mediaHashedName = await Hash.make('media'+ new Date().getTime());
    mediaHashedName = mediaHashedName.replace(/[\./]/g,'') ;
    let filenames = [];

    if(picture._files){

      picture._files.map(async (picture,index) => {
        const finalName  = mediaHashedName + index +'.'+ picture.subtype;
        filenames.push(finalName);

        await picture.move(Helpers.publicPath(mediaDirectoryPath),{
          name: finalName,
          overwrite: true
        });
      });

    }else {
      mediaHashedName = mediaHashedName +'.'+ picture.subtype;
      await picture.move(Helpers.publicPath(mediaDirectoryPath), {
        name: mediaHashedName,
        overwrite: true
      });
    }


    try{

      if(picture._files){

        filenames.map(async (file) =>{
          const media = new Media();
          media.path = mediaDirectoryPath+'/' +file;
          await media.mediable().associate(modelInstance);
        });
        return true;

      }else{
        const media = new Media();
        media.path = mediaDirectoryPath+'/' +mediaHashedName;
        await media.mediable().associate(modelInstance);
        return true;
      }

    }catch (e) {
      console.log(e);
      return false;
    }
  }



}

module.exports = MediaService;
