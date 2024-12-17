import React from 'react'
import { Link } from 'react-router-dom'
const FinishRide = (props) => {
  return (
    <div>
      <h5
        className="p-1 text-center absolute top-0 w-[93%]"
        onClick={() => {
          props.setFinishRidePanel(false)
        }}
      >
        <i className="text-3xl text-gray-200 ri-arrow-down-wide-line"></i>
      </h5>
      <h3 className="text-2xl font-bold mb-5">Finish this Ride</h3>
      <div className='flex items-center justify-between p-4 border-2 border-yellow-400 rounded-lg mt-4'>
        <div className='flex items-center gap-3'>
          <img className='h-12 w-12 rounded-full object-cover' src='https://e1.pxfuel.com/desktop-wallpaper/81/558/desktop-wallpaper-random-people-shots-on-behance-random-people.jpg' alt='' />
          <h2 className='text-lg font-medium'>Rajesh Patel</h2>
        </div>
        <h5 className='text-lg font-semibold'>2.2 KM</h5>
      </div>
      <div className="flex gap-2 justify-between flex-col items-center">
        <div className="w-full mt-5">
          <div className="flex items-center gap-5 p-3 border-b-2">
            <i className="ri-map-pin-user-line"></i>
            <div>
              <h3 className="text-lg font-medium">562/11-A</h3>
              <p className="text-sm -mt-1 text-gray-600">Talao Pali, Thane</p>
            </div>
          </div>
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
        <div className='mt-10 w-full'>
            <Link to='/captain-home' className="w-full mt-5 flex text-lg justify-center py-3 bg-green-600 text-white font-semibold p-3 rounded-lg">Finish Ride</Link>
            <p className='mt-10 text-xs font-semibold'>Click on finish ride if you have completed the payment process</p>
            
        </div>
      </div>
    </div>
  )
}

export default FinishRide