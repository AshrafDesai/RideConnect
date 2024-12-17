import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import React, { useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import FinishRide from '../components/FinishRide'

const CaptainRiding = () => {

    const [finishRidePanel, setfinishRidePanel] = useState(false)
    const finishRidePanelRef = useRef(null)

    useGSAP(function () {
        if (finishRidePanel) {
            gsap.to(finishRidePanelRef.current, {
                transform: 'translateY(0)'
            })
        } else {
            gsap.to(finishRidePanelRef.current, {
                transform: 'translateY(100%)'
            })
        }
    }, [ finishRidePanel ])

  return (
    <div className='h-screen relative'>
        
      <div className='fixed p-6 top-0 flex items-center justify-between w-screen'>
        <img className="w-16" src='https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png' alt='Uber Logo' />
        <Link to='/captain-home' className='h-10 w-10 bg-white flex items-center justify-center rounded-full shadow-md'>
          <i className="text-lg font-medium ri-logout-box-r-line"></i>
        </Link>
      </div>
      
      <div className='h-4/5'>
        <img
          className="h-full w-full object-cover"
          src="https://s.wsj.net/public/resources/images/BN-XR452_201802_M_20180228165525.gif"
          alt="Background"
        />
      </div>
      
      <div className='h-1/5 p-6 flex items-center justify-between relative bg-yellow-500 pt-10'
      onClick={()=>{
        setfinishRidePanel(true)
      }}
      >

      <h5 className="p-1 text-center w-[95%] absolute top-0 " onClick={() => {
        }}><i className="text-3xl text-gray-800 ri-arrow-up-wide-line"></i></h5>
        <h4 className='text-lg font-semibold'>4 KM away</h4>
        <button className="bg-green-600 text-white font-semibold p-3 px-10 rounded-lg">Complete Ride</button>
      </div>
      <div ref={finishRidePanelRef} className="fixed w-full z-10 bottom-0 translate-y-full bg-white px-3 py-10 pt-12">
        <FinishRide setFinishRidePanel={setfinishRidePanel} />
      </div>
      
    </div>
  )
}

export default CaptainRiding