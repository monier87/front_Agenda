import { useState, useEffect } from 'react'
import axios from 'axios'
import Inputs from './components/Inputs'
import Persons from './components/Persons' 
import './App.css';

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filterNombre, setFilterNombre] = useState('')

  const handleNameChange = (event) => setNewName(event.target.value)
  const handleNumberChange = (event) => setNewNumber(event.target.value)
  const handleFilterChange = (event) => setFilterNombre(event.target.value)

  useEffect(() => {
    console.log('effect')
    axios
      .get('https://backen-agenda.vercel.app/api/persons') 
      .then(response => {
        console.log('promise fulfilled')
        setPersons(response.data)
      })
      .catch(error => {
        console.error('Error fetching data:', error)
      })
  }, [])

  const addName = (event) => {
    event.preventDefault()
    const nameExists = persons.some(
      person => person.name.toLowerCase() === newName.trim().toLowerCase()
    )

    if (nameExists) {
      alert(`${newName} is already added to the phonebook`)
      return
    }

    const newPerson = {
      name: newName.trim(),
      number: newNumber.trim()
      // El ID lo generará el backend
    }

    axios
      .post('https://backen-agenda.vercel.app/api/persons', newPerson)
      .then(response => {
        setPersons(persons.concat(response.data))
        setNewName('')
        setNewNumber('')
      })
      .catch(error => {
        console.error('Error adding person:', error)
        alert('Could not add person to the phonebook')
      })
  }

  const deletePerson = (id) => {
    if (window.confirm('Are you sure you want to delete this person?')) {
      axios
        .delete(`https://backen-agenda.vercel.app/api/persons/${id}`)
        .then(() => {
          setPersons(persons.filter(person => person.id !== id))
        })
        .catch(error => {
          console.error('Error deleting person:', error)
          alert('Could not delete person from the phonebook')
        })
    }
  }

  const filteredPersons = filterNombre.trim().length > 0
    ? persons.filter(person =>
        person.name.toLowerCase().includes(filterNombre.trim().toLowerCase())
      )
    : persons

  return (
    <div className='note'>
      <h2>Phonebook</h2>
      <div>
        filter shown with <Inputs value={filterNombre} onChange={handleFilterChange}/>
      </div>
      <form onSubmit={addName}>
        <div>
          name: <Inputs
            value={newName}
            onChange={handleNameChange}
          />
        </div>
        <div>
          number: <Inputs 
            value={newNumber}
            onChange={handleNumberChange}
          />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <Persons persons={filteredPersons} onDelete={deletePerson} />
    </div>
  )
}

export default App