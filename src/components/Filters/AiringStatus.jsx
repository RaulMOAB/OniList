import React, { useState, useEffect } from 'react';

export default function AiringStatus({value, handle}) {

    const status = ['Releasing','Finished', 'Cancelled', 'Not_yet_released', 'Hiatus'];

    //console.log(status);

    

    return (
        <div className='w-1/6'>
            <span className='text-accent text-sm font-semibold'>AiringStatus</span>
            <div className='w-11/12 bg-neutral mb-5 rounded-md mt-2'>
                    <select
                      value={value}
                      onChange={(event) => handle(event.target.value)} 
                      className='w-full h-9 focus:outline-none opacity-60 pl-3 text-accent text-sm rounded-md bg-neutral'
                    >
                        <option value="">Any</option>
                        {status.map((item, i) => (
                            <option key={i} value={item.toUpperCase()}>{item}</option>
                        ))}
                    </select>
            </div>
        </div>
    )
}