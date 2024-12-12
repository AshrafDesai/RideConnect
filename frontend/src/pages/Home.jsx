import React, { useState, useRef, useEffect } from 'react';
import gsap from 'gsap';
import 'remixicon/fonts/remixicon.css';
import LocationSearchPanel from '../components/LocationSearchPanel';
import VechilePanel from '../components/VechilePanel';
import ConfirmRide from '../components/ConfirmRide';

const Home = () => {
  const [pickup, setPickup] = useState('');
  const [destination, setDestination] = useState('');
  const [panelOpen, setPanelOpen] = useState(false);
  const vehiclePanelRef = useRef(null);
  const ConfirmRidePanelRef = useRef(null);
  const panelRef = useRef(null);
  const panelCloseRef = useRef(null);
  const [vehiclePanel, setVehiclePanel] = useState(false);
  const [ConfirmRidePanel, setConfirmRidePanel] = useState(false);

  const submitHandler = (e) => {
    e.preventDefault();
  };

  useEffect(() => {
    if (panelOpen) {
      gsap.to(panelRef.current, { height: '70%', padding: 24 });
      gsap.to(panelCloseRef.current, { opacity: 1 });
    } else {
      gsap.to(panelRef.current, { height: '0%', padding: 0 });
      gsap.to(panelCloseRef.current, { opacity: 0 });
    }
  }, [panelOpen]);

  useEffect(() => {
    if (vehiclePanel) {
      gsap.to(vehiclePanelRef.current, { transform: 'translateY(0)' });
    } else {
      gsap.to(vehiclePanelRef.current, { transform: 'translateY(100%)' });
    }
  }, [vehiclePanel]);

  useEffect(() => {
    if (ConfirmRidePanel) {
      gsap.to(ConfirmRidePanelRef.current, { transform: 'translateY(0)' });
    } else {
      gsap.to(ConfirmRidePanelRef.current, { transform: 'translateY(100%)' });
    }
  }, [ConfirmRidePanel]);

  return (
    <div className='h-screen relative overflow-hidden'>
      <img
        className='w-16 absolute left-5 top-5'
        src='https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png'
        alt='RideConnect Logo'
      />
      <div className='h-screen w-screen'>
        <img
          className='h-screen w-full object-cover'
          src='https://s.wsj.net/public/resources/images/BN-XR452_201802_M_20180228165525.gif'
          alt='Background'
        />
      </div>
      <div className='flex flex-col justify-end h-screen absolute top-0 w-full'>
        <div className='h-[30%] p-6 bg-white relative'>
          <h5
            ref={panelCloseRef}
            onClick={() => setPanelOpen(false)}
            className='absolute opacity-0 right-2 top-6 text-2xl'
          >
            <i className="ri-arrow-down-wide-line" aria-hidden="true"></i>
          </h5>
          <h4 className='text-2xl font-semibold'>Find a trip</h4>
          <form onSubmit={submitHandler}>
            <div className='line absolute h-16 w-1 top-[45%] left-10 bg-gray-700 rounded-full'></div>
            <input
              onClick={() => setPanelOpen(true)}
              value={pickup}
              onChange={(e) => setPickup(e.target.value)}
              className='bg-[#eee] px-12 py-2 text-lg rounded-lg w-full mt-5 focus:outline-none focus:ring-2 focus:ring-blue-500'
              type='text'
              placeholder='Add a pick-up location'
            />
            <input
              onClick={() => setPanelOpen(true)}
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
              className='bg-[#eee] px-12 py-2 text-lg rounded-lg w-full mt-3 focus:outline-none focus:ring-2 focus:ring-blue-500'
              type='text'
              placeholder='Enter your destination'
            />
          </form>
        </div>
        <div ref={panelRef} className='bg-white h-0'>
          <LocationSearchPanel setPanelOpen={setPanelOpen} setVehiclePanel={setVehiclePanel} />
        </div>
      </div>
      <div ref={vehiclePanelRef} className='fixed w-full z-10 bottom-0 translate-y-full bg-white px-3 py-10 pt-14'>
        <VechilePanel setConfirmRidePanel={setConfirmRidePanel} setVehiclePanel={setVehiclePanel} />
      </div>
      <div ref={ConfirmRidePanelRef} className='fixed w-full z-10 bottom-0 translate-y-full bg-white px-3 py-10 pt-14'>
        <ConfirmRide />
      </div>
    </div>
  );
};

export default Home;
