import React from 'react'

export default function Genres({value, handle, filter}) {

  const genres = ['Action','Adventure','Comedy','Drama','Ecchi','Fantasy','Horror','Mahou Shoujo','Mecha','Music','Mystery','Psychological','Romance','Sci-Fi','Slice of Life','Sports','Supernatural','Thiller'];

  return (
    <div className='w-1/6'>
        <span className='text-accent font-semibold'>Genres</span>
        <div className='w-11/12 bg-neutral mb-5 rounded-md mt-2'>
                    <select
                      value={value}
                      onChange={(event) => {handle(event.target.value); filter()}} 
                      className='w-full h-9 focus:outline-none opacity-60 pl-3 text-accent text-sm rounded-md bg-neutral'
                    >
                        <option value="">Any</option>
                        {genres.map((item, i) => (
                            <option key={i} value={item}>{item}</option>
                        ))}
                    </select>
          </div>
    </div>
  )
}