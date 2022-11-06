import { Router } from 'express';

/*
 *  Controllers
 */

import SessionsController from './app/controllers/SessionsController';
import DeliveriesController from './app/controllers/DeliveriesController';

/*
 *  Middlewares
 */

import authMiddleware from './app/middlewares/auth';

const routes = new Router();

routes.post('/sessions', SessionsController.store);

/*
 *  Authentication middleware
 */

routes.use(authMiddleware);

routes.get('/deliveries', DeliveriesController.index);
routes.post('/deliveries', DeliveriesController.store);

export default routes;
