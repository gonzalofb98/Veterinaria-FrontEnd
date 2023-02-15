import { Button, Checkbox, Container, CssBaseline, FormControlLabel, Grid, TextField, Typography } from "@mui/material";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../../Components/Header/Header";
import { addPet } from "../../Services/userServices";
import { UserContext } from "../../context/UserContext";
import DropDown from "../../Components/DropDown";

const tiposMascotas = [
    {
        id: "Perro",
        text: "Perro"
    },
    {
        id: "Gato",
        text: "Gato"
    }];
const aniosDisponibles = [];
for (let i = new Date().getFullYear(); i >= 1900; i--) {
    aniosDisponibles.push(i);
}
const anios = aniosDisponibles.map(item => {
    return {
        id: item,
        text: item
    }
})

export default function RegistrarMascotaPage() {
    const navigate = useNavigate();
    const { user } = useContext(UserContext);
    const [formData, setFormData] = useState({
        nombre: '',
        anioNacimiento: '',
        peso: '',
        castrado: false,
        tipoMascota: '',
    })

    const handleChange = e => {
        const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
        setFormData({ ...formData, [e.target.name]: value });
    }

    const handleAddPet = async () => {
        try {
            const result = await addPet(formData, user.email);
            console.log(result)
            alert("Mascota agregada correctamente");
            navigate("/Cliente");
        } catch (error) {
            console.error(error);
            alert(error.message);
        }
    }
    const handleClose = async () => {
        navigate("/Cliente");
    }

    const validarValor = (value) => {
        if (value < 0) {
            return {
                error: true,
                helperText: 'El valor no puede ser negativo'
            };
        }
        return null;
    };

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
                        Registrar Mascota
                    </Typography>
                    <form sx={{
                        margin: 1,
                        width: '100%', // Fix IE 11 issue.
                        marginTop: 2,
                    }} noValidate>
                        <Grid sx={{ marginTop: 2 }} container spacing={2}>
                            <Grid item xs={12} sm={6}>
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
                            <Grid item xs={12} sm={6}>
                                <DropDown
                                    items={anios}
                                    value={formData.anioNacimiento}
                                    label="Año de Nacimiento"
                                    set={handleChange}
                                    width="100%"
                                    name="anioNacimiento"
                                ></DropDown>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    variant="outlined"
                                    required
                                    fullWidth
                                    id="peso"
                                    label="Peso en Kg"
                                    name="peso"
                                    value={formData.peso}
                                    onChange={handleChange}
                                    {...validarValor(formData.peso)}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <DropDown
                                    items={tiposMascotas}
                                    value={formData.tipoMascota}
                                    label="Tipo de Mascota"
                                    set={handleChange}
                                    width="100%"
                                    name="tipoMascota"
                                ></DropDown>
                            </Grid>
                            <Grid item xs={12} >
                                <FormControlLabel
                                    control={<Checkbox
                                        checked={formData.castrado}
                                        onChange={handleChange}
                                        name="castrado" />
                                    }
                                    label="Castrado / Esterilizado" />
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
                                    onClick={handleAddPet}
                                >
                                    Registrar
                                </Button>
                            </Grid>

                        </Grid>

                    </form>
                </div>
            </Container>
        </div>
    );
}