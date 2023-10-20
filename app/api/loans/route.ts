import { NextRequest, NextResponse } from 'next/server';
import { ReasonPhrases, StatusCodes } from 'http-status-codes';

import prisma from '@/prisma/client';
import schema from './schema';

export async function GET(request: NextRequest) {
  const loans = await prisma.loan.findMany({
    include: {
      customer: { select: { firstName: true, lastName: true } },
      createdBy: { select: { email: true } },
    },
    orderBy: { createdAt: 'desc' },
  });

  return NextResponse.json({
    statusCode: StatusCodes.OK,
    statusText: ReasonPhrases.OK,
    data: loans,
  });
}

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

  const { principal, rate, time } = body;
  /**
   * time => months
   * rate => % e.g 5% = 0.05
   */
  const compoundInterest = principal * (rate / 100) * (time / 12) + principal;

  const loan = await prisma.loan.create({
    data: {
      ...body,
      amountPayable: compoundInterest,
    },
  });

  return NextResponse.json(
    {
      statusCode: StatusCodes.CREATED,
      statusText: ReasonPhrases.CREATED,
      message: 'Loan approved successfully',
      data: loan,
    },
    { status: StatusCodes.CREATED }
  );
}
