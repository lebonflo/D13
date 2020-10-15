import db from '../db';

const TABLE = 'comments';
export default class CommentController {
    static findById(req, res, next) {
        const { id } = req.params || {};
        if (!id) {
            res.status(400).send({ message: 'Please provide comment ID.' });
            return;
          }
      
          db.query(`SELECT COUNT(*) FROM ${TABLE} WHERE id = $1`, [id])
            .then(({ rows }) => {
              if (rows[0].count <= 0) return res.status(404).send({ message: `Comment with ID "${id}" not found.` });
      
              req.commentId = id;
              return next();
            })
            .catch(({ message }) => res.status(500).send({ message }));
        }
      
       
        static get(req, res) {
          db.query(`SELECT * FROM ${TABLE}`)
            .then(result => res.send(result.rows))
            .catch(({ message }) => res.status(500).send({ message }));
        }
        static create(req, res) {
            const { author_id: authorId, title, content } = req.body || {};
        
            if (!authorId) {
              res.status(400).send({ message: 'Please provide post author ID.' });
              return;
            }
        
            if (!title || !content) {
              res.status(400).send({ message: 'Comment content are required.' });
              return;
            }
        
            db.query(`INSERT INTO ${TABLE} (author_id, title, content) VALUES ($1, $2, $3)`, [
              authorId,
              title,
              content,
            ])
              .then(() => res.status(201).send())
              .catch(({ message }) => res.status(500).send({ message }));
          }
}
