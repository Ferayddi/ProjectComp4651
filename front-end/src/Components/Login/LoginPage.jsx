import {Button, Box, Grid, Container, TextField, Typography, Link, Alert, IconButton, CssBaseline } from "@mui/material";
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import {useState} from "react";
import { Formik } from 'formik';
import { useNavigate } from 'react-router-dom';
import {login} from "../../Services/authService.js";
import Footer from '../General/components/Footer.jsx';
import * as Yup from 'yup';

const LoginPage = () => {

    let navigate = useNavigate();


    const [signInState, setSignInState] = useState(true);
    const [signInErrorType, setSignInErrorType] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [passwordVisible, setPasswordVisible] = useState(false);

    const validationSchema = Yup.object().shape({
        userEmail: Yup.string()
            .required('Email is required')
            .matches(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, 'Invalid email format'),
        password: Yup.string()
            .required('Password is required')
    });

  return (
      <Formik
          initialValues={{
              userEmail: '',
              password:'',
          }}
          validationSchema={validationSchema}
          onSubmit={(values) => {
              login(values.userEmail,values.password).then(
                  (response) => {
                      if(response.status === 200) {
                          navigate("/");
                          window.location.reload();
                      } else {
                          setSignInState(false)
                          setErrorMessage(response.error)
                          if (response.status === 404) {
                              setSignInErrorType("UserEmail")
                          } else if(response.status === 401)  {
                              setSignInErrorType("Password")
                          }
                      }
                  }
              ).catch((error)=>{
                  console.log(error)
                  setSignInState(false)
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
                          Sign in
                      </Typography>
                      <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
                          <Grid container spacing={2}>
                              <Grid item xs={12}>
                                  <TextField
                                      required
                                      fullWidth
                                      id="userEmail"
                                      label="Email"
                                      name="userEmail"
                                      autoComplete="userEmail"
                                      error={Boolean(touched.userEmail && errors.userEmail) || signInErrorType === "UserEmail" }
                                      helperText={touched.userEmail && errors.userEmail}
                                      onChange={handleChange}
                                      onBlur={handleBlur}
                                      value={values.userEmail}
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
                                      autoComplete="password"
                                      error={Boolean(touched.password && errors.password) || signInErrorType === "Password"}
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
                          </Grid>
                          <Button
                              type="submit"
                              fullWidth
                              variant="contained"
                              sx={{ mt: 3, mb: 2 }}
                          >
                              Sign In
                          </Button>
                          <Grid container justifyContent="flex-end">
                              <Grid item>
                                  <Link href="register" variant="body2">
                                      Don&apos;t have an account? Register
                                  </Link>
                              </Grid>
                          </Grid>
                          {!signInState && (
                              <Alert sx={{ mt: 3 }} severity="error">
                                  {errorMessage}
                              </Alert>
                          )}
                      </Box>
                  </Box>
                  <Footer sx={{ mt: 5 }} valueOf={true}/>
              </Container>
          )
          }
      </Formik>
  );
}

export default LoginPage