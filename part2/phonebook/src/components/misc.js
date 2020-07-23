import React from 'react'

const Details = ( {person, removePerson} ) => {
	return (
		<p>
			{person.name} {person.number}
			<button onClick={removePerson} key={person.name}>delete</button>
		</p>
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

const Persons = ({ numbersToShow, removeNumberOf }) => {
	return (
		<div>
			{numbersToShow.map(person => <Details 
											key={person.name} 
											person={person} 
											removePerson={()=> window.confirm(`Delete ${person.name}?`)	&& removeNumberOf(person.id)}
										/>
			)}
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
