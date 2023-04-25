import React from 'react'

export default function Year() {

    return (
        <div className='w-1/6'>
            <span className='text-accent text-sm font-semibold'>Year</span>
            <div className='w-11/12 bg-neutral mb-5 rounded-md mt-2'>
                    <select className='w-full h-9 focus:outline-none opacity-60 pl-3 text-accent text-sm rounded-md bg-neutral'>
                        <option value="Any">Any</option>
                    </select>
            </div>
        </div>
    )
}