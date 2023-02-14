import axios from "axios";

export async function loginUser(data) {
    try {
        const response = await axios.post('https://localhost:7183/api/Auth/Login', data);
        return response.data;
    } catch (e) {
        console.log(e);
        throw e;
    }
}

export async function signUp(formData, tipo) {
    const url = (tipo == "cliente")
        ? 'https://localhost:7183/api/Auth/RegistrarCliente' : 'https://localhost:7183/api/Auth/RegistrarVendedor'

    try {
        const response = await axios.post(url, formData);
        return response.data;
    } catch (e) {
        console.log(e);
        throw e;
    }
}