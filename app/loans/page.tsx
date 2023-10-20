import LoanTable from './LoanTable';
import React from 'react';
import authOptions from '../api/auth/authOptions';
import { getServerSession } from 'next-auth';

const Loan = async () => {
  const session = await getServerSession(authOptions);

  return (
    <div className='px-10 shadow-sm py-5 container mx-auto'>
      <LoanTable user={session?.user} />
    </div>
  );
};

export default Loan;
