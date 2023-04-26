import React, { useState, useEffect } from 'react';

export default function AiringStatus() {

    const today = new Date();
    const [years, setYears] = useState([]);
    let newYears = [];


    


    useEffect(() => {
        for (let index = 1940; index <= today.getFullYear()+1; index++) {
            newYears.push(index);
        }

        setYears(newYears);

    }, []);
    
    console.log(years);
    

    return (
        <div className='w-1/6'>
            <span className='text-accent text-sm font-semibold'>AiringStatus</span>
            <div className='w-11/12 bg-neutral mb-5 rounded-md mt-2'>
                    <select className='w-full h-9 focus:outline-none opacity-60 pl-3 text-accent text-sm rounded-md bg-neutral'>
                        <option value="year">year</option>
                        {years.map((year,index) => {
                            <option key={index} value={year}>{year}</option>
                        })}
                    </select>
            </div>
        </div>
    )
}