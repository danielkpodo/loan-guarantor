import { z } from 'zod';

const schema = z.object({
  customerId: z
    .string({ required_error: 'Customer Id is required' })
    .trim()
    .min(1, { message: 'Select a customer' })
    .uuid({ message: 'Invalid uuid for customer' }),
  userId: z
    .string({ required_error: 'Agent ID is required' })
    .trim()
    .min(1, { message: 'Agent id is needed for this action' })
    .cuid({ message: 'Invalid cuid' }),
  principal: z
    .number({
      required_error: 'Principal is required',
      invalid_type_error: 'Amount must be a number',
    })
    .min(1, { message: 'Enter principal amount' }),
  rate: z.number().optional(),
  time: z.number().optional(),
});

export default schema;
