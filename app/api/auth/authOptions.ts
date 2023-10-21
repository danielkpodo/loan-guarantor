import CrendtialsProvider from 'next-auth/providers/credentials';
import { NextAuthOptions } from 'next-auth';
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import bcrypt from 'bcryptjs';
import prisma from '@/prisma/client';

const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    CrendtialsProvider({
      name: 'Crendtials',
      credentials: {
        email: { label: 'Email', type: 'email', placeholder: 'Email Address' },
        password: {
          label: 'Password',
          type: 'password',
          placeholder: 'Enter your password',
        },
      },
      async authorize(credentials, req) {
        if (!credentials?.email || !credentials?.password) return null;

        const user = await prisma.user.findUnique({
          where: { email: credentials.email },
        });

        if (!user) throw new Error('invalid credentials');

        const passwordsMatch = await bcrypt.compare(
          credentials.password,
          user.hashedPassword!
        );

        if (!passwordsMatch) throw new Error('Invalid credentials');
        return user;
      },
    }),
  ],

  session: {
    strategy: 'jwt',
  },

  // include id into user
  callbacks: {
    session: ({ session, token }) => ({
      ...session,
      user: {
        ...session.user,
        id: token.sub,
      },
    }),
  },
  pages: {
    // useful for customizing next-auth auth pages
    signIn: '/',
  },
};

export default authOptions;
