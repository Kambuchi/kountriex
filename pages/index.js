import Link from 'next/link'
import React from 'react'

const defaultEndPoint = 'https://restcountries.com/v3.1/all'
export async function getServerSideProps(){
    const res = await fetch(defaultEndPoint)
    const data = await res.json()
    return {
        props: { data }
    }
}

const Home = ({data}) => {
  return (
    <div>
        <ul>
            {data.map(e => {
                return (
                    <li key={e.cca3}>
                        <Link href="/country/[id]" as={`/country/${e.cca3}`}>
                            <a>
                                <img src={e.flags.png}/>
                                <h2><strong>{e.name.common}</strong></h2>
                                <h3><strong>Population:</strong> {e.population}</h3>
                                <h3><strong>Region:</strong> {e.region}</h3>
                                <h3><strong>Capital:</strong> {e.capital}</h3>
                            </a>
                        </Link>
                    </li>
                )
            })};
        </ul>
    </div>
  )
}

export default Home