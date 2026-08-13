import axios from 'axios'

const api = axios.create({
    baseURL:'https://desafio-residencia-gerenciador-de.onrender.com'
})

export default api