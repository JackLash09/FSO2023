const express = require('express')
const app = express()

app.use(express.json())

let persons = [
    { 
      "id": 1,
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": 2,
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": 3,
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": 4,
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
]

const generateId = () => {
    const idGen = Math.random(0, 9999) * 1000
    return Math.round(idGen)
  }

app.get('/', (request, response) => {
    response.send('<h1>Phonebook</h1>')
  })
  
app.get('/api/persons', (request, response) => {
    response.json(persons)
  })

app.get('/info', (request, response) => {
    const size = persons.length
    const dateTime = new Date();
    response.send("<p>Phonebook has info for "+size+" people</p><p>"+dateTime+"</p>")
  })

app.get('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    const person = persons.find(person => person.id === id)
    if (person) {
        response.json(person)
        } else {
        response.status(404).end()
        }
    })

app.delete('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    persons = persons.filter(person => person.id !== id)
    
    response.status(204).end()
    })

app.post('/api/persons', (request, response) => {
    const body = request.body
    if (!body.name && !body.number) {
        return response.status(400).json({ 
        error: 'The name or number is missing'
        })
    }

    persons.filter((person) => {
        if (person.name.toLowerCase().includes(body.name.toLowerCase())) {
            return response.status(400).json({
                error: 'The name already exists in the phonebook'
                })
        }
        }
    )

    const person = {
        name: body.name,
        number: body.number,
        id: generateId(),
    }
    
    persons = persons.concat(person)
    
    response.json(person)
    })


const PORT = 3001
app.listen(PORT)
console.log(`Server running on port ${PORT}`)