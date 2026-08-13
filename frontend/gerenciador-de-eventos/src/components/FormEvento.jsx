import { useState } from 'react'
import api from '../services/api'
import './FormEvento.css'

export function FormEvento({ onEventoCriado }) {
    const [form, setForm] = useState({
        nome: '',
        dataInicio: '',
        dataFim: '',
        localizacao: {
            cep: '',
            logradouro: '',
            numero: '',
            complemento: '',
            bairro: '',
            cidade: '',
            uf: ''
        },
        imagem: ''
    })

    const [loading, setLoading] = useState(false)
    const [erro, setErro] = useState('')
    const [nomeArquivo, setNomeArquivo] = useState('Nenhum arquivo selecionado')

    function handleInputChange(e) {
        const { name, value } = e.target
        setForm(prev => ({
            ...prev,
            [name]: value
        }))
    }

    function handleLocalizacaoChange(e) {
        const { name, value } = e.target
        setForm(prev => ({
            ...prev,
            localizacao: {
                ...prev.localizacao,
                [name]: value
            }
        }))
    }

    function comprimirImagem(file) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader()
            reader.onload = (event) => {
                const img = new Image()
                img.onload = () => {
                    const canvas = document.createElement('canvas')
                    const ctx = canvas.getContext('2d')
                    
                    let width = img.width
                    let height = img.height
                    const maxWidth = 800
                    const maxHeight = 600
                    
                    if (width > height) {
                        if (width > maxWidth) {
                            height = Math.round((height * maxWidth) / width)
                            width = maxWidth
                        }
                    } else {
                        if (height > maxHeight) {
                            width = Math.round((width * maxHeight) / height)
                            height = maxHeight
                        }
                    }
                    
                    canvas.width = width
                    canvas.height = height
                    ctx.drawImage(img, 0, 0, width, height)
                    
                    const compressed = canvas.toDataURL('image/jpeg', 0.7)
                    resolve(compressed)
                }
                img.onerror = () => reject(new Error('Erro ao carregar imagem'))
                img.src = event.target.result
            }
            reader.onerror = () => reject(new Error('Erro ao ler arquivo'))
            reader.readAsDataURL(file)
        })
    }

    async function handleSubmit(e) {
        e.preventDefault()
        setLoading(true)
        setErro('')

        try {
            const token = localStorage.getItem('token')

            if (!token) {
                setErro('Token não encontrado. Faça login novamente.')
                setLoading(false)
                return
            }

            if (!form.nome.trim()) {
                setErro('Nome do evento é obrigatório')
                setLoading(false)
                return
            }

            if (!form.dataInicio) {
                setErro('Data de início é obrigatória')
                setLoading(false)
                return
            }

            if (!form.dataFim) {
                setErro('Data de fim é obrigatória')
                setLoading(false)
                return
            }

            const payload = { ...form }

            if (form.imagem && typeof form.imagem !== 'string') {
                try {
                    payload.imagem = await comprimirImagem(form.imagem)
                } catch (imgError) {
                    setErro('Erro ao processar imagem: ' + imgError.message)
                    setLoading(false)
                    return
                }
            }

            const response = await api.post('/eventos', payload, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            })

            if (response.data) {
                setForm({
                    nome: '',
                    dataInicio: '',
                    dataFim: '',
                    localizacao: {
                        cep: '',
                        logradouro: '',
                        numero: '',
                        complemento: '',
                        bairro: '',
                        cidade: '',
                        uf: ''
                    },
                    imagem: ''
                })

                onEventoCriado()
            }
        } catch (error) {
            console.error('Erro ao criar evento:', error)
            setErro(error.response?.data?.message || 'Erro ao criar evento')
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className='form-evento'>
            <h2>Criar Novo Evento</h2>

            {erro && <div className='erro'>{erro}</div>}

            <form onSubmit={handleSubmit}>
                <input
                    type='text'
                    name='nome'
                    placeholder='Nome do evento'
                    value={form.nome}
                    onChange={handleInputChange}
                    required
                />

                <input
                    type='datetime-local'
                    name='dataInicio'
                    placeholder='Data início'
                    value={form.dataInicio}
                    onChange={handleInputChange}
                    required
                />

                <input
                    type='datetime-local'
                    name='dataFim'
                    placeholder='Data fim'
                    value={form.dataFim}
                    onChange={handleInputChange}
                    required
                />

                <h3>Localização</h3>

                <input
                    type='text'
                    name='cep'
                    placeholder='CEP'
                    value={form.localizacao.cep}
                    onChange={handleLocalizacaoChange}
                    required
                />

                <input
                    type='text'
                    name='logradouro'
                    placeholder='Logradouro'
                    value={form.localizacao.logradouro}
                    onChange={handleLocalizacaoChange}
                    required
                />

                <input
                    type='text'
                    name='numero'
                    placeholder='Número'
                    value={form.localizacao.numero}
                    onChange={handleLocalizacaoChange}
                    required
                />

                <input
                    type='text'
                    name='complemento'
                    placeholder='Complemento'
                    value={form.localizacao.complemento}
                    onChange={handleLocalizacaoChange}
                />

                <input
                    type='text'
                    name='bairro'
                    placeholder='Bairro'
                    value={form.localizacao.bairro}
                    onChange={handleLocalizacaoChange}
                    required
                />

                <input
                    type='text'
                    name='cidade'
                    placeholder='Cidade'
                    value={form.localizacao.cidade}
                    onChange={handleLocalizacaoChange}
                    required
                />

                <input
                    type='text'
                    name='uf'
                    placeholder='UF'
                    maxLength='2'
                    value={form.localizacao.uf}
                    onChange={handleLocalizacaoChange}
                    required
                />

                <div className='upload-imagem'>
                    <label htmlFor='imagem-evento' className='upload-imagem__button'>
                        Escolher arquivo
                    </label>

                    <input
                        id='imagem-evento'
                        type='file'
                        name='imagem'
                        accept='image/*'
                        onChange={(e) => {
                            const arquivo = e.target.files?.[0]
                            setForm(prev => ({
                                ...prev,
                                imagem: arquivo || ''
                            }))
                            setNomeArquivo(arquivo ? arquivo.name : 'Nenhum arquivo selecionado')
                        }}
                    />

                    <span className='upload-imagem__nome'>{nomeArquivo}</span>
                </div>

                <button type='submit' disabled={loading}>
                    {loading ? 'Criando...' : 'Criar Evento'}
                </button>
            </form>
        </div>
    )
}
