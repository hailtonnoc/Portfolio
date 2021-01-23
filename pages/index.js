import Link from 'next/link'

function Home()
{
    return <div>
        <h1>Hailton Oliveira</h1>
        <small>Busque excelência em tuas virtudes. Pois é seu dever evoluir em vida.</small>

        <Link href="/sobre">
            <a>Acessar pagina Sobre</a>
        </Link>

        <br></br>

        <Link href="/tempo">
            <a>Acessar Contador</a>
        </Link>

        <br></br>

        </div>

}

export default Home