import React from 'react';

const LocationSearchPanel = (props) => {
    

  const locations = [
    "24B, Near Kapoor's Cafe, Shah Enterprises, Mumbai",
    "22C, Near Desai's Cafe, Shah Enterprises, Mumbai",
    "20A, Near basu's Cafe, Shah Enterprises, Mumbai",
    "18D, Near Sharma's Cafe, Shah Enterprises, Mumbai",
]

  return (
    <div>
        {
            locations.map(function(elem,idx){
                return <div key={idx} onClick={()=>{
                    props.setVehiclePanel(true)
                    props.setPanelOpen(false)
                }} className="flex gap-4 border-2 p-3 border-gray-50 active:border-black rounded-xl my-2 items-center my-4 justify-start">
                <h2 className="bg-[#eee] h-8 w-12 flex items-center justify-center rounded-full"><i className="ri-map-pin-fill"></i></h2>
                <h4 className="font-medium">{elem}</h4>
            </ div> 

            })
        }
        
        
        
        
        
    </div>
  );
};

export default LocationSearchPanel;
