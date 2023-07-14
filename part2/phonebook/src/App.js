import { useState } from 'react'
import Name from './components/Name'

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }
  const addName = (event) => {
    event.preventDefault()
    const noteObject = {
      content: newName,
      id: persons.length + 1
    }
  
    setPersons(persons.concat(noteObject))
    setNewName('')
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addName}>
        <div>
          name: <input 
                  value={newName}
                  onChange={handleNameChange}
                />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <div>
        {persons.map(person => 
            <Name key={person.id} name={person.content} />
          )}
      </div>
    </div>
  )
}

export default App