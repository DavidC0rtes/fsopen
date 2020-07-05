import React, { useState } from 'react';
import ReactDOM from 'react-dom';

const Header = ({header}) => <h2>{header}</h2>

const Button = ({onClick, text}) => (
	<button onClick={onClick}>
		{text}
	</button>
)

const Statistic = ({ text, value }) => 
	<tr>
		<td>{text}</td> 
		<td>{value}</td>
	</tr>

const Statistics = ({ good, neutral, bad }) => {
	const total = good + bad + neutral
	const avg = (good - bad) / total
	
	const positiveFeedback = () => {
		const number = (good / total)*100
		return number.toString() + '%'
	}
	
	if (total === 0) {
		return (
			<p>'No feedback given'</p>
		)
	}
	
	return (
		<table>
			<tbody>
				<Statistic text='good' value={good}/>
				<Statistic text='neutral' value={neutral}/>
				<Statistic text='bad' value={bad}/>
				<Statistic text='total' value={total} />
				<Statistic text='average' value={avg} />
				<Statistic text='positive' value={positiveFeedback()} />
			</tbody>
		</table>
	)
}

const App = () => {
	// save clicks of each button to own state
	const [good, setGood] = useState(0)
	const [neutral, setNeutral] = useState(0)
	const [bad, setBad] = useState(0)

	return (
		<div>
			<Header header='Unicafe: give feedback' />
			<Button onClick={() => setGood(good + 1)} text='good'/>
			<Button onClick={() => setNeutral(neutral + 1)} text='neutral'/>
			<Button onClick={() => setBad(bad+ 1)} text='bad'/>
			<Header header='Statistics' />
			<Statistics good={good} neutral={neutral} bad={bad}/> 
		</div>
	)
}

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
