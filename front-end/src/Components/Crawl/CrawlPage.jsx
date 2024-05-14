import { Typography, Grid, TextField } from '@mui/material'
import React from 'react'
import {useState} from 'react'
import Spacer from '../General/components/Spacer.jsx'

import GoogleIcon from '../../assets/GoogleIcon';
import RedditIcon from '../../assets/RedditIcon';

import RedditCrawlComponent from './RedditCrawlComponent.jsx';
import GoogleCrawlComponent from './GoogleCrawlComponent.jsx';
const CrawlPage = () => {
    const [crawlMethod, setCrawlMethod] = React.useState("")

    return (
        <div className="w-full flex flex-col bg-black text-white min-h-dvh">
            <Spacer height={"6em"} />
            <Typography variant="h2" className="text-center" gutterBottom>
                Crawl for data
            </Typography>
            <Spacer height={"6em"} />
            <Typography variant="h4" className="text-start px-8" gutterBottom>
                Choose your method:
            </Typography>
            <Spacer height={"3em"} />
            <div className="flex flex-row w-full justify-around py-5">
                <div className="flex flex-col gap-3 items-center" onClick={() => {setCrawlMethod("Reddit"); }}>
                    <RedditIcon size={"10em"} hover_size={"12em"}/>
                    <Typography>
                        Reddit
                    </Typography>
                </div>
                <div className="flex flex-col gap-3 items-center" onClick={() => {setCrawlMethod("Google"); }}>
                    <GoogleIcon size={"10em"} hover_size={"12em"} />
                    <Typography>
                        Google
                    </Typography>
                </div>
            </div>

            <Spacer height={"6em"} />

            {crawlMethod == "Reddit" ?
            <RedditCrawlComponent /> :
            null }
            
            {crawlMethod == "Google" ?
            <GoogleCrawlComponent /> :
            null  }

            <Spacer height={"6em"} />

        </div>
    )
}

export default CrawlPage