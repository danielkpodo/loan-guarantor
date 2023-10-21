import { BASE_URL } from '../../utils/constansts';
import LoanForm from './LoanForm';
import NoData from '@/app/components/NoData';
import formatCurrency from '../../utils/formatCurrency';
import { headers } from 'next/headers';
import moment from 'moment';
interface loanDTO {
  id: string;
  principal: number;
  rate: number;
  time: number;
  amountPayable: number;
  status: string;
  createdAt: Date;
  customer: {
    firstName: string;
    lastName: string;
  };
  createdBy: {
    email: string;
  };
}

type User = {
  id: string;
  email: string;
  name: string;
  image: string;
};

export interface UserProps {
  user: User | any;
}

export default async function LoanTable({ user }: UserProps) {
  const response = await fetch(`${BASE_URL}/loans`, {
    cache: 'no-store',
    headers: headers(),
  });
  const results = await response.json();
  const loans: loanDTO[] = results.data;

  function handlePageDisplay() {
    if (loans.length <= 0) {
      return (
        <div className='mt-20'>
          <NoData message='Start adding data to view loans' />
        </div>
      );
    }
    return (
      <div className='mt-5 flow-root'>
        <div className='-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8'>
          <div className='inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8'>
            <div className='overflow-hidden shadow ring-1 ring-black ring-opacity-5 sm:rounded-lg'>
              <table className='min-w-full divide-y divide-gray-300'>
                <thead className='bg-gray-50'>
                  <tr>
                    <th
                      scope='col'
                      className='py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6'
                    >
                      No(#.)
                    </th>
                    <th
                      scope='col'
                      className='px-3 py-3.5 text-left text-sm font-semibold text-gray-900'
                    >
                      Approval Date
                    </th>
                    <th
                      scope='col'
                      className='px-3 py-3.5 text-left text-sm font-semibold text-gray-900'
                    >
                      Principal
                    </th>
                    <th
                      scope='col'
                      className='px-3 py-3.5 text-left text-sm font-semibold text-gray-900'
                    >
                      Interest
                    </th>
                    <th
                      scope='col'
                      className='px-3 py-3.5 text-left text-sm font-semibold text-gray-900'
                    >
                      Rate (%)
                    </th>
                    <th
                      scope='col'
                      className='px-3 py-3.5 text-left text-sm font-semibold text-gray-900'
                    >
                      Period (In Months)
                    </th>
                    <th
                      scope='col'
                      className='px-3 py-3.5 text-left text-sm font-semibold text-gray-900'
                    >
                      Amount Payable (GHS)
                    </th>
                    <th
                      scope='col'
                      className='px-3 py-3.5 text-left text-sm font-semibold text-gray-900'
                    >
                      Customer
                    </th>
                    <th
                      scope='col'
                      className='px-3 py-3.5 text-left text-sm font-semibold text-gray-900'
                    >
                      Status
                    </th>
                    <th
                      scope='col'
                      className='px-3 py-3.5 text-left text-sm font-semibold text-gray-900'
                    >
                      Loan Officer
                    </th>
                  </tr>
                </thead>
                <tbody className='divide-y divide-gray-200 bg-white'>
                  {loans?.map((loan, index) => (
                    <tr key={loan.id}>
                      <td className='whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6'>
                        {index + 1}
                      </td>
                      <td className='whitespace-nowrap px-3 py-4 text-sm text-gray-500'>
                        {moment(loan.createdAt).fromNow()}
                      </td>
                      <td className='whitespace-nowrap px-3 py-4 text-sm text-gray-500'>
                        {formatCurrency(loan.principal)}
                      </td>
                      <td className='whitespace-nowrap px-3 py-4 text-sm text-gray-500'>
                        {formatCurrency(loan.amountPayable - loan.principal)}
                      </td>
                      <td className='whitespace-nowrap px-3 py-4 text-sm text-gray-500'>
                        {loan.rate}
                      </td>
                      <td className='whitespace-nowrap px-3 py-4 text-sm text-gray-500'>
                        {loan.time}
                      </td>
                      <td className='whitespace-nowrap px-3 py-4 text-sm text-gray-500 '>
                        {formatCurrency(loan.amountPayable)}
                      </td>
                      <td className='whitespace-nowrap px-3 py-4 text-sm text-gray-500'>
                        {`${loan.customer.firstName} ${loan.customer.lastName} `}
                      </td>
                      <td className='whitespace-nowrap px-3 py-4 text-sm text-gray-500'>
                        <span className='inline-flex items-center rounded-md bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20'>
                          {loan.status}
                        </span>
                      </td>
                      <td className='whitespace-nowrap px-3 py-4 text-sm text-gray-500'>
                        {loan.createdBy.email}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className='px-10 sm:px-6 lg:px-8 '>
      <div className='sm:flex sm:items-center'>
        <div className='sm:flex-auto'>
          <h1 className='text-base font-semibold leading-6 text-gray-900'>
            Approved Loans
          </h1>
          <p className='mt-2 text-sm text-gray-700'>
            A list of all recently approved loans
          </p>
        </div>
        <div className='mt-4 sm:ml-16 sm:mt-0 sm:flex-none'>
          <LoanForm user={user} />
        </div>
      </div>
      {handlePageDisplay()}
    </div>
  );
}
