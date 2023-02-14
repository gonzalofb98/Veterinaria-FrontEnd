import * as React from 'react';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { Button, Container, CssBaseline, Grid } from '@mui/material';
import Header from '../../Components/Header/Header';
import { useNavigate } from 'react-router-dom';
import { getPedidosPorCliente } from '../../Services/userServices';
import { UserContext } from '../../context/UserContext';

function Row(props) {
    const { row, rows } = props;
    const [open, setOpen] = React.useState(false);

    return (
        <React.Fragment>
            <TableRow>
                <TableCell>
                    <IconButton size="small" onClick={() => setOpen(!open)}>
                        {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                    </IconButton>
                </TableCell>
                <TableCell>{row.codigo}</TableCell>
                <TableCell>{row.estado}</TableCell>
                <TableCell>{row.fecha}</TableCell>
                <TableCell>{row.direccion}</TableCell>
            </TableRow>
            <TableRow>
                <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <Table size="small">
                            <TableHead>
                                <TableRow>
                                    <TableCell>Alimento</TableCell>
                                    <TableCell>Complemento</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {
                                    rows.combos && rows.combos.map((combo, index) => (
                                        <TableRow key={index}>
                                            <TableCell>{combo.cantidadAlimento}</TableCell>
                                            <TableCell>{combo.complementoDietario}</TableCell>
                                        </TableRow>
                                    ))
                                }
                            </TableBody>
                        </Table>
                    </Collapse>
                </TableCell>
            </TableRow>
        </React.Fragment>
    );
}

export default function CollapsibleTable() {
    const navigate = useNavigate();
    const [rows, setRows] = React.useState({});
    const { user } = React.useContext(UserContext);

    const handlegetPedidosPorCliente = React.useCallback(async () => {
        try {
            const result = await getPedidosPorCliente(user.email);
            const pedidos = result.pedidos.map(pedido => {
                return {
                    id: pedido.id,
                    codigo: pedido.codigo,
                    estado: pedido.estado === 0 ? "Pendiente" : "Despachado",
                    fecha: pedido.fechaCreacion,
                    direccion: pedido.direccion,
                }
            })
            const combos = result.pedidos.flatMap(pedido => pedido.combos.map(combo => {
                return {
                    pedidoId: pedido.id,
                    cantidadAlimento: combo.cantidadAlimento,
                    complementoDietario: combo.complementoDietario,
                }
            }))
            setRows({
                pedidos: pedidos,
                combos: combos,
            })
        } catch (error) {
            console.error(error);
            alert(error.message);
        }
    }, [user.email, setRows]);

    React.useEffect(() => {
        handlegetPedidosPorCliente()
    }, [handlegetPedidosPorCliente])





    const handleClose = async () => {
        navigate("/Cliente");
    }

    return (
        <div>
            <Header title="Veterinaria" />
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <Typography marginTop={5} component="h1" variant="h5">
                    Historial de Pedidos
                </Typography>
                <div sx={{
                    marginTop: 8,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}>
                    <TableContainer component={Paper}>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell />
                                    <TableCell>Código</TableCell>
                                    <TableCell>Estado</TableCell>
                                    <TableCell>Fecha</TableCell>
                                    <TableCell>Dirección</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {rows && rows.pedidos && rows.pedidos.map((row, index) => (
                                    <Row key={index} row={row} rows={rows} />
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </div>
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
            </Container>

        </div>
    );
}