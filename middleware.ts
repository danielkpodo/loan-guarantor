export { default } from 'next-auth/middleware';

export const config = {
  matcher: ['/customers/:id*', '/loans/:id'],
};
