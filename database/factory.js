'use strict'

/*
|--------------------------------------------------------------------------
| Factory
|--------------------------------------------------------------------------
|
| Factories are used to define blueprints for database tables or Lucid
| models. Later you can use these blueprints to seed your database
| with dummy data.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */
  const Factory = use('Factory');
  const Hash = use('Hash');
const User = use('App/Models/User')

  Factory.blueprint('App/Models/User', async (faker, i, data) => {
    return {
      username: data.username,
      email : data.email,
      password : await Hash.make(data.password)
    }
  });

  Factory.blueprint('Adonis/Acl/Role', (faker, i, data) => {
    return {
      slug: data.slug,
      name: data.name,
      description : data.description
    }
  });

  Factory.blueprint('App/Models/Restaurant',  async (faker,i,data) => {


    return {
      name: faker.word(),
      email : faker.email(),
      description : faker.email(),
      phone : faker.phone({ country: "fr" }),
      allow_ordering : faker.bool(),
      allow_reserving : faker.bool(),
      created_by : data.user_id,
    }
  });


  Factory.blueprint('App/Models/Product',  (faker,i,data) => {
    return {
      title: faker.word(),
      description : faker.email(),
      price : faker.floating({ min: 0, max: 100, fixed: 8 }),
      created_by : data.user_id,
    }
  });

  Factory.blueprint('App/Models/Order', (faker,i,data) => {
    return {
      cutomer_full_name:  faker.prefix()+ faker.name({ nationality: 'en' }),
      cutomer_email : faker.email(),
      cutomer_phone: faker.phone({ country: "fr" }),
      placed_by : data.user_id,
      restaurant_id : data.restaurant_id
    }
  });
