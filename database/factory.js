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
  const User = use('App/Models/User')
  const Restaurant = use('App/Models/Restaurant')


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
      name: data.data.name,
      description : data.description
    }
  });

  Factory.blueprint('App/Models/Restaurant', async (faker) => {
    const user = await User.first();
    return {
      name: faker.word(),
      email : faker.email(),
      description : faker.email(),
      phone : faker.phone({ country: "fr" }),
      allow_ordering : faker.bool(),
      allow_reserving : faker.bool(),
      created_by : user.id,
    }
  });


  Factory.blueprint('App/Models/Product', async (faker) => {
    const user = await User.first();
    return {
      title: faker.word(),
      description : faker.email(),
      price : faker.floating({ min: 0, max: 100, fixed: 8 }),
      created_by : user.id,
    }
  });

Factory.blueprint('App/Models/Order', async (faker) => {
  const user = await User.first();
  const restaurant = await Restaurant.first();
  return {
    cutomer_full_name:  faker.prefix()+ faker.name({ nationality: 'en' }),
    cutomer_email : faker.email(),
    cutomer_phone: faker.phone({ country: "fr" }),
    placed_by : user.id,
    restaurant_id : restaurant.id
  }
});
