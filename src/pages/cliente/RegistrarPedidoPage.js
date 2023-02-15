import { Button, Container, CssBaseline, FormControlLabel, Grid, MenuItem, Select, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../../Components/Header/Header";
import { addCombo, addPedido, limpiarCombos } from "../../Services/userServices";
import { UserContext } from "../../context/UserContext";

function createData(name, calories, fat, carbs, protein) {
    return { name, calories, fat, carbs, protein };
}


export default function RegistrarMascotaPage() {
    const navigate = useNavigate();
    const { user, setUser } = useContext(UserContext);
    const [combos, setCombos] = useState([]);
    const [formData, setFormData] = useState({
        nombre: ''
    })
    const [formDirection, setformDirection] = useState({
        direccion: ''
    })

    const handleChange = e => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    }
    const handleChangeDirection = e => {
        setformDirection({ ...formDirection, [e.target.name]: e.target.value });
    }

    const handleAddCombo = async () => {
        try {
            const result = await addCombo(formData, user.email);
            setCombos([...combos,
            createData(formData.nombre, result.cantidadAlimento, result.complementoDietario)]);
        } catch (error) {
            console.error(error);
            alert(error.message);
        }
    }

    function createData(nombre, cantidadAlimento, complementosDietarios) {
        return { nombre, cantidadAlimento, complementosDietarios };
    }

    const handleAddPedido = async () => {
        try {
            const result = await addPedido(formDirection, user.email);
            alert("Pedido añadido correctamente");
            navigate("/Cliente")
        } catch (error) {
            console.error(error);
            alert(error.message);
        }
    }

    const handleClose = async () => {
        try {
            let res = await limpiarCombos(user.email);
        } catch (error) {
            console.error(error);
            alert(error.message);
        }
        navigate("/Cliente");
    }

    return (
        <div>
            <Header title="Veterinaria" tipo="Cliente" />
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <div sx={{
                    marginTop: 8,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}>
                    <Typography marginTop={5} component="h1" variant="h5">
                        Registrar Combo
                    </Typography>
                    <Typography marginTop={5} component="h4" >
                        Ingrese el nombre de la mascota para pedir el combo
                    </Typography>
                    <form sx={{
                        margin: 1,
                        width: '100%', // Fix IE 11 issue.
                        marginTop: 1,
                    }} noValidate>
                        <Grid sx={{ marginTop: 1 }} container spacing={2}>
                            <Grid item xs={12}>
                                <TextField
                                    autoComplete="fname"
                                    name="nombre"
                                    variant="outlined"
                                    required
                                    fullWidth
                                    id="firstName"
                                    label=" Nombre"
                                    autoFocus
                                    value={formData.Nombre}
                                    onChange={handleChange}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <Button
                                    fullWidth
                                    variant="contained"
                                    color="primary"
                                    sx={{
                                        display: 'flex',
                                        flexDirection: 'column',
                                        alignItems: 'center'
                                    }}
                                    onClick={handleAddCombo}
                                >
                                    Agregar Combo
                                </Button>
                            </Grid>
                        </Grid>
                    </form>

                    <TableContainer>
                        <Table sx={{ minWidth: "100 %" }} aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell>Nombre</TableCell>
                                    <TableCell>Cantidad Alimento</TableCell>
                                    <TableCell>Complementos Dietarios</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {
                                    combos.map((row) => (
                                        <TableRow
                                            key={row.name}
                                        >
                                            <TableCell align="right">{row.nombre}</TableCell>
                                            <TableCell align="right">{row.cantidadAlimento}</TableCell>
                                            <TableCell align="right">{row.complementosDietarios}</TableCell>
                                        </TableRow>
                                    ))
                                }
                            </TableBody>
                        </Table>
                    </TableContainer>

                    <form sx={{
                        margin: 1,
                        width: '100%', // Fix IE 11 issue.
                        marginTop: 1,
                    }} noValidate>

                        <Grid sx={{ marginTop: 1 }} container spacing={2}>
                            <Grid item xs={12}>
                                <TextField
                                    autoComplete="fname"
                                    name="direccion"
                                    variant="outlined"
                                    required
                                    fullWidth
                                    id="direction"
                                    label=" Dirección"
                                    autoFocus
                                    value={formDirection.direccion}
                                    onChange={handleChangeDirection}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
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
                            <Grid item xs={12} sm={6}>
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
                                    onClick={handleAddPedido}
                                >
                                    Registrar Pedido
                                </Button>
                            </Grid>

                        </Grid>

                    </form>
                </div>
            </Container>
        </div>
    );
}