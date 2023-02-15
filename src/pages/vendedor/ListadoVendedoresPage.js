import { Button, Container, CssBaseline, Grid, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../Components/Header/Header';
import { getVendedores } from '../../Services/userServices';

const users = [
    {
        "nombre": "Admin",
        "apellido": "admin",
        "email": "admin@gmail.com"
    },
    {
        "nombre": "string",
        "apellido": "string",
        "email": "user@example.com"
    }
];

export default function ListadoVendedoresPage() {
    const [vendedores, setVendedores] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        getVendedores().then(response => {
            setVendedores(response);
        }).catch(error => {
            console.log(error);
        });
    }, [])

    const handleClose = async () => {
        navigate("/Vendedor");
    }

    const handleAddVendedor = async () => {
        navigate("/signUpVendedor");
    }

    return (
        <div>
            <Header title="Veterinaria" tipo="Vendedor" />
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <Typography marginTop={5} component="h1" variant="h5">
                    Vendedores
                </Typography>
                <div sx={{
                    marginTop: 8,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}>
                    <TableContainer >
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>Nombre</TableCell>
                                    <TableCell>Apellido</TableCell>
                                    <TableCell>Email</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {vendedores.map(user => (
                                    <TableRow key={user.email}>
                                        <TableCell>{user.nombre}</TableCell>
                                        <TableCell>{user.apellido}</TableCell>
                                        <TableCell>{user.email}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                    <Grid item xs={12}>
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
                            onClick={handleAddVendedor}
                        >
                            Añadir Vendedor
                        </Button>
                    </Grid>
                    <Grid item xs={12}>
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
                            onClick={handleClose}
                        >
                            Volver
                        </Button>
                    </Grid>
                </div>
            </Container>


        </div>

    );
}