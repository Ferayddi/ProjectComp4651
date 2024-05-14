import './NERAnalysis.css'
import NER from '../../assets/NER.png'
import {Button, TextField} from "@mui/material";
import {useState} from "react";
import {quickNERAnalysis} from "../../Services/NERAnalysis.js";

const NERAnalysis = () => {

    const [value, setValue] = useState('Mark Zuckerberg is one of the founders of Facebook, a company from the United States.');
    const [charCount, setCharCount] = useState(value.length);
    const handleChange = (event) => {
        const input = event.target.value;
        if (input.length <= 200) {
            console.log(input.length)
            setValue(input);
            setCharCount(input.length);
        }
    };

    const handleSubmit = () => {
        quickNERAnalysis(value).then(
            (response) => {
                if(response.status === 200){
                    console.log(response)
                } else {
                    console.log(response)
                }
            }).catch((error) => {
                console.log(error)
        })
    };

    return (
        <div className="NERAnalysis">
            <div className="NERAnalysis-left">
                <h3>NERAnalysis</h3>
                <img src={NER} alt="" className="NERAnalysis-img"></img>
                <h2>Named Entity Recognition (NER)</h2>
                <p>Named Entity Recognition (NER) is an NLP technique that identifies and categorizes named entities in text, such as names of people, organizations, and locations. It helps extract valuable information and improve context analysis in various applications. NER algorithms utilize machine learning to identify patterns and extract entities from unstructured text data.</p>
            </div>
            <div className="NERAnalysis-right">
                <h3>Quick Try Here</h3>
                <TextField
                    style={{ marginTop: '16px' }}
                    id="NERAnalysisQuickTry"
                    label="Input simple sentences here!"
                    multiline
                    value={value}
                    onChange={handleChange}
                    fullWidth
                />
                <p>Character Count: {charCount}/200</p>
                <Button variant="contained" onClick={handleSubmit}>Submit</Button>
            </div>
        </div>
    )
}

export default NERAnalysis