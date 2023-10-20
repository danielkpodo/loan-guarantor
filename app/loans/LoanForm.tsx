'use client';

import { Check, ChevronsUpDown } from 'lucide-react';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from '../components/ui/command';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '../components/ui/dialog';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '../components/ui/popover';
import { errorToast, successToast } from '../utils/toast';
import { useEffect, useState } from 'react';

import { BASE_URL } from '../utils/constansts';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { IoAddCircleOutline } from 'react-icons/io5';
import { Label } from '../components/ui/label';
import { Loader2 } from 'lucide-react';
import { UserProps } from './LoanTable';
import axios from 'axios';
import { cn } from '../../lib/utils';
import { useRouter } from 'next/navigation';

interface CustomerDTO {
  id: string;
  firstName: string;
  lastName: string;
}

const LoanForm = ({ user }: UserProps) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [customers, setCustomers] = useState<CustomerDTO[]>([]);

  /**
   * loan states
   */
  const [principal, setPrincipal] = useState('');
  const [rate, setRate] = useState('5');
  const [time, setTime] = useState('12');

  // combobox states
  const [open, setOpen] = useState(false);
  /** customer value in combo box */
  const [value, setValue] = useState('');

  async function getCustomers() {
    const res = await fetch('http://localhost:3000/api/customers/', {
      cache: 'no-store',
    });

    const results = await res.json();
    const data: CustomerDTO[] = results.data;
    setCustomers(data);
  }
  useEffect(() => {
    getCustomers();
  }, []);

  // map over customers and use table keys
  const frameworks = customers.map((customer) => {
    return {
      value: customer.id,
      label: `${customer.firstName} ${customer.lastName}`,
    };
  });

  const payload = {
    customerId: value,
    userId: user.id,
    principal: +principal,
    rate: +rate,
    time: +time,
  };

  const handleLoanProcessing = async () => {
    setIsLoading(true);

    try {
      const response = await axios.post(`${BASE_URL}/loans`, payload);
      const { message, data } = response.data;

      setIsLoading(false);
      setValue('');
      setRate(rate);
      setTime(time);
      setPrincipal('');
      successToast(message);

      // close modal on submit
      setOpen(false);
      router.refresh();
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
    <Dialog>
      <DialogTrigger asChild>
        <Button className='rounded-md bg-indigo-600 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'>
          <IoAddCircleOutline className='mr-2 h-4 w-4' /> Add New Loan
        </Button>
      </DialogTrigger>
      <DialogContent className='sm:max-w-[600px]'>
        <DialogHeader>
          <DialogTitle>Approve a customer loan</DialogTitle>
          <DialogDescription>Add a new loan record</DialogDescription>
        </DialogHeader>
        <div className='grid gap-4 py-4'>
          <div className='grid grid-cols-4 items-center gap-4'>
            <Label htmlFor='principal' className='text-right'>
              Customer
            </Label>
            {/* combobox */}
            <Popover open={open} onOpenChange={setOpen}>
              <PopoverTrigger asChild>
                <Button
                  variant='outline'
                  role='combobox'
                  aria-expanded={open}
                  className='w-[200px] justify-between'
                >
                  {value
                    ? frameworks.find((framework) => framework.value === value)
                        ?.label
                    : 'Select Customer...'}
                  <ChevronsUpDown className='ml-2 h-4 w-4 shrink-0 opacity-50' />
                </Button>
              </PopoverTrigger>
              <PopoverContent className='w-[200px] p-0'>
                <Command>
                  <CommandInput placeholder='Search framework...' />
                  <CommandEmpty>No framework found.</CommandEmpty>
                  <CommandGroup>
                    {frameworks.map((framework) => (
                      <CommandItem
                        key={framework.value}
                        onSelect={(currentValue) => {
                          setValue(
                            currentValue === value ? '' : framework.value
                          );
                          setOpen(false);
                        }}
                      >
                        <Check
                          className={cn(
                            'mr-2 h-4 w-4',
                            value === framework.value
                              ? 'opacity-100'
                              : 'opacity-0'
                          )}
                        />
                        {framework.label}
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </Command>
              </PopoverContent>
            </Popover>
          </div>
          <div className='grid grid-cols-4 items-center gap-4'>
            <Label htmlFor='principal' className='text-right'>
              Principal (GHS)
            </Label>
            <Input
              id='principal'
              value={principal}
              className='col-span-3'
              type='number'
              onChange={(e) => setPrincipal(e.target.value)}
            />
          </div>
          <div className='grid grid-cols-4 items-center gap-4'>
            <Label htmlFor='rate' className='text-right'>
              Rate (%)
            </Label>
            <Input
              id='rate'
              value={rate}
              className='col-span-3'
              type='number'
              onChange={(e) => setRate(e.target.value)}
            />
          </div>
          <div className='grid grid-cols-4 items-center gap-4'>
            <Label htmlFor='time' className='text-right'>
              Time (Months)
            </Label>
            <Input
              id='time'
              value={time}
              className='col-span-3'
              type='number'
              onChange={(e) => setTime(e.target.value)}
            />
          </div>
        </div>
        <DialogFooter>
          {/* currently this is the way to close dialog in shadcn ui */}
          {/* <DialogClose asChild> */}
          <Button
            type='submit'
            className='bg-indigo-600'
            disabled={isLoading}
            onClick={handleLoanProcessing}
          >
            {isLoading && <Loader2 className={`mr-2 h-4 w-4 animate-spin`} />}
            Submit
          </Button>
          {/* </DialogClose> */}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default LoanForm;
