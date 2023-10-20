'use client';

import React, { useState } from 'react';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '../../components/ui/select';
import { errorToast, successToast } from '../../utils/toast';

import { BASE_URL } from '../../utils/constansts';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';
import { Loader2 } from 'lucide-react';
import axios from 'axios';
import { useRouter } from 'next/navigation';

const maritalStatusOptions: string[] = [
  'SINGLE',
  'MARRIED',
  'DOMESTIC_PARTNERSHIP',
  'DIVORCED',
  'SEPARATED',
  'WIDOWED',
  'CIVIL_UNION',
  'OTHER',
  'PREFER_NOT_TO_SAY',
];

const employmentStatusOptions: string[] = [
  'FULL_TIME',
  'PART_TIME',
  'CONTRACTOR',
  'FREELANCER',
  'TEMPORARY_EMPLOYEE',
  'INTERN',
  'APPRENTICE',
  'SELF_EMPLOYED',
  'UNEMPLOYED',
  'RETIRED',
  'STUDENT',
  'HOME_MAKER',
  'OTHER',
];

const cardOptions: string[] = [
  'NHIS',
  'VOTER',
  'DVLA',
  'NATIONAL_CARD',
  'SNNIT',
  'OTHER',
];

function CustomerForm() {
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(false);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [maritalStatus, setMaritalStatus] = useState('');
  const [employmentStatus, setEmploymentStatus] = useState('');
  const [employer, setEmployer] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [cardType, setCardType] = useState('');
  const [cardUniqueNo, setCardUniqueNo] = useState('');
  const [address, setAddress] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');

  const payload = {
    firstName,
    lastName,
    email,
    maritalStatus,
    employmentStatus,
    employer,
    dateOfBirth: new Date(dateOfBirth),
    cardType,
    cardUniqueNo,
    address,
    phoneNumber,
  };

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    setIsLoading(true);
    e.preventDefault();

    try {
      const response = await axios.post(`${BASE_URL}/customers`, payload);
      const { message } = response.data;
      setIsLoading(false);

      successToast(message);

      setTimeout(() => {
        router.refresh();
        router.replace('/customers');
      }, 2000);
    } catch (error) {
      setIsLoading(false);
      if (axios.isAxiosError(error)) {
        errorToast(error.response?.data?.message);
      } else {
        console.error('Non-Axios Error:', error);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <section className='grid gap-8 sm:grid-cols-2 lg:grid:cols-3 xl:grid-cols-3'>
        <div>
          <Label htmlFor='firstName'>First Name</Label>
          <Input
            id='firstName'
            className='mt-1'
            value={firstName}
            type='text'
            onChange={(e) => setFirstName(e.target.value)}
            required
          />
        </div>
        <div>
          <Label htmlFor='lastName'>Last Name</Label>
          <Input
            id='lastName'
            value={lastName}
            className='mt-1'
            type='text'
            required
            onChange={(e) => setLastName(e.target.value)}
          />
        </div>
        <div>
          <Label htmlFor='email'>Email</Label>
          <Input
            id='email'
            value={email}
            className='mt-1'
            required
            type='email'
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <Label>Marital Status</Label>
          <div className='mt-1'>
            <Select
              value={maritalStatus}
              onValueChange={(value) => setMaritalStatus(value)}
              required
            >
              <SelectTrigger className='w-full'>
                <SelectValue placeholder='Select marital status...' />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Marital Status</SelectLabel>
                  {maritalStatusOptions.map((status) => (
                    <SelectItem value={status} key={status}>
                      {status}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        </div>
        <div>
          <Label>Employment Status</Label>
          <div className='mt-1'>
            <Select
              value={employmentStatus}
              onValueChange={(value) => setEmploymentStatus(value)}
              required
            >
              <SelectTrigger className='w-full'>
                <SelectValue placeholder='Select employment status...' />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Employment Status</SelectLabel>
                  {employmentStatusOptions.map((status) => (
                    <SelectItem value={status} key={status}>
                      {status}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div>
          <Label htmlFor='employer'>Employer</Label>
          <Input
            id='employer'
            className='mt-1'
            value={employer}
            type='text'
            required
            onChange={(e) => setEmployer(e.target.value)}
          />
        </div>
        <div>
          <Label>Card Type</Label>
          <div className='mt-1'>
            <Select
              value={cardType}
              onValueChange={(value) => setCardType(value)}
              required
            >
              <SelectTrigger className='w-full'>
                <SelectValue placeholder='Select ID type...' />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Card Type</SelectLabel>
                  {cardOptions.map((card) => (
                    <SelectItem value={card} key={card}>
                      {card}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        </div>
        <div>
          <Label htmlFor='cardUniqueNo'>Card Unique No.</Label>
          <Input
            id='cardUniqueNo'
            className='mt-1'
            value={cardUniqueNo}
            type='text'
            required
            onChange={(e) => setCardUniqueNo(e.target.value)}
          />
        </div>
        <div>
          <Label htmlFor='address'>Address.</Label>
          <Input
            id='address'
            className='mt-1'
            value={address}
            type='text'
            required
            onChange={(e) => setAddress(e.target.value)}
          />
        </div>
        <div>
          <Label htmlFor='phoneNumber'>Phone Number</Label>
          <Input
            id='phoneNumber'
            className='mt-1'
            required
            value={phoneNumber}
            type='text'
            onChange={(e) => setPhoneNumber(e.target.value)}
          />
        </div>
        <div>
          <Label htmlFor='dateOfBirth'>Date of Birth</Label>
          <Input
            id='dateOfBirth'
            className='mt-1'
            value={dateOfBirth}
            required
            type='date'
            onChange={(e) => setDateOfBirth(e.target.value)}
          />
        </div>
      </section>
      <div className='mt-5 py-5'>
        <Button type='submit' className='bg-indigo-600' disabled={isLoading}>
          {isLoading && <Loader2 className={`mr-2 h-4 w-4 animate-spin`} />}
          {isLoading ? 'Submitting...' : 'Create Customer'}
        </Button>
      </div>
    </form>
  );
}

export default CustomerForm;
