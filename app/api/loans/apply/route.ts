import { NextRequest, NextResponse } from 'next/server';
import { ReasonPhrases, StatusCodes } from 'http-status-codes';

import prisma from '@/prisma/client';
import { z } from 'zod';

const schema = z.object({
  customerId: z
    .string({ required_error: 'Customer Id is required' })
    .trim()
    .min(1, { message: 'You have not specified a customer id' })
    .uuid({ message: 'Invalid uuid for customer' }),
  userId: z
    .string({ required_error: 'Agent ID is required' })
    .trim()
    .min(1, { message: 'Agent id is needed for this action' })
    .cuid({ message: 'Invalid cuid' }),
  principal: z.number({
    required_error: 'Principal is required',
    invalid_type_error: 'Amount must be a number',
  }),
  rate: z.number().optional(),
  time: z.number().optional(),
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
      statusText: ReasonPhrases.CREATED,
      message: 'Loan approved successfully',
      data: loan,
    },
    { status: StatusCodes.CREATED }
  );
}
