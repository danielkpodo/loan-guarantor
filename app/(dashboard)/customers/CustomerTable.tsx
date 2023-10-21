import { BASE_URL } from '../../utils/constansts';
import Link from 'next/link';
import NoData from '@/app/components/NoData';
import { headers } from 'next/headers';
import moment from 'moment';
interface CustomerDTO {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  maritalStatus: string;
  employmentStatus: string;
  employer: string;
  dateOfBirth: Date;
  cardType: string;
  cardUniqueNo: string;
  address: string;
  phoneNumber: string;
}

export default async function CustomerTable() {
  const response = await fetch(`${BASE_URL}/customers`, {
    headers: headers(), // attaching this reads cookies from the browser ( By default, cookies are not passed in a server-side fetch )
    cache: 'no-store',
  });
  const results = await response.json();
  const customers: CustomerDTO[] = results.data;

  function handlePageData() {
    if (customers.length <= 0) {
      return (
        <div className='mt-20'>
          <NoData message='Start adding customers to see data' />
        </div>
      );
    }
    return (
      <div className='mt-8 flow-root'>
        <div className='-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8'>
          <div className='inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8'>
            <table className='min-w-full divide-y divide-gray-300'>
              <thead>
                <tr>
                  <th
                    scope='col'
                    className='py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0'
                  >
                    No (#.)
                  </th>
                  <th
                    scope='col'
                    className='px-3 py-3.5 text-left text-sm font-semibold text-gray-900'
                  >
                    Name
                  </th>
                  <th
                    scope='col'
                    className='px-3 py-3.5 text-left text-sm font-semibold text-gray-900'
                  >
                    Email
                  </th>
                  <th
                    scope='col'
                    className='px-3 py-3.5 text-left text-sm font-semibold text-gray-900'
                  >
                    Marital Status
                  </th>
                  <th
                    scope='col'
                    className='px-3 py-3.5 text-left text-sm font-semibold text-gray-900'
                  >
                    Emp. Status
                  </th>
                  <th
                    scope='col'
                    className='px-3 py-3.5 text-left text-sm font-semibold text-gray-900'
                  >
                    Employer
                  </th>
                  <th
                    scope='col'
                    className='px-3 py-3.5 text-left text-sm font-semibold text-gray-900'
                  >
                    DOB
                  </th>
                  <th
                    scope='col'
                    className='px-3 py-3.5 text-left text-sm font-semibold text-gray-900'
                  >
                    Card Type
                  </th>
                  <th
                    scope='col'
                    className='px-3 py-3.5 text-left text-sm font-semibold text-gray-900'
                  >
                    Card No.
                  </th>
                  <th
                    scope='col'
                    className='px-3 py-3.5 text-left text-sm font-semibold text-gray-900'
                  >
                    Address
                  </th>
                  <th scope='col' className='relative py-3.5 pl-3 pr-4 sm:pr-0'>
                    Contact
                  </th>
                </tr>
              </thead>
              <tbody className='divide-y divide-gray-200'>
                {customers?.map((customer, index) => (
                  <tr key={customer.email}>
                    <td className='whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-0'>
                      {index + 1}
                    </td>
                    <td className='whitespace-nowrap px-3 py-4 text-sm text-gray-500'>
                      {`${customer.firstName} ${customer.lastName}`}
                    </td>
                    <td className='whitespace-nowrap px-3 py-4 text-sm text-gray-500'>
                      {customer.email}
                    </td>
                    <td className='whitespace-nowrap px-3 py-4 text-sm text-gray-500'>
                      {customer.maritalStatus}
                    </td>
                    <td className='whitespace-nowrap px-3 py-4 text-sm text-gray-500'>
                      {customer.employmentStatus}
                    </td>
                    <td className='whitespace-nowrap px-3 py-4 text-sm text-gray-500'>
                      {customer.employer}
                    </td>
                    <td className='whitespace-nowrap px-3 py-4 text-sm text-gray-500'>
                      {moment(customer.dateOfBirth).format('DD/MM/YYYY')}
                    </td>
                    <td className='whitespace-nowrap px-3 py-4 text-sm text-gray-500'>
                      {customer.cardType}
                    </td>
                    <td className='whitespace-nowrap px-3 py-4 text-sm text-gray-500'>
                      {customer.cardUniqueNo}
                    </td>
                    <td className='whitespace-nowrap px-3 py-4 text-sm text-gray-500'>
                      {customer.address}
                    </td>
                    <td className='whitespace-nowrap px-3 py-4 text-sm text-gray-500'>
                      <Link
                        href={`tel:${customer.phoneNumber}`}
                        className='text-indigo-700 underline'
                      >
                        {customer.phoneNumber}
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className='px-4 sm:px-6 lg:px-8'>
      <div className='sm:flex sm:items-center'>
        <div className='sm:flex-auto'>
          <h1 className='text-base font-semibold leading-6 text-gray-900'>
            Customers
          </h1>
          <p className='mt-2 text-sm text-gray-700'>
            Demographic information of all registered customers
          </p>
        </div>
        <div className='mt-4 sm:ml-16 sm:mt-0 sm:flex-none'>
          <Link
            href='/customers/new'
            className='rounded-md bg-indigo-600 px-4 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'
          >
            Add Customer
          </Link>
        </div>
      </div>
      {handlePageData()}
    </div>
  );
}
