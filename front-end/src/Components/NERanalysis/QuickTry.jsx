import './QuickTry.css'
import {Button, TextField} from "@mui/material";
import {useState} from "react";
import {quickNERAnalysis} from "../../Services/NERAnalysis.js";

const QuickTry = () => {

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
                <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                    <Button variant="contained" onClick={handleSubmit}>Try !</Button>
                </div>
            </div>
        </div>
    )
}

export default QuickTry