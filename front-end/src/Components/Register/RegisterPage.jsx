import {Button, Box, Grid, Container, TextField,Typography, Link, Alert, IconButton, CssBaseline} from "@mui/material";
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import{useState} from "react";
import * as Yup from 'yup';
import { Formik } from 'formik';
import Copyright from '../CopyRight/CopyRight.jsx'
import {register} from "../../Services/authService.js";
import {useNavigate } from 'react-router-dom';

const RegisterPage = () => {
    let navigate = useNavigate();

    const [signUpState, setSignUpState] = useState(true);
    const [errorMessage, setErrorMessage] = useState("");
    const [duplicatedErrorType, setDuplicatedErrorType] = useState("");
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);

    const validationSchema = Yup.object().shape({
        userName: Yup.string()
            .required('Username is required')
            .matches(
                /^[a-zA-Z0-9]+$/,
                'Username should contain number and letters only'),
        userEmail: Yup.string()
            .required('Email is required')
            .email('Email is invalid'),
        password: Yup.string()
            .required('Password is required')
            .min(8, 'Password must be at least 8 characters')
            .max(20, 'Password must not exceed 20 characters')
            .matches(
                /^(?=.*[a-zA-Z])(?=.*[0-9])/,
                'Password must contain at least one letter and one number'
            ),
        confirmPassword: Yup.string()
            .required('Confirm Password is required')
            .oneOf([Yup.ref('password'),'\0'], 'Confirm Password does not match'),
    });

    return (
        <Formik
            initialValues={{
                userName: '',
                userEmail: '',
                password:'',
                confirmPassword:''
            }}
            validationSchema={validationSchema}
            onSubmit={(values) => {
                register(values.userName, values.userEmail, values.password).then(
                    (response) => {
                        if(response.status === 201) {
                            navigate("/");
                            window.location.reload();
                        } else {
                            setSignUpState(false)
                            setErrorMessage(response.error)
                            if (response.error === 'This Email already registered') {
                                setDuplicatedErrorType('Email');
                            } else if (response.error === 'The username already taken') {
                                setDuplicatedErrorType('Username');
                            }
                        }
                    },
                ).catch(() => {
                    setSignUpState(false)
                    setErrorMessage("Unexpected Error, Try later")
                })
            }}
        >

            {({
                  errors,
                  handleChange,
                  handleSubmit,
                  handleBlur,
                  touched,
                  values
              }) => (
                <Container component="main" maxWidth="xs">
                    <CssBaseline />
                    <Box
                        sx={{
                            marginTop: 8,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                        }}
                    >
                        <Typography component="h1" variant="h5">
                            Sign up
                        </Typography>
                        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
                            <Grid container spacing={2}>
                                <Grid item xs={12}>
                                    <TextField
                                        required
                                        fullWidth
                                        id="userName"
                                        label="Username"
                                        name="userName"
                                        autoComplete="userName"
                                        error={Boolean(touched.userName && errors.userName) || (duplicatedErrorType === "Username" || duplicatedErrorType === "All-duplicated") }
                                        helperText={touched.userName && errors.userName}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={values.userName}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        required
                                        fullWidth
                                        id="userEmail"
                                        label="Email Address"
                                        name="userEmail"
                                        autoComplete="userEmail"
                                        error={Boolean(touched.userEmail && errors.userEmail) || (duplicatedErrorType === "Email" || duplicatedErrorType === "All-duplicated") }
                                        helperText={touched.userEmail && errors.userEmail}
                                        value={values.userEmail}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        required
                                        fullWidth
                                        name="password"
                                        label="Password"
                                        type= {passwordVisible ? "text" : "password"}
                                        id="password"
                                        autoComplete="newPassword"
                                        error={Boolean(touched.password && errors.password)}
                                        helperText={touched.password && errors.password}
                                        value={values.password}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        InputProps={{
                                            endAdornment: (
                                                <IconButton onClick={() => setPasswordVisible(!passwordVisible)}>
                                                    {passwordVisible ? <VisibilityIcon /> : <VisibilityOffIcon />}
                                                </IconButton>
                                            ),
                                        }}
                                    />

                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        required
                                        fullWidth
                                        name="confirmPassword"
                                        label="confirmPassword"
                                        type={confirmPasswordVisible ? "text" : "password"}
                                        id="confirmPassword"
                                        autoComplete="confirmPassword"
                                        error={Boolean(touched.confirmPassword && errors.confirmPassword)}
                                        helperText={touched.confirmPassword && errors.confirmPassword}
                                        value={values.confirmPassword}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        InputProps={{
                                            endAdornment: (
                                                <IconButton onClick={() => setConfirmPasswordVisible(!confirmPasswordVisible)}>
                                                    {confirmPasswordVisible ? <VisibilityIcon /> : <VisibilityOffIcon />}
                                                </IconButton>
                                            ),
                                        }}
                                    />
                                </Grid>
                            </Grid>
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{ mt: 3, mb: 2 }}
                            >
                                Sign Up
                            </Button>
                            <Grid container justifyContent="flex-end">
                                <Grid item>
                                    <Link href="login" variant="body2">
                                        Already have an account? Sign in
                                    </Link>
                                </Grid>
                            </Grid>
                            {!signUpState && (
                                <Alert sx={{ mt: 3 }} severity="error">
                                    {errorMessage}
                                </Alert>
                            )}
                        </Box>
                    </Box>
                    <Copyright sx={{ mt: 5 }} />
                </Container>
            )
            }
        </Formik>
    );
}

export default RegisterPage