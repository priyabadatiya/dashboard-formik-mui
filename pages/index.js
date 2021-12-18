import * as React from 'react';
import { useRouter } from 'next/router'
import { Button, Avatar, CssBaseline, TextField, FormControlLabel, Checkbox, Link, Grid, Box, Typography, Container, Snackbar } from '@mui/material';
import MuiAlert from "@mui/material/Alert"
import { createTheme, ThemeProvider } from '@mui/material/styles';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Copyright from '../Components/CopyRight'
import { useFormik } from 'formik';
import * as yup from 'yup';

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const validationSchema = yup.object({
  username: yup
    .string('Enter your username')
    .min(7, 'username should be of minimum 7 characters length')
    .required('username is required'),

  email: yup
    .string('Enter your email')
    .email('Enter a valid email')
    .required('Email is required'),
  password: yup
    .string('Enter your password')
    .min(5, 'Password should be of minimum 5 characters length')
    .required('Password is required'),
});

const theme = createTheme();
console.log(theme);

export default function SignIn() {
  const router = useRouter()
  const [open, setOpen] = React.useState(false);
  const [message, setMessage] = React.useState({ type: "error", desc: "Incorrect Credential" });

  const formik = useFormik({
    initialValues: {
      username: '',
      email: '',
      password: '',
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      verifyCredentials(values)
    },
  });

  React.useEffect(() => {
    localStorage.getItem('username') == "test123" &&
      localStorage.getItem('email') == "test@gmail.com" &&
      localStorage.getItem('password') == "12345" && router.push("/home")
    console.log("hi")
  }, [])

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);

  };

  function verifyCredentials(formData) {

    const isCorrectUsername = formData.username == "test123";
    const isCorrectEmail = formData.email == "test@gmail.com";
    const isCorrectPassword = formData.password == "12345";

    if (isCorrectUsername && isCorrectEmail && isCorrectPassword) {
      setMessage({ type: "success", desc: "Login Succesfull" })
      setOpen(true)
      localStorage.setItem('username', "test123")
      localStorage.setItem('email', "test@gmail.com")
      localStorage.setItem('password', "12345")

      setTimeout(() => router.push("/home"), 1000)
    }
    else {
      setMessage({ type: "error", desc: "Incorrect Credential" })
      setOpen(true)
    }
  }

  return (
    <ThemeProvider theme={theme}>
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

          <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
            <Alert onClose={handleClose} severity={message.type} sx={{ width: '100%' }}>
              {message.desc}
            </Alert>
          </Snackbar>
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <form onSubmit={formik.handleSubmit} >
            <TextField
              margin="normal"
              required
              fullWidth
              id="username"
              label="username"
              name="username"
              autoComplete="username"
              autoFocus
              value={formik.values.username}
              onChange={formik.handleChange}
              error={formik.touched.username && Boolean(formik.errors.username)}
              helperText={formik.touched.username && formik.errors.username}
            />

            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              value={formik.values.email}
              onChange={formik.handleChange}
              error={formik.touched.email && Boolean(formik.errors.email)}
              helperText={formik.touched.email && formik.errors.email}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              value={formik.values.password}
              onChange={formik.handleChange}
              error={formik.touched.password && Boolean(formik.errors.password)}
              helperText={formik.touched.password && formik.errors.password}
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link href="#" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </form>
        </Box>
        <Copyright variant="body2" sx={{ mt: 8, mb: 4 }} />
      </Container>
    </ThemeProvider>
  );
}