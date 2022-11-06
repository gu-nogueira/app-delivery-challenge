import Sequelize from 'sequelize';

/*
 *  Models
 */

import Users from '../app/models/Users';
import Deliveries from '../app/models/Deliveries';

import databaseConfig from '../config/database';

const models = [Users, Deliveries];

class Database {
  constructor() {
    this.init();
  }

  init() {
    try {
      console.log('Loading database...');
      this.connection = new Sequelize(databaseConfig);
      console.log('Loading models...');
      models
        .map((model) => model.init(this.connection))
        .map(
          (model) => model.associate && model.associate(this.connection.models)
        );
    } catch (err) {
      console.error('Failed to load database: ', err);
    }
  }
}

export default new Database();
