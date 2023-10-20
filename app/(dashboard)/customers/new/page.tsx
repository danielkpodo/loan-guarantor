import CustomerForm from '../CustomerForm';
import React from 'react';

const AddLoan = () => {
  return (
    <div className='px-10 shadow-sm py-5 container mx-auto'>
      <h1 className='text-3xl mb-7'>Add New Customer</h1>
      <CustomerForm />
    </div>
  );
};

export default AddLoan;
