import React from 'react'
import RegisterForm from '../components/Forms/RegisterForm'
import Head from 'next/head'
export default function register() {
  return (
    <>
    	<Head>
				<title>Register · OniList</title>
			</Head>
    <div>
      <RegisterForm/>
    </div>
    </>
  )
}