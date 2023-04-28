import React from 'react'
import { IoSearch } from "react-icons/io5";

export default function Search({value, handle, filter}) {

  return (
    <div className='md:w-2/6 lg:w-1/6 w-3/6'>
        <span className='text-accent text-sm font-semibold'>Search</span>
        <div className='w-11/12 input-group mb-5 rounded-md mt-2'>
            <label className='flex justify-center input-group input-group-md '>
                <span className='bg-neutral'>
                    <IoSearch className=' text-accent text-lg'/>
                </span>
                <input 
                    value={value}
                    onChange={(event) => {handle(event.target.value); filter()}}
                    type="text" 
                    className='w-full h-9 focus:outline-none py-3 bg-neutral text-accent font-semibold rounded-md'
                />
            </label>
        </div>
    </div>
    
  )
}