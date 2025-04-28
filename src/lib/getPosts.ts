export default async function getPosts() {
  const API_KEY = process.env.NEXT_GET_POSTS_API_KEY;
  const endpoint = `https://nomic-foundation.ghost.io/ghost/api/content/posts?key=${API_KEY}&filter=tag:hardhat`;

  const response = await fetch(endpoint);

  if (!response.ok) {
    throw new Error(`HTTP error! Status: ${response.status}`);
  }

  const data = await response.json();
  return data.posts.slice(0, 3);
}
