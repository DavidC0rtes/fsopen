import React from 'react'

const Details = ( {person} ) => {
	return (
		<p key={person.name}>{person.name} {person.number}</p>
	)
}

const PersonForm = (props) => {	
	return (
		<form onSubmit={props.addName}>
			<> name: <input value={props.newName} onChange={props.handleNewName} /> </>
			<> number: <input value={props.newNumber} onChange={props.handleNewNumber} /></>
			<> <button type='submit'>add</button> </>
		</form>
	)
}

const Persons = ( {numbersToShow} ) => {
	return (
		<div>
			{numbersToShow.map(person => <Details key={person.name} person={person} />)}
		</div>
	)
}

const Filter = ( {newFilter, handleNewFilter } ) => { 
	return (
		<div>
			filter shown with: <input value={newFilter} onChange={handleNewFilter}/>
		</div>
	)
}

export {PersonForm, Persons, Filter}
