import validator from 'validator';
import { z } from 'zod';

const maritalStatusOptions = [
  'Single',
  'Married',
  'Domestic Partnership',
  'Divorced',
  'Separated',
  'Widowed',
  'Civil Union',
  'Other',
  'Prefer Not to Say',
] as const;

const employmentStatusOptions = [
  'Full-Time Employee',
  'Part-Time Employee',
  'Contractor',
  'Freelancer',
  'Temporary Employee',
  'Intern',
  'Apprentice',
  'Self-Employed',
  'Unemployed',
  'Retired',
  'Student',
  'Homemaker',
  'Other',
] as const;

const cardOptions = [
  'NHIS',
  'VOTER',
  'DVLA',
  'NATIONAL CARD',
  'SNNIT',
] as const;

const schema = z.object({
  firstName: z
    .string({
      required_error: 'First name is required', // when the field is absent in the payload
      invalid_type_error: 'First name must be a string', // when no is used // this is optional
    })
    .trim()
    .min(1, { message: 'First name cannot be empty' }), // when no value is entered in ""
  lastName: z
    .string({
      required_error: 'Last name is required',
      invalid_type_error: 'Last name must be a string',
    })
    .trim()
    .min(1, { message: 'Last name cannot be empty' }),
  email: z
    .string({
      required_error: 'Email is required',
      invalid_type_error: 'Email must be a string',
    })
    .trim()
    .min(1, { message: 'Email cannot be empty' })
    .email({ message: 'Invalid email format' }),
  maritalStatus: z.enum(maritalStatusOptions, {
    errorMap: (issue, ctx) => ({ message: 'Invalid marital status value' }),
  }),
  employmentStatus: z.enum(employmentStatusOptions, {
    errorMap: (issue, ctx) => ({ message: 'Invalid employement status value' }),
  }),
  employer: z
    .string({
      required_error: 'Emplyoyer is required',
      invalid_type_error: 'Employer must be a string',
    })
    .trim()
    .min(1, { message: 'Please enter an employer name' }),
  dateOfBirth: z.coerce.date({
    required_error: 'Please select a date',
    invalid_type_error: "That's not a date!",
  }),
  cardType: z.enum(cardOptions, {
    errorMap: (issue, ctx) => ({
      message: `Card type is not allowed`,
    }),
  }),
  cardUniqueNo: z
    .string({
      required_error: 'Card number is required',
      invalid_type_error: 'Card must be a string',
    })
    .trim()
    .min(1, { message: 'Enter card number' }),
  address: z
    .string({
      required_error: 'Please specify address',
      invalid_type_error: 'Address must be a string',
    })
    .trim()
    .min(1, { message: 'Enter an address' }),
  phoneNumber: z
    .string({
      required_error: 'Phone number is required',
      invalid_type_error: 'Phone must be a string',
    })
    .trim()
    .min(1, { message: 'Enter phone number' })
    .refine(
      (value) => {
        return validator.isMobilePhone(value);
      },
      { message: 'Invalid phone number format' }
    ),
});

export default schema;
/**
 * use errorMap for enums; use refine for single values
 */
