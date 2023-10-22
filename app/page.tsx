'use client';

import { FormEvent, useEffect, useState } from 'react';
import { errorToast, successToast } from './utils/toast';
import { signIn, useSession } from 'next-auth/react';
import { useRouter, useSearchParams } from 'next/navigation';

import { SiMoneygram } from 'react-icons/si';

export default function Login() {
  const router = useRouter();
  const { data: session, status } = useSession();

  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // useEffect(() => {
  //   if (session?.user && status === 'authenticated') {
  //     router.push('/loans');
  //   }
  // }, [status, router, session]);

  const searchQuery = useSearchParams();
  const search = searchQuery.get('callbackUrl');
  console.log('Search', search);

  const handleLogin = async (e: FormEvent) => {
    e.preventDefault();

    setLoading(true);
    const res = await signIn('credentials', {
      email,
      password,
      redirect: false,
      // how to access query parameters in next13 in client component
      // dynamically seup the callback url and use that
      // the redirect url upon successful login
      // callbackUrl: '/loans', this only works when redirect is true
    });

    console.log('Response', res);

    setLoading(false);
    if (!res?.error) {
      successToast('Authentication successful...');
      router.push(search ? search : '/loans');
    } else {
      errorToast(res.error);
      setPassword('');
    }
  };

  return (
    <form onSubmit={handleLogin}>
      <div className='flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8 mt-14'>
        <div className='sm:mx-auto sm:w-full sm:max-w-sm'>
          <div className='flex justify-center'>
            <SiMoneygram size={50} color='#3085C3' />
          </div>
          <h2 className='mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900'>
            Sign in to your account
          </h2>
        </div>
        <div className='mt-10 sm:mx-auto sm:w-full sm:max-w-sm'>
          <div className='space-y-6'>
            <div>
              <label
                htmlFor='email'
                className='block text-sm font-medium leading-6 text-gray-900'
              >
                Email address
              </label>
              <div className='mt-2'>
                <input
                  id='email'
                  name='email'
                  type='email'
                  autoComplete='email'
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className='block w-full rounded-md border-0 px-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
                />
              </div>
            </div>

            <div>
              <div className='flex items-center justify-between'>
                <label
                  htmlFor='password'
                  className='block text-sm font-medium leading-6 text-gray-900'
                >
                  Password
                </label>
              </div>
              <div className='mt-2'>
                <input
                  id='password'
                  name='password'
                  type='password'
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  autoComplete='current-password'
                  required
                  className='block w-full rounded-md border-0 px-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
                />
              </div>
            </div>

            <div>
              <button
                // onClick={handleLogin}
                type='submit'
                className='flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'
              >
                {loading ? 'Sending...' : 'Sign in'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
}
