import {Typography, Link} from "@mui/material";
export default function Copyright(props) {
    return (
        <Typography variant="body2" color="text.secondary" align="center" {...props}>
            {'Copyright © '}
            <Link color="inherit" href="#">
                HKUST COMP4651
            </Link>{' '}
            {2024}
            {'.'}
        </Typography>
    );
}