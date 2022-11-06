import Sequelize, { Model } from 'sequelize';

class Deliveries extends Model {
  static init(sequelize) {
    super.init(
      {
        client_name: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        delivery_date: {
          type: Sequelize.DATE,
          allowNull: true,
        },
        starting_address: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        destiny_address: {
          type: Sequelize.STRING,
          allowNull: false,
        },
      },
      {
        sequelize,
      }
    );
    return this;
  }
}

export default Deliveries;
