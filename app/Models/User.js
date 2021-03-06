'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

/** @type {import('@adonisjs/framework/src/Hash')} */
const Hash = use('Hash')

class User extends Model {
  static boot () {
    super.boot()

    /**
     * A hook to hash the user password before saving
     * it to the database.
     */
    this.addTrait('@provider:Lucid/SoftDeletes')
    this.addHook('beforeSave', async (userInstance) => {
      if (userInstance.dirty.password) {
        userInstance.password = await Hash.make(userInstance.password)
      }
    })
  }

  static get traits () {
    return [
      '@provider:Adonis/Acl/HasRole',
      '@provider:Adonis/Acl/HasPermission',
      '@provider:Morphable'
    ]
  }

  /**
   * A relationship on tokens is required for auth to
   * work. Since features like `refreshTokens` or
   * `rememberToken` will be saved inside the
   * tokens table.
   *
   * @method tokens
   *
   * @return {Object}
   */
  restaurant(){
    return this.hasOne('App/Models/Restaurant')
  }

  orders(){
    return this.hasMany('App/Models/Order')
  }

  products(){
    return this.hasMany('App/Models/Product')
  }

  tokens () {
    return this.hasMany('App/Models/Token')
  }

  pictures(){
    return this.morphOne('App/Models/Media', 'id', 'mediable_id', 'mediable_type')
  }

}

module.exports = User
