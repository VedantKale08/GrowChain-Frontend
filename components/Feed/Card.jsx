import AOS from 'aos';
import React, { useEffect } from 'react'

function Card({data}) {
  useEffect(() => {
    AOS.init({ duration: 400 });
  }, []);
  return (
    <div className="bg-white p-8 rounded-2xl" data-aos="fade-up">
      <img
        src="/assets/Images/crops.jpg"
        alt=""
        className="rounded-xl w-full h-[300px] object-cover"
      />
      <div className="pt-6 flex justify-between gap-3 items-center">
        <div className="flex-1">
          <p className="text-lg">{data} Crops</p>
          <p className="text-slate-500 text-sm">
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Incidunt
            obcaecati voluptates veniam sed, quae vitae tempora excepturi
            dolorum porro similique.
          </p>
        </div>
        <p className="text-secondary w-fit h-fit bg-slate-200 rounded-full px-3 py-1">
          12 Points
        </p>
      </div>
    </div>
  );
}

export default Card