import { useEffect, useState } from 'react'
import { FaEdit, FaTrash } from 'react-icons/fa'
import './CardEvento.css'

const formatarDataInput = (valor) => {
    if (!valor) return ''

    if (typeof valor === 'string') {
        return valor.includes('T') ? valor.slice(0, 16) : valor
    }

    const data = new Date(valor)
    if (Number.isNaN(data.getTime())) return ''

    return data.toISOString().slice(0, 16)
}

const formatarDataHoraExibicao = (valor) => {
    if (!valor) return 'Data não informada'

    if (typeof valor === 'string') {
        const [dataTexto, horaTexto] = valor.split('T')

        if (dataTexto && horaTexto) {
            const [ano, mes, dia] = dataTexto.split('-')
            const hora = horaTexto.slice(0, 5)
            return `Data: ${dia}/${mes}/${ano} | Hora: ${hora}`
        }

        if (valor.includes(' ')) {
            const [dataTexto2, horaTexto2] = valor.split(' ')
            const [ano, mes, dia] = dataTexto2.split('-')
            return `Data: ${dia}/${mes}/${ano} | Hora: ${horaTexto2.slice(0, 5)}`
        }

        return valor
    }

    const data = new Date(valor)
    if (Number.isNaN(data.getTime())) return 'Data não informada'

    const dia = String(data.getDate()).padStart(2, '0')
    const mes = String(data.getMonth() + 1).padStart(2, '0')
    const ano = data.getFullYear()
    const hora = String(data.getHours()).padStart(2, '0')
    const minuto = String(data.getMinutes()).padStart(2, '0')

    return `Data: ${dia}/${mes}/${ano} | Hora: ${hora}:${minuto}`
}

const normalizarLocalizacao = (localizacao = {}) => ({
    cep: localizacao.cep || '',
    logradouro: localizacao.logradouro || '',
    numero: localizacao.numero || '',
    complemento: localizacao.complemento || '',
    bairro: localizacao.bairro || '',
    cidade: localizacao.cidade || '',
    uf: localizacao.uf || ''
})

export function CardEvento({ evento = {}, onDelete, onUpdate }) {
    const safeEvento = {
        nome: 'Evento sem nome',
        dataInicio: 'Data não informada',
        dataFim: 'Data não informada',
        localizacao: 'Local não informado',
        imagem: '',
        ...evento,
    }

    const [isEditing, setIsEditing] = useState(false)
    const [form, setForm] = useState({
        dataInicio: formatarDataInput(safeEvento.dataInicio),
        dataFim: formatarDataInput(safeEvento.dataFim),
        localizacao: normalizarLocalizacao(
            typeof safeEvento.localizacao === 'object' ? safeEvento.localizacao : {}
        )
    })

    const eventoSignature = [
        safeEvento.id,
        safeEvento.dataInicio,
        safeEvento.dataFim,
        typeof safeEvento.localizacao === 'object' && safeEvento.localizacao
            ? JSON.stringify(safeEvento.localizacao)
            : String(safeEvento.localizacao ?? '')
    ].join('|')

    useEffect(() => {
        setForm({
            dataInicio: formatarDataInput(safeEvento.dataInicio),
            dataFim: formatarDataInput(safeEvento.dataFim),
            localizacao: normalizarLocalizacao(
                typeof safeEvento.localizacao === 'object' ? safeEvento.localizacao : {}
            )
        })
    }, [eventoSignature])

    const dataInicio = formatarDataHoraExibicao(safeEvento.dataInicio)
    const dataFim = formatarDataHoraExibicao(safeEvento.dataFim)

    const formatarLocalizacao = (loc) => {
        if (typeof loc === 'string') return loc
        if (!loc) return 'Local não informado'

        const { logradouro = '', numero = '', bairro = '', cidade = '' } = loc
        return `${logradouro}${numero ? `, ${numero}` : ''} - ${bairro}, ${cidade}` || 'Local não informado'
    }

    const localizacao = formatarLocalizacao(safeEvento.localizacao)

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

    async function handleSave() {
        if (!onUpdate) return

        await onUpdate(safeEvento.id, {
            ...safeEvento,
            dataInicio: form.dataInicio,
            dataFim: form.dataFim,
            localizacao: form.localizacao
        })

        setIsEditing(false)
    }

    return (
        <div className='event-card'>
            {safeEvento.imagem ? (
                <img className='event-card__image' src={safeEvento.imagem} alt={safeEvento.nome} />
            ) : (
                <div className='event-card__placeholder'>Sem imagem</div>
            )}

            <div className='event-card__header'>
                <h3 className='event-card__title'>{safeEvento.nome}</h3>

                <div className='event-card__actions'>
                    <button
                        type='button'
                        className='event-card__action event-card__action--edit'
                        aria-label={`Editar ${safeEvento.nome}`}
                        onClick={() => setIsEditing(true)}
                    >
                        <FaEdit />
                    </button>

                    <button
                        type='button'
                        className='event-card__action event-card__action--delete'
                        aria-label={`Excluir ${safeEvento.nome}`}
                        onClick={() => onDelete?.(safeEvento.id)}
                    >
                        <FaTrash />
                    </button>
                </div>
            </div>

            {isEditing ? (
                <div className='event-card__editor'>
                    <label>
                        Início
                        <input
                            type='datetime-local'
                            value={form.dataInicio}
                            onChange={(e) => setForm(prev => ({ ...prev, dataInicio: e.target.value }))}
                        />
                    </label>

                    <label>
                        Fim
                        <input
                            type='datetime-local'
                            value={form.dataFim}
                            onChange={(e) => setForm(prev => ({ ...prev, dataFim: e.target.value }))}
                        />
                    </label>

                    <label>
                        Logradouro
                        <input
                            type='text'
                            name='logradouro'
                            value={form.localizacao.logradouro}
                            onChange={handleLocalizacaoChange}
                        />
                    </label>

                    <label>
                        Número
                        <input
                            type='text'
                            name='numero'
                            value={form.localizacao.numero}
                            onChange={handleLocalizacaoChange}
                        />
                    </label>

                    <label>
                        Bairro
                        <input
                            type='text'
                            name='bairro'
                            value={form.localizacao.bairro}
                            onChange={handleLocalizacaoChange}
                        />
                    </label>

                    <label>
                        Cidade
                        <input
                            type='text'
                            name='cidade'
                            value={form.localizacao.cidade}
                            onChange={handleLocalizacaoChange}
                        />
                    </label>

                    <label>
                        UF
                        <input
                            type='text'
                            name='uf'
                            maxLength='2'
                            value={form.localizacao.uf}
                            onChange={handleLocalizacaoChange}
                        />
                    </label>

                    <div className='event-card__editor-actions'>
                        <button type='button' className='btn-save' onClick={handleSave}>Salvar</button>
                        <button type='button' className='btn-cancel' onClick={() => setIsEditing(false)}>Cancelar</button>
                    </div>
                </div>
            ) : (
                <div className='event-card__content'>
                    <p className='event-card__info'>
                        <strong>Local:</strong> {localizacao}
                    </p>

                    <p className='event-card__info'>
                        <strong>Início:</strong> {dataInicio}
                    </p>

                    <p className='event-card__info'>
                        <strong>Fim:</strong> {dataFim}
                    </p>
                </div>
            )}
        </div>
    )
}