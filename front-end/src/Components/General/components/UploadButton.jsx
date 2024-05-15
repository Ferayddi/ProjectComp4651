import Button from '@mui/material/Button';
import { styled } from '@mui/system';
import { uploadDataset } from '../../../Services/datasetService';
import secureLocalStorage from 'react-secure-storage';
import {useState} from "react";
import {useNavigate} from "react-router-dom";

const Input = styled('input')({
  display: 'none',
});

const UploadButton = ({success_function}) => {
    let navigate = useNavigate();
  const [file, setFile] = useState(null);
  const [isUploadSuccess, setIsUploadSuccess] = useState(false);

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
      formData.append('userName', secureLocalStorage.getItem('userName'))
      formData.append('dataset', file);
      
      uploadDataset(formData)
          .then((response) => {
              if(response.status === 200) {
                  setFile(null);
                  setIsUploadSuccess(true);
                  success_function();
                  setTimeout(() => {
                      setIsUploadSuccess(false);
                      navigate('/app')
                      // window.location.reload()
                  }, 2000);
              }
          })
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
        {isUploadSuccess && <p>file uploaded successfully</p>}
    </div>
    
  );
};

export default UploadButton;