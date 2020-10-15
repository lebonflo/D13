import db from '../db';

const TABLE = 'posts';
export default class PostController {
    static findById(req, res, next) {
        const { id } = req.params || {};
    
        if (!id) {
          res.status(400).send({ message: 'Please provide user ID.' });
          return;
        }
    
        db.query('SELECT COUNT(*) FROM authors WHERE id = $1', [id])
          .then(({ rows }) => {
            if (rows[0].count <= 0) return res.status(404).send({ message: `User with ID "${id}" not found.` });
    
            req.authorId = id;
            return next();
          })
          .catch(({ message }) => res.status(500).send({ message }));
      }

      static get(req, res) {
        db.query('SELECT id, name FROM users')
          .then(result => res.send(result.rows))
          .catch(({ message }) => res.status(500).send({ message }));
      }
}