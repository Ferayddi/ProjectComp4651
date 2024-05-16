import { Grid, Typography} from '@mui/material';
import Spacer from '../General/components/Spacer.jsx';
import {TeamText} from '../../constants/constants.js';
import Wave from 'react-wavify'
import member1 from '../../assets/FacePictures/frederic.jpeg'
import member2 from '../../assets/FacePictures/Samuel.jpeg'
import member3 from '../../assets/FacePictures/bosco.jpeg'
import member4 from '../../assets/FacePictures/ChoiSheungYin_Picture.jpeg'

const TeamPage = () => {
  return (
    <div className="w-full flex flex-col bg-black text-white relative">
        <Spacer height="5em" />
        <div className="flex w-full flex-row justify-center">
          <Typography variant="h3" gutterBottom>
              Our team
          </Typography>
        </div>
        
        <Spacer height="5em" />

        <div className="w-full flex px-8 py-4">
          <Grid container spacing={0} alignItems="center" >
            <Grid item xs={12} sm={4}>
              <div className="flex flex-row h-full items-center justify-center w-full">
                <img
                  src={member1} // Replace with your image URL
                  alt="Circular"
                  style={{ borderRadius: '50%' }} //width: '100%', height: 'auto', 
                  className="w-48 h-56"
                />
              </div>
            </Grid>
            <Grid item xs={12} sm={8} className="text-center">
              <div className="flex flex-col w-full px-8 ">
                <Typography variant="h5" component="h2">
                  {TeamText.member1.name}
                </Typography>
                <Typography variant="body1">
                {TeamText.member1.description}
                </Typography>
              </div>
            </Grid>
          </Grid>
        </div>

        <Spacer height="5em" />


        <div className="w-full flex px-8 py-4">
          <Grid container spacing={0} alignItems="center">
            <Grid item xs={12} sm={8} className="text-center">
              <div className="flex flex-col w-full px-8 ">
                <Typography variant="h5" component="h2">
                {TeamText.member2.name}
                </Typography>
                <Typography variant="body1">
                {TeamText.member2.description}
                </Typography>
              </div>
            </Grid>
            <Grid item xs={12} sm={4}>
              <div className="flex flex-row h-full items-center justify-center w-full">
                <img
                  src={member2} // Replace with your image URL
                  alt="Circular"
                  style={{  borderRadius: '50%' }}
                  className="w-48 h-56"
                />
              </div>
            </Grid>
          </Grid>
        </div>

        <Spacer height="5em" />


        <div className="w-full flex px-8 py-4">
          <Grid container spacing={0} alignItems="center">
            
            <Grid item xs={12} sm={8} className="text-center">
              <div className="flex flex-col w-full px-8 ">
                <Typography variant="h5" component="h2">
                {TeamText.member3.name}
                </Typography>
                <Typography variant="body1">
                {TeamText.member3.description}
                </Typography>
              </div>
            </Grid>
            <Grid item xs={12} sm={4}> 
              <div className="flex flex-row h-full items-center justify-center w-full">
                <img
                  src={member3} // Replace with your image URL
                  alt="Circular"
                  style={{ borderRadius: '50%', objectFit: "cover"}}
                  className="w-48 h-56"
                />
              </div>
            </Grid>
          </Grid>
        </div>

        <Spacer height="5em" />

        <div className="w-full flex px-8 py-4">
          <Grid container spacing={0} alignItems="center">
            <Grid item xs={12} sm={4}>
              <div className="flex flex-row h-full items-center justify-center w-full">
                <img
                  src={member4} // Replace with your image URL
                  alt="Circular"
                  style={{ borderRadius: '50%' }}
                  className="w-48 h-56"
                />
              </div>
            </Grid>
            <Grid item xs={12} sm={8} className="text-center">
              <div className="flex flex-col w-full px-8 ">
                <Typography variant="h5" component="h2">
                {TeamText.member4.name}
                </Typography>
                <Typography variant="body1">
                  {TeamText.member4.description}
                </Typography>
              </div>
              
            </Grid>
          </Grid>
        </div>



        <Spacer height="5em" />

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

export default TeamPage