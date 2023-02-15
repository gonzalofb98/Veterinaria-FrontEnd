import axios from "axios";

export async function signUp(formData, tipo) {
    const url = (tipo === "cliente")
        ? 'https://localhost:7183/api/Auth/RegistrarCliente' : 'https://localhost:7183/api/Auth/RegistrarVendedor'

    try {
        const response = await axios.post(url, formData);
        return response.data;
    } catch (e) {
        throw new Error("No se pudo registrar correctamente");
    }
}

export async function loginUser(data) {
    try {
        const response = await axios.post('https://localhost:7183/api/Auth/Login', data);
        return response.data;
    } catch (e) {
        throw new Error("Email no registrado");
    }
}

export async function addPet(data, email) {
    try {
        const response = await axios.post('https://localhost:7183/api/Usuario/RegistrarMascota?email=' + email, data);
        return response.data;
    } catch (e) {
        throw new Error("Error al agregar la mascota");
    }
}

export async function limpiarCombos(email) {
    try {
        const response = await axios.post('https://localhost:7183/api/Pedido/LimpiarCombos?email=' + email);
        return response.data;
    } catch (e) {
        throw new Error("Error al traer los combos");
    }
}

export async function addCombo(data, email) {
    try {
        const response = await axios.post('https://localhost:7183/api/Pedido/RegistrarCombo?email=' + email, data);
        return response.data;
    } catch (e) {
        throw new Error("Error al agregar el combo");
    }
}

export async function addPedido(data, email) {
    try {
        const response = await axios.post('https://localhost:7183/api/Pedido/RegistrarPedido?email=' + email, data);
        return response.data;
    } catch (e) {
        throw new Error("Error al agregar el combo");
    }
}

export async function getPedidosPorCliente(email) {
    try {
        const response = await axios.get('https://localhost:7183/api/Pedido/PedidoCliente?email=' + email);
        return response.data;
    } catch (e) {
        throw new Error("Error al traer los pedidos del cliente");
    }
}

export async function despacharPedido(email, data) {
    try {
        await axios.post('https://localhost:7183/api/Pedido/DespacharPedido?email=' + email, data);

    } catch (e) {
        throw new Error("Error al despachar el pedidos del cliente");
    }
}

export async function getVendedores() {
    try {
        const response = await axios.get('https://localhost:7183/api/Usuario/Vendedores');
        return response.data;
    } catch (e) {
        throw new Error("Error al traer los pedidos del cliente");
    }
}

export async function getClientes() {
    try {
        const response = await axios.get('https://localhost:7183/api/Usuario/ClientesMascotas');
        return response.data;
    } catch (e) {
        throw new Error("Error al traer los pedidos del cliente");
    }
}