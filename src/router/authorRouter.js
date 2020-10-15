import express from 'express';
import AuthorController from '../controllers/authorController';

const router = express.Router();

router.param('id', AuthorController.findById);

router
  .route('/authors')
  .get(AuthorController.get)
  .post(AuthorController.create);

router
  .route('/authors/:id')
  .get(AuthorController.getAuthor)
  .put(AuthorController.update)
  .delete(AuthorController.remove);

router.route('/authors/:id/posts').get(AuthorController.getPosts);

export default router;
