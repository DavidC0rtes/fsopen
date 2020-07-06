import React, { useState } from 'react';
import ReactDOM from 'react-dom';

const Button = ({onClick, text}) => <button onClick={onClick}>{text}</button> 
const Title = ({ text }) => <h2>{text}</h2>

const ShowAnecdote = ({text, value }) => (
	<div>
		<p>{text}</p>
		<p>has {value} votes</p>
	</div>
)

const App = (props) => {
	const [selected, setSelected] = useState(0)
	const [votes, setVotes] = useState(new Array(props.anecdotes.length).fill(0))

	const getRandom = () => Math.floor(Math.random() * (props.anecdotes.length))
	const handleClick = () => setSelected(getRandom()) 

	const handleVote = () => {
		const newVotes = [...votes]
		newVotes[selected] += 1
		setVotes(newVotes)
	}

	const maxVote = () => Math.max(...votes)
	const getMostVoted = () => votes.indexOf(maxVote())
	
	return (
		<div>
			<Title text='Anecdote of the day' />
			<ShowAnecdote text={props.anecdotes[selected]} value={votes[selected]} />
			<Button onClick={handleVote} text='vote' />
			<Button onClick={handleClick} text='next anecdote' />
			<Title text='Anecdote with most votes' />
			<ShowAnecdote text={props.anecdotes[getMostVoted()]} value={maxVote()} />
		</div>
	)
}

const anecdotes = [
	'If it hurts, do it more often',
  	'Adding manpower to a late software project makes it later!',
  	'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  	'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  	'Premature optimization is the root of all evil.',
  	'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
  <App anecdotes={anecdotes} />,
	document.getElementById('root')
);
