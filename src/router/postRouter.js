import express from 'express';
import PostController from '../controllers/postController';

const router = express.Router();

router.param('id', PostController.findById);

router
  .route('/posts')
  .get(PostController.get)
  .post(PostController.create);

router
  .route('/posts/:id')
  .get(PostController.getPost)
  .put(PostController.update)
  .delete(PostController.remove);

export default router;
