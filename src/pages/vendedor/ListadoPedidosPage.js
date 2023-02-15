import * as React from 'react';
import { Button, Container, CssBaseline, Grid, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import axios from 'axios';
import Header from '../../Components/Header/Header';
import { despacharPedido } from '../../Services/userServices';
import { useNavigate } from 'react-router-dom';

const ListadoPedidosPage = () => {
    // Crear una lista de objetos con la información de los usuarios, pedidos y combos
    const [pedidos, setPedidos] = React.useState([]);
    const navigate = useNavigate();

    React.useEffect(() => {
        axios.get('https://localhost:7183/api/Pedido/Pedidos').then(response => {
            setPedidos(response.data);
        })
            .catch(error => {
                console.log(error);
            });
    }, []);

    const data = pedidos.map(user => {
        const userData = {
            nombre: user.nombre,
            apellido: user.apellido,
            email: user.email
        };
        const pedidosData = user.pedidos.map(pedido => {
            const combosData = pedido.combos.map(combo => ({
                cantidadAlimento: combo.cantidadAlimento,
                complementoDietario: combo.complementoDietario
            }));
            return {
                estado: pedido.estado === 0 ? "Pendiente" : "Despachado",
                codigo: pedido.codigo,
                direccion: pedido.direccion,
                fechaCreacion: pedido.fechaCreacion,
                id: pedido.id,
                combos: combosData
            };
        });
        return { ...userData, pedidos: pedidosData };
    });

    const despachar = (email, codigo) => {
        despacharPedido(email, { codigo });
    };

    const handleClose = async () => {
        navigate("/Vendedor");
    }

    return (
        <div>
            <Header title="Veterinaria" tipo="Vendedor" />
            <Container component="main" maxWidth="lg">
                <CssBaseline />
                <div sx={{
                    marginTop: 8,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}>
                    <TableContainer style={{ height: '75vh' }}>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>Accion</TableCell>
                                    <TableCell>Nombre</TableCell>
                                    <TableCell>Apellido</TableCell>
                                    <TableCell>Email</TableCell>
                                    <TableCell>Estado</TableCell>
                                    <TableCell>Código</TableCell>
                                    <TableCell>Dirección</TableCell>
                                    <TableCell>Fecha de creación</TableCell>
                                    <TableCell>Combos</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {data.map(user => (
                                    user.pedidos.map(pedido => (
                                        <TableRow key={pedido.id}>
                                            <TableCell>{pedido.estado === "Pendiente" ?
                                                <Button onClick={() => {
                                                    despachar(user.email, pedido.codigo)
                                                }}>Despachar</Button>
                                                : ""}</TableCell>
                                            <TableCell>{user.nombre}</TableCell>
                                            <TableCell>{user.apellido}</TableCell>
                                            <TableCell>{user.email}</TableCell>
                                            <TableCell>{pedido.estado}</TableCell>
                                            <TableCell>{pedido.codigo}</TableCell>
                                            <TableCell>{pedido.direccion}</TableCell>
                                            <TableCell>{pedido.fechaCreacion}</TableCell>
                                            <TableCell>
                                                <Table>
                                                    <TableHead>
                                                        <TableRow>
                                                            <TableCell>Cantidad de alimento (Kg)</TableCell>
                                                            <TableCell>Complementos dietarios</TableCell>
                                                        </TableRow>
                                                    </TableHead>
                                                    <TableBody>
                                                        {pedido.combos.map(combo => (
                                                            <TableRow key={Math.random()}>
                                                                <TableCell>{combo.cantidadAlimento}</TableCell>
                                                                <TableCell>{combo.complementoDietario}</TableCell>
                                                            </TableRow>
                                                        ))}
                                                    </TableBody>
                                                </Table>
                                            </TableCell>
                                        </TableRow>
                                    ))
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
};

export default ListadoPedidosPage;