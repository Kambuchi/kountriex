import React from 'react'
import { cca } from '../api/cca'

export async function getServerSideProps( {query} ){
    const {id} = query
    const res = await fetch(`https://restcountries.com/v3.1/alpha/${id}`)
    const data = await res.json()
    return {
        props: { data }
    }
}

const CountryPage = ({data}) => {
    let native = Object.keys(data[0].name.nativeName)
    native = native[native.length - 1]
    let lang = Object.values(data[0].languages)
    let curr = Object.keys(data[0].currencies)
  return (
    <div>
        <img src={data[0].flags.png}/>
        <h2>{data[0].name.common}</h2>
        <h4><strong>Native Name: </strong> {data[0].name.nativeName[native].common}</h4>
        <h4><strong>Population:</strong> {data[0].population}</h4>
        <h4><strong>Region:</strong> {data[0].region}</h4>
        <h4><strong>Sub Region:</strong> {data[0].subregion}</h4>
        <h4><strong>Capital:</strong> {data[0].capital}</h4>
        <h4><strong>Top Level Domain:</strong> {data[0].tld}</h4>
        <h4><strong>Currencies:</strong> {data[0].currencies[curr[0]].name}</h4>
        <h4><strong>Languages:</strong> {lang.map((e, i) => {
            let isLast = i == lang.length - 1
            return isLast ? e : (`${e}, `) 
        })}</h4>
        <h4><strong>Border Countries:</strong></h4>
        <ul>
        {data[0].borders.map( (e,i) => {
          
            return (
                <li key={i}>
                    <span>{cca[e.toLowerCase()]}</span>
                </li>
            )
        })}
        </ul>
      </div>
  )
}

export default CountryPage