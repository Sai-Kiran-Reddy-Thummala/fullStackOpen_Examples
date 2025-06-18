import { useState, useEffect } from 'react'
import Note from './components/Note'
import notesServices from './services/notes'
import Notification from './components/Notification'
import Footer from './components/Footer'

const App = () => {

const [notes, setNotes] = useState([])
const [newNote, setNewNote] = useState('a new note...')
const [showAll, setShowAll] = useState(true)
const [errorMessage, setErrorMessage] = useState('error message appears here')

useEffect(() => {
  console.log('Inside use Effect')  

  notesServices
  .getAll()
  .then(initialData => {
    setNotes(initialData)
  })
},[])

console.log('render',notes.length, 'notes')

const addNote = (event) => {
  event.preventDefault()
  const noteObject = {
    content : newNote,
    important : Math.random < 0.5,
  }
  
  notesServices
  .create(noteObject)
  .then(returnedNote => {
    setNotes(notes.concat(returnedNote))
  })
}

const handleNoteChange = (event) => {
  console.log(event.target.value)
  setNewNote(event.target.value)
}

const notesToShow = showAll 
  ? notes
  : notes.map(note => note.important)

const toggleImportanceOf = (id) => {
    const note = notes.find( n => n.id === id)
    const changedObject = {
      ...note,
      important: !note.important
    }
    
    notesServices
    .update(id, changedObject)
    .then(returnedNote => {
      setNotes(notes.map( note => note.id === id ? returnedNote : note ))
    })
    .catch(error => {
      console.log(error)
      // alert(`the note '${note.content}' has been already removed from the server`)
      setErrorMessage(
          `Note '${note.content}' was already removed from server`
        )
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
      setNotes(notes.filter(n => n.id != id))
    })  

  }

  return (
    <div>
      <h1>Notes</h1>
      <Notification message={errorMessage} />
      <div>
        <button onClick={() => setShowAll(!showAll)}>
          {showAll ? 'important' : 'show all'}
        </button>
      </div>
      <ul>
        {notesToShow.map(note => 
          <Note key={note.id} 
                note={note} 
                toggleImportance={() => toggleImportanceOf(note.id)}/>
        )}
      </ul>
      <form onSubmit={addNote}>
        <input
         value={newNote} 
        onChange={handleNoteChange}
        />
        <button type="submit">save</button>
      </form> 
      <Footer /> 
    </div>
  )
}

export default App