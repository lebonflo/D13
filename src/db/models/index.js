import authors from './author';
import posts from './post';
import posts from './user';
import posts from './comment';

export default async (client) => {
  try {
    await client.query(authors.CREATE_TABLE);
    await client.query(users.CREATE_TABLE);
    await client.query(posts.CREATE_TABLE);
    await client.query(comments.CREATE_TABLE);
    console.log(`
    ----------------------
    | Initialized models |
    ----------------------`);
  } catch (error) {
    console.log(error);
  }
};
