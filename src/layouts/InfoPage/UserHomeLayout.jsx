import React from 'react'
import Container from '../../components/Common/PageContainer/Container'
import ProfileBanner from '../../components/Banners/ProfileBanner'

export default function UserHomeLayout({children}) {
  return (
    <div>
      <ProfileBanner/>
      <Container>
        {children}
      </Container>
    </div>
  )
}
