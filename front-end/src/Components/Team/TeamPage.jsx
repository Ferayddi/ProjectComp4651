import React from 'react'
import { Grid, Typography, Paper } from '@mui/material';
import Spacer from '../General/components/Spacer.jsx';
import {TeamText} from '../../constants/constants.js';

const TeamPage = () => {
  return (
    <div className="w-full flex flex-col bg-black text-white">
        <Spacer height="5em" />
        <div className="flex w-full flex-row justify-center">
          <Typography variant="h3" gutterBottom>
              Our team
          </Typography>
        </div>
        
        <Spacer height="5em" />

        <div className="w-full flex px-8 py-4">
          <Grid container spacing={8} alignItems="center">
            <Grid item xs={12} sm={4}>
              <img
                src="https://via.placeholder.com/150" // Replace with your image URL
                alt="Circular"
                style={{ width: '100%', height: 'auto', borderRadius: '50%' }}
              />
            </Grid>
            <Grid item xs={12} sm={8} className="text-center">
              <Typography variant="h5" component="h2">
                {TeamText.member1.name}
              </Typography>
              <Typography variant="body1">
              {TeamText.member1.description}
              </Typography>
            </Grid>
          </Grid>
        </div>

        <Spacer height="5em" />


        <div className="w-full flex px-8 py-4">
          <Grid container spacing={8} alignItems="center">
            <Grid item xs={12} sm={8} className="text-center">
              <Typography variant="h5" component="h2">
              {TeamText.member2.name}
              </Typography>
              <Typography variant="body1">
              {TeamText.member2.description}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={4}>
              <img
                src="https://via.placeholder.com/150" // Replace with your image URL
                alt="Circular"
                style={{ width: '100%', height: 'auto', borderRadius: '50%' }}
              />
            </Grid>
          </Grid>
        </div>

        <Spacer height="5em" />


        <div className="w-full flex px-8 py-4">
          <Grid container spacing={8} alignItems="center">
            
            <Grid item xs={12} sm={8} className="text-center">
              <Typography variant="h5" component="h2">
              {TeamText.member3.name}
              </Typography>
              <Typography variant="body1">
              {TeamText.member3.description}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={4}> 
              <img
                src="https://via.placeholder.com/150" // Replace with your image URL
                alt="Circular"
                style={{ width: '100%', height: 'auto', borderRadius: '50%' }}
              />
            </Grid>
          </Grid>
        </div>

        <Spacer height="5em" />

        <div className="w-full flex px-8 py-4">
          <Grid container spacing={8} alignItems="center">
            <Grid item xs={12} sm={4}>
              <img
                src="https://via.placeholder.com/150" // Replace with your image URL
                alt="Circular"
                style={{ width: '100%', height: 'auto', borderRadius: '50%' }}
              />
            </Grid>
            <Grid item xs={12} sm={8} className="text-center">
              <Typography variant="h5" component="h2">
              {TeamText.member4.name}
              </Typography>
              <Typography variant="body1">
                {TeamText.member4.description}
              </Typography>
            </Grid>
          </Grid>
        </div>



        <Spacer height="5em" />

    </div>
  )
}

export default TeamPage