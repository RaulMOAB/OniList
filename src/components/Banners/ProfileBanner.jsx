import React from 'react'
import { useContext } from 'react'
import { AuthContext } from '@/contexts/AuthContext'

export default function ProfileBanner() {
  const {user} = useContext(AuthContext)
  return (
    
    <div className='max-w-screen bg-neutral h-80'>
      
    </div>
  )
}
