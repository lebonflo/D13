export default {
    CREATE_TABLE: `CREATE TABLE IF NOT EXISTS users (
          id serial PRIMARY KEY,
          name VARCHAR (150) NOT NULL,
          role VARCHAR (255) NOT NULL
      )`,
  };
  