import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './login.css'
import api from '../../services/api'

function CadastrarAdmin() {
  const navigate = useNavigate()
  const [form, setForm] = useState({
    nome: '',
    email: '',
    senha: '',
    confirmarSenha: ''
  })
  const [erroSenha, setErroSenha] = useState('')

  function handleChange(event) {
    const { name, value } = event.target
    setForm((prev) => ({ ...prev, [name]: value }))

    if (name === 'confirmarSenha' && value && form.senha !== value) {
      setErroSenha('As senhas não conferem.')
    } else if (name === 'senha' && form.confirmarSenha && value !== form.confirmarSenha) {
      setErroSenha('As senhas não conferem.')
    } else {
      setErroSenha('')
    }
  }

  async function createUsers(event) {
    event.preventDefault()

    if (form.senha !== form.confirmarSenha) {
      setErroSenha('As senhas não conferem.')
      return
    }

    try {
      await api.post('/admins', {
        nome: form.nome,
        email: form.email,
        senha: form.senha,
        confirmarSenha: form.confirmarSenha
      })

      alert('Cadastro realizado com sucesso!')
      navigate('/login')
    } catch (error) {
      console.error(error)
      alert('Erro ao cadastrar usuário.')
    }
  }

  return (
    <div className='container'>
      <form onSubmit={createUsers}>
        <h1>Cadastro de Administradores</h1>

        <input
          placeholder='Nome Completo'
          name='nome'
          type='text'
          value={form.nome}
          onChange={handleChange}
        />

        <input
          placeholder='Email'
          name='email'
          type='email'
          value={form.email}
          onChange={handleChange}
        />

        <input
          placeholder='Senha'
          name='senha'
          type='password'
          value={form.senha}
          onChange={handleChange}
        />

        <input
          placeholder='Confirmar Senha'
          name='confirmarSenha'
          type='password'
          value={form.confirmarSenha}
          onChange={handleChange}
        />

        {erroSenha && <span className='error-message'>{erroSenha}</span>}

        <button type='submit'>Cadastrar</button>

        <p className='form-footer'>
          Já tem conta?
          <button type='button' className='link-button' onClick={() => navigate('/login')}>
            Faça login
          </button>
        </p>
      </form>
    </div>
  )
}

export default CadastrarAdmin
