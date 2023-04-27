import React from 'react'

export default function Format({value, handle, filter}) {

    const format = ['TV','Movie','TV_Short','Special','OVA','ONA','Music'];

    return (
        <div className='w-1/6'>
            <span className='text-accent text-sm font-semibold'>Format</span>
            <div className='w-11/12 bg-neutral mb-5 rounded-md mt-2'>
                    <select
                      value={value}
                      onChange={(event) => {handle(event.target.value); filter()}} 
                      className='w-full h-9 focus:outline-none opacity-60 pl-3 text-accent text-sm rounded-md bg-neutral'
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