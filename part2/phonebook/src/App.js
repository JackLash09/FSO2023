import { useState } from 'react'
import Name from './components/Name'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newSearch, setNewSearch] = useState('')

  const includes = persons.some(person => person.name === (newName))

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
    const noteObject = {
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
      setPersons(persons.concat(noteObject))
      setNewName('')
      setNewNumber('')
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


// persons.inludes() ? :
