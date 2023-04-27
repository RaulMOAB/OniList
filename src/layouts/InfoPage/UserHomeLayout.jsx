import React from 'react'
import Container from '../../components/Common/PageContainer/Container'
import {ProfileBanner} from '../../components/Banners/ProfileBanner'
import HomeNavbar from '../../components/Navbar/HomeNavbar'
import VerifyIfUserIsLogged from "@/components/Common/VerifyIfUserIsLogged";

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
