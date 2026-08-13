import { useNavigate } from 'react-router-dom'
import './Header.css'

function Header() {
    const navigate = useNavigate()
    const usuario = localStorage.getItem('userName') || 'Usuário'

    function handleSair() {
        localStorage.removeItem('token')
        localStorage.removeItem('userName')
        navigate('/login')
    }

    return (
        <header className='header'>
            <div className='header__brand'>
                <span className='header__title'>Gerenciador de Eventos</span>
            </div>

            <div className='header__actions'>
                <span className='header__user'>Olá, {usuario}</span>

                <button type='button' className='header__button' onClick={handleSair}>
                    Sair
                </button>
            </div>
        </header>
    )
}

export default Header
