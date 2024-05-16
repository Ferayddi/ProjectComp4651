import secureLocalStorage from "react-secure-storage";
import axios from "axios";

export const analyzeDataset = (
  datasetName,
  analysisType,
  successFunction,
  failFunction
) => {
  const token = secureLocalStorage.getItem("accessToken");

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  };

  const requestBody = {
    dataset_name: datasetName,
    analysis_type: analysisType,
  };

  return axios
    .post(
      `${import.meta.env.VITE_BACKEND_SERVER_URL}/analysis/new`,
      requestBody,
      config
    )
    .then((response) => {
      if (response.status >= 200 && response.status < 300) {
        successFunction();
        console.log(response.data.output_url);
        window.open(
          `${import.meta.env.VITE_BACKEND_SERVER_URL}/${
            response.data.output_url
          }`,
          "_blank"
        );
      } else {
        failFunction();
      }
      return response.data;
    })
    .catch((error) => {
      return error.response.data;
    });
};
