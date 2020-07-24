import React, { useState, useEffect } from 'react'
import { PersonForm, Persons, Filter, Notification } from './components/misc'
import numService from './services/numbers'

const App = () => {
	const [persons, setPersons ] = useState([])
	const [newName, setNewName] = useState('')
	const [newNumber, setNewNumber] = useState('')
	const [newFilter, setNewFilter] = useState('')
	const [message, setMessage] = useState(null)

	useEffect(() => {
		numService
			.getAll()
			.then(initialNums => {
				setPersons(initialNums)
			})
	}, [])

	const addName = (event) => {
		event.preventDefault()	
		const match = persons.filter(person => person.name === newName)
		
		if (match.length) {
			const result = window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)
			result && updateNumberOf(match[0])

		} else {
			const nameObject = {
				name: newName,
				number: newNumber,
			}

			numService
				.create(nameObject)
				.then(returnedName => {
					setPersons(persons.concat(returnedName))
				})
			
			setMessage({ text: `Added ${newName}`, type: 'success'})
			setTimeout(() => {
				setMessage(null)
			}, 4000)
		}
		setNewName('')
		setNewNumber('')
	}

	const updateNumberOf = (personObject) => {
		const changedNumber = {...personObject, number:newNumber}
		const id = personObject.id

		numService
			.update(id, changedNumber)
			.then(returnedPerson => {
				setPersons(persons.map(person => person.id !== id ? person : returnedPerson))

				setMessage({
					text: `Updated phone number of ${personObject.name}`,
					type: 'success'
				})
				setTimeout(() => {
					setMessage(null)
					}, 4000)
			})
			.catch(error => {
				setMessage({
					text: `Information of ${personObject.name} has already been removed from server`,
					type: 'error'
				})
				setPersons(persons.filter(person => person.id !== id))
				setTimeout(() => {
					setMessage(null)
				}, 4000)
			})
	}

	const removeNumberOf = (id) => {	
		numService
			.remove(id)
			.then(() => {
				setPersons(persons.filter(person => person.id !== id))
			})
	}
	
	const handleNewName = (event) => setNewName(event.target.value)
	const handleNewNumber = (event) => setNewNumber(event.target.value)
	const handleNewFilter = (event) => setNewFilter(event.target.value)
	
	const numbersToShow = newFilter	
		? persons.filter(person => person.name.match(new RegExp(newFilter, "i")))
		: persons

	return (
		<div>
			<h2>Phonebook</h2>
			<Notification message={message} />
			<Filter newFilter={newFilter} handleNewFilter={handleNewFilter} />
			<h2>Add a new</h2>
			<PersonForm 
				addName={addName} newName={newName}
				newNumber={newNumber} handleNewName={handleNewName}
				handleNewNumber={handleNewNumber}
			/>
			<h2>Numbers</h2>
			<Persons 
				numbersToShow={numbersToShow}
				removeNumberOf={removeNumberOf}
			/>
		</div>
	)
}

export default App
