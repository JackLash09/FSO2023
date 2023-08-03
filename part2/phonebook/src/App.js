import { useState, useEffect } from 'react'
import axios from 'axios'
import Name from './components/Name'
import Notification from './components/Notification'
import personService from './services/persons'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newSearch, setNewSearch] = useState('')
  const [successMessage, setSuccessMessage] = useState(null)

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

  useEffect(() => {
    personService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  }, [])

  // ADD PERSON //
  const addName = (event) => {
    const includes = persons.some(person => person.name.toLowerCase() === (newName).toLowerCase())
    event.preventDefault()
    const personObject = {
      name: newName,
      number: newNumber,
      id: persons.length + 1
    }
    if (includes === true)
    {
      if (window.confirm(`${newName} is already added to phonebook, replace old number with new one?`))
      {
        updatePerson(personObject)
        setSuccessMessage(
          `Updated ${personObject.name}`
        )
        setTimeout(() => {
          setSuccessMessage(null)
        }, 5000)
      }
    }
    else
    {
      personService
      .create(personObject)
      .then(returnedPerson => {
        setPersons(persons.concat(returnedPerson))
        setSuccessMessage(
          `Added ${returnedPerson.name}`
        )
        setTimeout(() => {
          setSuccessMessage(null)
        }, 5000)
      })
    }
    setNewName('')
    setNewNumber('')
  }

  // UPDATE //
  const updatePerson = personToUpdate => {
    const person = persons.find(n => n.name.toLowerCase() === personToUpdate.name.toLowerCase())
    const changedPerson = { ...person, number: personToUpdate.number }
  
    personService
    .update(changedPerson.id, changedPerson)
    .then(returnedPerson => {
      setPersons(persons.map(person => person.id !== changedPerson.id ? person : returnedPerson))
    })
  }

  // DELETE //
  const deletePerson = person => {
    if (window.confirm(`Delete ${person.name}?`))
    {
      personService.remove(person.id)
      setPersons(persons.filter(x => x.id !== person.id))
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={successMessage} />
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
        <ul>
          {personsToShow.map(person => 
              <Name key={person.id} person={person} deleteThisPerson={() => deletePerson(person)}  />
          )}
        </ul>
      </div>
    </div>
  )
}

export default App