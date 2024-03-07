import express from 'express';
import homeController from '../controller/homeController';
let router = express.Router();

const initWebRoute = (app) => {
  router.get('/', homeController.home);
  router.post('/', homeController.calculate);

  return app.use('/', router);
}

export default initWebRoute;