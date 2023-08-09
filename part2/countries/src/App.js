import { useState, useEffect } from 'react'
import axios from 'axios'
import Country from './components/Country'
import Name from './components/Name'

const App = () => {
  const [countries, setCountries] = useState([])
  const [newSearch, setNewSearch] = useState('')
  const [common, setCommon] = useState('')
  const [capital, setCapital] = useState('')
  const [area, setArea] = useState('')
  const [languages, setLanguages] = useState([])
  const [flagUrl, setFlagUrl] = useState(null)

  const countriesToShow = countries.filter(country => country.toLowerCase().startsWith(newSearch.toLowerCase()))

  useEffect(() => {
    axios
      .get(`https://studies.cs.helsinki.fi/restcountries/api/all`)
      .then((response) => {
       response.data.map(country => {
        setCountries(name => name.concat(country.name.common))
       })
      })
  }, [])

  useEffect(() => {
    console.log("lenght", countriesToShow.length)
    if (countriesToShow.length === 1) {
      console.log("good")
      axios
        .get(`https://studies.cs.helsinki.fi/restcountries/api/name/${countriesToShow}`)
        .then(response => {
          setCommon(response.data.name.common)
          setCapital(response.data.capital)
          setArea(response.data.area)
          setLanguages(response.data.languages)
          setFlagUrl(response.data.flags.png)
        })
        .catch(error => {
          setCommon('')
          setCapital('')
          setArea('')
          setLanguages([])
          setFlagUrl(null)
        })
    }
    else {
      setCommon('')
      setCapital('')
      setArea('')
      setLanguages([])
      setFlagUrl(null)
    }
  }, [newSearch])

  const handleSearchChange = (event) => {
    setNewSearch(event.target.value)
  }

  const showCountry = (country) => {
    if (window.confirm(`Show ${country}?`)) {
    }
  }


  
  return (
    <div>
      <form onSubmit={(event) => event.preventDefault()}>
        <div>
          find countries <input
                            value={newSearch}
                            onChange={handleSearchChange}
                          />
        </div>
      </form>
      <div>
        <Country common={common} capital={capital} area={area} languages={languages} flag={flagUrl}/>
      </div>
      <div>
        <ul>
          {countriesToShow.map((name, i) => {
            if (i<10){
            return(
            <Name key={i} name={name} showThisCountry={() => showCountry(name)}/>
            )
            }
          }
          )}
        </ul>
      </div>
    </div>
  )
}
export default App;