const express = require('express')
// const morgan = require('morgan')
const app = express()
const cors = require('cors')
require('dotenv').config()

const Person = require('./models/person')

app.use(express.static('build'))
app.use(cors())
app.use(express.json())
//app.use(morgan(':method :url :body'))


let persons = [
]

app.get('/api/persons', (request, response) => {
  console.log("running")
  Person.find({}).then(persons => {
    response.json(persons)
  })
})

app.get('/info', (request, response) => {
    const size = persons.length
    const dateTime = new Date();
    response.send("<p>Phonebook has info for "+size+" people</p><p>"+dateTime+"</p>")
  })

  app.get('/api/persons/:id', (request, response) => {
    Person.findById(request.params.id).then(person => {
      response.json(person)
    })
  })


app.delete('/api/persons/:id', (request, response) => {
  Person.findByIdAndRemove(request.params.id)
    .then(result => {
      response.status(204).end()
    })
})

app.put('/api/persons/:id', (request, response) => {
    const body = request.body
    console.log(body.id)
    const person = {
      name: body.name,
      number: body.number,
    }
    person.update().then(updatedPerson => {
      response.json(updatedPerson)
    })
})

app.post('/api/persons', (request, response) => {
  const body = request.body
  if (!body.name || !body.number) {
    return response.status(400).json({ error: 'The name and/or number is missing' })
  }

  persons.filter((person) => {
    if (person.name.toLowerCase() === (body.name.toLowerCase())) {
        return response.status(400).json({
            error: 'The name already exists in the phonebook'
            })
    }
    }
)
  const person = new Person({
    name: body.name,
    number: body.number,
  })

  person.save().then(savedPerson => {
    response.json(savedPerson)
  })
})

const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})