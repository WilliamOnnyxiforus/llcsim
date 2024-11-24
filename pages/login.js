import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Button, TextField, Box, Typography, Container, Snackbar, Alert } from '@mui/material';
import { loginSuccess } from '../redux/slices/authSlice';
import { useRouter } from 'next/router';

export default function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [usernameError, setUsernameError] = useState(false);
    const [passwordError, setPasswordError] = useState(false);

    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [snackbarSeverity, setSnackbarSeverity] = useState('success')

    const [retries, setRetries] = useState(5);
    const dispatch = useDispatch();
    const router = useRouter();

    const handleLogin = async (event) => {
        event.preventDefault();

        const response = await fetch('/api/auth/checkUsername/' + username);
        const data = await response.json();

        if (data.length === 0) {
            setSnackbarSeverity('error');
            setSnackbarMessage('Account not found. Please check your username and try again!')
        }
        else if (data[0]['isBlocked'] === 1) {
            setSnackbarSeverity('error');
            setSnackbarMessage('Your account is blocked. Please contact administrator!')
        }
        else {
            const loginRes = await fetch('/api/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password }),
            })
            const loginData = await loginRes.json();

            if (loginRes.status === 401) {
                const currRetries = retries - 1;
                if (currRetries !== 0) {
                    setSnackbarSeverity('error');
                    setSnackbarMessage(loginData['error']);
                } else {
                    //Call API to block the account HERE
                    await fetch('/api/auth/blockAccount/' + username);

                    setSnackbarSeverity('error');
                    setSnackbarMessage('Your account is blocked. Please contact administrator!');
                }
                if (currRetries == 0) {
                    setRetries(5);
                } else {
                    setRetries(retries - 1);
                }
            }
            else {
                setSnackbarSeverity('success');
                setSnackbarMessage('Login Success!');

                // Dispatch login action
                dispatch(loginSuccess({ name: loginData[0]['name'], email: loginData[0]['email'] }));

                // Redirect to protected page
                router.push('/home');
            }

        }

        setOpenSnackbar(true)
        //setSnackbarMessage(data[0]['isNewPassword'])
    };

    const usernameHandleChange = (e) => {
        setUsernameError(true)
        setUsername(e.target.value)
        if (e.target.value.trim() !== '') {
            setUsernameError(false);  // Clear error if user starts typing
        }
    }

    const passwordHandleChange = (e) => {
        setPasswordError(true)
        setPassword(e.target.value)
        if (e.target.value.trim() !== '') {
            setPasswordError(false);  // Clear error if user starts typing
        }
    }

    const handleSnackbarClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpenSnackbar(false);
    };

    return (
        <Container
            maxWidth={false} // Disable default max width (full width)
            sx={{
                height: '100vh',  // Full height of the viewport
                width: '100vw',   // Full width of the viewport
                display: 'flex',  // Flexbox to center content
                alignItems: 'center', // Vertically center
                justifyContent: 'center', // Horizontally center
                backgroundColor: '#D3D3D3', // Optional background color
                padding: { xs: 2, sm: 4, md: 6 }, // Responsive padding
            }}
        >
            <Snackbar
                open={openSnackbar}
                autoHideDuration={3000}
                onClose={handleSnackbarClose}
                anchorOrigin={{ vertical: "top", horizontal: "right" }}
            >
                <Alert
                    severity={snackbarSeverity}
                    variant='filled'
                >
                    {snackbarMessage}
                </Alert>
            </Snackbar>
            <Box
                sx={{
                    marginTop: 8,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                <Typography component="h1" variant="h5">
                    LLC SIM Login
                </Typography>
                <Box component="form" onSubmit={handleLogin} sx={{ mt: 1 }}>
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="username"
                        label="Username"
                        name="username"
                        autoComplete="username"
                        autoFocus
                        onChange={usernameHandleChange}
                        error={usernameError && true}
                        helperText={usernameError ? "Username is required!" : ""}

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
                        onChange={passwordHandleChange}
                        error={passwordError && true}
                        helperText={passwordError ? "Password is required!" : ""}
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                    >
                        Login
                    </Button>
                </Box>
            </Box>
        </ Container>
    )
}