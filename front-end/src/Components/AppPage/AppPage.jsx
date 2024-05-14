import React from 'react'
import { Typography } from '@mui/material'
import Spacer from '../General/components/Spacer.jsx'
import AnalysisComponent from './AnalysisComponent.jsx'
import Wave from 'react-wavify'
import NERAnalysis from "../NERanalysis/NERAnalysis.jsx";
const AppPage = () => {
  return (
    <div className="w-full flex flex-col bg-white  min-h-dvh relative">
            <NERAnalysis/>
            <Spacer height={"6em"} />
            <div className="flex flex-row w-full justify-center">
              <div className="flex w-3/4">

                <AnalysisComponent />
              </div>
            </div>
            <Wave fill='#5e9ef1' className="overflow-y-visible flex"
              paused={false}
              style={{ 
                position: 'absolute',   // Use 'fixed' to position it relative to the viewport
                bottom: 0,              // Align the top edge with the top of the viewport
                left: 0,             // Align the left edge with the left side of the viewport
                width: '100%',      // Set width to 100% of the viewport width width: '100vw'
                height: 40,
                // height: '100vh',     // Set height to 100% of the viewport height
                display: 'flex',
                zIndex: 10         // Optional: use a negative z-index if it should go behind other content
              }}
              options={{
                height: 10,
                amplitude: 20,  //20
                speed: 0.30,   //0.15
                points: 3
              }}
              />
        </div>
  )
}

export default AppPage