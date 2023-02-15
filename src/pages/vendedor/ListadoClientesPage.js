import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Button, Container, CssBaseline, Grid, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';
import { getClientes } from '../../Services/userServices';
import Header from '../../Components/Header/Header';
import { useNavigate } from 'react-router-dom';


function ListadoClientesPage() {
    const [clientes, setClientes] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        getClientes().then((response) => {
            setClientes(response);
        }).catch(error => {
            console.log(error);
        });
    }, []);

    const handleClose = async () => {
        navigate("/Vendedor");
    }

    return (
        <div>
            <Header title="Veterinaria" tipo="Vendedor" />
            <Container component="main" maxWidth="lg">
                <CssBaseline />
                <Typography marginTop={5} component="h1" variant="h5">
                    Listado de Clientes
                </Typography>
                <div sx={{
                    marginTop: 8,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}>
                    <TableContainer>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>Nombre</TableCell>
                                    <TableCell>Apellido</TableCell>
                                    <TableCell>Email</TableCell>
                                    <TableCell>Mascotas</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {clientes.map(row => (
                                    <TableRow key={row.email}>
                                        <TableCell>{row.nombre}</TableCell>
                                        <TableCell>{row.apellido}</TableCell>
                                        <TableCell>{row.email}</TableCell>
                                        <TableCell>
                                            {row.mascotas.map(mascota => (
                                                <div key={mascota.id}>
                                                    <hr />
                                                    <p>Nombre: {mascota.nombre}</p>
                                                    <p>Año de Nacimiento: {mascota.anioNacimiento}</p>
                                                    <p>Peso: {mascota.peso}</p>
                                                    <p>Castrado: {mascota.castrado ? 'Sí' : 'No'}</p>
                                                </div>
                                            ))}
                                        </TableCell>
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

export default ListadoClientesPage;