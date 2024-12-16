import React from 'react'
import { Link } from 'react-router-dom'

const Riding = () => {
  return (
    <div className='h-screen'>
        <Link to='/home' className='fixed right-2 top-2 h-10 w-10 bg-white flex items-center justify-center rounded-full'>
            <i className=" text-lg font-medium ri-home-5-line"></i>
        </Link>
        <div className='h-1/2'>
            <img
            className="h-full w-full object-cover"
            src="https://s.wsj.net/public/resources/images/BN-XR452_201802_M_20180228165525.gif"
            alt="Background"
            />
        </div>
        <div className='h-1/2 p-4'>
        <div className='flex -items-center justify-between'>
        <img
            className="h-12"
            src="https://www.asaproadworthys.com.au/wp-content/uploads/2021/11/Select.jpeg"
            alt="confirmation"
        />
        <div className='text-right'>
          <h2 className='text-lg font-medium'>Raju Patil</h2>
          <h4 className='text-xl font-semibold -mt-1 -mb-1'>MH 03 BH 6831</h4>
          <p className='text-sm text-gray-600'>Swift Desire</p>
        </div>
      </div>
      <div className="flex gap-2 justify-between flex-col items-center">
        <div className="w-full mt-5">
          <div className="flex items-center gap-5 p-3 border-b-2">
            <i className="text-lg ri-map-pin-2-fill"></i>
            <div>
              <h3 className="text-lg font-medium">562/11-A</h3>
              <p className="text-sm -mt-1 text-gray-600">Talao Pali, Thane</p>
            </div>
          </div>
          <div className="flex items-center gap-5 p-3">
            <i className="ri-currency-fill"></i>
            <div>
              <h3 className="text-lg font-medium">₹193.60</h3>
              <p className="text-sm -mt-1 text-gray-600">Cash cash</p>
            </div>
          </div>
        </div>
      </div>
            <button className="w-full mt-5 py-3 bg-green-600 text-white font-semibold rounded-lg">Make a Payment</button>

        </div>
    </div>
  )
}

export default Riding