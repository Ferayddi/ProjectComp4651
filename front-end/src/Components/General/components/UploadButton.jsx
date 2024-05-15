import React, { useState } from 'react';
import Button from '@mui/material/Button';
import { styled } from '@mui/system';
import { uploadDataset } from '../../../Services/datasetService';

const Input = styled('input')({
  display: 'none',
});

const UploadButton = () => {
  const [file, setFile] = useState(null);

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile && selectedFile.type === 'text/plain') {
      setFile(selectedFile);
    } else {
      alert('Please upload a .txt file');
    }
  };

  const handleUpload = () => {
    if (file) {
      const formData = new FormData();
      formData.append('dataset', file);
      
      uploadDataset(formData)
    } else {
      alert('No file selected');
    }
  };

  return (
    <div className="flex flex-col">
        <div className="flex flex-row gap-4 items-center">
            <label htmlFor="upload-button">
                <Input 
                id="upload-button" 
                type="file" 
                onChange={handleFileChange} 
                accept=".txt" 
                />
                <Button 
                variant="contained" 
                component="span" 
                color="primary" 
                className="bg-our-blue"
                >
                Upload
                </Button>
            </label>
            {file &&
            <Button 
                variant="contained" 
                color="primary" 
                style={{ backgroundColor: 'blue' }}
                onClick={handleUpload}
            >
                Submit
            </Button>}
        </div>
        {file && <p>{file.name}</p>}
    </div>
    
  );
};

export default UploadButton;