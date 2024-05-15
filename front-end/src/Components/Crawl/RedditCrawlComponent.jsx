import React from 'react'
import {useState} from 'react'
import { Button, FormGroup, Slider, TextField, Typography } from '@mui/material'
import { crawlReddit } from '../../Services/crawlService'

const RedditCrawlComponent = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [numPosts, setNumPosts] = useState(0);
    const [datasetName, setDatasetName] = useState('');

    const handleQueryChange = (event) => {
        setSearchQuery(event.target.value);
    };

    const handleNameChange = (event) => {
        setDatasetName(event.target.value);
    };

    const handleSliderChange = (event, newValue) => {
        setNumPosts(newValue);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        const formData = { 
            search_query : link, 
            num_posts: numPosts,
            dataset_name: datasetName

         };
        console.log(formData);  // Log the form data to the console for debugging

        // You can use fetch or axios to send formData to your API
        crawlReddit(searchQuery, numPosts, datasetName)
    };


  return (
    <div className="flex flex-col w-full items-center">
        <Typography variant="h3" className="text-center" gutterBottom>
                Crawl text from reddit
        </Typography>
        <form className="w-3/4" onSubmit={handleSubmit}>
            <FormGroup>
                <TextField
                    label="Search Query"
                    variant="outlined"
                    value={searchQuery}
                    onChange={handleQueryChange}
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
                    value={datasetName}
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
                    Post Count: {numPosts}
                </Typography>
                <Slider
                    value={numPosts}
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

export default RedditCrawlComponent