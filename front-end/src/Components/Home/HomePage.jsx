import React from 'react'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Spacer from '../General/components/Spacer.jsx';
import WaveText from '../General/components/WaveText.jsx';
import Wave from 'react-wavify'

//Icons for list of icons:
import CollectionsBookmarkTwoToneIcon from '@mui/icons-material/CollectionsBookmarkTwoTone';
import CalculateTwoToneIcon from '@mui/icons-material/CalculateTwoTone';
import GetAppTwoToneIcon from '@mui/icons-material/GetAppTwoTone';

import Typography from '@mui/material/Typography';

const HomePage = () => {
  return (
    <div className="w-full flex flex-col">
        <Spacer height="5em" />
        <div className=" flex flex-col justify-start">
          <Typography variant="h1" gutterBottom>
            Welcome to Home Page
          </Typography>

          <Spacer height="15em" />
          <div className="flex flex-col w-full justify-center items-center gap-3">
            <Typography variant="h4" gutterBottom>
              Scroll down to learn more
            </Typography>
            <p>Made this page pretty</p>
            <ExpandMoreIcon />
          </div>
        </div>

        <Spacer height="5em" />

        <div className="flex flex-col w-full relative text-white">
          <Spacer height="5em" />
          <Wave fill='#5e9ef1'
          paused={false}
          style={{ 
            position: 'absolute',   // Use 'fixed' to position it relative to the viewport
            top: 0,              // Align the top edge with the top of the viewport
            left: 0,             // Align the left edge with the left side of the viewport
            width: '100vw',      // Set width to 100% of the viewport width
            height: '100%',
            // height: '100vh',     // Set height to 100% of the viewport height
            display: 'flex',
            zIndex: -1           // Optional: use a negative z-index if it should go behind other content
          }}
          options={{
            height: 20,
            amplitude: 20,
            speed: 0.15,
            points: 3
          }}
          />
          <div className="flex flex-row w-full justify-center gap-8">
            <CollectionsBookmarkTwoToneIcon fontSize="large" />
            <CalculateTwoToneIcon fontSize="large"/>
            <GetAppTwoToneIcon fontSize="large"/>
          </div>

          <Spacer />

          <div className="flex flex-col">
            <Typography variant="h2" gutterBottom>
              Collect Data
            </Typography>
            <Spacer height="3em"/>
            <Typography variant="h3" gutterBottom>
              Perform cluster analysis
            </Typography>
            <Spacer height="3em"/>
            <Typography variant="h4" gutterBottom>
              Retrieve results
            </Typography>
          </div>
        </div>
        
        

    </div>
  )
}

export default HomePage