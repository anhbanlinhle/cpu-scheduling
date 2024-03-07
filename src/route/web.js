import express from 'express';
import homeController from '../controller/homeController';
let router = express.Router();

const initWebRoute = (app) => {
  router.get('/', homeController.home);

  return app.use('/', router);
}

export default initWebRoute;