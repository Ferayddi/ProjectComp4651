import React from 'react'
import Typography from '@mui/material/Typography';
import CopyrightIcon from '@mui/icons-material/Copyright';

import FacebookOutlinedIcon from '@mui/icons-material/FacebookOutlined';
import TwitterIcon from '@mui/icons-material/Twitter';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import InstagramIcon from '@mui/icons-material/Instagram';


const Footer = (isAuthPage) => {
  return (
      <div className={`w-full ${isAuthPage.valueOf ? 'bg-white' : 'bg-our-blue'} py-4`}>
      <div className="flex flex-col w-full items-center gap-4">
        <div className=" flex flex-row gap-2 justify-center">
          <FacebookOutlinedIcon />
          <TwitterIcon />
          <LinkedInIcon />
          <InstagramIcon />
        </div>
        <div className={`flex flex-row gap-2 justify-${isAuthPage.valueOf ? 'end' : 'center'}`}>
          {!isAuthPage.valueOf && (
              <>
                <p>Home</p>
                <p>About</p>
                <p>Services</p>
                <p>Team</p>
                <p>Contact</p>
              </>
          )}
        </div>
        <div className=" flex flex-row gap-2">
          <CopyrightIcon /><p className="font-bold underline underline-offset-2" >2024 Copyright Great A+ team</p>
        </div>
      </div>
      
    </div>
  )
}

export default Footer