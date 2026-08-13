import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './login.css'
import api from '../../services/api'

const STORAGE_KEY = 'usuarioLembrado'

function LoginPage() {
    const navigate = useNavigate()
    const [email, setEmail] = useState('')
    const [senha, setSenha] = useState('')
    const [lembrarDeMim, setLembrarDeMim] = useState(false)

    useEffect(() => {
        const usuarioSalvo = localStorage.getItem(STORAGE_KEY)

        if (usuarioSalvo) {
            const dados = JSON.parse(usuarioSalvo)
            setEmail(dados.email || '')
            setSenha(dados.senha || '')
            setLembrarDeMim(Boolean(dados.lembrarDeMim))
        }
    }, [])

    useEffect(() => {
        if (lembrarDeMim) {
            localStorage.setItem(STORAGE_KEY, JSON.stringify({ email, senha, lembrarDeMim }))
        } else {
            localStorage.removeItem(STORAGE_KEY)
        }
    }, [email, senha, lembrarDeMim])

    async function handleLogin(event) {
        event.preventDefault()

        try {
            const response = await api.post('/auth/login', {
                email,
                senha
            })

            if (response.data.token) {
                localStorage.setItem('token', response.data.token)
                localStorage.setItem('userName', response.data.nome)
            }

            if (lembrarDeMim) {
                localStorage.setItem(STORAGE_KEY, JSON.stringify({ email, senha, lembrarDeMim }))
            } else {
                localStorage.removeItem(STORAGE_KEY)
            }

            navigate('/home')
        } catch (error) {
            console.error('Erro no login:', error.response?.data || error.message)
            alert('Email ou senha inválidos')
        }
    }

    return (
        <div className='container'>
            <form onSubmit={handleLogin}>
                <h1>Login</h1>

                <input
                    placeholder='Email'
                    type='email'
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                />

                <input
                    placeholder='Senha'
                    type='password'
                    value={senha}
                    onChange={(event) => setSenha(event.target.value)}
                />

                <label className='remember-row'>
                    <input
                        type='checkbox'
                        checked={lembrarDeMim}
                        onChange={(event) => setLembrarDeMim(event.target.checked)}
                    />
                    <span>Lembrar de mim</span>
                </label>

                <button type='submit'>Entrar</button>

                <p className='form-footer'>
                    Ainda não tem conta?
                    <button type='button' className='link-button' onClick={() => navigate('/')}>
                        Cadastre-se
                    </button>
                </p>
            </form>
        </div>
    )
}

export default LoginPage
