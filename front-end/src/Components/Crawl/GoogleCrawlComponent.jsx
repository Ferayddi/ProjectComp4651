import React from 'react'
import {useState} from 'react'
import { Button, FormGroup, Slider, TextField, Typography } from '@mui/material'

const GoogleCrawlComponent = () => {
    const [link, setLink] = useState('');
    const [postCount, setPostCount] = useState(0);
    const [name, setName] = useState('');

    const handleNameChange = (event) => {
        setName(event.target.value);
    };

    const handleLinkChange = (event) => {
        setLink(event.target.value);
    };

    const handleSliderChange = (event, newValue) => {
        setPostCount(newValue);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        const formData = { link, postCount };
        console.log(formData);  // Log the form data to the console for debugging

        // You can use fetch or axios to send formData to your API
        fetch('api/api', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        })
        .then(response => response.json())
        .then(data => console.log(data))
        .catch(error => console.error('Error:', error));
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
                    value={link}
                    onChange={handleLinkChange}
                    fullWidth
                    margin="normal"
                    sx={{
                        input: { color: 'white' }, // Changes the text color to white
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
                    value={name}
                    onChange={handleNameChange}
                    fullWidth
                    margin="normal"
                    sx={{
                        input: { color: 'white' }, // Changes the text color to white
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
                    Number of links you would like to crawl: {postCount}
                </Typography>
                <Slider
                    value={postCount}
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
            </FormGroup>
        </form>

    </div>
  )
}

export default GoogleCrawlComponent