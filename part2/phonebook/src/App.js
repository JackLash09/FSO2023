import { useState, useEffect } from 'react'
import axios from 'axios'
import Name from './components/Name'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newSearch, setNewSearch] = useState('')

  useEffect(() => {
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        setPersons(response.data)
      })
  }, [])

  const includes = persons.some(person => person.name.toLowerCase() === (newName).toLowerCase())

  const personsToShow = persons.filter(person => person.name.toLowerCase().includes(newSearch.toLowerCase()))

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }
  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }
  const handleSearchChange = (event) => {
    setNewSearch(event.target.value)
  }

  const addName = (event) => {
    event.preventDefault()
    const personObject = {
      name: newName,
      number: newNumber,
      id: persons.length + 1
    }
    if (includes === true){
      (window.alert(`${newName} is already added to phonebook`))
      setNewName('')
      setNewNumber('')
    }
    else{
      axios
        .post('http://localhost:3001/persons', personObject)
        .then(response => {
          setPersons(persons.concat(response.data))
          setNewName('')
          setNewNumber('')
      })
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form>
        <div>
          search by name: <input
                            value={newSearch}
                            onChange={handleSearchChange}
                          />
        </div>
      </form>
      <h2>add a new</h2>
      <form onSubmit={addName}>
        <div>
          name: <input 
                  value={newName}
                  onChange={handleNameChange}
                />
        </div>
        <div> 
          number: <input 
                    value={newNumber} 
                    onChange={handleNumberChange} 
                    
                  />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <div>
        {personsToShow.map(person => 
            <Name key={person.id} name={person.name} number={person.number} />
        )}
      </div>
    </div>
  )
}

export default App