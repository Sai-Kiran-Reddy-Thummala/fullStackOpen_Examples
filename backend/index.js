// const http = require('http')

// let notes = [
//   {
//     id: "1",
//     content: "HTML is easy",
//     important: true
//   },
//   {
//     id: "2",
//     content: "Browser can execute only JavaScript",
//     important: false
//   },
//   {
//     id: "3",
//     content: "GET and POST are the most important methods of HTTP protocol",
//     important: true
//   }
// ]

// // const app = http.createServer((request,response) => {
// //     response.writeHead(200,{"Content-type": "text/plain"})
// //     response.end("Hello World")
// // })

// const app = http.createServer((request,response) => {
//     response.writeHead(200, {"content-type":"application/json"})
//     response.end(JSON.stringify(notes))
// })

// const PORT = 3001
// app.listen(PORT)
// console.log(`Server is running on port ${PORT}`)
//const cors = require('cors')
// app.use(cors())

// let notes = [
//   {
//     id: "1",
//     content: "HTML is easy",
//     important: true
//   },
//   {
//     id: "2",
//     content: "Browser can execute only JavaScript",
//     important: false
//   },
//   {
//     id: "3",
//     content: "GET and POST are the most important methods of HTTP protocol",
//     important: true
//   }
// ]

require('dotenv').config()
const express = require('express')
const Note = require('./models/note')

const app = express()

app.use(express.static('dist'))
app.use(express.json())

const requestLogger = (request,response,next) => {
  console.log('request method', request.method)
  console.log('request path', request.path)
  console.log('request body', request.body)
  console.log('---')
  next()
}

app.use(requestLogger)

app.get('/',(request,response) => {
    response.send('<h1>Hello World!</h1>')
})

app.get('/api/notes',(request,response) => {
  Note.find({}).then(notes => {
    response.json(notes)
  })
})

app.get('/api/notes/:id',(request,response) => {
    Note.findById(request.params.id).then(note => {
      if(note){
        response.json(note)
      }else {
        response.status(404).end()
      }
    })
    .catch(error => { next(error) })
})

app.delete('/api/notes/:id',(request,response) => {
    Note.findByIdAndDelete(request.params.id).then(result => {
      response.status(204).end()
    })
    .catch(error => next(error))
})

const generateId = () => {
  const maxId = notes.length > 0 
    ? Math.max(...notes.map(n => Number(n.id))) 
    : 0

    return String(maxId+1)
}

app.post('/api/notes',(request,response) => {
    
  const body = request.body

  if(!body.content){
    return response
          .status(400)
          .json({"error":"content is missing"})
  }

  const note = new Note ({
    content: body.content,
    important: body.important || false
  })

  note.save().then(result => {
      response.json(result)
  })
})

app.put('/api/notes/:id', (request, response, next) => {
  const { content, important } = request.body

  Note.findById(request.params.id)
    .then(note => {
      if (!note) {
        return response.status(404).end()
      }

      note.content = content
      note.important = important

      return note.save().then((updatedNote) => {
        response.json(updatedNote)
      })
    })
    .catch(error => next(error))
})

const unknownEndPoints = (request,response) => {
  response.status(400).send({'error': 'unknown end point'})
}

app.use(unknownEndPoints)

const errorHandler = (error, request, response, next) => {
  console.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  } 

  next(error)
}

// this has to be the last loaded middleware, also all the routes should be registered before this!
app.use(errorHandler)

const PORT = process.env.PORT

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})