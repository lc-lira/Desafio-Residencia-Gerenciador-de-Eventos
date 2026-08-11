import { useNavigate } from 'react-router-dom'

function Header() {
    const navigate = useNavigate()
    const usuario = 'João'

    function handleSair() {
        localStorage.removeItem('token')
        navigate('/login')
    }

    return (
        <header
            style={{
                position: 'sticky',
                top: 0,
                zIndex: 20,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                background: 'rgba(30, 29, 61, 0.96)',
                borderBottom: '1px solid rgba(255,255,255,0.08)',
                padding: '18px 32px',
                color: '#fff',
                backdropFilter: 'blur(8px)',
                boxSizing: 'border-box'
            }}
        >
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <span style={{ fontWeight: 700, fontSize: '1.2rem', color: '#8b8ae1' }}>Gerenciador de Eventos</span>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '18px' }}>
                <span style={{ color: '#dfe0ff', fontWeight: 600 }}>Olá, {usuario}</span>

                <button
                    type='button'
                    onClick={handleSair}
                    style={{
                        background: '#8b8ae1',
                        color: '#fff',
                        border: 'none',
                        borderRadius: '10px',
                        padding: '10px 16px',
                        cursor: 'pointer',
                        fontWeight: 700
                    }}
                >
                    Sair
                </button>
            </div>
        </header>
    )
}

export default Header
