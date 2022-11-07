import { faker } from '@faker-js/faker';
import { factory } from 'factory-girl';

/*
 *  Models
 */

import Users from '../src/app/models/Users';
import Deliveries from '../src/app/models/Deliveries';

/*
 *  Populate models
 */

factory.define('Users', Users, {
  name: faker.name.findName(),
  email: faker.internet.email(),
  password: faker.internet.password(),
});

factory.define('Deliveries', Deliveries, {
  client_name: faker.name.findName(),
  delivery_date: faker.date.future(),
  starting_address: faker.address.streetAddress(),
  destiny_address: faker.address.streetAddress(),
});

export default factory;
