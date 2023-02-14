import React, { useEffect, useState } from 'react';
import {
    Avatar, Button, Container, CssBaseline,
    Grid, Link, TextField, Typography
} from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../../Services/userServices';

const userRol = {
    "Entities.Cliente": "/Cliente",
    "Entities.Vendedor": "/Vendedor",
}

function LoginComponent() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const [login, setLogin] = useState({});

    const handleEmailChange = (value) => {
        setEmail(value);
    }
    const handlePasswordChange = (value) => {
        setPassword(value);
    }

    useEffect(() => {
        navigate(userRol[login.tipo] || "/");
    }, [login]);

    const handleLogin = async () => {
        const data = {
            Email: email,
            Contrasenia: password
        };
        try {
            const result = await loginUser(data)
            setLogin(result);
        } catch (error) {
            console.error(error);
            alert(error.message);
        }
    }
    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div sx={{
                marginTop: 8,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
            }}>
                <Avatar sx={{
                    marginTop: "28%",
                    marginLeft: "45%",
                    backgroundColor: '#000000',
                }}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Sign in
                </Typography>
                <form sx={{
                    margin: 1,
                    width: '100%', // Fix IE 11 issue.
                    marginTop: 1,
                }} noValidate>
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Email Address"
                        name="email"
                        autoComplete="email"
                        autoFocus
                        onChange={(e) => handleEmailChange(e.target.value)}
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                        onChange={(e) => handlePasswordChange(e.target.value)}
                    />
                    <Button
                        fullWidth
                        variant="contained"
                        color="primary"
                        sx={{
                            margin: 1,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center'
                        }}
                        onClick={handleLogin}
                    >
                        Sign In
                    </Button>
                </form>
            </div>
        </Container >
    )
}

export default LoginComponent;