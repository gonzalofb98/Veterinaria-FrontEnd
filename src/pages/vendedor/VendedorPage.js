import { Button, Container, Grid, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import Header from "../../Components/Header/Header";

export default function VendedorPage() {
    const navigate = useNavigate();

    const listadoPedidos = () => {
        //despachar pedidos tambien aqui
        navigate("/ListadoPedidos");
    };

    const listadoVendedores = () => {
        //agregar vendedor tambien aqui
        navigate("/ListadoVendedores");
    };

    const listadoClientes = () => {
        navigate("/ListadoClientes");
    };
    return (
        <div>
            <Header title="Veterinaria" tipo="Vendedor" />
            <div sx={{
                bgcolor: 'text.primary',
                padding: 8
            }}>
                <Container maxWidth="sm">
                    <Typography marginTop={5} component="h1" variant="h3" align="center" color="textPrimary" gutterBottom>
                        Veterinaria
                    </Typography>
                    <Typography variant="h6" align="center" color="textSecondary" paragraph>
                        Lorem ipsum dolor sit amet consectetur adipiscing, elit sapien sodales curae dapibus commodo,
                        lectus proin nisi facilisi et. Eget luctus iaculis eros molestie porta, cum leo et fames sodales volutpat,
                        mus tristique eleifend ac. Dis fusce velit euismod nulla primis, dictum vulputate natoque
                        porttitor et maecenas, potenti tortor conubia auctor.
                    </Typography>
                    <div sx={{ marginTop: 4 }}>
                        <Grid container marginTop={2} spacing={2} justifyContent="center">
                            <Grid item>
                                <Button onClick={listadoPedidos} variant="contained" color="primary">
                                    Listado de Pedidos
                                </Button>
                            </Grid>
                            <Grid item>
                                <Button onClick={listadoVendedores} variant="contained" color="primary">
                                    Listado de Vendedores
                                </Button>
                            </Grid>
                        </Grid>
                        <Grid item marginTop={5}>
                            <Button onClick={listadoClientes} variant="contained" color="primary">
                                Listado de Clientes
                            </Button>
                        </Grid>
                    </div>
                </Container>
            </div>
        </div>
    );
}