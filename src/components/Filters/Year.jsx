import React, { useState, useEffect } from 'react';

export default function Year({value, handle, filter}) {

    const today = new Date();
    const years = insertYears();

    function insertYears() {
        let years_array = [];

        for (let index = 1940; index <= today.getFullYear()+1; index++) {
            years_array.push(index);
        }

        return years_array.reverse();
    }

    return (
        <div className='w-1/6'>
            <span className='text-accent text-sm font-semibold'>Year</span>
            <div className='w-11/12 bg-neutral mb-5 rounded-md mt-2'>
                    <select
                      value={value}
                      onChange={(event) => {handle(event.target.value); filter()}} 
                      className='w-full h-9 focus:outline-none opacity-60 pl-3 text-accent text-sm rounded-md bg-neutral'
                    >
                        <option value="">Any</option>
                        {years.map((item, i) => (
                            <option key={i} value={item}>{item}</option>
                        ))}
                    </select>
            </div>
        </div>
    )
}