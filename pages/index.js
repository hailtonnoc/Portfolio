import Link from 'next/link'

function Home()
{
    return <div>
        <h1>Hailton Oliveira</h1>

        <Link href="/sobre">
            <a>Acessar pagina Sobre</a>
        </Link>

        <br></br>

        <Link href="/tempo">
            <a>Acessar Contador</a>
        </Link>

        </div>

}

export default Home