import express from 'express';
import UserController from '../controllers/userController';

const router = express.Router();

router.param('id', UserController.findById);

router
  .route('/users')
  .get(UserController.get)
  .post(UserController.create);

router
  .route('/users/:id')
  .get(UserController.getPost)
  .put(UserController.update)
  .delete(UserController.remove);

export default router;
