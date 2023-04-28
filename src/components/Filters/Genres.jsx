import React from 'react'

export default function Genres({value, handle, filter}) {

  const genres = ['Action','Adventure','Comedy','Drama','Ecchi','Fantasy','Horror','Mahou Shoujo','Mecha','Music','Mystery','Psychological','Romance','Sci-Fi','Slice of Life','Sports','Supernatural','Thiller'];

  return (
    <div className='md:w-2/6 lg:w-1/6 w-3/6'>
        <span className='text-accent text-sm font-semibold'>Genres</span>
        <div className='w-11/12 bg-neutral mb-5 rounded-md mt-2'>
                    <select
                      value={value}
                      onChange={(event) => {handle(event.target.value); filter()}} 
                      className='select select-bordered select-sm w-full h-9 focus:outline-none opacity-60 text-accent text-sm bg-neutral'
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