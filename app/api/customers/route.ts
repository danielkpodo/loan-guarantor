import { NextRequest, NextResponse } from 'next/server';
import { ReasonPhrases, StatusCodes } from 'http-status-codes';

import authOptions from '../auth/authOptions';
import { getServerSession } from 'next-auth';
import prisma from '@/prisma/client';
import schema from './schema';

export async function GET(request: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json(
      {
        statusCode: StatusCodes.UNAUTHORIZED,
        statusText: ReasonPhrases.UNAUTHORIZED,
        message: 'Unauthorized Access. No token provided',
      },
      { status: 401 }
    );
  }

  const customers = await prisma.customer.findMany({
    include: { loans: {} },
    orderBy: { createdAt: 'desc' },
  });

  return NextResponse.json({
    statusCode: StatusCodes.OK,
    statusText: ReasonPhrases.OK,
    data: customers,
  });
}

export async function POST(request: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json(
      {
        statusCode: StatusCodes.UNAUTHORIZED,
        statusText: ReasonPhrases.UNAUTHORIZED,
        message: 'Unauthorized Access. No token provided',
      },
      { status: 401 }
    );
  }
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

  const { email } = body;
  const emailExists = await prisma.customer.findUnique({ where: { email } });
  if (emailExists) {
    return NextResponse.json(
      {
        statusCode: StatusCodes.BAD_REQUEST,
        statusText: ReasonPhrases.BAD_REQUEST,
        message: 'Customer email already exists',
      },
      { status: StatusCodes.BAD_REQUEST }
    );
  }

  const customer = await prisma.customer.create({
    data: { ...body },
  });

  return NextResponse.json(
    {
      statusCode: StatusCodes.CREATED,
      statusText: ReasonPhrases.CREATED,
      message: 'Customer created successfully',
      data: customer,
    },
    { status: StatusCodes.CREATED }
  );
}
