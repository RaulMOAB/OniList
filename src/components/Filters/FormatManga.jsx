import React from 'react'

export default function FormatManga({value, handle, filter}) {

    const format = ['Novel','One_Shot','Manga'];

    return (
        <div className='md:w-2/6 lg:w-1/6 w-3/6'>
            <span className='text-accent text-sm font-semibold'>Format</span>
            <div className='w-11/12 bg-neutral mb-5 rounded-md mt-2'>
                    <select
                      value={value}
                      onChange={(event) => handle(event.target.value)} 
                      className='select select-bordered select-sm w-full h-9 focus:outline-none opacity-60 text-accent text-sm bg-neutral'
                    >
                        <option value="">Any</option>
                        {format.map((item, i) => (
                            <option key={i} value={item.toUpperCase()}>{item}</option>
                        ))}
                    </select>
            </div>
        </div>
    )
}