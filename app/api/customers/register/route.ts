import { NextRequest, NextResponse } from 'next/server';
import { ReasonPhrases, StatusCodes } from 'http-status-codes';

import prisma from '@/prisma/client';
import schema from './schema';

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

  const { email } = body;
  const emailExists = await prisma.customer.findUnique({ where: { email } });
  if (emailExists) {
    return NextResponse.json(
      {
        statusCode: StatusCodes.BAD_REQUEST,
        statusText: ReasonPhrases.BAD_REQUEST,
        message: 'There is an existing customer with this email',
      },
      { status: StatusCodes.BAD_REQUEST }
    );
  }

  const customer = await prisma.customer.create({
    data: { ...body },
  });

  return NextResponse.json(
    {
      statusText: ReasonPhrases.CREATED,
      message: 'Customer created successfully',
      data: customer,
    },
    { status: StatusCodes.CREATED }
  );
}
