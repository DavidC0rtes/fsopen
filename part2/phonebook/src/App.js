import React, { useState, useEffect } from 'react'
import axios from 'axios'
import {PersonForm, Persons, Filter} from './components/misc'

const App = () => {
	const [ persons, setPersons ] = useState([])
	const [newName, setNewName] = useState('')
	const [newNumber, setNewNumber] = useState('')
	const [newFilter, setNewFilter] = useState('')

	// Initial state of data is fetched from "server" using axios and an effect hook
	useEffect(() => {
		console.log('effect')
		axios
			.get('http://localhost:3001/persons')
			.then(response => {
				console.log('promise fulfilled')
				setPersons(response.data)
			})
	}, [])
	console.log('render', persons.length, 'persons')
	
	const addName = (event) => {
		event.preventDefault()	
		
		const match = persons.filter(person => person.name === newName)
		if (match.length) {
			window.alert(`${newName} is already added to phonebook`)

		} else {
			const nameObject = {
				name: newName,
				number: newNumber,
			}
			setPersons(persons.concat(nameObject))
		}
		setNewName('')
		setNewNumber('')
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
			<Filter newFilter={newFilter} handleNewFilter={handleNewFilter} />
			<h2>Add a new</h2>
			<PersonForm 
				addName={addName} newName={newName}
				newNumber={newNumber} handleNewName={handleNewName}
				handleNewNumber={handleNewNumber}
			/>
			<h2>Numbers</h2>
			<Persons numbersToShow={numbersToShow} />
		</div>
	)
}

export default App
