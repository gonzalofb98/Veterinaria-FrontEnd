import React, { useState } from 'react';
import {
    Avatar, Button, Container, CssBaseline,
    Grid, TextField, Typography
} from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { useNavigate } from 'react-router-dom';
import { signUp } from '../../Services/userServices';

export default function SignUpComponent(props) {
    const [formData, setFormData] = useState({
        nombre: '',
        apellido: '',
        email: '',
        contrasenia: '',
    })
    const navigate = useNavigate();

    const handleChange = e => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    }

    const handleSignUp = async () => {
        try {
            console.log(formData)
            const result = await signUp(formData, props.tipo);
            console.log(result)
            alert("usuario agregado correctamente");
            navigate("/login");
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
                }} >
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Sign up
                </Typography>
                <form sx={{
                    margin: 1,
                    width: '100%', // Fix IE 11 issue.
                    marginTop: 1,
                }} noValidate>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                autoComplete="fname"
                                name="nombre"
                                variant="outlined"
                                required
                                fullWidth
                                id="firstName"
                                label="First Name"
                                autoFocus
                                value={formData.nombre}
                                onChange={handleChange}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                id="lastName"
                                label="Last Name"
                                name="apellido"
                                autoComplete="lname"
                                value={formData.apellido}
                                onChange={handleChange}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                id="email"
                                label="Email Address"
                                name="email"
                                autoComplete="email"
                                value={formData.email}
                                onChange={handleChange}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                name="contrasenia"
                                label="Password"
                                type="password"
                                id="password"
                                autoComplete="current-password"
                                value={formData.contrasenia}
                                onChange={handleChange}
                            />
                        </Grid>
                    </Grid>
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
                        onClick={handleSignUp}
                    >
                        Sign Up
                    </Button>
                </form>
            </div>
        </Container>
    );
}
