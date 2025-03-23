
import Link from 'next/link';
import React from 'react';

const NavBar = () => {
  return (
      <div className='flex items-center justify-between bg-white p-3 shadow-slate-500 shadow-md'>
        <div className='flex justify-center items-center bg-amber-400 rounded-full w-16 h-16'>
            <Link href='/' className=' text-[20px] font-bold p-3 rounded-2xl'>
              Bill
            </Link>
          </div>
            <Link href={'/auth/account'} className='text-2xl font-bold text-amber-500 -rotate-6 transform-3d hover:rotate-0 cursor-pointer'>{ 'Welcome to Bill Payments'}</Link>
          </div>
  );
};

export default NavBar;
