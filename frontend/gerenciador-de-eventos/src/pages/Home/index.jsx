import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Header from '../../components/Header'
import { CardEvento } from '../../components/CardEvento'
import { FormEvento } from '../../components/FormEvento'
import './home.css'
import api from '../../services/api'

function Home() {
    const navigate = useNavigate()
    const [eventos, setEventos] = useState([])
    const [loading, setLoading] = useState(true)
    const [paginaAtual, setPaginaAtual] = useState(0)
    const [totalPaginas, setTotalPaginas] = useState(0)
    const [totalElementos, setTotalElementos] = useState(0)
    const [termoBusca, setTermoBusca] = useState('')
    const [buscaAtiva, setBuscaAtiva] = useState('')

    async function buscarEventos(pagina = 0, nome = buscaAtiva) {
        try {
            const token = localStorage.getItem('token')

            if (!token) {
                setEventos([])
                setLoading(false)
                navigate('/login')
                return
            }

            const params = {
                page: pagina,
                size: 10
            }

            const nomeBusca = nome?.trim()
            if (nomeBusca) {
                params.nome = nomeBusca
            }

            const response = await api.get('/eventos', {
                params,
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })

            const dados = response.data ?? {}
            const listaEventos = Array.isArray(dados.content) ? dados.content : []

            setEventos(listaEventos)
            setPaginaAtual(Number(dados.number ?? pagina))
            setTotalPaginas(Number(dados.totalPages ?? 1))
            setTotalElementos(Number(dados.totalElements ?? listaEventos.length))
        } catch (error) {
            console.error('Erro ao buscar eventos', error)
            setEventos([])
            setTotalPaginas(0)
            setTotalElementos(0)
        } finally {
            setLoading(false)
        }
    }

    async function handleDeleteEvento(id) {
        if (!id) return

        const confirmado = window.confirm('Deseja realmente excluir este evento?')
        if (!confirmado) return

        try {
            const token = localStorage.getItem('token')

            await api.delete(`/eventos/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })

            const proximaPagina = eventos.length === 1 && paginaAtual > 0 ? paginaAtual - 1 : paginaAtual
            buscarEventos(proximaPagina, buscaAtiva)
        } catch (error) {
            console.error('Erro ao excluir evento', error)
            alert(error.response?.data?.message || 'Erro ao excluir o evento.')
        }
    }

    async function handleUpdateEvento(id, payload) {
        try {
            const token = localStorage.getItem('token')

            await api.put(`/eventos/${id}`, payload, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })

            buscarEventos(paginaAtual, buscaAtiva)
        } catch (error) {
            console.error('Erro ao atualizar evento', error)
            alert(error.response?.data?.message || 'Erro ao atualizar o evento.')
        }
    }

    function handleBuscarSubmit(e) {
        e.preventDefault()
        const nomeBusca = termoBusca.trim()
        setBuscaAtiva(nomeBusca)
        buscarEventos(0, nomeBusca)
    }

    function limparBusca() {
        setTermoBusca('')
        setBuscaAtiva('')
        buscarEventos(0, '')
    }

    useEffect(() => {
        buscarEventos(0, '')
    }, [navigate])

    return (
        <div className='home-page'>
            <Header />
            <main className='home-main'>
                <h1 className='home-title'>Home</h1>
                <p className='home-subtitle'>Bem-vindo ao sistema.</p>
                <div className='home-container'>
                    <div className='home-form-wrapper'>
                        <FormEvento onEventoCriado={() => buscarEventos(0)} />
                    </div>

                    <div className='home-cards-wrapper'>
                        <div className='home-cards-header'>
                            <h2>Calendário de eventos</h2>
                            <span>{totalElementos} evento(s)</span>
                        </div>

                        <form className='home-search' onSubmit={handleBuscarSubmit}>
                            <input
                                type='text'
                                value={termoBusca}
                                onChange={(e) => setTermoBusca(e.target.value)}
                                placeholder='Buscar por nome do evento'
                                aria-label='Buscar evento por nome'
                            />

                            <button type='submit'>Buscar</button>

                            {buscaAtiva && (
                                <button type='button' className='home-search__clear' onClick={limparBusca}>
                                    Limpar
                                </button>
                            )}
                        </form>

                        {loading ? (
                            <p>Carregando eventos...</p>
                        ) : eventos.length === 0 ? (
                            <p>Nenhum evento encontrado.</p>
                        ) : (
                            <div className='home-grid'>
                                {eventos.map((evento) => (
                                    <CardEvento
                                        key={evento.id || evento.nome}
                                        evento={evento}
                                        onDelete={handleDeleteEvento}
                                        onUpdate={handleUpdateEvento}
                                    />
                                ))}
                            </div>
                        )}

                        {!loading && totalPaginas > 1 && (
                            <div className='pagination'>
                                <button
                                    type='button'
                                    className='pagination__button'
                                    disabled={paginaAtual === 0}
                                    onClick={() => buscarEventos(paginaAtual - 1, buscaAtiva)}
                                >
                                    Anterior
                                </button>

                                <span className='pagination__status'>
                                    Página {paginaAtual + 1} de {totalPaginas}
                                </span>

                                <button
                                    type='button'
                                    className='pagination__button'
                                    disabled={paginaAtual >= totalPaginas - 1}
                                    onClick={() => buscarEventos(paginaAtual + 1, buscaAtiva)}
                                >
                                    Próxima
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </main>
        </div>
    )
}

export default Home