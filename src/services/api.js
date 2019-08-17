import axios from 'axios';

const api = axios.create({
    baseURL: 'https://api.github.com',
});

export const dataAuth = {
    client_id: 'Iv1.fe3e1b61f7910d6a',
    client_secret: '6205116eecea5a0162f4c1d0268b46eb6a3afdba'
}



export default api;