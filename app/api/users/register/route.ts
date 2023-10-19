import { NextRequest, NextResponse } from 'next/server';
import { ReasonPhrases, StatusCodes } from 'http-status-codes';

import bcrypt from 'bcryptjs';
import prisma from '@/prisma/client';
import { z } from 'zod';

const schema = z.object({
  email: z
    .string({ required_error: 'Email is required' })
    .email({ message: 'Invalid email address format' }),
  password: z
    .string({ required_error: 'Password is required' })
    .min(8, { message: 'Password must be atleast 8 characters long' }),
});

export async function POST(request: NextRequest) {
  const body = await request.json();

  const validation = schema.safeParse(body);
  if (!validation.success) {
    return NextResponse.json(
      {
        statusCode: StatusCodes.BAD_REQUEST,
        statusText: ReasonPhrases.BAD_REQUEST,
        message: validation.error.errors[0].message,
      },
      { status: StatusCodes.BAD_REQUEST }
    );
  }

  const { email, password } = body;

  const user = await prisma.user.findUnique({ where: { email } });
  if (user) {
    return NextResponse.json(
      {
        statusCode: StatusCodes.BAD_REQUEST,
        statusText: ReasonPhrases.BAD_REQUEST,
        message: 'User already exists',
      },
      { status: StatusCodes.BAD_REQUEST }
    );
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = await prisma.user.create({
    data: { email, hashedPassword },
    select: { id: true, email: true, image: true },
  });

  return NextResponse.json(
    {
      statusText: ReasonPhrases.CREATED,
      message: 'User created successfully',
      data: newUser,
    },
    { status: StatusCodes.CREATED }
  );
}
