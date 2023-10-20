const BASE_URL =
  process.env.NODE_ENV === 'development'
    ? 'http://localhost:3000/api'
    : 'http://localhost:3000/api';

export { BASE_URL };
