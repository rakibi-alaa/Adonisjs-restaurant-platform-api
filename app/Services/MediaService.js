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
    mediaHashedName = mediaHashedName +'.'+ picture.extname;

    await picture.move(Helpers.publicPath(mediaDirectoryPath),{
      name: mediaHashedName,
      overwrite: true
    });
    try{
      const media = new Media();
      media.path = mediaDirectoryPath+'/' +mediaHashedName;
      media.mediable().associate(modelInstance);
      return true;
    }catch (e) {
      console.log(e);
      return false;
    }

  }

  static async UpdateMedia(directory){
    let restaurant = await auth.user.restaurant().fetch();
    try {
      restaurant.merge(request.all());
      await restaurant.save();
      return restaurant;
    }catch (e) {
      console.log(e)
    }
  }

}

module.exports = MediaService;
