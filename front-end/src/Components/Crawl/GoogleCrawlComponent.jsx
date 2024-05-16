import React from 'react'
import {useState} from 'react'
import { Button, FormGroup, Slider, TextField, Typography } from '@mui/material'
import { crawlGoogle } from '../../Services/crawlService'
import  StatusIcon  from '../General/components/StatusIcon'

const GoogleCrawlComponent = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [numLinks, setNumLinks] = useState(0);
    const [datasetName, setDatasetName] = useState('');
    const [crawlingState, setCrawlingState] = useState('');

    const handleDatasetNameChange = (event) => {
        setDatasetName(event.target.value);
    };

    const handleSearchQueryChange = (event) => {
        setSearchQuery(event.target.value);
    };

    const handleSliderChange = (event, newValue) => {
        setNumLinks(newValue);
    };

    const successFunction = () => {
        setCrawlingState("success")
    }

    const failFunction = () => {
        setCrawlingState("failed")
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        //console.log(formData);  // Log the form data to the console for debugging
        setCrawlingState("crawling")
        // You can use fetch or axios to send formData to your API
        crawlGoogle(searchQuery, numLinks, datasetName, successFunction, failFunction)
    };


  return (
    <div className="flex flex-col w-full items-center">
        <Typography variant="h3" className="text-center" gutterBottom>
                Crawl text from google
        </Typography>
        <form className="w-3/4" onSubmit={handleSubmit}>
            <FormGroup>
                <TextField
                    label="Search Query"
                    variant="outlined"
                    value={searchQuery}
                    onChange={handleSearchQueryChange}
                    fullWidth
                    margin="normal"
                    sx={{
                        input: { color: 'black' }, // Changes the text color to white
                        label: { color: 'black' }, // Changes the label color to white
                        '& label.Mui-focused': { color: 'black' }, // Maintains label color when focused
                        '& .MuiOutlinedInput-root': {
                            '& fieldset': { borderColor: 'white' }, // Changes the border color to white
                            '&:hover fieldset': { borderColor: 'white' }, // Maintains border color on hover
                            '&.Mui-focused fieldset': { borderColor: 'white' }, // Border color when the text field is focused
                            backgroundColor: 'white' // Changes the background to white
                        }
                    }}
                />
                <TextField
                    label="Name for data"
                    variant="outlined"
                    value={datasetName}
                    onChange={handleDatasetNameChange}
                    fullWidth
                    margin="normal"
                    sx={{
                        input: { color: 'black' }, // Changes the text color to white
                        label: { color: 'black' }, // Changes the label color to white
                        '& label.Mui-focused': { color: 'black' }, // Maintains label color when focused
                        '& .MuiOutlinedInput-root': {
                            '& fieldset': { borderColor: 'white' }, // Changes the border color to white
                            '&:hover fieldset': { borderColor: 'white' }, // Maintains border color on hover
                            '&.Mui-focused fieldset': { borderColor: 'white' }, // Border color when the text field is focused
                            backgroundColor: 'white' // Changes the background to white
                        }
                    }}
                />
                <Typography gutterBottom>
                    Number of links you would like to crawl: {numLinks}
                </Typography>
                <Slider
                    value={numLinks}
                    onChange={handleSliderChange}
                    step={1}
                    marks
                    min={0}
                    max={100}
                    valueLabelDisplay="auto"
                    aria-labelledby="post-count-slider"
                    sx={{
                        color: 'white', // Changes the color of the slider track and thumb
                        '& .MuiSlider-thumb': {
                            color: 'white', // Changes the thumb color
                        },
                        '& .MuiSlider-track': {
                            color: 'white', // Changes the track color
                        },
                        '& .MuiSlider-rail': {
                            color: 'white' // Changes the rail color
                        }
                    }}
                />
                <Button 
                type="submit" variant="contained" color="primary"
                sx={{
                    backgroundColor: '#5e9ef1', // Custom background color
                    color: 'white', // Custom text color
                    '&:hover': {
                      backgroundColor: '#123456', // Custom hover background color, often a shade darker or lighter
                      // You can use a utility function to darken or lighten colors if needed
                      '@media (hover: none)': {
                        backgroundColor: '#123456' // Ensures the color remains the same on devices that do not support hover
                      }
                    }
                  }}
                >
                    CRAWL
                </Button>
                < StatusIcon state={crawlingState} />
            </FormGroup>
        </form>

    </div>
  )
}

export default GoogleCrawlComponent