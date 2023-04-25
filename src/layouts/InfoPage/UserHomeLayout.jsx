import React from 'react'
import Container from '../../components/Common/PageContainer/Container'
import ProfileBanner from '../../components/Banners/ProfileBanner'
import HomeNavbar from '../../components/Navbar/HomeNavbar'

export default function UserHomeLayout({children}) {
  return (
    <div>
      <ProfileBanner/>
      <HomeNavbar/>
      <Container>
        {children}
      </Container>
    </div>
  )
}
