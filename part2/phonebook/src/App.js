import React, { useState } from 'react'

const Details = ( {person} ) => <p key={person.name}>{person.name} {person.number}</p>

const Persons = ( {numbersToShow} ) => 
		<div>
			{numbersToShow.map(person => <Details key={person.name} person={person} />)}
		</div>

const Filter = ( {newFilter, handleNewFilter } ) => 
	<div>
		filter shown with: <input value={newFilter} onChange={handleNewFilter}/>
	</div>

const PersonForm = (props) =>	
	<form onSubmit={props.addName}>
		<> name: <input value={props.newName} onChange={props.handleNewName} /> </>
		<> number: <input value={props.newNumber} onChange={props.handleNewNumber} /></>
		<> <button type='submit'>add</button> </>
	</form>

const App = () => {
	const [ persons, setPersons ] = useState([
		{ name: 'Arto Hellas', number: '040-1234567' },
		{ name: 'Ada Lovelace', number: '39-44-5323523' },
    	{ name: 'Dan Abramov', number: '12-43-234345' },
    	{ name: 'Mary Poppendieck', number: '39-23-6423122' }
	])

	const [newName, setNewName] = useState('')
	const [newNumber, setNewNumber] = useState('')
	const [newFilter, setNewFilter] = useState('')

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
