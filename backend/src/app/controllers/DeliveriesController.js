import * as Yup from 'yup';
import { parseISO, isBefore } from 'date-fns';

import Deliveries from '../models/Deliveries';

class DeliveriesController {
  async index(req, res) {
    const { page = 1, perPage = 20 } = req.query;
    const searches = [];

    searches.push(
      Deliveries.findAll({
        order: [['id', 'DESC']],
        attributes: [
          'id',
          'client_name',
          'delivery_date',
          'starting_address',
          'destiny_address',
        ],
        limit: perPage,
        offset: (page - 1) * perPage,
      })
    );

    searches.push(Deliveries.count());

    const [rows, total] = await Promise.all(searches);

    return res.json({ rows, total });
  }

  async store(req, res) {
    /*
     *  Schema Validation
     */

    const schema = Yup.object().shape({
      client_name: Yup.string().required(),
      delivery_date: Yup.date().required(),
      starting_address: Yup.string().required(),
      destiny_address: Yup.string().required(),
    });
    if (!(await schema.isValid(req.body))) {
      return res
        .status(400)
        .json({ error: 'Validation fails, verify request body' });
    }

    const { client_name, delivery_date, starting_address, destiny_address } =
      req.body;

    if (isBefore(parseISO(delivery_date), new Date())) {
      return res.status(400).json({ error: 'Past dates are not permitted' });
    }

    const { id } = await Deliveries.create({
      client_name,
      delivery_date,
      starting_address,
      destiny_address,
    });

    return res.json({
      id,
      client_name,
      delivery_date,
      starting_address,
      destiny_address,
    });
  }
}

export default new DeliveriesController();
