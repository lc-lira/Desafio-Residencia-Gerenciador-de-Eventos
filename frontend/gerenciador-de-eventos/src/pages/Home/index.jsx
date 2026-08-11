import Header from '../../components/Header'

function Home() {
    return (
        <div style={{ background: '#1f1d3d', minHeight: '100vh', color: '#fff' }}>
            <Header />

            <main style={{ padding: '40px 32px' }}>
                <h1>Home</h1>
                <p>Bem-vindo ao sistema.</p>
            </main>
        </div>
    )
}

export default Home