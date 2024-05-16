import axios from "axios";
import secureLocalStorage from "react-secure-storage";

function openAllUrls(urls) {
  urls.forEach((url) => {
    const fullUrl = `${import.meta.env.VITE_BACKEND_SERVER_URL}/${url}`;
    window.open(fullUrl, "_blank");
  });
}

export const quickNERAnalysis = (textString, successFunction, failFunction) => {
  const token = secureLocalStorage.getItem("accessToken");

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  };

  const requestBody = {
    textString: textString,
  };

  return axios
    .post(
      `${import.meta.env.VITE_BACKEND_SERVER_URL}/neranalysis/quickresult`,
      requestBody,
      config
    )
    .then((response) => {
      if (response.status >= 200 && response.status < 300) {
        successFunction();
        console.log(response.data.output_url);
        openAllUrls(response.data.output_url);
      } else {
        failFunction();
      }
      return response.data;
    })
    .catch((error) => {
      return error.response.data;
    });
};
