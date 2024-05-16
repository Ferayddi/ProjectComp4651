import {
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
} from "@mui/material";
import { useEffect, useState } from "react";
import { retrieveDatasets } from "../../Services/datasetService.js";
import { analyzeDataset } from "../../Services/datasetAnalysisService.js";
import UploadButton from "../General/components/UploadButton.jsx";

const AnalysisComponent = () => {
  const [selectedRow, setSelectedRow] = useState(null);
  const [analysisType, setAnalysisType] = useState("");
  const [dataList, setDataList] = useState(null);
  const fetchData = async () => {
    try {
      const result = await retrieveDatasets();
      console.log(result.datasets);
      setDataList(result.datasets);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);
  const handleRowClick = (index) => {
    setSelectedRow(index);
  };

  const handleAnalysisTypeChange = (event) => {
    setAnalysisType(event.target.value);
  };

  const handleSubmit = () => {
    if (selectedRow !== null && analysisType) {
      console.log(dataList[selectedRow]);
      console.log(analysisType);
      // const selectedData = data[selectedRow];
      // console.log('Starting analysis for:', selectedData);
      // console.log('Analysis type:', analysisType);
      // Perform the analysis here, e.g., send data to your API
      analyzeDataset(dataList[selectedRow], analysisType);
    } else {
      console.log("Please select a row and an analysis type.");
    }
  };

  return (
    <div className="py-4 px-8 w-full">
      <Typography variant="h4" gutterBottom className="text-center text-black">
        Select one of your datasets
      </Typography>
      <div className="flex flex-row w-full justify-end">
        <UploadButton success_function={fetchData} />
      </div>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Date Created</TableCell>
              <TableCell>Data Size</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {dataList ? (
              dataList.map((row, index) => (
                <TableRow
                  key={index}
                  onClick={() => handleRowClick(index)}
                  selected={selectedRow === index}
                  style={{ cursor: "pointer" }}
                >
                  <TableCell>{row.datasetName}</TableCell>
                  <TableCell>{row.createdAt}</TableCell>
                  <TableCell>
                    {row.datasetSize} {row.datasetSizeUnit}
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={3} align="center">
                  Empty Table
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      <FormControl fullWidth margin="normal">
        <InputLabel className="text-white" id="analysis-type-label">
          Analysis Type
        </InputLabel>
        <Select
          labelId="analysis-type-label"
          value={analysisType}
          onChange={handleAnalysisTypeChange}
          sx={{
            backgroundColor: "white",
            color: "black", // Text color inside the select
            "& .MuiOutlinedInput-notchedOutline": {
              borderColor: "white",
            },
            "&:hover .MuiOutlinedInput-notchedOutline": {
              borderColor: "white",
            },
            "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
              borderColor: "white",
            },
            "& .MuiSvgIcon-root": {
              color: "black", // Arrow icon color
            },
            "& .MuiInputBase-input": {
              color: "black", // Input text color
            },
          }}
        >
          <MenuItem value="NER">NER</MenuItem>
          <MenuItem value="Word count">Word count</MenuItem>
          <MenuItem value="Sentiment analysis">Sentiment analysis</MenuItem>
        </Select>
      </FormControl>

      <Button
        variant="contained"
        // color="#5e9ef1"
        onClick={handleSubmit}
        fullWidth
        sx={{
          backgroundColor: "#5e9ef1", // Custom background color
          color: "white", // Custom text color
          "&:hover": {
            backgroundColor: "#123456", // Custom hover background color, often a shade darker or lighter
            // You can use a utility function to darken or lighten colors if needed
            "@media (hover: none)": {
              backgroundColor: "#123456", // Ensures the color remains the same on devices that do not support hover
            },
          },
        }}
      >
        Start analysis
      </Button>
    </div>
  );
};

export default AnalysisComponent;
