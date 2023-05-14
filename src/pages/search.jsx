import React from 'react'
import Search from './../components/Filters/Search';
import Head from 'next/head';

export default function search() {
  return (
    <>
      			<Head>
				<title>Search · OniList</title>
			</Head>
    <div className="container">
     <h2 className='text-center'>React Search</h2>
      <Search />     
    </div>
    </>
  );
}
