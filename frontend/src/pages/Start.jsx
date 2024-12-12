import React from 'react';
import { Link } from 'react-router-dom';

const Start = () => {
  return (
    <div>
        <div className='relative h-screen w-full bg-cover bg-center pt-8 flex justify-between flex-col' style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1557404763-69708cd8b9ce?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8dHJhZmZpYyUyMGxpZ2h0fGVufDB8fDB8fHww)' }}>
            <img className='w-16 ml-8 absolute left-5 top-5' src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png" alt="RideConnect Logo" />
            <div className='bg-white py-4 px-4 mt-auto'>
                <h2 className='text-[30px] font-bold'>Get Started with RideConnect</h2>
                <Link to='/login' className='flex items-center justify-center w-full bg-black text-white py-3 rounded-lg mt-2'>Continue</Link>
            </div>
        </div>
    </div>
  );
};

export default Start;
