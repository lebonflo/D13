import db from '../db';

export default class AuthorController {
  static findById(req, res, next) {
    const { id } = req.params || {};

    if (!id) {
      res.status(400).send({ message: 'Please provide author ID.' });
      return;
    }

    db.query('SELECT COUNT(*) FROM authors WHERE id = $1', [id])
      .then(({ rows }) => {
        if (rows[0].count <= 0) return res.status(404).send({ message: `Author with ID "${id}" not found.` });

        req.authorId = id;
        return next();
      })
      .catch(({ message }) => res.status(500).send({ message }));
  }

  static get(req, res) {
    db.query('SELECT id, name FROM authors')
      .then(result => res.send(result.rows))
      .catch(({ message }) => res.status(500).send({ message }));
  }

  static create(req, res) {
    const { name } = req.body || {};
    if (!name) {
      res.status(400).send({ message: 'Please provide author name.' });
      return;
    }

    db.query('INSERT INTO authors (name) VALUES ($1)', [name])
      .then(() => res.status(201).send())
      .catch(({ message }) => res.status(500).send({ message }));
  }

  static remove(req, res) {
    db.query('DELETE FROM authors where id = $1', [req.authorId])
      .then(() => res.status(203).send())
      .catch(({ message }) => res.status(500).send({ message }));
  }

  static create(req, res) {
    const { name } = req.body || {};
    if (!name) {
      res.status(400).send({ message: 'Please provide author name.' });
      return;
    }

    db.query('INSERT INTO users (name) VALUES ($1)', [name])
      .then(() => res.status(201).send())
      .catch(({ message }) => res.status(500).send({ message }));
  }

  static remove(req, res) {
    db.query('DELETE FROM users where id = $1', [req.userId])
      .then(() => res.status(203).send())
      .catch(({ message }) => res.status(500).send({ message }));
  }

  static update(req, res) {
    const { name } = req.body || {};

    if (!name) {
      res.status(400).send({ message: 'Please provide a new author name.' });
      return;
    }

    db.query('UPDATE authors SET name = $1 WHERE id = $2', [name, req.authorId])
      .then(() => res.send())
      .catch(({ message }) => res.status(500).send({ message }));
  }

  static getAuthor(req, res) {
    db.query('SELECT * FROM authors WHERE id = $1', [req.authorId])
      .then(result => res.send(result.rows[0]))
      .catch(({ message }) => res.status(500).send({ message }));
  }

  static getPosts(req, res) {
    db.query(
      'SELECT name, title, content, created_at FROM authors JOIN posts ON authors.id = posts.author_id WHERE authors.id = $1',
      [req.authorId],
    )
      .then(result => res.send(result.rows))
      .catch(({ message }) => res.status(500).send(message));
  }
}
