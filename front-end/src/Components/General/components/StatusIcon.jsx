import React, {useEffect} from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ErrorIcon from '@mui/icons-material/Error';
import Box from '@mui/material/Box';

const StatusIcon = ({state}) => {
    const [icon, setIcon] = React.useState(null);

    useEffect(() => {
      if (state === "crawling") {
        setIcon(<CircularProgress />);
      } else if (state === "success") {
        setIcon(<CheckCircleIcon color="success" />)
      } else if (state === "failed") {
        setIcon(<ErrorIcon color="error" />)
      } else {
        setIcon(null)
      }
    }, [state])
    
    console.log(state)
  
    return (
      <div className="flex flex-row w-full justify-center items-center py-6" >
        {icon}
      </div>
    );
}

export default StatusIcon